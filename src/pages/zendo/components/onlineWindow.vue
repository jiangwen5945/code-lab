<script setup>
import { ref, watch } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const currentSrc = ref('')
watch(router.currentRoute,(val, prevVal)=>{
     currentSrc.value = val.meta.src
    console.log('currentSrc', currentSrc.value);

},{
    immediate: true
})
// router.currentRoute.value.meta.src

</script>


<template>
    <div class="page">
        <iframe :src="currentSrc" frameborder="0" style="height: 100%;width: 100%;"></iframe>
    </div>
</template>