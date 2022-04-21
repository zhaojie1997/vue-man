// 引入cookie第三方插件
import Cookie from 'js-cookie'
export default {
    state:{
        isCollapse:false,
        // 初始数据 用来存储每次点击菜单的 路由数据
        tabsList:[
            {
                //存入默认值  默认展示首页
                path:'/', //路径
                name:'home', 
                label:'首页',
                icon:'home' //显示图标名称
            }
        ],
        currentMenu:null, //用来记录当前选中的路由为哪一项
        menu:[

        ]
    },
    mutations: {
        collapseMenu(state){
            state.isCollapse = !state.isCollapse
        },
        selectMenu(state,val){ //用于每次点击左侧菜单来改变 tabsList的默认值    
            if(val.name!='home'){ //判断当前点击的菜单不是首页时
                state.currentMenu = val  //给currentMenu进行赋值  val为传入进来的数据
                const result = state.tabsList.findIndex(item=>item.name===val.name) //当前选中菜单的索引 存不存在  当前的name与 传进来的name相不相等
                if(result === -1){  //如果等于-1 说明不存在  如果不存在就往tabsList 添加数据
                    state.tabsList.push(val)
                }
            }else{ //如果当前选中的菜单是首页  就需要将当前选中的菜单进行chongz
                state.currentMenu=null
            }
        },
        closeTag(state,val){
            const result= state.tabsList.findIndex(item=>item.name===val.name)
            state.tabsList.splice(result,1)
        },
        setMenu(state,val){
            state.menu = val
            Cookie.set('menu',JSON.stringify(val))
        },
        clearMenu(state){
            state.menu = []
            Cookie.remove('menu')
        },
        addMenu(state,router){
            if(!Cookie.get('menu')){
                return
            }
            const menu = JSON.parse(Cookie.get('menu'))
            state.menu =menu
            const menuArray =[]
            menu.forEach(item=>{
                if(item.children){
                    item.children = item.children.map(item=>{
                        item.component = () =>import(`../views/${item.url}`)
                        return item
                    })
                    menuArray.push(...item.children)
                }else{
                        item.component = () =>import(`../views/${item.url}`)
                        menuArray.push(item)
                }
            });
            //路由的动态添加
            menuArray.forEach(item=>{
                router.addRoute('Main',item)
            })
        }
    }
}