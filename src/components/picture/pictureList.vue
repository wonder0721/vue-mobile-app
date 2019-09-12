<template>
    <div>
        <div id="slider" class="mui-slider">
            <div id="sliderSegmentedControl" class="mui-scroll-wrapper mui-slider-indicator mui-segmented-control mui-segmented-control-inverted">
                <div class="mui-scroll">
                    <a 
                    :class="['mui-control-item',item.id === 0 ? 'mui-active':'']" 
                    v-for="item in pictureArr" 
                    :key="item.id"
                    @click="getimages(item.id)"
                    >
                        {{ item.title}}
                    </a>
                </div>
            </div>
        </div>

        <ul>
            <router-link 
            v-for="item in list" 
            :key="item.id" :to="'/index/pictureList/pictureInfo/' + item.id"
            tag="li"
            >
                <!-- 将URL懒加载 -->
                <img v-lazy="item.img_url">
                <div class="disc">
                    <div v-text="item.title" class="title"></div>
                    <div v-html="item.content" class="content"></div>
                </div>  
            </router-link>
        </ul>
    </div>
</template>

<script>
import mui from '../../lib/mui/js/mui.js'
export default {
    data() {
      return {
          pictureArr: [],
          list: [],
      }
    },
    methods: {
        getAllCategory(){
            this.$http.get("getimgcategory").then(r => {
                r.body.message.unshift({ title:"全部",id:0 })
                this.pictureArr = r.body.message
            })
        },
        getimages(id){
            this.$http.get('getimages/' + id).then(r => {
                this.list = r.body.message
            })
        }
    },
    created() {
        this.getAllCategory()
        this.getimages(0)
    },
    mounted() {
        mui('.mui-scroll-wrapper').scroll({
            deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
        });
    },
}
</script>

<style scoped>
*{
    touch-action: pan-y;
}
img[lazy=loading] {
  width: 40px;
  height: 300px;
  margin: auto;
}
ul{
    padding:10px;
    list-style:none;
}
.mui-active{
    text-decoration: none;
}
.mui-slider{
    position:fixed;
    top:40px;
}
ul{
    margin-top:38px;
}
ul li{
    margin-bottom:10px;
    position:relative;
    background-color: #ccc;
    box-shadow: 0 0 5px #999;
    text-align: center;
}
.mui-slider{
    background-color:white;
}
.disc{
    width:100%;
    position:absolute;
    bottom:0px;
    color:linen;  
    max-height:84px;
    overflow: hidden;
    background-color:rgba(50, 50, 50, 0.6);
}
.title{
    font-size:14px;
    background-color:rgba(124, 124, 124, 0.7);
}
.content{
    font-size: 12px;
    padding:0 2px 0 2px;
}
</style>