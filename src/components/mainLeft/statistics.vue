<!--来访统计-->
<template>
<div class="main-left-statistics set-x-y" style="margin: 0">
    <div id="clock" class="light">
        <div class="display">
            <div class="weekdays"></div>
            <div class="ampm"></div>
            <div class="alarm"></div>
            <div class="digits"></div>
        </div>
    </div>
    <div class="button-holder">
        <a id="switch-theme" class="button">Switch Theme</a>
        <a class="alarm-button"></a>
    </div>

    <div class="overlay">
        <div id="alarm-dialog">
            <h2>Set alarm after</h2>
            <label class="hours">
                    Hours
                    <input type="number" value="0" min="0"/>
                </label>
            <label class="minutes">
                    Minutes
                    <input type="number" value="0" min="0"/>
                </label>
            <label class="seconds">
                    Seconds
                    <input type="number" value="0" min="0"/>
                </label>
            <div class="button-holder">
                <a id="alarm-set" class="button blue">Set</a>
                <a id="alarm-clear" class="button red">Clear</a>
            </div>
            <a class="close"></a>
        </div>
    </div>
    <div class="overlay">
        <div id="time-is-up">
            <h2>Time's up!</h2>
            <div class="button-holder">
                <a class="button blue">Close</a>
            </div>
        </div>
    </div>
    <audio id="alarm-ring" preload>
            <source src="" type="audio/mpeg"/>
            <source src="" type="audio/ogg"/>
        </audio>
</div>
</template>

<script>
export default {
    name: "statistics",
}
</script>

<style scoped>
@import "/css/style.css";

.main-left-statistics {
    height: 54px;
}

.main-message li {
    padding: 0 22px;
    float: left;
}

.ampm {
    display: none;
}

.weekdays {
    display: none;
}
</style>
