<template>
    <div class="main-container">
        <!-- 轮播图组件 -->
        <div class="swiper">
            <swiper :imageList="list" :fullwidth="false"></swiper>
        </div>
        <!-- 购买板块 -->
        <div class="purchase">
            <h1>{{ goodsinfo.title }}</h1>
            <hr>
            <div class="info">
                <p>
                    市场价：<span class="market">￥{{ goodsinfo.market_price }}</span>
                    销售价：<span class="sale">￥{{ goodsinfo.sell_price }}</span>
                </p>
                <div class="count">购买数量：
                    <el-input-number v-model="num" :min="1" :max="goodsinfo.stock_quantity" size='small'></el-input-number>
                </div>
                <p>
                    <button class="btn btn-primary">立即购买</button>
                    <button class="btn btn-danger" @click="addToCart">加入购物车</button>
                </p>
            </div>
        </div>
        <!-- 商品信息板块 -->
        <div class="params">
            <h1>商品参数</h1>
            <hr>
            <div class="info">
                <p>商品货号：{{ goodsinfo.goods_no }}</p>
                <p>上架时间：{{ goodsinfo.add_time }}</p>
                <p>商品库存：{{ goodsinfo.stock_quantity }}件</p>
                <div class="button-box">
                    <button class="btn btn-info btn-block" @click="goDesc(id)">图文介绍</button>
                    <button class="btn btn-default btn-block" @click="goComments(id)">商品评论</button>
                </div>
            </div>
            <hr>
        </div>
        <transition
        @before-enter="beforeEnter"
        @enter="enter"
        @after-enter="afterEnter"
        >
            <div class="ball" v-show="ballFlag" ref="ball"></div>
        </transition>
    </div>
</template>

<script>
import swiper from '../swiper/swiper.vue'
import mui from '../../lib/mui/js/mui.js'
export default {
    data(){
        return {
            id:this.$route.params.id,
            list:[],
            num:1,
            goodsinfo: {},
            ballFlag:false,
        }
    },
    methods: {
        getimages(){
            this.$http.get('getthumimages/' + this.id).then(r => {
                r.body.message.forEach(item => {
                    item.img = item.src
                });
                this.list = r.body.message
            })
        },
        getgoodsInfo(){
            this.$http.get('goods/getinfo/' + this.id).then(r => {
                this.goodsinfo = r.body.message[0]
            })
        },
        goDesc(id){
            this.$router.push({name:'goodsDesc',params:{ goodsId: id }})
        },
        goComments(id){
            this.$router.push({name:'goodsComments',params:{ goodsId: id }})
        },
        addToCart(){
            this.ballFlag = !this.ballFlag
            // 得到对应商品的信息对象
            var goodsObj = {
                id:this.id,
                price:this.goodsinfo.sell_price,
                selected:true,
                count:this.num,
            }
            this.$store.commit('addGoods',goodsObj)
        },
        beforeEnter(el){
            el.style.transform="translate(0,0)"
        },
        enter(el,down){
            var ballPosition = this.$refs.ball.getBoundingClientRect()
            var targetPosition = document.getElementById('target').getBoundingClientRect()
            var x = targetPosition.left - ballPosition.left
            var y = targetPosition.top - ballPosition.top
            // console.log(x,y)
            el.offsetWidth
            el.style.transform=`translate(${x}px,${y}px)`
            el.style.transition="cubic-bezier(.51,-0.44,1,.54) 0.5s all"
            down()
        },
        afterEnter(el){
            this.ballFlag = !this.ballFlag
        },
    },
    created() {
        this.getimages()
        this.getgoodsInfo()
    },
    mounted() {
        mui('.mui-numbox').numbox()
    },
    components: {
        swiper,
    }
}
</script>

<style lang="scss" scoped>
.main-container{
    background-color: #eee;
    overflow: hidden;
    padding:0 10px;
}
.swiper{
    margin:10px 0;
    width:100%;
    box-shadow: 0 0 8px #ccc;
    background-color: #fff;
    text-align: center;
}
.purchase{
    margin:10px 0;
    width:100%;
    box-shadow: 0 0 8px #ccc;
    background-color: #fff;
    h1{
        font-size:16px;
        line-height:24px;
        font-weight:600px;
        padding:5px;
    }
    hr{
        margin:0px;
    }
    .info{
        padding:10px 5px 10px 5px;
        .count{
            color:#333;
            margin-bottom:10px;
        }
        .market{
            text-decoration: line-through;
            font-size:14px;
            margin-right:10px;
            color:#999;
        }
        .sale{
            color:orangered;
            font-size:16px;
            font-weight:600; 
        }
    }
}
.params{
    margin:10px 0;
    width:100%;
    box-shadow: 0 0 8px #ccc;
    background-color: #fff;
    h1{
        font-size:16px;
        line-height:24px;
        font-weight:600px;
        padding:5px;
    }
    hr{
        margin:0px;
    }
    .info{
        padding: 5px;
        
        p{
            color:#999;
            font-size:12px;
            margin: 5px 0 5px 0;
        }
        .button-box{
            margin:10px 0;
        }
    }
}
.ball{
    width:15px;
    height:15px;
    background-color: #f00;
    border-radius: 50%;
    position: absolute;
    top:350px;
    left:160px;
    z-index: 999;
}

</style>