/* =====================================================插件开始========================================================== */
$.fn.extend({//添加滚轮事件
    mousewheel:function(Func){
        return this.each(function(){
            var _self = this;
            _self.D = 0;//滚动方向
            if($.browser.msie||$.browser.safari){
                _self.onmousewheel=function(){_self.D = event.wheelDelta;event.returnValue = false;Func && Func.call(_self);};
            }else{
                _self.addEventListener("DOMMouseScroll",function(e){
                    _self.D = e.detail>0?-1:1;
                    e.preventDefault();
                    Func && Func.call(_self);
                },false);
            }
        });
    }
});
$.fn.extend({
    jscroll:function(j){
        return this.each(function(){
            j = j || {}
            j.Bar = j.Bar||{};//2级对象
            j.Btn = j.Btn||{};//2级对象
            j.Bar.Bg = j.Bar.Bg||{};//3级对象
            j.Bar.Bd = j.Bar.Bd||{};//3级对象
            j.Btn.uBg = j.Btn.uBg||{};//3级对象
            j.Btn.dBg = j.Btn.dBg||{};//3级对象
            var jun = { W:"15px"
                ,BgUrl:""
                ,BtnUrl:""
                ,Bg:"#efefef"
                ,Bar:{  Pos:"up"
                    ,Bd:{Out:"#b5b5b5",Hover:"#ccc"}
                    ,Bg:{Out:"#fff",Hover:"#fff",Focus:"orange"}}
                ,Btn:{  btn:true
                    ,uBg:{Out:"#ccc",Hover:"#fff",Focus:"orange"}
                    ,dBg:{Out:"#ccc",Hover:"#fff",Focus:"orange"}}
                ,Fn:function(){}}
            j.W = j.W||jun.W;
            j.BgUrl = j.BgUrl||jun.BgUrl;
            j.BtnUrl = j.BtnUrl||jun.BtnUrl;
            j.Bg = j.Bg||jun.Bg;
            j.Bar.Pos = j.Bar.Pos||jun.Bar.Pos;
            j.Bar.Bd.Out = j.Bar.Bd.Out||jun.Bar.Bd.Out;
            j.Bar.Bd.Hover = j.Bar.Bd.Hover||jun.Bar.Bd.Hover;
            j.Bar.Bg.Out = j.Bar.Bg.Out||jun.Bar.Bg.Out;
            j.Bar.Bg.Hover = j.Bar.Bg.Hover||jun.Bar.Bg.Hover;
            j.Bar.Bg.Focus = j.Bar.Bg.Focus||jun.Bar.Bg.Focus;
            j.Btn.btn = j.Btn.btn!=undefined?j.Btn.btn:jun.Btn.btn;
            j.Btn.uBg.Out = j.Btn.uBg.Out||jun.Btn.uBg.Out;
            j.Btn.uBg.Hover = j.Btn.uBg.Hover||jun.Btn.uBg.Hover;
            j.Btn.uBg.Focus = j.Btn.uBg.Focus||jun.Btn.uBg.Focus;
            j.Btn.dBg.Out = j.Btn.dBg.Out||jun.Btn.dBg.Out;
            j.Btn.dBg.Hover = j.Btn.dBg.Hover||jun.Btn.dBg.Hover;
            j.Btn.dBg.Focus = j.Btn.dBg.Focus||jun.Btn.dBg.Focus;
            j.Fn = j.Fn||jun.Fn;
            var _self = this;
            var Stime,Sp=0,Isup=0;
            $(_self).css({overflow:"hidden",position:"relative",padding:"0px"});
            var dw = $(_self).width(), dh = $(_self).height()-1;
            var sw = j.W ? parseInt(j.W) : 21;
            var sl = dw - sw
            var bw = j.Btn.btn==true ? sw : 0;
            if($(_self).children(".jscroll-c").height()==null){//存在性检测
                $(_self).wrapInner("<div class='jscroll-c' style='top:0px;z-index:9999;zoom:1;position:relative'></div>");
                $(_self).children(".jscroll-c").prepend("<div style='height:0px;overflow:hidden'></div>");
                $(_self).append("<div class='jscroll-e' unselectable='on' style=' height:100%;top:0px;right:0;-moz-user-select:none;position:absolute;overflow:hidden;z-index:10000;'><div class='jscroll-u' style='position:absolute;top:0px;width:100%;left:0;background:blue;overflow:hidden'></div><div class='jscroll-h'  unselectable='on' style='position:absolute;left:0;-moz-user-select:none;'></div><div class='jscroll-d' style='position:absolute;bottom:0px;width:100%;left:0;background:blue;overflow:hidden'></div></div>");
            }
            var jscrollc = $(_self).children(".jscroll-c");
            var jscrolle = $(_self).children(".jscroll-e");
            var jscrollh = jscrolle.children(".jscroll-h");
            var jscrollu = jscrolle.children(".jscroll-u");
            var jscrolld = jscrolle.children(".jscroll-d");
            if($.browser.msie){document.execCommand("BackgroundImageCache", false, true);}
            jscrollc.css({"padding-right":sw+3});
            jscrolle.css({width:sw,background:j.Bg,"background-image":j.BgUrl});
            jscrollh.css({top:bw,"background-image":j.BtnUrl});
            jscrollu.css({height:bw,background:j.Btn.uBg.Out,"background-image":j.BgUrl});
            jscrolld.css({height:bw,background:j.Btn.dBg.Out,"background-image":j.BgUrl});
            /*jscrollu.hover(function(){if(Isup==0)$(this).css({background:j.Btn.uBg.Hover,"background-image":j.BgUrl})},function(){if(Isup==0)$(this).css({background:j.Btn.uBg.Out,"background-image":j.BgUrl})})
            jscrolld.hover(function(){if(Isup==0)$(this).css({background:j.Btn.dBg.Hover,"background-image":j.BgUrl})},function(){if(Isup==0)$(this).css({background:j.Btn.dBg.Out,"background-image":j.BgUrl})})*/
            var sch = jscrollc.height();

            //var sh = Math.pow(dh,2) / sch ;//Math.pow(x,y)x的y次方
            var sh = ((dh-2*bw)*dh / sch);// / (((dh-2*bw)*dh / sch) / bw);
            /*
                dw 内容显示宽度
                dh 内容显示高度
                sw 滚动条宽度
                sl 显示宽度-滚动条宽度
                bw 按钮宽度
                sch 内容实际高度
                sh 按钮应该的高度
            */
            if(sh<10){sh=10}
            var wh = sh/6//滚动时候跳动幅度
            //	sh = parseInt(sh);
            var curT = 0,allowS=false;
            //jscrollh.height(sh);
            if(sch<=dh){jscrollc.css({padding:0});jscrolle.css({display:"none"})}else{allowS=true;}
            if(j.Bar.Pos!="up"){
                curT=dh-sh-bw;
                setT();
            }
            jscrollh.bind("mousedown",function(e){
                j['Fn'] && j['Fn'].call(_self);
                Isup=1;
                var pageY = e.pageY ,t = parseInt($(this).css("top"));
                $(document).mousemove(function(e2){
                    curT =t+ e2.pageY - pageY;//pageY浏览器可视区域鼠标位置，screenY屏幕可视区域鼠标位置
                    setT();
                });
                $(document).mouseup(function(){
                    Isup=0;
                    $(document).unbind();
                });
                return false;
            });
            jscrollu.bind("mousedown",function(e){
                j['Fn'] && j['Fn'].call(_self);
                Isup=1;
                jscrollu.css({background:j.Btn.uBg.Focus,"background-image":j.BgUrl})
                _self.timeSetT("u");
                $(document).mouseup(function(){
                    Isup=0;
                    jscrollu.css({background:j.Btn.uBg.Out,"background-image":j.BgUrl})
                    $(document).unbind();
                    clearTimeout(Stime);
                    Sp=0;
                });
                return false;
            });
            jscrolld.bind("mousedown",function(e){
                j['Fn'] && j['Fn'].call(_self);
                Isup=1;
                jscrolld.css({background:j.Btn.dBg.Focus,"background-image":j.BgUrl})
                _self.timeSetT("d");
                $(document).mouseup(function(){
                    Isup=0;
                    jscrolld.css({background:j.Btn.dBg.Out,"background-image":j.BgUrl})
                    $(document).unbind();
                    clearTimeout(Stime);
                    Sp=0;
                });
                return false;
            });
            _self.timeSetT = function(d){
                var self=this;
                if(d=="u"){curT-=wh;}else{curT+=wh;}
                setT();
                Sp+=2;
                var t =500 - Sp*50;
                if(t<=0){t=0};
                Stime = setTimeout(function(){self.timeSetT(d);},t);
            }
            jscrolle.bind("mousedown",function(e){
                j['Fn'] && j['Fn'].call(_self);
                curT = curT + e.pageY - jscrollh.offset().top - sh/2;
                asetT();
                return false;
            });
            function asetT(){
                if(curT<bw){curT=bw;}
                if(curT>dh-sh-bw){curT=dh-sh-bw;}
                jscrollh.stop().animate({top:curT},100);
                var scT = -((curT-bw)*sch/(dh-2*bw));
                jscrollc.stop().animate({top:scT},1000);
            };
            /*
                dw 内容显示宽度
                dh 内容显示高度
                sw 滚动条宽度
                sl 显示宽度-滚动条宽度
                bw 按钮宽度
                sch 内容实际高度
                sh 按钮应该的高度
            */
            function setT(){
                if(curT<bw){curT=bw;}
                tempCurT = curT;
                if(curT>dh-(sh/bw)-bw){curT=dh-(sh/bw)-bw;}
                jscrollh.css({top:curT});
                if(tempCurT>dh-sh-bw){tempCurT=dh-sh-bw;}
                var scT = -((tempCurT-bw)*sch/(dh-2*bw));
                jscrollc.css({top:scT});
            };
            $(_self).mousewheel(function(){
                if(allowS!=true) return;
                j['Fn'] && j['Fn'].call(_self);
                if(this.D>0){curT-=wh;}else{curT+=wh;};
                setT();
            })
        });
    }
});


