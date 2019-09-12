<template>
    <div>
        <ul class="mui-table-view">
            <li class="mui-table-view-cell mui-media" v-for="item in arr" :key="item.id">
                <router-link :to="'/index/newsList/newsInfo/' + item.id">
                    <img class="mui-media-object mui-pull-left" :src="item.img_url">
                    <div class="mui-media-body">
                        {{ item.title }}
                        <p class='mui-ellipsis'>
                            <span>{{ item.add_time}}</span>
                            <span>点击：{{ item.click }}次</span>
                        </p>
                    </div>
                </router-link>
            </li>
        </ul>
    </div>
</template>

<script>
import { Toast } from 'mint-ui'

export default {

    data(){
        return {
            arr:[],
        }
    },
    methods: {
        getData(){
            this.$http.get('getnewslist').then(r => {
                if (r.body.status === 0){
                    this.arr = r.body.message
                }
                else{
                    Toast('获取信息失败')
                }
            })
        }
    },
    created(){
        this.getData()
    },
}
</script>

<style scoped>
    .mui-ellipsis{
        font-size: 12px;
        color: #1D7BFF;
        display: flex;
        justify-content: space-between;
    }
</style>