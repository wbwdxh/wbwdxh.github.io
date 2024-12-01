import os
import tkinter as tk
from tkinter import colorchooser, simpledialog, colorchooser, filedialog, messagebox, Image
from PIL import Image, ImageTk, ImageDraw
import subprocess
import ctypes
import os

class save_ico:
	def __init__(self):
		self.run()
	def run(self):
		# 创建一个ico文件，内容为w,字体为Consolas，大小为32x32
		ico = Image.new("RGB", (32, 32), (255, 255, 255))
		draw = ImageDraw.Draw(ico)
		draw.text((10, 10), "w", fill=(0, 0, 0))
		ico.save("wpaint.ico")

current_path = os.path.dirname(os.path.abspath(__file__))

class add_gs_path:
	import os
	def __init__(self):
		# 获取当前脚本所在的目录
		current_path = self.os.path.dirname(os.path.abspath(__file__))
		# 要添加的路径
		new_path = current_path+"/gs10.03.1/bin"
		# 获取当前的PATH环境变量
		current_path = self.os.environ.get('PATH', '')
		# 将新的路径添加到PATH中
		new_path = new_path + self.os.pathsep + current_path
		# 更新环境变量
		self.os.environ['PATH'] = new_path

class tkcanvas_save: # 保存画布的类
	def convert_eps_to_png(eps_path, png_path, height, width):
		Image.open(eps_path).save(png_path) # 将EPS文件转换为PNG文件

