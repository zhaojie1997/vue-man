// 调用 class例


import axios from './axios'
// 接口的调用
export const getMenu = (param) =>{
    return axios.request({
        url:'/permission/getMenu',//接口的相关地址
        method:'post',//接口类型
        data:param  //传入的参数
    })
}

export const getData = () =>{
    return axios.request({
        url:'./home/getData',//接口的相关地址
    })
}
export const getUser=(params)=>{
    return axios.request({
        url:'./user/getUser',//接口的相关地址
        methods: 'get',
        params
    })
}
