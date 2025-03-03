"""python查找当前文件夹下所有文本文件，把所有不是UTF-8编码的文件转换为UTF-8编码"""

import os
import pip

try:
    import chardet
except ImportError:
    pip.main(["install", "chardet"])
    import chardet

# 获取当前文件夹路径
current_path = os.getcwd()

# 遍历当前文件夹下的所有文件
for root, dirs, files in os.walk(current_path):
    for file in files:
        # 判断文件是否为文本文件
        if (
            (file.endswith(".txt") or file.endswith(".md") or file.endswith(".html"))
            and file != "README.md"
            and file != "DIGESTS.md"
        ):
            # 获取文件的完整路径
            file_path = os.path.join(root, file)
            # 读取文件内容并检测编码
            with open(file_path, "rb") as f:
                raw_data = f.read()
                result = chardet.detect(raw_data)
                encoding = result["encoding"]
            # 如果文件编码不是UTF-8，则转换为UTF-8
            if encoding != "utf-8":
                print(f"文件 {file_path} 开始转换成UTF-8编码")
                with open(file_path, "r", encoding=encoding) as f:
                    content = f.read()
                with open(file_path, "w", encoding="utf-8") as f:
                    f.write(content)
                print(f"文件 {file_path} 已转换为UTF-8编码")
print("所有文本文件已转换为UTF-8编码")
