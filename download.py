"""
python实现多线程下载，原理：多线程下载的基本思想是将一个文件分成多个部分，
每个部分由一个线程独立下载，最后将这些部分合并成完整的文件。
这样可以充分利用带宽和计算资源，提高下载速度。
使用Http请求头的Range字段可以实现文件的分段下载，
服务器会根据Range字段返回指定范围的文件内容。例如，
请求头Range: bytes=0-1023表示获取文件的前1024字节。

断点续传是多线程下载的一个重要功能，它可以在下载中断后继续从中断的地方继续下载，
避免重新下载整个文件。断点续传的实现方法是在下载过程中保存下载进度，
例如保存已下载的字节数，以便在下次下载时继续下载。

使用 win32，实现对于用户的 gui 界面，用户可以选择要下载的文件，
选择保存路径，选择下载线程数，选择是否伪装成浏览器，然后点击下载按钮开始下载。
"""

import os
import sys
import time
import pip

try:
    import requests
except ImportError:
    pip.main(["install", "requests"])
    import requests
import threading
import tkinter as tk
from tkinter import filedialog, messagebox, ttk
from urllib.parse import urlparse
from http.client import HTTPResponse
from io import BytesIO
from concurrent.futures import ThreadPoolExecutor


class DownloadManager:
    def __init__(self, url, save_path, thread_count, user_agent, progress_bar=None):
        self.url = url
        self.save_path = save_path
        if self.save_path == "":
            self.save_path = "download/" + os.path.basename(urlparse(url).path)
        if self.save_path.split("/").__len__() <= 1:
            self.save_path = "download/" + self.save_path
        self.thread_count = thread_count
        self.user_agent = user_agent
        self.headers = {"User-Agent": user_agent}
        self.file_size = 0
        self.downloaded_size = 0
        self.start_time = 0
        self.end_time = 0
        self.progress = 0
        self.is_paused = False
        self.is_finished = False
        self.progress_bar = progress_bar
        if self.progress_bar is not None:
            self.progress_bar["value"] = 0
            self.progress_bar["maximum"] = 100
        else:
            self.progress_bar = ttk.Progressbar(
                tk.Tk(), orient=tk.HORIZONTAL, length=200, mode="determinate"
            )
            self.progress_bar.pack()
            self.progress_bar["value"] = 0
            self.progress_bar["maximum"] = 100
        self.downloaded_size = 0

    def download(self):
        self.start_time = time.time()
        self.is_finished = False
        self.is_paused = False
        self.progress = 0
        self.downloaded_size = 0

        # 获取文件大小
        response = requests.head(self.url, headers=self.headers)
        self.file_size = int(response.headers.get("Content-Length", 0))
        self.progress_bar["maximum"] = self.file_size

        # 创建保存文件的目录
        os.makedirs(os.path.dirname(self.save_path), exist_ok=True)

        # 创建临时文件
        temp_file = open(self.save_path + ".tmp", "wb")

        # 创建线程池
        with ThreadPoolExecutor(max_workers=self.thread_count) as executor:
            # 计算每个线程下载的字节数
            chunk_size = self.file_size // self.thread_count
            for i in range(self.thread_count):
                start = i * chunk_size
                end = (i + 1) * chunk_size - 1
                if i == self.thread_count - 1:
                    end = self.file_size - 1
                executor.submit(self.download_chunk, temp_file, start, end)

        # 关闭临时文件
        temp_file.close()

        # 重命名临时文件为最终文件
        os.rename(self.save_path + ".tmp", self.save_path)

        self.end_time = time.time()
        self.is_finished = True

    def download_chunk(self, temp_file, start, end):
        headers = self.headers.copy()
        headers["Range"] = f"bytes={start}-{end}"

        response = requests.get(self.url, headers=headers, stream=True)
        for chunk in response.iter_content(chunk_size=1024):
            if self.is_paused:
                break
            temp_file.write(chunk)
            self.downloaded_size += len(chunk)
            self.progress = self.downloaded_size
            # 在终端显示下载进度
            print(f"Downloaded {self.progress} bytes out of {self.file_size} bytes")
            # self.progress_bar["value"] = self.progress
            # self.progress_bar.update()

        # temp_file.flush()

    def pause(self):
        self.is_paused = True

    def resume(self):
        self.is_paused = False
        self.download()


def download(url, save_path, thread_count, user_agent, progress_bar=None):
    download_manager = DownloadManager(
        url, save_path, thread_count, user_agent, progress_bar
    )
    download_manager.download()


if __name__ == "__main__":
    # 创建主窗口
    root = tk.Tk()
    root.title("多线程下载器")
    root.geometry("400x300")

    # 创建标签和输入框
    url_label = tk.Label(root, text="URL:")
    url_label.pack()
    url_entry = tk.Entry(root, width=50)
    url_entry.pack()

    save_path_label = tk.Label(root, text="保存路径:")
    save_path_label.pack()
    save_path_entry = tk.Entry(root, width=50)
    save_path_entry.pack()

    thread_count_label = tk.Label(root, text="线程数:")
    thread_count_label.pack()
    thread_count_entry = tk.Entry(root, width=50)
    thread_count_entry.pack()
    thread_count_entry.insert(0, "1")

    user_agent_label = tk.Label(root, text="User-Agent:")
    user_agent_label.pack()
    user_agent_entry = tk.Entry(root, width=50)
    user_agent_entry.pack()
    user_agent_entry.insert(
        0,
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/132.0.0.0 Safari/537.36 Edg/132.0.0.0",
    )

    # 进度条
    progress_bar = ttk.Progressbar(root, length=300, mode="determinate")
    progress_bar.pack()

    # 创建下载按钮
    download_button = tk.Button(
        root,
        text="下载",
        command=lambda: download(
            url=url_entry.get(),
            save_path=save_path_entry.get(),
            thread_count=int(thread_count_entry.get()),
            user_agent=user_agent_entry.get(),
            progress_bar=progress_bar,
        ),
    )
    download_button.pack()
    root.mainloop()
