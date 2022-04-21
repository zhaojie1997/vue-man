<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>


export default {
  name: 'App',
  components: {
    
  }
}
</script>

<style>
html,body{
  margin: 0;
  padding: 0;
}
#app {
  height: 100vh;
}
.el-breadcrumb__item:last-child{
  color: #606266 !important;
}
.el-breadcrumb__inner.is-link{
  color: #fff !important;
}
.el-breadcrumb__inner.is-link:hover{
      color: #409EFF !important;
}
</style>
