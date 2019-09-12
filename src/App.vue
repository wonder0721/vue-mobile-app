// 组件入口

<template>
    <div class="app-container">
        <div class="header">
            <mt-header fixed title="WONDER">
                <mt-button icon="back" slot="left" @click="back" v-show="backflag">返回</mt-button>
                <mt-button icon="more" slot="right" @click="flag=!flag"></mt-button>
            </mt-header>
            <div class="card" v-show="flag">
                <p>扫一扫</p>
                <hr>
                <p>分享到</p>
                <hr>
                <p>我的消息</p>
                <hr>
                <p>个人资料</p>
            </div>
        </div>
        
        <div class="main">
            <transition>
                <router-view></router-view>
            </transition>
        </div> 

        <div class="footer">
            <nav class="mui-bar mui-bar-tab">
                <router-link class="mui-tab-item-ljl" to="/index">
                    <span class="mui-icon mui-icon-home"></span>
                    <span class="mui-tab-label">首页</span>
                </router-link>
                <router-link class="mui-tab-item-ljl" to="/mumber">
                    <span class="mui-icon mui-icon-contact"></span>
                    <span class="mui-tab-label">会员</span>
                </router-link>
                <router-link class="mui-tab-item-ljl" to="/cart">
                    <span class="mui-icon mui-icon-extra mui-icon-extra-cart"><span class="mui-badge">{{ $store.getters.getTotalCount }}</span></span>
                    <span class="mui-tab-label">购物车</span>
                </router-link>
                <router-link class="mui-tab-item-ljl" to="/search">
                    <span class="mui-icon mui-icon-search"></span>
                    <span class="mui-tab-label">搜索</span>
                </router-link>
            </nav>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return {
            flag: false,
            backflag: false,
        }
    },
    methods: {
        back(){
            // console.log(this)
            this.$router.go(-1)
        }
    },
    created() {
        if (this.$route.path !== '/index'){
            this.backflag = true
        }
    },
    watch:{
        "$route.path": function(newvalue){
            if(newvalue == '/index'){
                this.backflag = false
            }
            else{
                this.backflag = true
            }
        }
    }
}
</script>

<style lang="scss" scoped>

/deep/.header{
    z-index: 99;
    .mint-header{
        background-color: #337AB7;
    }
    label{
        font-weight:400;
        margin:0;
    }
    .card{
        width:100px;
        height:150px;
        background-color: #E6E6E6;
        position:fixed;
        right:2px;
        top:40px;
        z-index: 9999;
        border-radius: 5px;
        padding:10px;
        hr{
            margin:5px 0;
        }
        p{
            margin:5px 0;
            color:#333;
            padding:0 5px;
        }
    }
}
.card::before{
    content:'';
    background-color: #E6E6E6;
    width:8px;
    height:8px;
    position: absolute;
    transform: rotate(45deg);
    right:15px;
    top:-4px;
}
.main{
    padding-top: 40px;
    padding-bottom: 50px;
}
.v-enter{
    opacity:0;
    transform: translateX(100%);
}
.v-leave-to{
    opacity:0;
    transform: translateX(-100%);
    position:absolute;
}
.v-enter-active,.v-leave-active{
    transition:all 0.5s ease;
}
.app-container{
    overflow-x: hidden;
}
/* ...... */
.mui-tab-item-ljl{
    display: table-cell;
    overflow: hidden;

    width: 1%;
    height: 50px;

    text-align: center;
    vertical-align: middle;
    white-space: nowrap;
    text-overflow: ellipsis;

    color: #929292;
}
.mui-bar-tab .mui-tab-item-ljl.mui-active
{
    color: #007aff;
}
.mui-bar-tab .mui-tab-item-ljl .mui-icon
{
    top: 3px;

    width: 24px;
    height: 24px;
    padding-top: 0;
    padding-bottom: 0;
}
.mui-bar-tab .mui-tab-item-ljl .mui-icon ~ .mui-tab-label
{
    font-size: 11px;

    display: block;
    overflow: hidden;

    text-overflow: ellipsis;
}
.mui-bar-tab .mui-tab-item-ljl .mui-icon:active
{
    background: none;
}
</style>