/**
 * Farbtastic Color Picker 1.2
 * ? 2008 Steven Wittens
 *
 * This program is free software; you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation; either version 2 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program; if not, write to the Free Software
 * Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston, MA  02110-1301  USA
 */

jQuery.fn.farbtastic = function (callback) {
    $.farbtastic(this, callback);
    return this;
};

jQuery.farbtastic = function (container, callback) {
    var container = $(container).get(0);
    return container.farbtastic || (container.farbtastic = new jQuery._farbtastic(container, callback));
}

jQuery._farbtastic = function (container, callback) {
    // Store farbtastic object
    var fb = this;
    var bw = callback; //保存原始字符

    // Insert markup
    $(container).html('<div class="farbtastic"><div class="color"></div><div class="wheel"></div><div class="overlay"></div><div class="h-marker marker"></div><div class="sl-marker marker"></div></div>');
    var e = $('.farbtastic', container);
    fb.wheel = $('.wheel', container).get(0);
    // Dimensions
    fb.radius = 84;
    fb.square = 100;
    fb.width = 194;

    // Fix background PNGs in IE6
    if (navigator.appVersion.match(/MSIE [0-6]\./)) {
        $('*', e).each(function () {
            if (this.currentStyle.backgroundImage != 'none') {
                var image = this.currentStyle.backgroundImage;
                image = this.currentStyle.backgroundImage.substring(5, image.length - 2);
                $(this).css({
                    'backgroundImage': 'none',
                    'filter': "progid:DXImageTransform.Microsoft.AlphaImageLoader(enabled=true, sizingMethod=crop, src='" + image + "')"
                });
            }
        });
    }

    /**
     * Link to the given element(s) or callback.
     */
    fb.linkTo = function (callback) {
        // Unbind previous nodes
        if (typeof fb.callback == 'object') {
            $(fb.callback).unbind('keyup', fb.updateValue);
        }

        // Reset color
        fb.color = null;

        // Bind callback or elements
        if (typeof callback == 'function') {
            fb.callback = callback;
        }
        else if (typeof callback == 'object' || typeof callback == 'string') {
            fb.callback = $(callback);
            fb.callback.bind('keyup', fb.updateValue);
            if (fb.callback.get(0).value) {
                fb.setColor(fb.callback.get(0).value);
            }
        }
        return this;
    }
    fb.updateValue = function (event) {
        if (this.value && this.value != fb.color) {
            fb.setColor(this.value);
        }
    }

    /**
     * Change color with HTML syntax #123456
     */
    fb.setColor = function (color) {
        var unpack = fb.unpack(color);
        if (fb.color != color && unpack) {
            fb.color = color;
            fb.rgb = unpack;
            fb.hsl = fb.RGBToHSL(fb.rgb);
            fb.updateDisplay();
        }
        return this;
    }

    /**
     * Change color with HSL triplet [0..1, 0..1, 0..1]
     */
    fb.setHSL = function (hsl) {
        fb.hsl = hsl;
        fb.rgb = fb.HSLToRGB(hsl);
        fb.color = fb.pack(fb.rgb);
        fb.updateDisplay();
        return this;
    }

    /////////////////////////////////////////////////////

    /**
     * Retrieve the coordinates of the given event relative to the center
     * of the widget.
     */
    fb.widgetCoords = function (event) {
        var x, y;
        var el = event.target || event.srcElement;
        var reference = fb.wheel;

        if (typeof event.offsetX != 'undefined') {
            // Use offset coordinates and find common offsetParent
            var pos = { x: event.offsetX, y: event.offsetY };

            // Send the coordinates upwards through the offsetParent chain.
            var e = el;
            while (e) {
                e.mouseX = pos.x;
                e.mouseY = pos.y;
                pos.x += e.offsetLeft;
                pos.y += e.offsetTop;
                e = e.offsetParent;
            }

            // Look for the coordinates starting from the wheel widget.
            var e = reference;
            var offset = { x: 0, y: 0 }
            while (e) {
                if (typeof e.mouseX != 'undefined') {
                    x = e.mouseX - offset.x;
                    y = e.mouseY - offset.y;
                    break;
                }
                offset.x += e.offsetLeft;
                offset.y += e.offsetTop;
                e = e.offsetParent;
            }

            // Reset stored coordinates
            e = el;
            while (e) {
                e.mouseX = undefined;
                e.mouseY = undefined;
                e = e.offsetParent;
            }
        }
        else {
            // Use absolute coordinates
            var pos = fb.absolutePosition(reference);
            x = (event.pageX || 0*(event.clientX + $('html').get(0).scrollLeft)) - pos.x;
            y = (event.pageY || 0*(event.clientY + $('html').get(0).scrollTop)) - pos.y;
        }
        // Subtract distance to middle
        return { x: x - fb.width / 2, y: y - fb.width / 2 };
    }

    /**
     * Mousedown handler
     */
    fb.mousedown = function (event) {
        // Capture mouse
        if (!document.dragging) {
            $(document).bind('mousemove', fb.mousemove).bind('mouseup', fb.mouseup);
            document.dragging = true;
        }

        // Check which area is being dragged
        var pos = fb.widgetCoords(event);
        fb.circleDrag = Math.max(Math.abs(pos.x), Math.abs(pos.y)) * 2 > fb.square;

        // Process
        fb.mousemove(event);
        return false;
    }

    /**
     * Mousemove handler
     */
    fb.mousemove = function (event) {
        // Get coordinates relative to color picker center
        var pos = fb.widgetCoords(event);



        // Set new HSL parameters
        if (fb.circleDrag) {
            var hue = Math.atan2(pos.x, -pos.y) / 6.28;
            if (hue < 0) hue += 1;
            fb.setHSL([hue, fb.hsl[1], fb.hsl[2]]);
        }
        else {
            var sat = Math.max(0, Math.min(1, -(pos.x / fb.square) + .5));
            var lum = Math.max(0, Math.min(1, -(pos.y / fb.square) + .5));
            fb.setHSL([fb.hsl[0], sat, lum]);
        }

        //改变空间标题color
        if(bw.indexOf("colortext10") > 0){
            $("#space_title").css('color', fb.color);
        }
        //改变空间签名color
        else if(bw.indexOf("colortext9") > 0){
            $("#space_desc").css('color', fb.color);
        }
        //改变空间简介color
        else if(bw.indexOf("colortext8") > 0){
            $("#profile_desc").css('color', fb.color);
        }
        //改变空间文章标题color
        else if(bw.indexOf("colortext7") > 0){
            $(".list_box dl dt a").css('color', fb.color);
        }
        //改变空间正文color
        else if(bw.indexOf("colortext6") > 0){
            $(".list_box dl dd").css('color', fb.color);
        }

        return false;
    }

    /**
     * Mouseup handler
     */
    fb.mouseup = function () {
        // Uncapture mouse
        $(document).unbind('mousemove', fb.mousemove);
        $(document).unbind('mouseup', fb.mouseup);
        document.dragging = false;
    }

    /**
     * Update the markers and styles
     */
    fb.updateDisplay = function () {
        // Markers
        var angle = fb.hsl[0] * 6.28;
        $('.h-marker', e).css({
            left: Math.round(Math.sin(angle) * fb.radius + fb.width / 2) + 'px',
            top: Math.round(-Math.cos(angle) * fb.radius + fb.width / 2) + 'px'
        });

        $('.sl-marker', e).css({
            left: Math.round(fb.square * (.5 - fb.hsl[1]) + fb.width / 2) + 'px',
            top: Math.round(fb.square * (.5 - fb.hsl[2]) + fb.width / 2) + 'px'
        });

        // Saturation/Luminance gradient
        $('.color', e).css('backgroundColor', fb.pack(fb.HSLToRGB([fb.hsl[0], 1, 0.5])));

        // Linked elements or callback
        if (typeof fb.callback == 'object') {
            // Set background/foreground color
            $(fb.callback).css({
                backgroundColor: fb.color,
                color: fb.hsl[2] > 0.5 ? '#000' : '#fff'
            });

            // Change linked value
            $(fb.callback).each(function() {
                if (this.value && this.value != fb.color) {
                    this.value = fb.color;
                }
            });
        }
        else if (typeof fb.callback == 'function') {
            fb.callback.call(fb, fb.color);
        }
    }

    /**
     * Get absolute position of element
     */
    fb.absolutePosition = function (el) {
        var r = { x: el.offsetLeft, y: el.offsetTop };
        // Resolve relative to offsetParent
        if (el.offsetParent) {
            var tmp = fb.absolutePosition(el.offsetParent);
            r.x += tmp.x;
            r.y += tmp.y;
        }
        return r;
    };

    /* Various color utility functions */
    fb.pack = function (rgb) {
        var r = Math.round(rgb[0] * 255);
        var g = Math.round(rgb[1] * 255);
        var b = Math.round(rgb[2] * 255);
        return '#' + (r < 16 ? '0' : '') + r.toString(16) +
            (g < 16 ? '0' : '') + g.toString(16) +
            (b < 16 ? '0' : '') + b.toString(16);
    }

    fb.unpack = function (color) {
        if (color.length == 7) {
            return [parseInt('0x' + color.substring(1, 3)) / 255,
                parseInt('0x' + color.substring(3, 5)) / 255,
                parseInt('0x' + color.substring(5, 7)) / 255];
        }
        else if (color.length == 4) {
            return [parseInt('0x' + color.substring(1, 2)) / 15,
                parseInt('0x' + color.substring(2, 3)) / 15,
                parseInt('0x' + color.substring(3, 4)) / 15];
        }
    }

    fb.HSLToRGB = function (hsl) {
        var m1, m2, r, g, b;
        var h = hsl[0], s = hsl[1], l = hsl[2];
        m2 = (l <= 0.5) ? l * (s + 1) : l + s - l*s;
        m1 = l * 2 - m2;
        return [this.hueToRGB(m1, m2, h+0.33333),
            this.hueToRGB(m1, m2, h),
            this.hueToRGB(m1, m2, h-0.33333)];
    }

    fb.hueToRGB = function (m1, m2, h) {
        h = (h < 0) ? h + 1 : ((h > 1) ? h - 1 : h);
        if (h * 6 < 1) return m1 + (m2 - m1) * h * 6;
        if (h * 2 < 1) return m2;
        if (h * 3 < 2) return m1 + (m2 - m1) * (0.66666 - h) * 6;
        return m1;
    }

    fb.RGBToHSL = function (rgb) {
        var min, max, delta, h, s, l;
        var r = rgb[0], g = rgb[1], b = rgb[2];
        min = Math.min(r, Math.min(g, b));
        max = Math.max(r, Math.max(g, b));
        delta = max - min;
        l = (min + max) / 2;
        s = 0;
        if (l > 0 && l < 1) {
            s = delta / (l < 0.5 ? (2 * l) : (2 - 2 * l));
        }
        h = 0;
        if (delta > 0) {
            if (max == r && max != g) h += (g - b) / delta;
            if (max == g && max != b) h += (2 + (b - r) / delta);
            if (max == b && max != r) h += (4 + (r - g) / delta);
            h /= 6;
        }
        return [h, s, l];
    }

    // Install mousedown handler (the others are set on the document on-demand)
    $('*', e).mousedown(fb.mousedown);

    // Init color
    fb.setColor('#000000');

    // Set linked elements/callback
    if (callback) {
        fb.linkTo(callback);
    }
}

