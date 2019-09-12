<template>
    <div class="newsInfo-container">
        <h1 class=title>{{ newsInfo.title }}</h1>
        <p class="subtitle">
            <span>发表时间:{{ newsInfo.add_time}}</span>
            <span class="mui-icon mui-icon-eye">{{ newsInfo.click }}次</span>
        </p>
        <hr>
        <div v-html="newsInfo.content" class="content"></div>
        <comment :commentid="id"></comment>
    </div>
</template>

<script>
// 导入评论子组件
import comment from '../commentcmp/comment.vue'

export default {
    data(){
        return {
            id: this.$route.params.id,
            newsInfo: {},
        }
    },
    methods: {
        getData(){
            this.$http.get('getnew/' + this.id).then(h => {
                this.newsInfo = h.body.message[0]
            })
        }
    },
    components: {
        comment
    },
    created(){
        this.getData()
    }
}
</script>

<style scoped>
*{
    margin:0;
    padding:0;
}
.newsInfo-container{
    margin:10px
}
.title{
    font-size:16px;
    line-height:20px;
    font-weight:600;
    text-align: left;
    padding-bottom:10px;
    color:#333;
}
.subtitle{
    font-size: 12px;
    text-align: left;
    display:flex;
    justify-content: space-between;
    color:#999999;
}
.content {
    margin-top:8px;
    margin-bottom:8px;
    color:#333;
}
.mui-icon{
    font-size:12px;
    line-height:21px;
}
</style>