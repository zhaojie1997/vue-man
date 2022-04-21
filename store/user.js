// 引入token第三方依赖
import Cookie from 'js-cookie'
export default{
    state: {
        token:''  //定义token  默认空的字符串
    },
    mutations: { //用于改变token
        setToken(state,val){ //设置token
            state.token = val
            Cookie.set('token',val)
        },
        clearToken(state){ //清除token
            state.token = ""
            Cookie.remove('token')
        },
        getToken(state){//获取token
            state.token =state.token || Cookie.get('token') //如果当前的缓存中有token 就直接获取  如果没有就从state中获取
        }
    }
}