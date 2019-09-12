<template>
    <div>
        <mt-swipe :auto="5000">
            <mt-swipe-item v-for="item in imageList" :key="item.id">
                <img :src="item.img" alt="" :class="{'full':fullwidth}">
            </mt-swipe-item>
        </mt-swipe>
    </div>
</template>

<script>
import { Swipe, SwipeItem } from 'mint-ui';
export default {
    props: ['imageList','fullwidth'],
}
</script>

<style lang="scss" scoped>
.mint-swipe{
    height:200px;
}
.mint-swipe img{
    height:100%;
}
.full{
    width:100%;
}
</style>