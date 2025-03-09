<canvas id="fibodraw"></canvas>
<script>
// 不用临时变量进行两个值的变换
            function swap(a, b) {
                a = a + b;
                b = a - b;
                a = a - b;
                console.log(a, b)
            }
            swap(4, 5);


            // 斐波那契数列的获取，长度为11个；
            function fiboArr(len) {
                let fiboArr = [];
                for (var i = 0; i < len; i++) {
                    if (i <= 1) {
                        fiboArr.push(i);
                    } else {
                        fiboArr.push(fiboArr[i - 1] + fiboArr[i - 2]);
                    }
                }
                return fiboArr;
            }
            console.log(fiboArr(11));

            // 斐波那契曲线
            let canvas = document.getElementById('fibodraw')
            canvas.width = 600
            canvas.height = 480
            let coor = {
                x: 300,
                y: 240,
            }
            //先取背景图中的中间点作为一开始的圆点

            let ctx = canvas.getContext('2d')
            //获取该canvas的2D绘图环境对象

            /*
            绘制曲线方法
            @param prevR 这是斐波那契数列中前一位的数值，也就是上一截曲线的半径
            @param n 这是斐波那契数列中的下标
            @param r 这是斐波那契数列当前下标的值，也就是将画曲线的半径
            */
           
           /*圆心变化规律
           ctx.arc(300, 240, 5, Math.PI, 0.5 * Math.PI, true);//1
           ctx.arc(300, 235, 10, Math.PI * 0.5, 0, true);//2
           ctx.arc(295, 235, 15, 0, Math.PI * 1.5, true);//3
           ctx.arc(295, 245, 25, Math.PI * 1.5, Math.PI, true);//4
           ctx.arc(310, 245, 40, Math.PI, Math.PI * 0.5, true);
           ctx.arc(310, 220, 65, Math.PI * 0.5, 0, true);
           ctx.arc(270, 220, 105, 0, Math.PI * 1.5, true);
           ctx.arc(270, 285, 170, Math.PI * 1.5, Math.PI, true);
           */
           
           
            function draw(prevR, n, r) {
                let radius = r * 5;
                //五倍半径画，不然太小了

                let startAngle = Math.PI
                let endAngle = Math.PI * 0.5
                //每个半径只画1/4个圆，所以开始角度和结束角度刚好相差 1/4 * PI

                let anticlockwise = true
                //设置为逆时针方向画

                //改变圆点坐标、开始角度和结束角度
                //第三个元素的圆点坐标、开始角度和结束角度上面已经给出，所以从第四个元素开始改变圆点坐标、开始角度和结束角度，也就是从n > 2开始
                if (n > 2) {
                    //下面坐标的改变可以参考上面的图和直接用canvas画的代码。
                    switch (n % 4) {
                        case 0:
                            coor.x = coor.x + (5 * prevR) - radius
                            startAngle = 0
                            endAngle = Math.PI * 1.5
                            break;
                        case 1:
                            coor.y = coor.y - (5 * prevR) + radius
                            startAngle = Math.PI * 1.5
                            endAngle = Math.PI
                            break;
                        case 2:
                            coor.x = coor.x - (5 * prevR) + radius
                            startAngle = Math.PI
                            endAngle = Math.PI * 0.5
                            break;
                        case 3:
                            coor.y = coor.y + (5 * prevR) - radius
                            startAngle = Math.PI * 0.5
                            endAngle = 0
                            break;
                    }
                }
                ctx.beginPath();
                ctx.arc(coor.x, coor.y, radius, startAngle, endAngle, anticlockwise);
                ctx.lineWidth = 1;
                ctx.strokeStyle = '#000';
                ctx.stroke();
            }
            //获取斐波那契数列
            function getFibonacci(n) {
                let arr = []
                let i = 0
                while (i < n) {
                    if (i <= 1) {
                        arr.push(i)
                    } else {
                        arr.push(arr[i - 1] + arr[i - 2])
                    }
                    i++
                }
                return arr
            }
            let fibonacci = getFibonacci(10);
            for (let i = 0; i < fibonacci.length; i++) {
                //从第三个元素开始画，符合斐波那契数列的规律
                if (i >= 2) {
                    draw(fibonacci[i - 1], i, fibonacci[i])
                }
            }
</script>
<canvas id="snow"></canvas>

<script type="text/javascript">

(function(){

var canvas = document.getElementById("snow");

canvas.width = 180;

canvas.height = 200;

var c = canvas.getContext("2d");

var deg = Math.PI/180;

c.beginPath();

function snowFlake(c, n, x, y, len){

c.save();

c.translate(x,y);

c.moveTo(0,0);

leg(n);

c.rotate(-120*deg);

leg(n);

c.rotate(-120*deg);

leg(n);

c.closePath();

c.restore();

function leg(n){

c.save();

if(n === 0){

c.lineTo(len, 0);

}else{

c.scale(1/3,1/3);

leg(n-1);

c.rotate(60*deg);

leg(n-1);

c.rotate(-120*deg);

leg(n-1);

c.rotate(60*deg);

leg(n-1);

}

c.restore();

c.translate(len, 0);

}

}

snowFlake(c, 4, 0, 115, 125);  //4级雪花看起来就像一朵真雪花了

c.stroke();

})();

</script>
<canvas id="cantest1"></canvas>
<script language="javascript">
    function drawq(){
        var can = document.getElementById("cantest1");
        if(can.getContext){
            can.height = can.height;
            var ctx = can.getContext("2d");
            ctx.strokeStyle = "#000";
            can.width = 500;

can.height = 500;
            var depth = parseInt(8); //绘制维度

            Sierpinski(ctx, 250.00, 20.00, 0.00, 500 * Math.sin(Math.PI / 3) + 20, 500.00, 500 * Math.sin(Math.PI / 3) + 20, depth , 0);
        }else{
            alert("不支持Canvas");
        }
    }
    drawq();
    function Sierpinski(ctx, x1, y1,
                             x2, y2,
                             x3, y3,
                             depth,  //维度
                             nowDepth){ //当前维度
        nowDepth = nowDepth + 1;

        if(depth == 0){
            return false;
        }

        if(depth == nowDepth){
            ctx.beginPath();
            /**if(document.getElementById("cbox").checked){
                ctx.fillStyle = getColor();
            }else*/{
                 ctx.fillStyle = "#000";
            }
            ctx.moveTo(x1, y1);
            ctx.lineTo(x2, y2);
            ctx.lineTo(x3, y3);
            ctx.fill();  //填充块
            return false;
        }

        var x4 = x2 + (x3 - x2) / 2;
        var x5 = x2 + (x3 - x2) / 4;
        var x6 = x2 + (x3 - x2) * 3 / 4;
        var y4 = 0.00;
        var y5 = 0.00;
        var y6 = 0.00;
       
        y4 = y1 + (x3 - x2) * Math.sin(Math.PI / 3);
        y5 = y1 + (x3 - x2) / 2 * Math.sin(Math.PI / 3);
        y6 = y1 + (x3 - x2) / 2 * Math.sin(Math.PI / 3);
       
        Sierpinski(ctx, x1, y1, x5, y5, x6, y6, depth, nowDepth);
        Sierpinski(ctx, x5, y5, x2, y2, x4, y4, depth, nowDepth);
        Sierpinski(ctx, x6, y6, x4, y4, x3, y3, depth, nowDepth);
    }

    function getColor(){
        return '#'+(Math.random()*0xffffff<<0).toString(16);
    }
</script>