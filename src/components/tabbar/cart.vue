<template>
    <div class="mian-container">
        <div class="top" v-for="(item,i) in goodsArr" :key="item.id">
            <mt-switch v-model="$store.getters.getStatus[item.id]" @change="changeSwitch(item.id)"></mt-switch>
            <img :src="item.thumb_path" alt="">
            <div class="sell_info">
                <h4>{{ item.title }}</h4>
                <div class="selector">
                    <span>￥{{ item.sell_price }}</span>
                    <!-- 如何获取购物车中商品的个数呢？ -->
                    <inputnum :goodsCount="$store.getters.getGoodsCount[item.id]"  :goodsid="item.id"></inputnum>
                    <span @click.prevent="remove(item.id,i)">删除</span>
                </div>
            </div>
        </div>
        <div class="bottom">
            <div class="left">
                <p>总计（不含运费）：</p>
                <p>已勾选商品<span>{{ this.$store.getters.countAll.count }}</span>件，总价：<span>￥{{ this.$store.getters.countAll.price }}</span></p>
            </div>
            <div class="right">
                <button class="btn btn-danger">去结算</button>
            </div>
        </div>
    </div>
</template>

<script>
import inputnum from '../inputnumber/inputnumber.vue'
export default {
    data(){
        return {
            value1:true,
            goodsArr:[],
            ids:'',
        }
    },
    methods:{
        getGoodsArr(){
            var arr = []
            this.$store.state.cart.forEach(item => {
                arr.push(item.id)
            });
            if (arr.length == 0){
                return
            }
            this.ids = arr.join(',')
            this.$http.get('goods/getshopcarlist/' + this.ids).then(function(r){
                this.goodsArr = r.body.message
            })
        },
        remove(id,index){
            // 删除渲染到页面上的数据
            this.goodsArr.splice(index,1)
            // 删除本地存储中数组中的数据
            this.$store.commit('removeGoods',id)
        },
        changeSwitch(id){
            this.$store.commit('changeStatus',id)
        }
    },
    components:{
        inputnum,
    },
    created() {
        this.getGoodsArr()
    },
}
</script>

<style lang="scss" scoped>
.mian-container{
    padding:0 10px;
    background-color: #eee;
    overflow: hidden;
}
.top,.bottom{
    margin:10px 0;
    padding:0 2px;
    width:100%;
    box-shadow: 0 0 8px #ccc;
    background-color: #fff;
}
.top{
    min-height:80px;
    display:flex;
    justify-content: space-around;
    align-items: center;
    img{
            width:55px;
            height:55px;
            margin-left:5px;
        }
    .sell_info{
        max-width:220px;
        margin-left:5px;
        display:flex;
        flex-direction: column;
        justify-content: space-around;
        box-sizing: border-box;
        h4{
            font-size:12px;
            font-weight:600;
            color:r#333;
            // margin:20px 0;
        }
        .selector{
            display:flex;
            justify-content: space-around;
            height:35px;
            font-size:12px;
            margin:0;
            text-align: center;
            span:first-of-type{
                color:red;
                font-weight:600;
            }
            span:last-of-type{
                color:blue;
            }
        }
    }
}
.bottom{
    display:flex;
    justify-content: space-around;
    align-items: center;
    height:80px;
    span{
        color:red;
        font-weight:600;
    }
}
</style>>