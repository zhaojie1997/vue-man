// 路由逻辑编写在 router 的index.js 文件夹中

// 1.引入vue
import Vue from "vue";
// 2.引入vue-router
import VurRouter from 'vue-router'

// 3.将vue-router全局引入
Vue.use(VurRouter)

// 5.路由的相关信息 配置
const routes =[
    {
        path:'/', //匹配的路径
        redirect: '/home',
        name:'Main',
        component:() =>import('../views/Main.vue'),  //按需引入对应页面的相关文件夹
        children:[
            // {
            //     path:'/home', //匹配的路径
            //     name:'home',
            //     component:() =>import('../views/home')  //按需引入对应页面的相关文件夹
            // },
            // {
            //     path:'/user', //匹配的路径
            //     name:'user',
            //     component:() =>import('../views/User')  //按需引入对应页面的相关文件夹
            // },
            // {
            //     path:'/mall', //匹配的路径
            //     name:'mall',
            //     component:() =>import('../views/mall')  //按需引入对应页面的相关文件夹
            // },
            // {
            //     path:'/page1', //匹配的路径
            //     name:'page1',
            //     component:() =>import('../views/other/pageOne.vue')  //按需引入对应页面的相关文件夹
            // },
            // {
            //     path:'/page2', //匹配的路径
            //     name:'page2',
            //     component:() =>import('../views/other/pageTwo.vue')  //按需引入对应页面的相关文件夹
            // },
        ]
    },
    {
        path:'/login',
        name:'login',
        component:() =>import('../views/Login/login.vue')
    }
]
// 4.将router进行相关配置
const router = new VurRouter({
    // 路由匹配模式
    mode:'history',
    // 5.传入路由的相关信息
    routes
})
// 6.对外进行暴露 
export default router

// 7.进入min.js中 进行注册router