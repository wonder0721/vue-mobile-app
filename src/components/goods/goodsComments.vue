<template>
  <div>
      <!-- <h1>goodsComments-----{{ id }}</h1> -->
      <comments :commentid="id"></comments>
  </div>
</template>

<script>
import comments from '../commentcmp/comment.vue'
export default {
    data(){
        return {
            id: this.$route.params.goodsId,
            comments: [],
        }
    },
    components: {
        comments
    }
}
</script>

<style>

</style>