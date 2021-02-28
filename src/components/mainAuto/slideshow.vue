<template>
    <div>
        <article class="main-slideshow clear">
            <div class="main-slideshow-big set-x-y">
                <div class="empty" id="Banner_simple">
                    <ul class="main-slideshow-context clear">
                        <li><img data-text-id="#photoText1" width="636" height="512" src="/images/slideshow/sailiya.jpg"
                                 alt=""></li>
                        <li><img data-text-id="#photoText2" width="636" height="512" src="/images/slideshow/wuwang.jpg"
                                 alt=""></li>
                        <li><img data-text-id="#photoText3" width="636" height="512" src="/images/slideshow/ruiwen.jpg"
                                 alt=""></li>
                        <li><img data-text-id="#photoText4" width="636" height="512"
                                 src="/images/slideshow/keyunixaojie.jpg" alt=""></li>
                        <li><img data-text-id="#photoText5" width="636" height="512" src="/images/slideshow/jinkesi.jpg"
                                 alt=""></li>
                        <li><img data-text-id="#photoText6" width="636" height="512" src="/images/slideshow/shilang.jpg"
                                 alt=""></li>
                    </ul>
                </div>
            </div>
            <div class="main-slideshow-tiny">
                <ul class="tiny-context">
                    <li  index='0'
                        style="background: border-box border-box rgba(145,32,255,0.92);" class="set-x-y"><img
                            class="empty" width="100" height="80" src="/images/slideshow/sailiya.jpg" alt=""></li>
                    <li  index='1' class="set-x-y"><img width="100"
                                                                                                  height="80"
                                                                                                  class="empty"
                                                                                                  src="/images/slideshow/wuwang-tiny.jpg"
                                                                                                  alt=""></li>
                    <li index='2' class="set-x-y"><img width="100"
                                                                                                  height="80"
                                                                                                  class="empty"
                                                                                                  src="/images/slideshow/ruiwen-tiny.jpg"
                                                                                                  alt=""></li>
                    <li index='3' class="set-x-y"><img width="100"
                                                                                                  height="80"
                                                                                                  class="empty"
                                                                                                  src="/images/slideshow/keyunixaojie-tiny.jpg"
                                                                                                  alt=""></li>
                    <li  index='4' class="set-x-y"><img width="100"
                                                                                                  height="80"
                                                                                                  class="empty"
                                                                                                  src="/images/slideshow/jinkesi-tiny.jpg"
                                                                                                  alt=""></li>
                    <li index='5' class="set-x-y"><img width="100"
                                                                                                  height="80"
                                                                                                  class="empty"
                                                                                                  src="/images/slideshow/shilang-tiny.jpg"
                                                                                                  alt=""></li>
                    <li  index='6' class="set-x-y"><img width="100"
                                                                                                  height="80"
                                                                                                  class="empty"
                                                                                                  src="/images/slideshow/sailiya-tiny.jpg"
                                                                                                  alt=""></li>
                    <li index='7' class="set-x-y"><img width="100"
                                                                                                  height="80"
                                                                                                  class="empty"
                                                                                                  src="/images/slideshow/wuwang-tiny.jpg"
                                                                                                  alt=""></li>
                    <li index='8' class="set-x-y"><img width="100"
                                                                                                  height="80"
                                                                                                  class="empty"
                                                                                                  src="/images/slideshow/ruiwen-tiny.jpg"
                                                                                                  alt=""></li>
                    <li  index='9' class="set-x-y"><img width="100"
                                                                                                    height="80"
                                                                                                    class="empty"
                                                                                                    src="/images/slideshow/keyunixaojie-tiny.jpg"
                                                                                                    alt=""></li>
                    <li   class="set-x-y"><img width="100"
                                                                                                   height="80"
                                                                                                   class="empty"
                                                                                                   src="/images/slideshow/jinkesi-tiny.jpg"
                                                                                                   alt=""></li>
                    <li   class="set-x-y"><img width="100"
                                                                                                   height="80"
                                                                                                   class="empty"
                                                                                                   src="/images/slideshow/shilang-tiny.jpg"
                                                                                                   alt=""></li>
                </ul>
            </div>
        </article>
    </div>
