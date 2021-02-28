<!--播放器组件-->
<template>
<div class="main-left-music set-x-y">
    <div class="main-left-music-main clear">
        <div class="main-left-control clear">
            <div class="music-details clear">
                <div><img style="border-radius: 5px" width="45" height="45" v-bind:src="songs.imgPath" alt=""></div>
                    <div class="music-details-lyric">
                        <div style="color: rgba(134,134,134,0.37)">love</div>
                        <div class="details">
                            <div class="inner">
                                <div class="music-volume-lyric" style="font-size: 10px;">{{ songs.songName }}&nbsp;&nbsp;&nbsp;</div>
                            </div>
                        </div>
                        <div style="font-size: 10px;">
                            <span class="music-volume-lyric2">{{lyric==null? songs.singer : lyric }}</span>
                        </div>
                    </div>
                </div>
                <div class="music-pmgressbar">
                    <input type="range" ref="range" v-model="schedule" value="0" name="range_speed" id="range_speed"
                           @input="onRangeSlider"/>
                    <div class="clear" style="padding: 1px 1px;color: #999999;font-size: 12px;">
                        <div style="text-align: left;float: left">{{ transTime(audio.currentTime) }}</div>
                        <div style="text-align: right;float: right">{{ transTime(audio.maxTime) }}</div>
                    </div>
                </div>
                <div class="music-control">
                    <div>
                        <span @click="getUp">
                            <i class="iconfont icon-shangyiqu"></i>
                        </span>
                        <span @click="startPlayOrPause" style="margin: 0 60px;cursor: pointer">
                            <i v-bind:class="{'iconfont icon-zanting':audio.playing,'iconfont icon-bofang':!audio.playing}"></i>
                        </span>
                        <span  @click="getDown">
                                            <i class="iconfont icon-xiayiqu"></i>
                    </span>
                    </div>
                </div>
                <div class="music-volume">
                    <span style="vertical-align:middle;"><i class="iconfont  icon-shengyin-guan"
                                                            style="font-size: 13px;"></i></span>
                    <input ref="volume" @input="onVolume" type="range" value="50">
                    <span style="vertical-align:middle;"><i class="iconfont  icon-shengyin-kai"
                                                            style="font-size: 13px;"></i></span>
                </div>
            </div>

            <audio ref="audio" @pause="onPause" @play="onPlay" style="display: none"
                   @timeupdate="onTimeupdate"
                   @loadedmetadata="onLoadedmetadata"
                   v-bind:src="songs.path" controls="controls">
                Your browser does not support the audio element.
            </audio>
        </div>
    </div>
</template>

