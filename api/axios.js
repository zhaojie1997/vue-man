// axios 二次封装

import axios from 'axios'
import config from '../config'

// 对当前环境变量进行判断
const baseUrl = process.env.NODE_ENV === 'development' ? config.baseUrl.dev : config.baseUrl.pro

// axios工具类
class HttpRequest {
    // 初始化过程
    //  配置axios的相关信息
    // class的constructor方法里边 拿到传入进来的baseUrl 
    constructor(baseUrl){
        // 将baseUrl添加到当前实例的baseUrl上
        this.baseUrl = baseUrl 
    }
    // 初始化完成后 添加一个方法
    getInsideConfig(){  //用于定义axios的相关配置
        const config ={ 
            // 定义一个配置的初始值
            baseUrl: this.baseUrl,
            header:{//请求头的信息

            }
        }
        return config
    }
    // 拦截器
    interceptors (instance){ //instance 是axios的实例
        // 请求或响应被 then 或 catch 处理前拦截它们。

        // 添加请求拦截器
        instance.interceptors.request.use(function (config) {
            // 在发送请求之前做些什么
            return config;
        }, function (error) {
            // 对请求错误做些什么
            return Promise.reject(error);
        });

        // 添加响应拦截器
        instance.interceptors.response.use(function (response) {
            // 对响应数据做点什么
            return response;
        }, function (error) {
            console.log(error,'error')
            // 对响应错误做点什么
            return Promise.reject(error);
        });
    }
    request(options){//后续进行接口请求的时候  调用的 request函数  接收 相关的配置options
        const instance = axios.create() // 对axios实例的创建 
        options ={...this.getInsideConfig(),...options} //调用当前对象并且解构...this.getInsideConfig()  同时将传入进来的参数进行解构...options
        this.interceptors(instance) // 去调用拦截器
        return instance(options) //返回接口请求的结果
    }
}

// 对外暴露类的实例
export default new HttpRequest(baseUrl)