/* =====================================================插件结束========================================================== */

/* =====================================================公用代码========================================================== */
$(function(){
    //个人资料下拉
    $(".tool_content dt").hover(
        function(){
            $(this).children("ul").show();
        },
        function(){
            $(this).children("ul").hide();
        }
    );

    /*mask*/
    $("#mask").height($(document.body).height());
    //mask start job
    $("#diy_page").click(function(){
        $("#mask").show();
    });
    //mask exit job
    $("#diy_exit").click(function(){
        var loginId = $(this).attr("data-id");
        window.location.href = '/user/'+loginId;
        //$("#mask").hide();
    });
    //mask menu
    $(".mask_left li").click(function(){
        $(this).addClass("cur").siblings().removeClass("cur");
        $(".fc").removeClass("cur").eq($(this).index()).addClass("cur");
    });
    //mask layout select
    $(".theme_layout_box li").click(function(){
        $(this).addClass("cur").siblings().removeClass("cur");
        var style = $(this).attr("data-style");
        var loginId = $(this).closest(".theme_layout_box").attr("data-id");
        window.location.href = '/member/index.php?uid='+loginId+'&layout='+style;
    });
    //mask background select
    $(".theme_box li").click(function(){
        $(this).addClass("cur").siblings().removeClass("cur");
        $(this).find("input").attr("checked", true);
        var bg = $(this).attr("data-bg")
        $("#theme_bg_link").attr("href", "../templets/member/bg/"+bg+"/style.css");
    });
    //mask color
    $('#colorpic10').farbtastic('#colortext10, #colorc10');
    $('#colorpic9').farbtastic('#colortext9, #colorc9');
    $('#colorpic8').farbtastic('#colortext8, #colorc8');
    $('#colorpic7').farbtastic('#colortext7, #colorc7');
    $('#colorpic6').farbtastic('#colortext6, #colorc6');
    //mask show color farbtastic
    $(".theme_color .s").click(function(){
        $(".colorpic").hide();
        $(this).children(".colorpic").show();
    });
    //mask hidden color farbtastic
    $(".theme_color .colorbtn").click(function(event){
        $(this).closest(".colorpic").hide();
        event.stopPropagation();
    });
    //mask save
    $("#diy_save").click(function(){
        $.post("/member/ajaxaction.php", $("#mask").serialize(), function(res){
            var data = eval("("+res+")");
            if(data.status == 1){
                var loginId = $("#diy_exit").attr("data-id");
                window.location.href = '/user/'+loginId;
            }else{
                alert('保存失败,请刷新页面后重试!');
                return false;
            }
        });
    });


    /*功能性代码开始*/
    //文章赞操作
    $(".like").click(function(){
        var obj = $(this);
        var thisId = obj.attr("data-id");
        $.post("/member/ajaxaction.php",{'dopost':'zan','id':thisId},function(res){
            var data = eval("("+res+")");
            if(data.status){
                var rVal = obj.find('em').html();
                obj.find('em').html(Number(rVal)+1);
            }else{
                alert(data.message);
                return false;
            }
        });
    });

    //空间赞操作
    $("#space_atten a.gzs_sd").click(function(){
        var thisVmid = $(this).attr("data-mid");
        $.post("/member/ajaxaction.php",{'dopost':'spacezan', 'vmid':thisVmid},function(res){
            var data = eval("("+res+")");
            if(data.status == 1){
                var rVal = $("#space_atten .atten_num").text();
                $("#space_atten .atten_num").text(Number(rVal)+1);
            }else if(data.status==3){
                //关注取消成功
                var rVal = $("#space_atten .atten_num").text();
                $("#space_atten .atten_num").text(Number(rVal)-1);
                alert(data.message);
                return false;
            }else{
                alert(data.message);
                return false;
            }
        });
    });

    //空间关注列表中的关注他
    $(".space_atten_sp").click(function(){
        var thisVmid = $(this).attr("data-mid");//关注的用户UID
        var cur=$(this);
        $.post("/member/ajaxaction.php",{'dopost':'spacezan', 'vmid':thisVmid},function(res){
            var data = eval("("+res+")");
            if(data.status == 1){
                //关注成功
                cur.text("已关注");
                //cur.removeAttr("data-mid");//移除属性
                //cur.removeClass("space_atten_sp");//移除class
                //关注数+1
                var rVal = cur.siblings('.numbodysad').find("span").text();
                cur.siblings('.numbodysad').find("span").text(Number(rVal)+1);
            }else if(data.status==6){
                cur.text("已互粉");
                var rVal = cur.siblings('.numbodysad').find("span").text();
                cur.siblings('.numbodysad').find("span").text(Number(rVal)+1);
            }else if(data.status==3){
                //关注取消成功
                cur.text("关注TA");
                var rVal = cur.siblings('.numbodysad').find("span").text();
                cur.siblings('.numbodysad').find("span").text(Number(rVal)-1);
                alert(data.message);
                return false;
            }else{
                alert(data.message);
                return false;
            }
        });
    });


    //历史记录换一组
    $(".space_visitors_warp a.next").click(function(){
        var thisMid = $(this).attr("data-mid");
        var thisPage = $(this).attr("data-page");
        $.post("/member/ajaxaction.php",{'dopost':'vhistory','vmid':thisMid,'vpage':thisPage},function(res){
            var data = eval("("+res+")");
            if(data.status == 2){
                $(".visitors_list ul").html(data.vhistory);
                $(".space_visitors_warp a.next").attr("data-page", data.vpage);
            }else{
                alert(data.message);
                return false;
            }
        });
    });

    //空间留言
    $("#guestbook_btn").click(function(){
        var guestbook_content = $("#guestbook_content").val();
        var mid = $(this).attr("data-mid");
        if(mid == '' || mid == undefined){
            alert('非法操作');
            return false;
        }

        if(guestbook_content == '请文明发言' || guestbook_content == '' || guestbook_content == undefined){
            alert('请输入留言内容');
            return false;
        }else{
            $.post("/member/ajaxaction.php",{'dopost':'guestbook','content':encodeURI(encodeURI(guestbook_content)), 'mid':mid},function(res){
                var data = eval("("+res+")");
                if(data.status == 1){
                    $("#guestbook_content").val('');
                    $(data.message).prependTo(".feedback_content .jscroll-c");
                }else{
                    alert(data.message);
                    return false;
                }
            });
        }
    });
    $("#guestbook_content").blur(function(){
        var guestbook_content = $("#guestbook_content").val();
        if(guestbook_content == ''){
            $(this).removeClass("focus");
            $("#guestbook_content").val('请文明发言');
        }
    }).focus(function(){
        var guestbook_content = $("#guestbook_content").val();
        $(this).addClass("focus");
        if(guestbook_content == '请文明发言'){
            $("#guestbook_content").val('');
        }
    });
    /*功能性代码结束*/
});



