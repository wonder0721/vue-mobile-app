<template>
    <div class="comment-container">
        <hr>
        <h4 class="mui-icon mui-icon-chat">评论</h4>
        <hr>
        <textarea placeholder="请输入内容，最多100字" cols="20" rows="3" maxlength="100" v-model="commentmsg"></textarea>
        <button class="btn btn-primary btn-block" @click="postData">发表评论</button>
        <div class="comment-list"> 
            <div class="comment-item" v-for="(item,i) in comments" :key="item.add_time">
                <div class="user">
                    {{ i + 1 }}楼&nbsp;&nbsp;用户：{{ item.user_name }}&nbsp;&nbsp;评论时间：2019-08-12
                </div>
                <div class="content">
                    {{ item.content===("" || "undefined")?"评论已删除":item.content }}
                </div>
            </div> 
        </div>
        <button class="btn btn-info btn-block" @click="loadmore">加载更多</button>
    </div>
</template>

<script>
import {Toast} from "mint-ui"
export default {
    data(){
        return {
            comments: [],
            pageindex: 1,
            commentmsg: '',
        }
    },
    methods: {
        getComments(){
            this.$http.get("getcomments/"+this.commentid+"?pageindex="+this.pageindex).then(
                r => {
                    this.comments = this.comments.concat(r.body.message)
                }
            )
        },
        loadmore(){
            this.pageindex++
            this.getComments() 
        },
        postData(){
            if (this.commentmsg.trim().length === 0){
                Toast("输入内容不能为空")
                return
            }
            // 路由传参通过params方式，将url中的id值传到$route.params中使用
            this.$http.post("postcomment/" + this.$route.params.id,{content: this.commentmsg.trim()}).then(
                r => {
                    var obj = {
                        user_name: '匿名用户',
                        add_time: '2019',
                        content: this.commentmsg,
                    }
                    this.comments.unshift(obj)
                    this.commentmsg = ""
                }
            ) 
        }
    },
    // 父组件向子组件传值，将页面的id传给子组件 props是定义在子组件上的
    props: ['commentid'],
    created() {
        this.getComments()
    },
}
</script>

<style scoped>
hr{
    margin-top:10px;
    margin-bottom:10px;
}
.mui-icon,.mui-icon-chat{
    font-size: 20px;
    color:#317EF3;
}
.comment-list{
    margin-top: 10px;
    margin-bottom: 10px;
    border-radius: 5px;
    border:1px solid #ccc;
    overflow: hidden;
}
.comment-item .user{
    height:25px;
    background-color:#ccc;
    font-size:12px;
    line-height: 25px;
}
.comment-item .content{
    min-height:60px;
    line-height:16px;
    font-size:12px;
    background-color:lightgoldenrodyellow;
    text-indent: 2em;
}
textarea{
    font-size:14px;
    margin:0;
}
.comment-container{
    padding:5px;
}
</style>