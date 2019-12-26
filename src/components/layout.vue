
<template>
    <el-container style="height: 100%; border: 1px solid #eee">
        <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
            <el-menu
            class="el-menu-vertical-demo"
            background-color="#545c64">
                <el-menu-item>
                    <router-link to="/system"><i class="el-icon-setting"></i>系统管理</router-link>
                </el-menu-item>
                <el-menu-item>
                    <router-link to="/menu"><i class="el-icon-setting"></i>菜单管理</router-link>
                </el-menu-item>
                <el-menu-item>
                    <router-link to="/button"><i class="el-icon-setting"></i>按钮权限</router-link>
                </el-menu-item>
            </el-menu>
        </el-aside>
        <el-main>
            <router-view></router-view>
        </el-main>
    </el-container>
</template>

<style>
  .el-aside {
    color: #333;
  }
  .el-menu-vertical-demo{
    padding-top:60px;
    width: 100%;
    height: 100%;
    box-sizing:border-box;
  }
  .el-menu-vertical-demo li{width:80%;padding:0 !important;}
  .el-menu-vertical-demo a{font-size: 16px;text-decoration: none;display: block; height: 100%;width:100%;color:#fff !important;}
  .el-menu-vertical-demo .router-link-exact-active i{color:#42b983 !important;}
  .el-menu-vertical-demo .router-link-exact-active{color:#42b983 !important;}
</style>

<script>
export default {
  data() {
    return {
    };
  },
};
</script>
