
//const fontFace = new FontFace('MyCustomFont', 'url("~/long-cang-webfont/style.css")');

// 加载字体
//fontFace.load().then(font => {
	// 当字体加载完成后，将其安装到字体集合中
	//document.fonts.add(font);

	// 现在可以使用这个字体了
	//document.body.style.fontFamily = 'MyCustomFont';
//});

// 定义一个函数用来创建和插入弹幕
function createDanmu(text) {
	// 创建一个span元素
	var danmu = document.createElement("span");
	// 设置其文本内容为参数值
	danmu.innerText = text;
	// 设置其类名为danmu
	danmu.className = "danmu";

	// 设置其随机的高度
	danmu.style.top = Math.random() * (container.clientHeight - danmu.clientHeight) + "px";
	// 设置其随机的颜色
	danmu.style.color = "rgb(" + Math.floor(Math.random() * 256) + "," + Math.floor(Math.random() * 256) + "," + Math.floor(Math.random() * 256) + ")";

	//danmu.style.fontFamily = "Long Cang Regular";

	//danmu.style.fontSize = "30px";
	// 将span元素插入到容器元素中
	container.appendChild(danmu);
	// 使用CSS动画来让span元素从右向左移动
	var tt1 = (5 + Math.random() * 5);
	danmu.style.animation = "move " + tt1 + "s linear forwards";
	setTimeout(() => { danmu.remove() }, tt1 * 1000);
}

// 获取容器元素
var container = document.getElementById("main");
// 定义一个数组用来存放一些弹幕内容
var texts = ["Where there is a will, there is a way.", "Hope for the best, plan for the worst.", "Wisdom is more precious than wealth.", "Action speaks louder than words.", "Time and tide wait for no man.",
	"Experience is the best teacher.", "All that glitters is not gold.", "Failure is the mother of success.", "A journey of a thousand miles begins with a single step.", "The early bird catches the worm.",
	"Nothing is impossible to a willing heart.", "Don't put off till tomorrow what you can do today.", "Every cloud has a silver lining.", "Haste makes waste.", "Better late than never.",
	"Honesty is the best policy.", "Live and learn.", "Health is wealth.", "First impressions are the most lasting.", "One man's meat is another man's poison.", "A friend in need is a friend indeed.",
	"Life is not all roses.", "Think twice before you act.", "Pride goes before a fall.", "Two heads are better than one.", "Well begun is half done.", "To be, or not to be, that is the question.",
	"Action speak louder than words.", "An idle youth,a needy age.", "All is well that ends well.", "Misfortune is a good teacher.", "Faith can move mountains.", "He that promises too much means nothing.",
	"He would climb the ladder must begin at the bottom.", "If you are not inside a house, you don not know about its leaking.", "It is never too late to mend.", "Yesterday will not be called again.",
	"Men will die for wealth, as bird for food.", "Success belongs to the persevering.", "The man who has made up his mind to win will never say \"impossible\".", "Nothing venture, nothing have.",
	"If you fail, don't forget to learn your lesson.", "No pain, no gain", "We can only move forward, forward, by any means necessary to move forward.", "Your fearlessness comes from ignorance.",
	"Intelligence lies in diligence, and genius in accumulation.", "Never be satisfied with learning; never be tired of teaching.", "Books are the ladder of human progress.",
	"An inch of time is an inch of gold, but you can't buy time with gold."];
// 定义一个定时器，每隔一秒创建并插入一条弹幕
setInterval(function () {
	// 随机选择一个弹幕内容
	var text = texts[Math.floor(Math.random() * texts.length)];
	// 调用函数创建并插入弹幕
	createDanmu(text);
}, 7000);