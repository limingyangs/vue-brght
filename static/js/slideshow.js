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
        var Timeout = setInterval(function () {
            if($(".tiny-context") == null){
                clearInterval(Timeout);
                return false;
            }
            if (j === 18) {
                $(arr[j++]).animate({opacity: "1.0", width: 63.6, height: 51.2}, 1E3 * 0.5,function () {
                    sign = true;
                });
                clearInterval(Timeout);
            }
            $(arr[j++]).animate({opacity: "1.0", width: 63.6, height: 51.2}, 1E3 * 0.2);
        },100);
    };
    function start() {
        if($(".tiny-context") == null){
            clearInterval(Timeout);
            return false;
        }
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
    var Timeout  = setInterval(start,3000);

    tinyMap.children().mouseover(function () {
        clearInterval(Timeout);
    });
    tinyMap.children().mouseout(function () {
        Timeout  = setInterval(start,3000);
    });
    tinyMap.children().click(function () {
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


}
