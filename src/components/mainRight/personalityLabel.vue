<template>
<div class="right-label set-x-y">
    <div class="empty">
        <h3><i class="iconfont icon-biaoqian"></i>&nbsp;个性标签</h3>
        <div class="tally">
            <ul class="clear tally-context">
            </ul>
        </div>
    </div>
</div>
</template>

<script>
export default {
    name: "personalityLabel",
    data() {
        return {
            keyword: [
                "骚的一匹",
                "国服第一锐雯",
                "沉着冷静",
                "专业辅助",
                "你个畜生",
                "英勇青铜",
                "小学僧",
                "人头收割机",
                "疾风剑豪",
                "无与伦比",
                "团队毒瘤",
                "上路通关",
                "带妹狂魔",
                "光速QA",
                "秀操作"
            ],
            kind: [
                "#cc3b7c",
                "#ffa436",
                "#b2ff49",
                "#6a72ff",
                "#fa5bff",
                "#4dff3e",
                "#ffb491",
                "#ff3d36",
                "#981aff",
                "#0f61ff",
                "#ebff53",
                "#ffd0aa",
                "#db24ff",
                "#a4a1ff",
                "#513aff",
                "#d5ffca",
                "#ffcfe6",
                "#ff5f91",
                "#ff10eb",
                "#28caff",
                "#a4ffde",
                "#8cff4f",
                "#f493ff",
                "#a7ffa2",
                "#c8abff",
                "#665cff",
                "#ff9054",
                "#ffe332"
            ]
        };
    },
    methods: {},
    mounted() {
        var tallyContext = $(".tally-context");
        var x;
        var y;
        var j;
        var fontSize;
        var deg;
        var elLi;
        for (var i = 0; i < this.keyword.length; i++) {
            elLi = document.createElement("li");
            x = Math.trunc(Math.random() * 170) + 30;
            y = Math.trunc(Math.random() * 150);
            j = Math.trunc(Math.random() * this.kind.length);
            fontSize = Math.trunc(Math.random() * 20) + 5;
            deg = Math.trunc(Math.random() * 360);
            $(elLi).css('display', 'inline-block');
            $(elLi).css("fontSize", fontSize + "px");
            $(elLi).css("color", this.kind[j]);
            $(elLi).css("transform", "rotate(" + deg + "deg)");
            $(elLi).text(this.keyword[i]);
            tallyContext.append(elLi);
        }
    }
};
</script>

<style scoped>
.tally {
    position: relative;
    height: 260px;
}
.tally-context{
    position: absolute;
    top: 50%;
    margin-top: -90px; 
}
h3{
  text-align: left
}
</style>
