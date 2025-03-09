var the_end = document.createElement("pre");
the_end.id = "the-end";
//$.post("/minecraft-font/end.txt").done((data) => { the_end.innerHTML = data });
fetch('/minecraft-font/end.txt')
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.text();
    })
    .then(text => {
        console.log(text);
        the_end.innerHTML = text;
        // 使用正则表达式替换包含'§3'的行
        the_end.innerHTML = the_end.innerHTML.replace(/(.*?§3.*?)\n/g, '<span class="q" id="q">$1</span>\n').replace(/§3/g, '');
        the_end.innerHTML = the_end.innerHTML.replace(/(.*?§2.*?)\n/g, '<span class="a" id="a">$1</span>\n').replace(/§2/g, '');
        the_end.innerHTML = the_end.innerHTML.replace(/PLAYERNAME/g, '[playername]');
        the_end.innerHTML = the_end.innerHTML.replace(/§f§k§a§b/g, '<span style=\"color:white\">[scrambled]</span>');
        var style = document.createElement("style");
        var t = document.createTextNode(".a {color: #00AA00 !important} .q {color: #00AAAA !important} #the-end,.the-end {background:url(/minecraft-font/dirt.png) !important;background-size:calc(100%/6) !important;image-rendering: pixelated;white-space: pre-wrap;font-size:calc(width/4)}");
        style.appendChild(t);
        the_end.appendChild(style);
        document.getElementById("theend").appendChild(the_end);
        if (document.getElementById("playername").textContent != null && document.getElementById("playername").textContent != "")
            document.getElementById("the-end").innerHTML = document.getElementById("the-end").innerHTML.replace(/\[playername\]/g, document.getElementById("playername").textContent);
    });