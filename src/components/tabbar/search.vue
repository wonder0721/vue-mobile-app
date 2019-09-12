<template>
    <div class="search">
        <div>
            <input type="text" placeholder="输入想搜索的内容" style="width:230px;height:35px;">
            <button class="btn btn-info">
                <span class="glyphicon glyphicon-search"></span>&nbsp;搜索
            </button>
        </div>
        
    </div>
</template>

<script>
export default {
    data(){
        return {
            value: '',
        }
    }
}
</script>

<style lang="scss" scoped>
.search{
    padding:5px;
}
</style>>