<!--
核心逻辑：

1. LRC 歌词解析
   - 解析 [mm:ss] 格式时间戳与对应文本
   - 转换为 { times, words } 对象数组
2. 实时歌词同步
   - audio timeupdate 事件获取当前播放时间
   - 遍历查找匹配的歌词索引 (findIndex)
3. 滚动高亮效果
   - 计算 translateY 偏移量实现歌词自动滚动
   - 边界限制防止越界 (minOffset/maxOffset)
   - 当前行 scale(1.5) 放大 + 白色高亮
-->
<template>
    <div class="page-cell2">
        <h2 class="title">{{ music['title'] }}</h2>
        <div class="lrc-box" ref="lrcBox">
            <ul class="lrc-list" ref="lrcList">
                <li v-for="(lrc, index) in lrcArr" :class="lrcIndex === index ? 'active' : ''">{{ lrc.words }}</li>
            </ul>
        </div>

        <div class="audio-box">
            <audio controls id="myAudio" ref="myAudio" @timeupdate="handleTimeUpdate">
                <source src="../../../assets/起风了.mp3" type="audio/mpeg">
            </audio>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import lrcData from '../../../assets/lrcData'

const music = {
    title: '起风了 - 买辣椒也用券',
}

const myAudio = ref()
let lrcList = ref()

// 格式化时间
const parseTime = (time) => {
    let t = time.split(":")
    return +t[0] * 60 + + t[1]
}

// 格式化歌词
const parseLrc = (d) => {
    const lrcLine = d.split('\n')
    return lrcLine.map(e => {
        return {
            times: parseTime(e.split(']')[0].substring(1)),
            words: e.split(']')[1]
        }
    })
}

// 查找歌词数组下标
const findIndex = (lrc, currenTime) => {
    for (let i = 0; i < lrc.length; i++) {
        const e = lrc[i];
        if (e.times > currenTime) {
            return i - 1
        }
    }
    return lrc.length - 1
}

let lrcArr = parseLrc(lrcData)
let lrcIndex = ref()
let lrcBox = ref()
let maxOffset
let minOffset = 300

const handleTimeUpdate = (e) => {
    if (!maxOffset) {
        maxOffset = lrcList.value.clientHeight - lrcBox.value.clientHeight
    }
    lrcIndex.value = findIndex(lrcArr, e.target.currentTime)
    let offSet = (32 * lrcIndex.value)

    if (offSet < minOffset) {
        offSet = 0
    } else if (offSet > maxOffset) {
        offSet = maxOffset
    } else {
        offSet = 32 * lrcIndex.value - 300
    }
    lrcList.value.style.transform = `translateY(${-offSet}px)`;
}
</script>

<style lang="scss" scoped>
.audio-box {
    width: 100%;
    text-align: center;
    margin-top: 20px;
}

.title {
    color: transparent;
    background: linear-gradient(to right, #00aeff, #d40303, #ff6200);
    background-clip: text;
    -webkit-background-clip: text;
    width: fit-content;
    margin: 0 auto;
}

.lrc-box {
    background: #000;
    padding: 20px;
    overflow: hidden;
    width: 100%;
    box-sizing: border-box;
    height: 600px;
    overflow: hidden;
    border-radius: 6px;
}


.lrc-list {
    text-align: center;
    list-style: none;
    transition: all 1s linear;

    li {
        color: #ffffff71;
        list-style: 24px;
        line-height: 32px;

        &.active {
            transform: scale(1.5);
            color: #fff;
        }
    }
}
</style>