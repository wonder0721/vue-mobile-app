<template>
  <div class="desc-container">
      <!-- <h1>goodsDesc ----- {{ id }}</h1> -->
      <h1>{{ info.title }}</h1>
      <hr>
      <div v-html="info.content"></div>
  </div>
</template>

<script>
export default {
    data(){
        return {
            id:this.$route.params.goodsId,
            info:{}
        }
    },
    methods: {
        getInfo(){
            this.$http.get('goods/getdesc/' + this.id).then(r => {
                this.info = r.body.message[0]
            })
        }
    },
    created() {
        this.getInfo()
    },
}
</script>

<style lang="scss">
.desc-container{
    padding:8px 8px;
    color:#007ACC;
    text-align: center;
    h1{
        font-size: 18px;
    }
    img{
        width:100%;
    }
}

</style>