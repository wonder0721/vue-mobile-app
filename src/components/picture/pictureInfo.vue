<template>
    <div>
        <!-- 顶部信息区域 -->
        <div class="header">
            <h1>{{ imageList.title }}</h1>
            <p class="subtitle">
                <span>发表时间：{{ imageList.add_time }}</span>
                <span>点击次数：{{ imageList.click }}</span>
            </p>
        </div>
        <hr>
        <!-- 缩略图区域 -->
        <div class="main">
            <div class="thumbs">
                <vue-preview :slides="slide1"></vue-preview>
            </div>
            <p v-html="imageList.content"></p>
        </div>
        <!-- 评论子组件 -->
        <comment :commentid="id"></comment>
    </div>
</template>

<script>
import comment from '../commentcmp/comment.vue'
export default {
    data(){
        return {
            id: this.$route.params.id,
            imageList : {},
            slide1: [],
        }
    },
    methods: {
        getimageinfo(){
            this.$http.get('getimageInfo/' + this.id).then(r => {
                this.imageList = r.body.message[0]
            })
        },
        getThumbs(){
            this.$http.get('getthumimages/' + this.id).then(r => {
                r.body.message.forEach(item => {
                    item.w = 600
                    item.h = 400
                    item.msrc = item.src
                });
                this.slide1 = r.body.message
            })
        }
    },
    components: {
        comment,
    },
    created() {
        this.getimageinfo()
        this.getThumbs()
    },   
}
</script>

<style lang="scss" scoped>
.header{
    padding:0 4px 0 4px;
}
h1{
    font-size: 14px;
    color:#317EF3;
    text-align: center;
    line-height: 18px;
    font-weight:600;
    margin: 16px 0 16px 0;
}
.subtitle{
    font-size: 12px;
    display:flex;
    justify-content: space-between;
    margin:0;
}
hr{
    border: 1px solid #ccc;
    margin: 10px 0 10px 0;
}
.main{
    padding: 4px;
}
.main>p{
    color:#333;
    font-size: 12px;
    margin:10px 0 10px 0;
}
.thumbs {
  /deep/ .my-gallery {
    display: flex;
    flex-wrap: wrap;
    figure {
      width: 30%;
      margin: 5px;
      img {
        width: 100%;
        border-radius: 5px;
        box-shadow: 0 0 8px #666;
      }
    }
  }
}
</style>