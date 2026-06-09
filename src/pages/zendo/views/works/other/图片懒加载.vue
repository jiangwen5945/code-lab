<template>
    <div class="page-cell">
        <div class="waterfall">
            <img :src="item" v-for="item in imgList" :key="item" />
        </div>

        <div class="loading" ref="loading">
            <el-icon size="30" color="#0000ff" class="spin-animation">
                <Loading />
            </el-icon>
        </div>
    </div>
</template>

<script setup>
import { onMounted, reactive, onUnmounted } from 'vue';

const randomStr = () => {
    return Math.random().toString(36).substring(2)
}

const randomSize = () => {
    const sizeArr = ['200/250', '200/300', '200/350', '200/400', '200/450', '200/500']
    const randomIndex = Math.floor(Math.random() * sizeArr.length);
    return sizeArr[randomIndex]
}

const randomImg = () => 'https://picsum.photos/' + randomSize() + '?random=' + randomStr()

const getRandomImg = (count = 15) => {
    const temp = []
    for (let i = 0; i < count; i++) {
        temp.push(randomImg())
    }
    return temp
}
const imgList = reactive([])
console.log('imgList', imgList);

const ob = new IntersectionObserver(entries => {
    if (entries[0].isIntersecting) {
        console.log('开始加载...');
        imgList.push(...getRandomImg())
        console.log('imgList', imgList);

    }
}, {
    threshold: 0
})



onMounted(() => {
    const loading = document.querySelector('.loading')
    console.log(loading)
    ob.observe(loading)
})

// 断开所有观察
onUnmounted(() => {
    ob.disconnect()
})

</script>

<style lang="scss" scoped>
.waterfall {
    column-count: 5;
    column-gap: 10px;
}

.waterfall img {
    width: 100%;
    min-height: auto;
    margin-bottom: 10px;
}

.loading {
    text-align: center;

    .spin-animation {
        animation: spin 2s linear infinite;
    }

    @keyframes spin {
        from {
            transform: rotate(0deg);
        }

        to {
            transform: rotate(360deg);
        }
    }
}
</style>
