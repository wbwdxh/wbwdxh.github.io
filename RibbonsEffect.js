/**
 * Minified by jsDelivr using Terser v5.3.5.
 * Original file: /gh/BNDong/Cnblogs-Theme-SimpleMemory@1.3.4/src/script/RibbonsEffect.js
 *
 * Do NOT use SRI with dynamically generated files! More information: https://www.jsdelivr.com/using-sri-with-dynamic-files
 */
"object" == typeof window && (window.Ribbons = function () {
	var t = window
		, i = document.body
		, n = document.documentElement
		, o = function () {
			if (1 === arguments.length) {
				if (Array.isArray(arguments[0])) {
					var t = Math.round(o(0, arguments[0].length - 1));
					return arguments[0][t]
				}
				return o(0, arguments[0])
			}
			return 2 === arguments.length ? Math.random() * (arguments[1] - arguments[0]) + arguments[0] : 0
		}
		, s = function (o) {
			var s = Math.max(0, t.innerWidth || n.clientWidth || i.clientWidth || 0)
				, h = Math.max(0, t.innerHeight || n.clientHeight || i.clientHeight || 0);
			return {
				width: s,
				height: h,
				ratio: s / h,
				centerx: s / 2,
				centery: h / 2,
				scrollx: Math.max(0, t.pageXOffset || n.scrollLeft || i.scrollLeft || 0) - (n.clientLeft || 0),
				scrolly: Math.max(0, t.pageYOffset || n.scrollTop || i.scrollTop || 0) - (n.clientTop || 0)
			}
		}
		, h = function (t, i) {
			this.x = 0,
				this.y = 0,
				this.set(t, i)
		};
	h.prototype = {
		constructor: h,
		set: function (t, i) {
			this.x = t || 0,
				this.y = i || 0
		},
		copy: function (t) {
			return this.x = t.x || 0,
				this.y = t.y || 0,
				this
		},
		multiply: function (t, i) {
			return this.x *= t || 1,
				this.y *= i || 1,
				this
		},
		divide: function (t, i) {
			return this.x /= t || 1,
				this.y /= i || 1,
				this
		},
		add: function (t, i) {
			return this.x += t || 0,
				this.y += i || 0,
				this
		},
		subtract: function (t, i) {
			return this.x -= t || 0,
				this.y -= i || 0,
				this
		},
		clampX: function (t, i) {
			return this.x = Math.max(t, Math.min(this.x, i)),
				this
		},
		clampY: function (t, i) {
			return this.y = Math.max(t, Math.min(this.y, i)),
				this
		},
		flipX: function () {
			return this.x *= -1,
				this
		},
		flipY: function () {
			return this.y *= -1,
				this
		}
	};
	var e = function (t) {
		this._canvas = null,
			this._context = null,
			this._sto = null,
			this._width = 0,
			this._height = 0,
			this._scroll = 0,
			this._ribbons = [],
			this._options = {
				colorSaturation: "80%",
				colorBrightness: "60%",
				colorAlpha: .65,
				colorCycleSpeed: 6,
				verticalPosition: "center",
				horizontalSpeed: 150,
				ribbonCount: 3,
				strokeSize: 0,
				parallaxAmount: -.5,
				animateSections: !0
			},
			this._onDraw = this._onDraw.bind(this),
			this._onResize = this._onResize.bind(this),
			this._onScroll = this._onScroll.bind(this),
			this.setOptions(t),
			this.init()
	};
	return e.prototype = {
		constructor: e,
		setOptions: function (t) {
			if ("object" == typeof t)
				for (var i in t)
					t.hasOwnProperty(i) && (this._options[i] = t[i])
		},
		init: function () {
			try {
				this._canvas = document.createElement("canvas"),
					this._canvas.style.display = "block",
					this._canvas.style.position = "fixed",
					this._canvas.style.margin = "0",
					this._canvas.style.padding = "0",
					this._canvas.style.border = "0",
					this._canvas.style.outline = "0",
					this._canvas.style.left = "0",
					this._canvas.style.top = "0",
					this._canvas.style.width = "100%",
					this._canvas.style.height = "100%",
					this._canvas.style["z-index"] = "-1",
					this._canvas.id = "bgCanvas",
					this._onResize(),
					this._context = this._canvas.getContext("2d"),
					this._context.clearRect(0, 0, this._width, this._height),
					this._context.globalAlpha = this._options.colorAlpha,
					window.addEventListener("resize", this._onResize),
					window.addEventListener("scroll", this._onScroll),
					document.body.appendChild(this._canvas)
			} catch (t) {
				return void console.warn("Canvas Context Error: " + t.toString())
			}
			this._onDraw()
		},
		addRibbon: function () {
			var t = Math.round(o(1, 9)) > 5 ? "right" : "left"
				, i = 1e3
				, n = 200
				, s = 0 - n
				, e = this._width + n
				, a = 0
				, r = 0
				, l = "right" === t ? s : e
				, c = Math.round(o(0, this._height));
			/^(top|min)$/i.test(this._options.verticalPosition) ? c = 0 + n : /^(middle|center)$/i.test(this._options.verticalPosition) ? c = this._height / 2 : /^(bottom|max)$/i.test(this._options.verticalPosition) && (c = this._height - n);
			for (var _ = [], p = new h(l, c), d = new h(l, c), u = null, b = Math.round(o(0, 360)), f = 0; !(i <= 0);) {
				if (i--,
					a = Math.round((1 * Math.random() - .2) * this._options.horizontalSpeed),
					r = Math.round((1 * Math.random() - .5) * (.25 * this._height)),
					(u = new h).copy(d),
					"right" === t) {
					if (u.add(a, r),
						d.x >= e)
						break
				} else if ("left" === t && (u.subtract(a, r),
					d.x <= s))
					break;
				_.push({
					point1: new h(p.x, p.y),
					point2: new h(d.x, d.y),
					point3: u,
					color: b,
					delay: f,
					dir: t,
					alpha: 0,
					phase: 0
				}),
					p.copy(d),
					d.copy(u),
					f += 4,
					b += this._options.colorCycleSpeed
			}
			this._ribbons.push(_)
		},
		_drawRibbonSection: function (t) {
			if (t) {
				if (t.phase >= 1 && t.alpha <= 0)
					return !0;
				if (t.delay <= 0) {
					if (t.phase += .02,
						t.alpha = 1 * Math.sin(t.phase),
						t.alpha = t.alpha <= 0 ? 0 : t.alpha,
						t.alpha = t.alpha >= 1 ? 1 : t.alpha,
						this._options.animateSections) {
						var i = .1 * Math.sin(1 + t.phase * Math.PI / 2);
						"right" === t.dir ? (t.point1.add(i, 0),
							t.point2.add(i, 0),
							t.point3.add(i, 0)) : (t.point1.subtract(i, 0),
								t.point2.subtract(i, 0),
								t.point3.subtract(i, 0)),
							t.point1.add(0, i),
							t.point2.add(0, i),
							t.point3.add(0, i)
					}
				} else
					t.delay -= .5;
				var n = this._options.colorSaturation
					, o = this._options.colorBrightness
					, s = "hsla(" + t.color + ", " + n + ", " + o + ", " + t.alpha + " )";
				this._context.save(),
					0 !== this._options.parallaxAmount && this._context.translate(0, this._scroll * this._options.parallaxAmount),
					this._context.beginPath(),
					this._context.moveTo(t.point1.x, t.point1.y),
					this._context.lineTo(t.point2.x, t.point2.y),
					this._context.lineTo(t.point3.x, t.point3.y),
					this._context.fillStyle = s,
					this._context.fill(),
					this._options.strokeSize > 0 && (this._context.lineWidth = this._options.strokeSize,
						this._context.strokeStyle = s,
						this._context.lineCap = "round",
						this._context.stroke()),
					this._context.restore()
			}
			return !1
		},
		_onDraw: function () {
			for (var t = 0, i = this._ribbons.length; t < i; ++t)
				this._ribbons[t] || this._ribbons.splice(t, 1);
			this._context.clearRect(0, 0, this._width, this._height);
			for (var n = 0; n < this._ribbons.length; ++n) {
				for (var o = this._ribbons[n], s = o.length, h = 0, e = 0; e < s; ++e)
					this._drawRibbonSection(o[e]) && h++;
				h >= s && (this._ribbons[n] = null)
			}
			this._ribbons.length < this._options.ribbonCount && this.addRibbon(),
				requestAnimationFrame(this._onDraw)
		},
		_onResize: function (t) {
			var i = s(t);
			this._width = i.width,
				this._height = i.height,
				this._canvas && (this._canvas.width = this._width,
					this._canvas.height = this._height,
					this._context && (this._context.globalAlpha = this._options.colorAlpha))
		},
		_onScroll: function (t) {
			var i = s(t);
			this._scroll = i.scrolly
		}
	},
		e
}()),
	new Ribbons({
            colorSaturation: "60%",
            colorBrightness: "50%",
            colorAlpha: .5,
            colorCycleSpeed: 5,
            verticalPosition: "random",
            horizontalSpeed: 200,
            ribbonCount: 3,
            strokeSize: 0,
            parallaxAmount: -.2,
            animateSections: true
        });
//# sourceMappingURL=/sm/c1df5c1b1d16877c7a2ef95f23335a100e5e7a2f76371ded79ec481b65ab6113.map
