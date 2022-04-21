<template>
    <div class="tabs">
        <!-- 循环拿到的 tagsList -->
        <!-- :closable 是否可关闭 判断除了首页以外的都添加删除按钮 -->
        <!-- :effect 主题设置  判断当前路由是否高亮 如果当前路由名称与传进来的路面名称一致显示dark，如果不一致显示plain镂空-->
        <!-- changMenu() 点击跳转路由事件-->
        <!-- @close 删除当前路由显示页面 -->
        <el-tag 
        size="small"
         v-for="(tag,index) in tags" 
         :key="tag.name" 
         :closable="tag.name !== 'home'" 
         :effect="$route.name === tag.name ? 'dark' : 'plain'"
         @click="changeMenu(tag)"
         @close="handleClose(tag,index)"
         >
         {{tag.label}}
         </el-tag>
    </div>
</template>
<script>
// 拿到tabsList  引入vuex的 mapState辅助函数  mapMutations辅助函数
import{ mapState,mapMutations } from 'vuex'
    export default {
        name:"CommonTag",
        data(){
            return{

            }
        },
        computed:{
            ...mapState({
                tags:state=>state.tab.tabsList //拿到tabsList
            })
        },
        methods:{
            ...mapMutations({
                close:'closeTag'
            }),
            changeMenu(item){
                this.$router.push({name : item.name})
            },
            handleClose(tag,index){
                const length = this.tags.length -1  //拿到tag总长度
                this.close(tag)
                if(tag.name!=this.$route.name){//判断当前tag与当前路由是否一致
                    return;
                }
                if(index===length){//判断当前点击的tag是最右侧的  如果相等  点击的就是左右侧的tag 焦点就需要往左移动
                    this.$router.push({ // 然后进行跳转
                        name:this.tags[index-1].name  //往前进行跳转  当前数据的上一位
                    })
                }else{// 如果不相等  就表示点击的是中间  就需要向右进行跳转  向右移动
                    this.$router.push({
                        name:this.tags[index].name //往后进行跳转  当前数据
                    })
                }
            }
        }
    }
</script>
<style lang="less" scoped>
.tabs{
    padding: 20px;
    .el-tag{
        margin-right: 15px;
        cursor: pointer;
    }
}
</style>