</template>

<script>
    import NewArticle from './NewArticle.vue'
    var Timeout;
    var Timeout2;
    function slideshow() {
        var tinyMap = $(".tiny-context");
        var tinyMapHeight = Math.round(tinyMap.children(0).outerWidth());
        var imgs = $("[data-text-id]");
        var y = 0;
        var y2 = 0;
        var lumpDiv;
        var arr = [];
        var cou = 0;
        var sign = true;
        for (var k = 0; k < 10; k++) {
            for (var l = 0; l < 10; l++) {
                lumpDiv = document.createElement('div');
                $(lumpDiv).css('position', 'absolute');
                $(lumpDiv).css('width', '0px');
                $(lumpDiv).css('height', '0px');
                $(lumpDiv).css('background', 'url("/images/slideshow/wuwang.jpg")' + -l * 63.6 + 'px ' + -k * 51.2 + 'px');
                $(lumpDiv).css('left', l * 63.6);
                $(lumpDiv).css('top', k * 51.2);
                $(lumpDiv).css('opacity', 0);
                $(lumpDiv).addClass("patch");
                $("#Banner_simple").append(lumpDiv);
            }
        }
        for (var i = 1; i < 20; i++) {
            arr[i - 1] = new Array();
            if (i > 10) {
                cou = (i - 9) * 10;
            } else {
                cou = i;
            }
            for (var k = 0; k < i; k++) {
                if (i < 10 && cou % 10 === 0) {
                    break;
                } else if (cou !== 100 && cou > 100) {
                    break;
                } else {
                    arr[i - 1][k] = $("#Banner_simple").children()[cou];
                }
                cou += 9;
            }
        }
        $(".main-slideshow-context").append($('.patch').clone());
        $(".main-slideshow-context").find('.patch').css('width', '63.6px');
        $(".main-slideshow-context").find('.patch').css('height', '51.2px');
        $(".main-slideshow-context").find('.patch').css('opacity', '1');
        $(".main-slideshow-context").find('.patch').css('background-image', 'url(/images/slideshow/sailiya.jpg)');
        var src = "/images/slideshow/sailiya.jpg";
        function wave(y){
            var j = 0;
            sign = false;
            $(".main-slideshow-context").find('.patch').css('background-image','url('+src+')');
            $('#Banner_simple').children('.patch').css('width', '0px');
            $('#Banner_simple').children('.patch').css('height', '0px');
            $('#Banner_simple').children('.patch').css('opacity', 0);
            if(src === $(imgs[y===6?0:y]).attr('src')){
                sign = true;
                return false;
            }
            src =$(imgs[y===6?0:y]).attr('src');
            $('#Banner_simple').children('.patch').css('background-image','url('+src+')');
             Timeout2 = setInterval(function () {
                if (j === 18) {
                    $(arr[j++]).animate({opacity: "1.0", width: 63.6, height: 51.2}, 1E3 * 0.5,function () {
                        sign = true;
                    });
                    clearInterval(Timeout2);
                }
                $(arr[j++]).animate({opacity: "1.0", width: 63.6, height: 51.2}, 1E3 * 0.2);
            },100);
        };
        function start() {
            y++;
            y = y===6? 0 : y ;
            y2++;
            y2 = y2 ===12?0:y2;
            wave(y);
            var roof = Math.abs(parseInt(tinyMap.css("top"))) / (tinyMapHeight - 12);
            switch (roof) {
                case 0 :
                    if (parseInt(y2) === 0) {
                        tinyMap.css('top', -648 + 'px');
                        tinyMap.animate({'top': -540 + 'px'});
                    } else if (parseInt(y2) - 4 === 0) {
                        tinyMap.animate({'top': (roof + 1) * -(tinyMapHeight - 12) + 'px'});
                    }
                    tinyMap.children().css('background', '');
                    $(tinyMap.children()[y2]).css('background', 'border-box border-box rgba(145,32,255,0.92)');
                    break;
                case 7 :
                    tinyMap.css('top', -108 + 'px');
                    tinyMap.animate({'top': -216 + 'px'});
                    y2 = 5;
                    tinyMap.children().css('background', '');
                    $(tinyMap.children()[y2]).css('background', 'border-box border-box rgba(145,32,255,0.92)');
                    break;
                case parseInt(y2):
                    tinyMap.animate({'top': (roof - 1) * -(tinyMapHeight - 12) + 'px'});
                    tinyMap.children().css('background', '');
                    $(tinyMap.children()[y2]).css('background', 'border-box border-box rgba(145,32,255,0.92)');
                    break;
                case parseInt(y2) - 4 :
                    tinyMap.animate({'top': (roof + 1) * -(tinyMapHeight - 12) + 'px'});
                    tinyMap.children().css('background', '');
                    $(tinyMap.children()[y2]).css('background', 'border-box border-box rgba(145,32,255,0.92)');
                    break;
                default :
                    tinyMap.children().css('background', '');
                    $(tinyMap.children()[y2]).css('background', 'border-box border-box rgba(145,32,255,0.92)');
            }
        }
         Timeout  = setInterval(start,3000);

        tinyMap.children().mouseover(function () {
            clearInterval(Timeout);
        });
        tinyMap.children().mouseout(function () {
            Timeout  = setInterval(start,3000);
        });
        tinyMap.children().click(function () {
            clearInterval(Timeout);
            if (!sign){
                return false;
            }
            y2 = $(this).attr('index');
            var roof = Math.abs(parseInt(tinyMap.css("top"))) / (tinyMapHeight - 12);
            tinyMap.children().css('background', '');
            $(this).css('background', 'border-box border-box rgba(145,32,255,0.92)');
            y = $(this).attr('index');
            switch (roof) {
                case 0 :
                    if (parseInt(y2) === 0) {
                        tinyMap.css('top', -648 + 'px');
                        tinyMap.animate({'top': -540 + 'px'});
                        tinyMap.children().css('background', '');
                        $(tinyMap.children()[6]).css('background', 'border-box border-box rgba(145,32,255,0.92)');
                    } else if (parseInt(y2) - 4 === 0) {
                        tinyMap.animate({'top': (roof + 1) * -(tinyMapHeight - 12) + 'px'});
                    }
                    break;
                case 7 :
                    tinyMap.css('top', -108 + 'px');
                    tinyMap.animate({'top': -216 + 'px'});
                    tinyMap.children().css('background', '');
                    $(tinyMap.children()[5]).css('background', 'border-box border-box rgba(145,32,255,0.92)');
                    break;
                case parseInt(y2):
                    tinyMap.animate({'top': (roof - 1) * -(tinyMapHeight - 12) + 'px'});
                    break;
                case parseInt(y2) - 4 :
                    tinyMap.animate({'top': (roof + 1) * -(tinyMapHeight - 12) + 'px'});
                    break;
            }
            y = y === '6' ? 0 : y;
            y = y === '7' ? 1 : y;
            y = y === '8' ? 2 : y;
            y = y === '9' ? 3 : y;
            y = y === '10' ? 4 : y;
            y = y === '11' ? 5 : y;
            wave(y);
        });

        //窗口焦点事件
        window.onfocus = function () {
            $("title").text("咦？又能看见了╰(*°▽°*)╯。。。");
            Timeout  = setInterval(start,3000);
        };
        window.onblur = function () {
            $("title").text("(/▽＼)你看不见我啦！");
            clearInterval(Timeout);
        };
    }

    export default {
        name: "slideshow",
        components: {
            NewArticle
        },/*,
        methods: {
            wave(y) {
                console.log("1");
                var j = 0;
                this.sign = false;
                $(".main-slideshow-context").find('.patch').css('background-image', 'url(' + this.src + ')');
                $('#Banner_simple').children('.patch').css('width', '0px');
                $('#Banner_simple').children('.patch').css('height', '0px');
                $('#Banner_simple').children('.patch').css('opacity', 0);
                if (this.src === $(this.imgs[y === 6 ? 0 : y]).attr('src')) {
                    this.sign = true;
                    return false;
                }
                this.src = $(this.imgs[y === 6 ? 0 : y]).attr('src');
                $('#Banner_simple').children('.patch').css('background-image', 'url(' + this.src + ')');
                this.timeout = setInterval(() => {
                    if (j === 18) {
                        $(this.arr[j++]).animate({opacity: "1.0", width: 63.6, height: 51.2}, 1E3 * 0.5, function () {
                            this.sign = true;
                        });
                        clearInterval(this.timeout);
                    }
                    $(this.arr[j++]).animate({opacity: "1.0", width: 63.6, height: 51.2}, 1E3 * 0.2);
                }, 100)
            },
            start(tinyMap) {
                this.y++;
                this.y = this.y === 6 ? 0 : this.y;
                this.y2++;
                this.y2 = this.y2 === 12 ? 0 : this.y2;
                this.wave(this.y);
                var roof = Math.abs(parseInt(tinyMap.css("top"))) / (this.tinyMapHeight - 12);
                switch (roof) {
                    case 0 :
                        if (parseInt(this.y2) === 0) {
                            tinyMap.css('top', -648 + 'px');
                            tinyMap.animate({'top': -540 + 'px'});
                        } else if (parseInt(this.y2) - 4 === 0) {
                            tinyMap.animate({'top': (roof + 1) * -(this.tinyMapHeight - 12) + 'px'});
                        }
                        tinyMap.children().css('background', '');
                        $(tinyMap.children()[this.y2]).css('background', 'border-box border-box rgba(145,32,255,0.92)');
                        break;
                    case 7 :
                        tinyMap.css('top', -108 + 'px');
                        tinyMap.animate({'top': -216 + 'px'});
                        this.y2 = 5;
                        tinyMap.children().css('background', '');
                        $(tinyMap.children()[y2]).css('background', 'border-box border-box rgba(145,32,255,0.92)');
                        break;
                    case parseInt(this.y2):
                        tinyMap.animate({'top': (roof - 1) * -(this.tinyMapHeight - 12) + 'px'});
                        tinyMap.children().css('background', '');
                        $(tinyMap.children()[this.y2]).css('background', 'border-box border-box rgba(145,32,255,0.92)');
                        break;
                    case parseInt(this.y2) - 4 :
                        tinyMap.animate({'top': (roof + 1) * -(this.tinyMapHeight - 12) + 'px'});
                        tinyMap.children().css('background', '');
                        $(tinyMap.children()[this.y2]).css('background', 'border-box border-box rgba(145,32,255,0.92)');
                        break;
                    default :
                        tinyMap.children().css('background', '');
                        $(tinyMap.children()[this.y2]).css('background', 'border-box border-box rgba(145,32,255,0.92)');
                }
            },
            suspend() {
                clearInterval(this.timeout);
            },
            departure() {
                clearInterval(this.timeout);
                this.timeout = setInterval(() => this.start($(".tiny-context")), 3000);
            },
            launch() {
                var tinyMap = $(".tiny-context");
                this.tinyMapHeight = Math.round(tinyMap.children(0).outerWidth());
                this.imgs = $("[data-text-id]");
                var lumpDiv;
                this.arr = [];
                var cou = 0;
                this.sign = true;
                for (var k = 0; k < 10; k++) {
                    for (var l = 0; l < 10; l++) {
                        lumpDiv = document.createElement('div');
                        $(lumpDiv).css('position', 'absolute');
                        $(lumpDiv).css('width', '0px');
                        $(lumpDiv).css('height', '0px');
                        $(lumpDiv).css('background', 'url("/images/slideshow/wuwang.jpg")' + -l * 63.6 + 'px ' + -k * 51.2 + 'px');
                        $(lumpDiv).css('left', l * 63.6);
                        $(lumpDiv).css('top', k * 51.2);
                        $(lumpDiv).css('opacity', 0);
                        $(lumpDiv).addClass("patch");
                        $("#Banner_simple").append(lumpDiv);
                    }
                }
                for (var i = 1; i < 20; i++) {
                    this.arr[i - 1] = new Array();
                    if (i > 10) {
                        cou = (i - 9) * 10;
                    } else {
                        cou = i;
                    }
                    for (var k = 0; k < i; k++) {
                        if (i < 10 && cou % 10 === 0) {
                            break;
                        } else if (cou !== 100 && cou > 100) {
                            break;
                        } else {
                            this.arr[i - 1][k] = $("#Banner_simple").children()[cou];
                        }
                        cou += 9;
                    }
                }
                $(".main-slideshow-context").append($('.patch').clone());
                $(".main-slideshow-context").find('.patch').css('width', '63.6px');
                $(".main-slideshow-context").find('.patch').css('height', '51.2px');
                $(".main-slideshow-context").find('.patch').css('opacity', '1');
                $(".main-slideshow-context").find('.patch').css('background-image', 'url(/images/slideshow/sailiya.jpg)');
                this.src = "/images/slideshow/sailiya.jpg";

                this.timeout = setInterval(() => this.start(tinyMap), 3000);
                console.log(this.timeout);

                tinyMap.children().click(function () {
                    if (!this.sign) {
                        return false;
                    }
                    this.y2 = $(this).attr('index');
                    var roof = Math.abs(parseInt(tinyMap.css("top"))) / (this.tinyMapHeight - 12);
                    tinyMap.children().css('background', '');
                    $(this).css('background', 'border-box border-box rgba(145,32,255,0.92)');
                    this.y = $(this).attr('index');
                    switch (roof) {
                        case 0 :
                            if (parseInt(this.y2) === 0) {
                                tinyMap.css('top', -648 + 'px');
                                tinyMap.animate({'top': -540 + 'px'});
                                tinyMap.children().css('background', '');
                                $(tinyMap.children()[6]).css('background', 'border-box border-box rgba(145,32,255,0.92)');
                            } else if (parseInt(this.y2) - 4 === 0) {
                                tinyMap.animate({'top': (roof + 1) * -(this.tinyMapHeight - 12) + 'px'});
                            }
                            break;
                        case 7 :
                            tinyMap.css('top', -108 + 'px');
                            tinyMap.animate({'top': -216 + 'px'});
                            tinyMap.children().css('background', '');
                            $(tinyMap.children()[5]).css('background', 'border-box border-box rgba(145,32,255,0.92)');
                            break;
                        case parseInt(this.y2):
                            tinyMap.animate({'top': (roof - 1) * -(this.tinyMapHeight - 12) + 'px'});
                            break;
                        case parseInt(this.y2) - 4 :
                            tinyMap.animate({'top': (roof + 1) * -(this.tinyMapHeight - 12) + 'px'});
                            break;
                    }
                    this.y = this.y === '6' ? 0 : this.y;
                    this.y = this.y === '7' ? 1 : this.y;
                    this.y = this.y === '8' ? 2 : this.y;
                    this.y = this.y === '9' ? 3 : this.y;
                    this.y = this.y === '10' ? 4 : this.y;
                    this.y = this.y === '11' ? 5 : this.y;
                    this.wave(this.y);
                });

                //窗口焦点事件
                window.onfocus = function () {
                    $("title").text("咦？又能看见了╰(*°▽°*)╯。。。");
                    // this.timeout = setInterval(() => this.start(tinyMap), 3000);
                };
                window.onblur = function () {
                    $("title").text("(/▽＼)你看不见我啦！");
                    // clearInterval(this.timeout);
                };
            }
        },*/
        mounted() {
            // this.launch();
            // slideshow();
            slideshow();
        },
        beforeDestroy () {
            clearInterval(Timeout);
            clearInterval(Timeout2);
            $(".patch").remove();
        }
    }
</script>

<style scoped>
    /*轮播图*/
    .main-slideshow-context {
        height: 1000%;
        position: absolute;
    }

    .main-slideshow-context li {
        display: none;
    }

    .main-slideshow-big {
        width: 636px;
        height: 512px;
        margin-bottom: 8px;
        margin-right: 8px;
        float: left;
    }

    .main-slideshow-tiny {
        float: left;
        height: 532px;
        width: 120px;
        overflow: hidden;
        position: relative;
    }

    .main-slideshow-big > div {
        width: 636px;
        height: 512px;
        overflow: hidden;
        position: relative;
    }

    .main-slideshow-tiny > ul > li {
        width: 120px;
        margin-bottom: 8px;
        padding: 10px 0;
        cursor: pointer;
    }

    .tiny-context {
        position: absolute;
    }

    .main-new-article > div {
        float: left;
    }

</style>