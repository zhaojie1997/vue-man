import Vue from 'vue'
import App from './App.vue'
import {
  Button,
  Radio,
  Container,
  Main,
  Header,
  Aside,Menu,
  Submenu,
  MenuItem,
  MenuItemGroup,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Row,
  Card,
  Col,
  Table,
  TableColumn,
  Breadcrumb,
  BreadcrumbItem,
  Tag,
  Form,
  FormItem,
  Input,
  Select,
  Option,
  Switch,
  DatePicker,
  Dialog,
  Pagination,
  MessageBox,
  Message
} from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
// 引入公共样式
import './assets/less/index.less'

// 引入路由
import router from '../router'
// 引入vuex组件通讯的配置文件
import store from '../store'
// 引入axios
import http from 'axios'
// 引入mock
import '../api/mock.js';


Vue.config.productionTip = false
Vue.use(Button)
Vue.use(Radio)

Vue.use(Container)
Vue.use(Main)
Vue.use(Header)
Vue.use(Aside)
Vue.use(Menu)
Vue.use(Submenu)
Vue.use(MenuItem)
Vue.use(MenuItemGroup)
Vue.use(Dropdown)
Vue.use(DropdownMenu)
Vue.use(DropdownItem)
Vue.use(Row)
Vue.use(Card)
Vue.use(Col)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Breadcrumb)
Vue.use(BreadcrumbItem)
Vue.use(Tag)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)
Vue.use(Select)
Vue.use(Option)
Vue.use(Switch)
Vue.use(DatePicker)
Vue.use(Dialog)
Vue.use(Pagination)


Vue.prototype.$confirm = MessageBox.confirm
Vue.prototype.$message = Message

//路由守卫  导航守卫
router.beforeEach((to,from,next)=>{  //beforeEach方法可以实现路由监听  接收一个函数 函数有三个参数 to from next
  store.commit('getToken')//获取token信息 为了防止vue页面刷新后丢失token信息
  const token = store.state.user.token //拿到store中的token
  if(!token && to.name !== 'login'){ //如果token不存在 !token   并且他不是登录页就不让他登录我们的系统 to.name !== 'login'
    next({name:'login'})//返回登录页
  }else if(token && to.name === 'login'){
    next({name: 'home'})
  }else{
    next()//登陆成功
  }
})


// axios 不是插件  使用需要绑定在vue的属性prototype上
Vue.prototype.$http = http

new Vue({
  router, //注册
  store,
  render: h => h(App),
  created(){
    store.commit('addMenu', router)
  }
}).$mount('#app')
