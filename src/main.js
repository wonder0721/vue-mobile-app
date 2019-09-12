// main.js 是我们项目的js入口文件

import Vue from 'vue'

// 导入App组件
import App from './App.vue'

// 导入路由组件
import VueRouter from 'vue-router'
Vue.use(VueRouter)

// 导入自己的路由模块
import './router.js'

// 导入vue-resource模块
import VueResource from 'vue-resource'
Vue.use(VueResource)
Vue.http.options.root = 'http://www.liulongbin.top:3005/api'

// 导入Mint-ui组件
import Mint from 'mint-ui'
import 'mint-ui/lib/style.css'
Vue.use(Mint)

// 导入bootstrap样式表
import 'bootstrap/dist/css/bootstrap.css'
// 导入mui样式表，用法和bs没有区别
import './lib/mui/css/mui.css'
import './lib/mui/css/icons-extra.css'
import routerObj from './router.js';

// 导入element-ui组件
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI)

// 导入vue-preview组件
import VuePreview from 'vue-preview'
Vue.use(VuePreview)

// 导入vuex插件
import Vuex from 'vuex'
Vue.use(Vuex)

var cart = JSON.parse(localStorage.getItem('cart') || '[]')

// 定义store对象
var store = new Vuex.Store({
    // 获取vuex中的数据用this.$store.state.***
    state:{
        cart,
    },
    // 调用方法用this.$store.commit('fn')
    mutations:{
        // 第一个参数固定是state，第二个参数是传递进来的数据，最多只能传递这两个形参
        addGoods(state,obj){
            var flag = false
            state.cart.some(function(item){
                if (item.id === obj.id){
                    item.count += obj.count
                    flag = true
                    return true
                }
            })
            if (!flag) {
                state.cart.push(obj)
            }
            // 当cart更新之后将cart数组保存到本地存储中，下一次进入页面的时候读取
            localStorage.setItem('cart',JSON.stringify(state.cart))
        },
        updateGoodsCount(state,obj){
            state.cart.some(item => {
                if (item.id == obj.id) {
                    // 为什么会出现数据类型不同的问题呢
                    // console.log(typeof(item.id),typeof(obj.id))
                    item.count = obj.count
                    return true
                }
            })
            localStorage.setItem('cart',JSON.stringify(state.cart))
        },
        removeGoods(state,id){
            state.cart.some((item,i) => {
                if(item.id == id){
                    state.cart.splice(i,1)
                    return  true
                }
            })
            localStorage.setItem('cart',JSON.stringify(state.cart))
        },
        changeStatus(state,id){
            state.cart.some(item => {
                if (item.id == id) {
                    console.log(state.cart)
                    item.selected = !item.selected
                    return true
                }
            })
            localStorage.setItem('cart',JSON.stringify(state.cart))
        }
    },
    // 相当于计算属性 也相当于过滤器
    // 调用方法：this.$store.getters.fn
    getters:{
        getTotalCount(state){
            var sum = 0
            state.cart.forEach(function(item){
                sum += parseInt(item.count)
            })
            return sum
        },
        getGoodsCount(state){
            var o = {}
            state.cart.forEach(item => {
                o[item.id] = item.count
            })
            // console.log(o)
            return o
        },
        getStatus(state){
            var o = {}
            state.cart.forEach(item => {
                o[item.id] = item.selected
            })
            return o
        },
        countAll(state){
            var obj = {count:0,price:0}
            state.cart.forEach(item => {
                if (item.selected){
                    obj.count += item.count
                    obj.price += item.price * item.count
                }   
            })
            return obj
        }
    },
})

var vm = new Vue({
    el: '#app',
    data: {
        msg: 123,
    },
    router: routerObj,
    // 使用render函数渲染
    render: h => h(App),
    store:store,
})