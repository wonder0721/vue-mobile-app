<template>
    <div class="mui-numbox" data-numbox-min='1' data-numbox-max='10' style="width:110px;height:25px">
        <button class="mui-btn mui-btn-numbox-minus" type="button">-</button>
        <!-- 记得要将父组件传递过来的值用属性绑定的方式调用v-bind -->
        <input id="test" @change="countChange" ref="numBox" class="mui-input-numbox" type="number" :value="goodsCount" readonly/>
        <button class="mui-btn mui-btn-numbox-plus" type="button">+</button>
    </div>
</template>

<script>
import mui from '../../lib/mui/js/mui.js'
export default {
    props: ['goodsCount','goodsid'],
    mounted() {
        mui('.mui-numbox').numbox()
    },
    methods:{
        countChange(){
            // 通过父向子传递方法，子调用方法并传递参数，父获取到子项的数据
            console.log(typeof(this.$refs.numBox.value))
            this.$store.commit('updateGoodsCount',{id:this.goodsid,count:parseInt(this.$refs.numBox.value)})
        }
    },   
}
</script>

style <style lang="scss" scoped>

</style>