class wpaint:
	def __init__(self, root):
		add_gs_path()
		save_ico()
		self.root = root
		self.root.title("wpaint")
		self.root.geometry("800x600")
		self.top = tk.Frame(self.root, height=30, bg="#323233")
		self.top.pack(fill=tk.X, side=tk.TOP)
		self.root.overrideredirect(True)  # 禁用窗口装饰
		# 设置应用的标题栏的文本为"wpaint"
		self.top_label = tk.Label(self.top, text="wpaint", font=("Arial", 12), fg="white", bg="#323233")
		self.top_label.pack(side=tk.LEFT, padx=10, pady=5)
		# 设置应用的标题栏的关闭按钮
		self.close_button = tk.Button(self.top, text="X", command=exit)
		self.close_button.pack(side=tk.RIGHT, padx=10, pady=5)
		# 监听窗口移动事件
		self.top.bind("<Button-1>", self.move_window_keydown)
		self.top.bind("<ButtonRelease-1>", self.move_window_keyup)
		self.root.bind("<Control-KeyPress-+>", self.change_size_bigger)
		self.root.bind("<Control-KeyPress-minus>", self.change_size_smaller)
		self.root.bind("<Control-n>", self.new_file)
		self.root.bind("<Control-o>", self.open_file)
		self.root.bind("<Control-s>", self.save_file)
		#设置默认背景颜色（包括所有Frame和button）为#1e1e1e
		self.root.configure(bg="#1e1e1e")
		self.root.option_add("*Background", "#1e1e1e")
		self.root.option_add("*Foreground", "white")
		#将应用显示到任务栏，图标为，使用windows api
		self.setup()

	def move_window_keydown(self, event):
		# 计算鼠标相对于窗口左上角的偏移量
		self.x_offset = event.x
		self.y_offset = event.y
		self.moved = True
		self.root.attributes("-alpha", 0.5)  # 设置窗口透明度

	def move_window_keyup(self, event):
		# 计算窗口的新位置
		if self.moved:
			self.moved = False
			new_x_root = event.x_root - self.x_offset
			new_y_root = event.y_root - self.y_offset
			self.root.geometry(f"+{new_x_root}+{new_y_root - 20}")
			self.root.attributes("-alpha", 1)  # 设置窗口透明度

	def setup(self):
		# 设置画布和其他UI组件
		self.font_size = 16
		self.font_family = "Arial"
		self.color = "black"
		self.color_1 = "white"
		self.available_fonts = self.root.tk.call("font", "families")
		self.fill = False
		self.size = 5
		self.x1, self.y1 = None, None
		self.points = []  # 用于保存所有坐标点
		self.canvas_image = None
		self.canvas = tk.Canvas(self.root, bg="white", width=700, height=500)
		self.canvas.pack(expand=False, anchor=tk.CENTER)

		# 其他UI组件的设置
		# 如菜单栏、工具栏、颜色选择器等
		self.setup_menu()
		self.setup_toolbar()

	def setup_menu(self):
		# 设置菜单栏
		menubar = tk.Menu(self.root, bg="#323233", fg="white", activebackground="#1E1E1E", activeforeground="white", activeborderwidth=0, borderwidth=0, relief="flat")
		self.root.config(menu=menubar)

		# 文件菜单
		file_menu = tk.Menu(menubar, tearoff=0, bg="#323233", fg="white", activebackground="#1E1E1E", activeforeground="white", activeborderwidth=0, borderwidth=0, relief="flat")
		file_menu.add_command(label="新建", command=self.new_file)
		file_menu.add_command(label="打开", command=self.open_file)
		file_menu.add_command(label="保存", command=self.save_file)
		file_menu.add_separator()
		file_menu.add_command(label="退出", command=self.root.quit)
		menubar.add_cascade(label="文件", menu=file_menu)
		
		#画图菜单
		draw_menu = tk.Menu(menubar, tearoff=0, bg="#323233", fg="white", activebackground="#1E1E1E", activeforeground="white", activeborderwidth=0, borderwidth=0, relief="flat")
		draw_menu.add_command(label="(空)", command=self.clear_bind)
		draw_menu.add_command(label="画笔", command=self.paint)
		draw_menu.add_command(label="橡皮擦", command=self.eraser)
		draw_menu.add_command(label="矩形", command=self.rectangle)
		draw_menu.add_command(label="三角形", command=self.triangle)
		draw_menu.add_command(label="椭圆形", command=self.circle)
		draw_menu.add_command(label="文本", command=self.text)
		menubar.add_cascade(label="画图", menu=draw_menu)

		# 帮助菜单
		help_menu = tk.Menu(menubar, tearoff=0, bg="#323233", fg="white", activebackground="#1E1E1E", activeforeground="white", activeborderwidth=0, borderwidth=0, relief="flat")
		help_menu.add_command(label="关于", command=self.about)
		menubar.add_cascade(label="帮助", menu=help_menu)

		# 其他菜单
		# ...

		self.menubar = menubar

	def setup_toolbar(self):
		# 设置工具栏
		toolbar = tk.Frame(self.root)
		toolbar.pack(side=tk.BOTTOM, fill=tk.X)

		# 工具栏按钮
		self.color_button = tk.Button(toolbar, text="颜色1", command=self.choose_color)
		self.color_button.pack(side=tk.LEFT)
		self.color_button_1 = tk.Button(toolbar, text="颜色2", command=self.choose_color1)
		self.color_button_1.pack(side=tk.LEFT)
		self.color_button_2 = tk.Button(toolbar, text="背景颜色", command=self.choose_color2)
		self.color_button_2.pack(side=tk.LEFT)
		self.fill_button = tk.Button(toolbar, text="不填充", command=self.fill_toggle)
		self.fill_button.pack(side=tk.LEFT)
		self.size_label = tk.Button(toolbar, text="大小:5", command=self.choose_size)
		self.size_label.pack(side=tk.LEFT)
		self.font_size_label = tk.Button(toolbar, text="字体大小:16", command=self.choose_font_size)
		self.font_size_label.pack(side=tk.LEFT)
		self.font_family_label = tk.Button(toolbar, text="字体:Arial", command=self.choose_font_family)
		self.font_family_label.pack(side=tk.LEFT)
		self.color_button.config(bg=self.color, fg=self.color_1)
		self.color_button_1.config(bg=self.color_1, fg=self.color)

		# 其他工具栏按钮
		# ...

	def about(self):
		messagebox.showinfo("关于", "©2024 wpaint,版权所有,禁止二次分发。\nDeveloper:wbw121124", parent=self.root, icon=messagebox.INFO, type=messagebox.OK)

	def change_size_bigger(self, event):
		self.size += 1
		self.size_label.config(text="大小:" + str(self.size))
	def change_size_smaller(self, event):
		if self.size > 1:
			self.size -= 1
			self.size_label.config(text="大小:" + str(self.size))
	def fill_toggle(self):
		self.fill = not self.fill
		if self.fill:
			self.fill_button.config(text="填充")
		else:
			self.fill_button.config(text="不填充")
	def inverse_color(self, color):
		# 将颜色字符串转换为 RGB 元组
		rgb = tuple(int(color[i:i+2], 16) for i in (1, 3, 5))

		# 计算反转颜色
		inverse_rgb = tuple(255 - c for c in rgb)

		# 将反转颜色转换为十六进制字符串
		inverse_color = '#{:02x}{:02x}{:02x}'.format(*inverse_rgb)
		return inverse_color

	def choose_color(self):
		# 打开颜色选择器
		color = colorchooser.askcolor()[1]
		if color:
			self.color = color
			self.color_button.config(bg=color, fg=self.inverse_color(color))

	def choose_color1(self):
		# 打开颜色选择器
		color_1 = colorchooser.askcolor()[1]
		if color_1:
			self.color_1 = color_1
			self.color_button_1.config(bg=color_1, fg=self.inverse_color(color_1))

	
	def choose_color2(self):
		# 打开颜色选择器
		color_2 = colorchooser.askcolor()[1]
		if color_2:
			self.canvas.config(bg=color_2)
			self.color_button_2.config(bg=color_2, fg=self.inverse_color(color_2))

	# 其他方法，如打开文件、保存文件、新建文件等
	def new_file(self, event = None):
		# 新建文件逻辑
		x = messagebox.askquestion("新建文件", "确定要新建文件吗？")
		if x == 'yes':
			self.canvas.delete("all")
			self.points = []
			self.canvas_image = None # 回收内存中的图片对象
			self.clear_bind()
			return True
		return False

	def open_file(self, event = None):
		# 打开文件逻辑
		file_path = filedialog.askopenfilename(filetypes=[("Image Files", "*.png;*.jpg;*.jpeg;*.bmp"),("postscript Files", "*.eps;*.ps")])
		if file_path:
			# 加载文件内容到画布
			if self.new_file():
				image = Image.open(file_path)
				x = image.size
				xx = self.canvas.winfo_width()
				xx1 = self.canvas.winfo_height()
				if abs(x[0] / x[1] - xx / xx1) <= 1e-5:
					image = image.resize((xx, xx1))
				self.canvas_image = ImageTk.PhotoImage(image, master=self.canvas) # 需要在内存中保存这个对象，否则会被垃圾回收
				self.canvas.create_image(0, 0, anchor='nw', image=self.canvas_image)

	def save_file(self, event = None):
		# 保存文件逻辑
		self.canvas.postscript(file="temp.eps", colormode='color') # 防止发生意外，先保存为eps文件。有时候asksaveasfilename会卡住
		file_path = filedialog.asksaveasfilename(defaultextension=".png", filetypes=[("Image Files", "*.png")])
		if file_path:
			os.remove("temp.eps")
			self.canvas.postscript(file=file_path+".eps", colormode='color')
			tkcanvas_save.convert_eps_to_png(file_path+".eps", file_path, 500, 700)
			os.remove(file_path+".eps")
		else:
			os.remove("temp.eps")

	def clear_bind(self):
		self.canvas.unbind("<ButtonRelease-1>")
		self.canvas.unbind("<B1-Motion>")
		self.canvas.unbind("<Button-1>")
		self.points = []
	
	def points_clear(self, event):
		self.points = []
	
	def paint(self):
		# 画笔逻辑
		self.clear_bind()
		self.canvas.bind("<ButtonRelease-1>", self.points_clear)
		self.canvas.bind("<B1-Motion>", self.paint_event)
	
	def paint_event(self, event):
		# 画笔事件处理逻辑
		x, y = event.x, event.y
		self.points.append((x, y))
		if len(self.points) > 1:
			self.canvas.create_line(self.points[-2], self.points[-1], fill=self.color, width=self.size, capstyle=tk.ROUND)
	
	def eraser(self):
		# 橡皮擦逻辑
		self.clear_bind()
		self.canvas.bind("<ButtonRelease-1>", self.points_clear)
		self.canvas.bind("<B1-Motion>", self.eraser_event)

	def eraser_event(self, event):
		# 橡皮擦事件处理逻辑
		x, y = event.x, event.y
		self.points.append((x, y))
		if len(self.points) > 1:
			self.canvas.create_line(self.points[-2], self.points[-1], fill='white', width=self.size, capstyle=tk.ROUND)

	def rectangle(self):
		# 矩形逻辑
		self.clear_bind()
		self.canvas.bind("<Button-1>", self.rectangle_event_1)
		self.canvas.bind("<ButtonRelease-1>", self.rectangle_event)

	def rectangle_event_1(self, event):
		self.x1 = event.x
		self.y1 = event.y

	def rectangle_event(self, event):
		self.x2 = event.x
		self.y2 = event.y
		if self.fill:
			self.canvas.create_rectangle(self.x1, self.y1, self.x2, self.y2, outline=self.color, width=self.size, fill=self.color_1, tags="rectangle")
		else:
			self.canvas.create_rectangle(self.x1, self.y1, self.x2, self.y2, outline=self.color, width=self.size, tags="rectangle")
	
	def triangle(self):
		# 三角形逻辑
		self.clear_bind()
		self.canvas.bind("<Button-1>", self.triangle_event_1)
		self.canvas.bind("<ButtonRelease-1>", self.triangle_event)

	def triangle_event_1(self, event):
		self.x1 = event.x
		self.y1 = event.y

	def triangle_event(self, event):
		self.x2 = event.x
		self.y2 = event.y
		tmp = self.x1
		self.x1 = self.x2
		self.x2 = tmp
		tmp = self.y1
		self.y1 = self.y2
		self.y2 = tmp
		if self.fill:
			self.canvas.create_polygon(self.x1, self.y1, self.x2, self.y1, (self.x1 + self.x2) / 2, self.y2, outline=self.color, width=self.size, fill=self.color_1, tags="triangle")
		else:
			self.canvas.create_line(self.x1, self.y1, self.x2, self.y1, fill=self.color, width=self.size, capstyle=tk.ROUND)
			self.canvas.create_line(self.x1, self.y1, (self.x1 + self.x2) / 2, self.y2, fill=self.color, width=self.size, capstyle=tk.ROUND)
			self.canvas.create_line(self.x2, self.y1, (self.x1 + self.x2) / 2, self.y2, fill=self.color, width=self.size, capstyle=tk.ROUND)
	

	def circle(self):
		# 圆形逻辑
		self.clear_bind()
		self.canvas.bind("<Button-1>", self.circle_event_1)
		self.canvas.bind("<ButtonRelease-1>", self.circle_event)

	def circle_event_1(self, event):
		self.x1 = event.x
		self.y1 = event.y

	def circle_event(self, event):
		self.x2 = event.x
		self.y2 = event.y
		if self.fill:
			self.canvas.create_oval(self.x1, self.y1, self.x2, self.y2, outline=self.color, width=self.size, fill=self.color_1, tags="circle")
		else:
			self.canvas.create_oval(self.x1, self.y1, self.x2, self.y2, outline=self.color, width=self.size, tags="circle")

	def text(self):
		# 文字逻辑
		self.clear_bind()
		self.canvas.bind("<ButtonRelease-1>", self.text_event)

	def text_event(self, event):
		self.x1 = event.x
		self.y1 = event.y
		self.text1 = simpledialog.askstring("文字", "请输入文字：")
		if self.text1:
			#设置[self.x1,self.y1]为文本左上角
			self.canvas.create_text(self.x1, self.y1, text=self.text1, fill=self.color, font=(self.font_family, int(self.font_size)), anchor='nw')

	def choose_font_size(self):
		font_size = simpledialog.askinteger("字体大小", "请输入字体大小:", parent=self.root, minvalue=1, maxvalue=100)
		if font_size:
			self.font_size = font_size
			self.font_size_label.config(text="字体大小:" + str(self.font_size))

	def check_font_family(self, font_family):
		# 检测系统是否包含字体
		if font_family in self.available_fonts:
			return True
		else:
			messagebox.showerror("错误", "系统不支持该字体，请选择其他字体。", parent=self.root)
			return False

	def choose_font_family(self):
		font_family = simpledialog.askstring("字体", "请输入字体:", parent=self.root)
		# 检测系统是否包含字体
		if font_family:
			if self.check_font_family(font_family):
				self.font_family = font_family
				self.font_family_label.config(text="字体:" + str(self.font_family))

	def choose_size(self):
		# 选择画笔大小逻辑
		size = simpledialog.askinteger("画笔大小", "请输入画笔大小：")
		if size:
			self.size = size
			self.size_label.config(text="大小:" + str(size))

	# 其他方法，‌如颜色选择、‌画笔工具、‌几何图形、‌填充、‌橡皮擦、‌保存、‌打开等
	# ...

if __name__ == "__main__":
	root = tk.Tk()
	app = wpaint(root)
	root.mainloop()
