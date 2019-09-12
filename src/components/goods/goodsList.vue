<template>
    <div>
        <div class='wrapper'>
            <!-- <router-link 
            class="block" v-for="item in goodsList" 
            :key="item.id"
            :to="'/index/goodsList/goodsInfo/' + item.id"
            tag="div"
            >
                <img :src="item.img_url" alt="">
                <h1>{{ item.title }}</h1>
                <div class="info">
                    <p>
                        <span class="now">￥{{ item.sell_price }}</span>
                        <span class="old">￥{{ item.market_price }}</span>
                    </p>
                    <p>
                        <span>热卖中</span>
                        <span class="last">剩余：{{ item.stock_quantity }}件</span>
                    </p>
                </div>
            </router-link> -->

            <!-- 编程式导航 -->
            <div
            class="block" v-for="item in goodsList" 
            :key="item.id"
            @click="getDetail(item.id)"
            >
                <img :src="item.img_url" alt="">
                <h1>{{ item.title }}</h1>
                <div class="info">
                    <p>
                        <span class="now">￥{{ item.sell_price }}</span>
                        <span class="old">￥{{ item.market_price }}</span>
                    </p>
                    <p>
                        <span>热卖中</span>
                        <span class="last">剩余：{{ item.stock_quantity }}件</span>
                    </p>
                </div>
            </div>
        </div>
        <mt-button type="primary" size="large" plain @click="loadmore">加载更多</mt-button>
    </div>
</template>

<script>
export default {
    data(){
        return {
            goodsList: [],
            pageindex: 1,
        }
    },
    methods: {
        getgoods(){
            // 直接通过query方式传参
            this.$http.get('getgoods?pageindex='+this.pageindex).then(r => {
                this.goodsList = this.goodsList.concat(r.body.message)
            })
        },
        loadmore(){
            this.pageindex ++
            this.getgoods()
        },
        getDetail(id){
            // 使用js的形式进行路由导航
            // 区分this.$route和this.$router的区别
            // this.$route是路由[参数对象]，params/query都属于它
            // this.$router是路由[导航对象]，用它可以方便的使用js代码实现路由的前进后退URL定位

            // this.$router.push('/index/goodsList/goodsInfo/' + id)
            // 传递对象形式
            this.$router.push({path:'/index/goodsList/goodsInfo/' + id})
            // 命名路由形式???为什么id是数字
            // this.$router.push({name:'goodsInfo',params:{id:id}})
        }
    },
    created() {
        this.getgoods()
    },
}
</script>

<style lang="scss" scoped>
.wrapper{
    display:flex;
    padding:6px;
    justify-content: space-between;
    flex-wrap: wrap;
    .block{
        width:49%;
        border: 1px solid #ccc;
        box-shadow: 0 0 5px #ccc;
        margin:0px 0 6px 0;
        padding:2px;
        display:flex;
        flex-direction: column;
        justify-content: space-between;
        // min-height:280px;
        img{
            width:100%;
        }
    }
    h1{
        font-size: 14px;
        font-weight:600;
    }
    .info{
        background-color: #eee;
        color:#666;
        p{
            margin:0;
            padding:5px;
            .now{
                color:orangered;
                font-size: 16px;
                font-weight:600;
            }
            .old{
                text-decoration: line-through;
                font-size: 12px;
                margin-left:10px;
            }
        }
        p:nth-child(2){
            display:flex;
            justify-content: space-between;
            font-size: 12px;
        }
    }
}
</style>