// 关闭ajax登录框和新图层
function cancel_ajax_div()
{
    if ($("#loginDiv").is(":visible")) {
        document.body.removeChild(docEle('loginDiv'));
        document.body.removeChild(docEle('loginmask'));

        var i = 0;
        var sel_obj = document.getElementsByTagName('select');
        while (sel_obj[i])
        {
            sel_obj[i].style.visibility = "";
            i++;
        }
    }
}

//检测层是否已经存在
function docEle()
{
    return document.getElementById(arguments[0]) || false;
}

// 关闭ajax注册框和新图层
function cancel_ajax_re_div()
{
    document.body.removeChild(docEle('registerDiv'));
    document.body.removeChild(docEle('registermask'));

    var i = 0;
    var sel_obj = document.getElementsByTagName('select');
    while (sel_obj[i])
    {
        sel_obj[i].style.visibility = "";
        i++;
    }
}
//用户ajax登录
function openAjaxLoginDiv(type)
{
    if (docEle('registerDiv'))
        cancel_ajax_re_div();
    ajaxSigninDiv(type);
}


function ajaxSigninDiv(type)
{
    var _id = "loginDiv";
    var m = "loginmask";
    if (docEle(_id))
        document.removeChild(docEle(_id));
    if (docEle(m))
        document.removeChild(docEle(m));
    //计算上卷元素值
    var scrollPos;
    if (typeof window.pageYOffset != 'undefined')
    {
        scrollPos = window.pageYOffset;
    }
    else if (typeof document.compatMode != 'undefined' && document.compatMode != 'BackCompat')
    {
        scrollPos = document.documentElement.scrollTop;
    }
    else if (typeof document.body != 'undefined')
    {
        scrollPos = document.body.scrollTop;
    }

    var i = 0;
    var sel_obj = document.getElementsByTagName('select');
    while (sel_obj[i])
    {
        sel_obj[i].style.visibility = "hidden";
        i++;
    }

    // 新激活图层
    var newDiv = document.createElement("div");
    newDiv.id = _id;
    newDiv.style.position = "absolute";
    newDiv.style.zIndex = "10000";
    newDiv.style.width = "480px";
    newDiv.style.height = "300px";
    newDiv.style.top = (parseInt(scrollPos + 200)) + "px";
    newDiv.style.left = (parseInt(document.body.offsetWidth) - 500) / 2 + "px";
    newDiv.style.overflow = "hidden";
    newDiv.style.background = "#FFF";
    newDiv.style.border = "5px solid #ccc";
    newDiv.style.padding = "15px";

    var returnurl=document.URL;
    var gotourl="/member/qzonelogin/redirect.php?gourl="+returnurl;
    //生成层内内容
    newDiv.innerHTML = '<form action="javascript:ajaxSignIn(\'' + type + '\')" method="post" name="ECS_LOGINFORM" id="ECS_LOGINFORM"><h3 class="ajax_login_title"><span onclick="javascript:cancel_ajax_div()" id="ajax_login_close"></span>用户登录</h3><table cellspacing="5" cellpadding="3" width="100%" border="0" align="left" class="ajax_login_table"><tbody><tr>  <td width="20%" align="right">账户</td>  <td width="80%" class="t2"><input type="text" value="" tabindex="1" class="ajax_login_input" size="25" name="username"></td></tr><tr>  <td align="right">密码</td>  <td class="t2">  <input type="password" class="ajax_login_input" tabindex="2" size="25" name="password">  </td></tr>          <tr>  <td>&nbsp;</td>  <td align="left" class="t2"><table cellspacing="0" cellpadding="0" width="320">    <tbody><tr>        <td><input type="submit" class="ajax_login_btn" tabindex="4" value="" name="submit"><input type="hidden" name="dopost" value="ajax_login"></td><td><a href="'+gotourl+'" onclick="" style=""><img src="https://static.duanwenxue.com/nnect_logo_1.png" style="vertical-align: middle;">QQ登录</a></td>  <td><a href="/member/resetpassword.php">忘记密码</a></td>          </tr>      </tbody></table>  </td></tr></tbody></table></form>';// result.html;

    document.body.appendChild(newDiv);
    // mask图层
    var newMask = document.createElement("div");
    newMask.id = m;
    newMask.style.position = "absolute";
    newMask.style.zIndex = "9999";
    newMask.style.width = document.body.scrollWidth + "px";
    if (document.body.scrollHeight < document.documentElement.clientHeight) {
        newMask.style.height = document.documentElement.scrollHeight + "px";
    } else {
        newMask.style.height = document.body.scrollHeight + "px";
    }
    newMask.style.top = "0px";
    newMask.style.left = "0px";
    newMask.style.background = "#000";
    newMask.style.filter = "alpha(opacity=30)";
    newMask.style.opacity = "0.40";
    document.body.appendChild(newMask);
}
/**
 * 会员登录
 */
function ajaxSignIn(type)
{


    var frm = document.forms['ECS_LOGINFORM'];

    if (frm)
    {
        var username = frm.elements['username'].value;
        var password = frm.elements['password'].value;

        if (username.length == 0 || password.length == 0)
        {
            alert("用户名或密码不能为空!");
            return;
        }
        else
        {
            $.post("/member/ajaxaction.php", $("#ECS_LOGINFORM").serialize(), function(res) {
                var data = eval("(" + res + ")");
                if (data.status == 1) {
                    cancel_ajax_div();
                    if (type == 'ajaxlogincommon') {
                        $("#add_content_html").html(data.return_html);
                    }
                } else {
                    alert(data.message);
                }
                return false;
            });

        }
    }
    else
    {
        alert('Template error!');
    }
}
