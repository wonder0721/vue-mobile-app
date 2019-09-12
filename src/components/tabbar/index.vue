<template>
    <div>
        <swiper :imageList="arr" :fullwidth="true"></swiper>
        <div class="mui-content">
            <ul class="mui-table-view mui-grid-view mui-grid-9">
                <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                    <router-link to="/index/newsList">
                        <span class="mui-icon mui-icon-email"></span>
                        <div class="mui-media-body">新闻资讯</div>
                    </router-link>
                </li>
                <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                    <router-link to="/index/pictureList">
                        <span class="mui-icon mui-icon-image"><span class="mui-badge">5</span></span>
                        <div class="mui-media-body">图片分享</div>
                    </router-link>
                </li>
                <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                    <router-link to="/index/goodsList">
                        <span class="mui-icon mui-icon-download"></span>
                        <div class="mui-media-body">商品购买</div>
                    </router-link>
                </li>
                <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                    <a href="#">
                    <span class="mui-icon mui-icon-chatbubble"></span>
                    <div class="mui-media-body">留言反馈</div></a>
                </li>
                <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                    <a href="#">
                    <span class="mui-icon mui-icon-videocam"></span>
                    <div class="mui-media-body">视频专区</div></a>
                </li>
                <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                    <a href="#">
                    <span class="mui-icon mui-icon-phone"></span>
                    <div class="mui-media-body">联系我们</div></a>
                </li>
            </ul> 
		</div>
    </div>
</template>

<script>
import swiper from '../swiper/swiper.vue'
export default {
    data(){
        return {
            arr: [],
            id: this.$route.params.id
        }
    },
    methods: {
        getData(){
            this.$http.get('getlunbo').then(r => {
                this.arr = r.body.message
            })
        }
    },
    created() {
        this.getData()
    },
    components: {
        swiper,
    }
}
</script>

<style scoped>
.mui-content > .mui-table-view:first-child{
    margin-top: 0;
}
.mui-grid-view.mui-grid-9{
    background-color: #fff;
}
.mui-grid-view.mui-grid-9 .mui-table-view-cell{
    border-right:none;
    border-bottom:none;
}
</style>>