<script>
export default {
    name: "musicPlayer",
    data() {
        return {
            audio: {
                // 该字段是音频是否处于播放状态的属性
                playing: false,
                maxTime: 0,
                currentTime: 0
            },
            schedule: 0,
            songs: {
                songName: null,
                singer: null,
                lyric: null,
                imgPath: null,
                id: null,
                path: null,
                id2: null
            },
            lyric: null,
            timeInterval: null
        }
    },
    methods: {
        getData() {

            //发送get请求
            this.$http.get('http://localhost:8080/songInfo').then((response) => {

                this.songs = response.body;
                console.log(this.songs.lyric);
                this.songs.lyric = this.parseLyric(this.songs.lyric);
            }, function (err) {
                console.error(err);
            })

        },
        getUp() {

            //发送get请求
            this.$http.get('http://localhost:8080/songInfo?id=' + this.songs.id2 + '&upAndDown=up').then((response) => {

                this.songs = response.body;
                console.log(this.songs.lyric);
                this.songs.lyric = this.parseLyric(this.songs.lyric);
            }, function (err) {
                console.error(err);
            })

        },
        getDown() {
            //发送get请求
            this.$http.get('http://localhost:8080/songInfo?id=' + this.songs.id2 + '&upAndDown=down').then((response) => {

                this.songs = response.body;
                console.log(this.songs.lyric);
                this.songs.lyric = this.parseLyric(this.songs.lyric);
            }, function (err) {
                console.error(err);
            })
        },
        // 控制音频的播放与暂停
        startPlayOrPause() {
            return this.audio.playing ? this.$refs.audio.pause() : this.$refs.audio.play();
        },
        // 当音频播放
        onPlay() {
            this.audio.playing = true
        },
        // 当音频暂停
        onPause() {
            this.audio.playing = false
        },
        // 当timeupdate事件大概每秒一次，用来更新音频流的当前播放时间
        onTimeupdate(res) {
            for (var i = 0; i < this.songs.lyric.length; i++) {
                if (this.audio.currentTime >= this.songs.lyric[i][0]) {
                    if (i >= 1 && this.songs.lyric[i][1] !== "") {
                        this.lyric = this.songs.lyric[i][1];
                    } else if (this.songs.lyric[i][1] !== "") {
                        this.lyric = this.songs.lyric[i][1];
                    }
                }
            }
            this.audio.currentTime = res.target.currentTime;
            this.schedule = this.audio.currentTime / this.audio.maxTime * 100;
            $(this.$refs.range).css("background-size", this.schedule + "% 100%");

        },
        // 当加载语音流元数据完成后，会触发该事件的回调函数
        // 语音元数据主要是语音的长度之类的数据
        onLoadedmetadata(res) {
            this.lyric = null;
            this.$refs.audio.play();
            this.audio.maxTime = res.target.duration;
            this.$refs.audio.volume = 0.5;
            clearInterval(this.timeInterval);
            $('.details')[0].scrollLeft = 0;
            $('.inner').html("<div class='music-volume-lyric'style='display:inline-block;font-size:10px' >" + this.songs.songName + "</div>");
            if ($('.details').width() > $('.music-volume-lyric').width()) {
                return false;
            }
            $('.inner').html("<div style='display:inline-block;font-size:10px'>" + this.songs.songName + "</div><div style='display:inline-block;font-size:10px'>" + this.songs.songName + "</div>");
            this.timeInterval = setInterval(() => {
                if ($('.music-volume-lyric').width() <= $('.details')[0].scrollLeft) {
                    $('.details')[0].scrollLeft -= $('.music-volume-lyric').width();
                } else {
                    $('.details')[0].scrollLeft += 1;
                }
            }, 50)

        },
        onRangeSlider(res) {
            $(res.target).css("background-size", this.schedule + "% 100%");
            this.audio.currentTime = this.audio.maxTime * (parseInt(this.schedule) / 100);
            this.$refs.audio.currentTime = this.audio.currentTime;
        },
        onVolume(res) {
            $(res.target).css("background-size", $(res.target).val() + "% 100%");
            this.$refs.audio.volume = $(res.target).val() / 100;
        },
        transTime(second) {
            var date = new Date(second * 1000);
            var minute = date.getMinutes();
            second = date.getSeconds();
            return (minute > 9 ? minute : '0' + minute) + ":" + (second > 9 ? second : '0' + second);
        },
        parseLyric(t) {
            var i = t.split("\n"),
                a = /\[\d{2}:\d{2}.\d{1,3}\]/g,
                s = [];
            while (!a.test(i[0])) i = i.slice(1);
            return 0 === i[i.length - 1].length && i.pop(), i.forEach(function (t) {
                var i = t.match(a),
                    e = t.replace(a, "");
                i.forEach(function (t) {
                    var i = t.slice(1, -1).split(":");
                    s.push([60 * parseInt(i[0], 10) + parseFloat(i[1]), e])
                })
            }), s.sort(function (t, i) {
                return t[0] - i[0]
            }), s
        }
    },
    mounted() {
        this.getData()
    }
}
</script>

<style scoped>
.music-details-lyric {
    color: rgba(101, 98, 100, 0.9);
}

i {
    color: rgba(101, 98, 100, 0.9);
}

/*input[type=range]{*/
/*margin-top: 8px;*/
/*outline: none;*/
/*-webkit-appearance: none;!*清除系统默认样式*!*/
/*width:56% !important;*/
/*background: -webkit-linear-gradient(#61bd12, #61bd12) no-repeat, #ddd;*/
/*background-size: 30% 100%;!*设置左右宽度比例*!*/
/*height: 3px;!*横条的高度*!*/
/*}*/
/*拖动块的样式*/
.music-control span {
    cursor: pointer;
}
.music-control > div{
    text-align: center;
}
.music-pmgressbar input[type=range]::-webkit-slider-thumb {
    -webkit-appearance: none;
    /*清除系统默认样式*/
    height: 10px;
    /*拖动块高度*/
    width: 10px;
    /*拖动块宽度*/
    background: #fff;
    /*拖动块背景*/
    border-radius: 50%;
    /*外观设置为圆形*/
    border: solid 1px #ddd;
    /*设置边框*/
}

