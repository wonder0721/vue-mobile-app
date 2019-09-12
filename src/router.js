// 路由入口

import VueRouter from 'vue-router'

// 导入对应的路由组件
import index from './components/tabbar/index.vue'
import mumber from './components/tabbar/mumber.vue'
import cart from './components/tabbar/cart.vue'
import search from './components/tabbar/search.vue'
import newsList from './components/news/newsList.vue'
import newsInfo from './components/news/newsInfo.vue'
import picture from './components/picture/pictureList.vue'
import pictureInfo from './components/picture/pictureInfo.vue'
import goodsList from './components/goods/goodsList.vue'
import goodsInfo from './components/goods/goodsInfo.vue'

// 创建路由对象
var routerObj = new VueRouter({
    routes: [
        {path:'/',redirect: '/index'},
        {path:'/index',component: index},
        {path:'/mumber',component: mumber},
        {path:'/cart',component: cart},
        {path:'/search',component: search},
        {path:'/index/newsList',component:newsList},
        {path:'/index/newsList/newsInfo/:id',component:newsInfo},
        {path:'/index/pictureList',component:picture},
        {path:'/index/pictureList/pictureInfo/:id',component:pictureInfo},
        {path:'/index/goodsList',component:goodsList},
        {path:'/index/goodsList/goodsInfo/:id',component:goodsInfo,name:'goodsInfo'}
    ],
    linkActiveClass: 'mui-active',
})

export default routerObj