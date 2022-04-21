<template>
    <header>
        <div class="l-content">
            <el-button plain icon="el-icon-menu" size="mini" @click="handleMenu()"></el-button>
            <!-- <h3 style="color:#fff">首页</h3> -->
            <!-- elementUI的面包屑组件 -->
            <el-breadcrumb separator="/" style="color:#fff">
            <!-- 循环 拿到的store tab.js面包屑数据  tags -->
                <el-breadcrumb-item v-for="item in tags" :key="item.path" :to="{ path: item.path }">{{item.label}}</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="r-content">
            <el-dropdown trigger="click" size="mini">
                <span>
                    <img :src="userImg" alt="" class="user">
                </span>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item command="a">个人中心</el-dropdown-item>
                    <el-dropdown-item command="b" @click.native="logOut">退出</el-dropdown-item>
                </el-dropdown-menu>

            </el-dropdown>
        </div>
    </header>
</template>
<script>
// 拿到 store tab.js中定义的tabsList数组  引入vuex的辅助函数mapState
import { mapState } from 'vuex'
export default {
    name:'CommonHeader',
    data(){
        return{
            userImg:require("../assets/images/user.png")
        }
    },
    methods:{
        handleMenu(){
            this.$store.commit('collapseMenu')
        },
        logOut(){
            this.$store.commit('clearToken')
            this.$store.commit('clearMenu')
            this.$router.push("/login")
        }
    },
    computed:{
        ...mapState({
            tags:state=>state.tab.tabsList //拿到tabsList  表示的是store tab.js中定义面包屑数据
        })
    }
}
</script>
<style lang="less" scoped>
    header{
        display: flex;
        height: 100%;
        justify-content: space-between;
        align-items: center;
    }
    .l-content{
        display: flex;
        align-items: center;
        .el-button{
            margin-right: 20px;
        }
    }
    .r-content{
        .user{
            width: 40px;
            height: 40px;
            border-radius:50% ;
        }
    }

</style>