.music-volume input[type=range]::-webkit-slider-thumb {
    -webkit-appearance: none;
    /*清除系统默认样式*/
    height: 20px;
    /*拖动块高度*/
    width: 20px;
    /*拖动块宽度*/
    background: #fff;
    /*拖动块背景*/
    border-radius: 50%;
    /*外观设置为圆形*/
    border: solid 1px #ddd;
    /*设置边框*/
}

.music-volume input[type=range] {
    width: 200px;
    height: 3px;
    outline: none;
    border-radius: 10px;
    -webkit-appearance: none;
    background: -webkit-linear-gradient(rgba(101, 98, 100, 0.9), rgba(101, 98, 100, 0.65)) no-repeat, rgba(131, 131, 131, 0.2);
    cursor: pointer;
    /*background: -webkit-linear-gradient(#61bd12, #61bd12) no-repeat, #ddd;*/
    background-size: 50% 100%;
    /*设置左右宽度比例*/
    margin: 0 8px;
}

.music-pmgressbar input[type=range] {
    width: 242px;
    height: 3px;
    outline: none;
    border-radius: 10px;
    -webkit-appearance: none;
    background: -webkit-linear-gradient(rgba(101, 98, 100, 0.9), rgba(101, 98, 100, 0.65)) no-repeat, rgba(131, 131, 131, 0.2);
    cursor: pointer;
    /*background: -webkit-linear-gradient(#61bd12, #61bd12) no-repeat, #ddd;*/
    background-size: 0% 100%;
    /*设置左右宽度比例*/
}

input[type=range]::-webkit-slider-thumb {
    -webkit-appearance: none;
}

/*input[type=range]::-webkit-slider-thumb {*/
/*-webkit-appearance: none;*/
/*height: 10px;*/
/*width: 10px;*/
/*margin-bottom: 2px;!*使滑块超出轨道部分的偏移量相等*!*/
/*background: #ccc;*/
/*border-radius: 50%; !*外观设置为圆形*!*/
/*border: solid 0.125em rgba(205, 224, 230, 0.5); !*设置边框*!*/
/*box-shadow: 0 .125em .125em #3b4547; !*添加底部阴影*!*/
/*}*/

.music-pmgressbar {
    margin: 10px 0 15px 0;
    width: 242px;
    height: 30px;
}

.music-details-lyric,
.music-details-lyric2 {
    font-size: 12px;
    margin-left: 10px;
    margin-top: 3px;
    line-height: 11px;
    font-weight: 700;
    width: 167px;
    text-align: left;
}

.details,
.details2 {
    overflow: hidden;
    position: relative;
}

.details>div {
    width: 1000px;
    text-align: left;
}

.inner>div {
    display: inline-block;
}

.inner {
    margin: 3px 0;
}

.music-details>div {
    float: left;
}

.main-left-music {
    padding: 8px 10px;

}

.music-time-conditions span {
    float: left;
}

.music-progress-bar span {
    background-color: rgba(25, 174, 231, 0.67);
    height: 100%;
    cursor: pointer;
}

.volume-strip>span {
    width: 4px;
    height: 33px;
    border: 1px solid rgba(25, 174, 231, 0.67);
    border-radius: 2px;
    margin-left: 5px;
}

.main-article-content li {
    padding: 5px 0;
    text-align: left;
    border-bottom: 1px solid #ccc;
}

.article-detail-tow a {
    margin-left: 55px;
}

.visitor-list>div {
    float: left;
    margin: 0 8px 7px 8px;
}

.visitor-list-message span {
    position: absolute;
    width: 100%;
    color: #fff;
    background-image: linear-gradient(to bottom, transparent, rgba(0, 0, 0, .7));
    left: 0;
    bottom: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}

.tally ul li {
    position: absolute;
    transform-origin: 50% 50%;
}

.main-left-control {
    padding: 5px;
}
</style>
