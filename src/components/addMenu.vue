<template>
  <div class="hello">
    <el-button @click="addMenu" type="primary" style="margin:10px">添加菜单</el-button>
    <el-table :data="listdata"  row-key="id" :tree-props="{children: 'childs'}">
        <el-table-column prop="menuNo" label="菜单编码">
        </el-table-column>
        <el-table-column prop="menuName" label="菜单名称">
        </el-table-column>
        <el-table-column prop="menuUrl" label="菜单路由">
        </el-table-column>
        <el-table-column prop="menuParentNo" label="父菜单编码">
        </el-table-column>
        <el-table-column prop="address" label="操作">
            <template slot-scope="scope">
              <el-button type="success" plain @click="setMenu(scope.$index, scope.row)">修改</el-button>
              <!-- <el-button>删除</el-button> -->
            </template>
        </el-table-column>
    </el-table>
    <el-dialog title="添加菜单" :visible.sync="addVisible" width="600px" center>
      <el-form :model="addTreeItem" ref="addTreeItem" label-width="150px" class="demo-ruleForm">
        <el-form-item
          label="上级应用编码"
          prop="applicationCode"
          required
        >
          <el-select v-model="addTreeItem.applicationCode" placeholder="请选择" @change="(data)=>changeVal(data)">
            <el-option
              v-for="item in MenuData"
              :key="item.id"
              :label="item.applicationName"
              :value="item.applicationCode"
              >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          label="上级菜单编码"
          prop="menuParentNo"
        >
          <el-select v-model="addTreeItem.menuParentNo" clearable placeholder="请选择">
            <el-option
              v-for="item in filterDate"
              :key="item.id"
              :label="item.menuName"
              :value="item.menuNo">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          label="菜单编码"
          prop="menuNo"
          :rules="{ required: true, message: '编码不能为空'}"
        >
          <el-input type="text" :maxlength="16" v-model="addTreeItem.menuNo" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item
          label="名称"
          prop="menuName"
          :rules="{ required: true, message: '名称不能为空'}"
        >
          <el-input type="text" :maxlength="16" v-model="addTreeItem.menuName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item
          label="Url"
          prop="menuUrl"
          :rules="{ required: true, message: 'Url不能为空'}"
        >
          <el-input type="text" :maxlength="32" v-model="addTreeItem.menuUrl" autocomplete="off"></el-input>
        </el-form-item>
        <!-- <el-form-item
          label="是否为非虚拟菜单"
          prop="visiableDisable"
        >
          <el-switch
            v-model="isVisiable"
            active-color="#13ce66"
            inactive-color="#ff4949">
          </el-switch>
        </el-form-item> -->
        <el-form-item>
          <el-button type="primary" @click="submitForm('addTreeItem')">添加菜单</el-button>
          <el-button @click="resetForm('addTreeItem')">重置</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <el-dialog title="修改菜单" :visible.sync="setVisible" width="600px" center>
      <el-form :model="setTreeItem" ref="setTreeItem" label-width="150px" class="demo-ruleForm">
        <!-- <el-form-item
          label="上级应用编码"
          prop="applicationCode"
          required
        >
          <el-select v-model="setTreeItem.applicationCode" placeholder="请选择" @change="(data)=>changeVal(data)">
            <el-option
              v-for="item in MenuData"
              :key="item.id"
              :label="item.applicationName"
              :value="item.applicationCode"
              >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          label="上级菜单编码"
          prop="menuParentNo"
        >
          <el-select v-model="setTreeItem.menuParentNo" clearable placeholder="请选择">
            <el-option
              v-for="item in filterDate"
              :key="item.id"
              :label="item.menuName"
              :value="item.menuNo">
            </el-option>
          </el-select>
        </el-form-item> -->
        <!-- <el-form-item
          label="菜单编码"
          prop="menuNo"
          :rules="{ required: true, message: '编码不能为空'}"
        >
          <el-input type="text" :maxlength="16" v-model="setTreeItem.menuNo" autocomplete="off"></el-input>
        </el-form-item> -->
        <el-form-item
          label="名称"
          prop="menuName"
          :rules="{ required: true, message: '名称不能为空'}"
        >
          <el-input type="text" :maxlength="16" v-model="setTreeItem.menuName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item
          label="Url"
          prop="menuUrl"
          :rules="{ required: true, message: 'Url不能为空'}"
        >
          <el-input type="text" :maxlength="32" v-model="setTreeItem.menuUrl" autocomplete="off"></el-input>
        </el-form-item>
        <!-- <el-form-item
          label="是否为非虚拟菜单"
          prop="visiableDisable"
        >
          <el-switch
            v-model="isVisiable"
            active-color="#13ce66"
            inactive-color="#ff4949">
          </el-switch>
        </el-form-item> -->
        <el-form-item>
          <el-button type="primary" @click="setForm('setTreeItem')">保存</el-button>
          <el-button @click="resetForm('setTreeItem')">重置</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import axios from '../utils';

export default {
  data() {
    return {
      id: 1000,
      addTreeItem: {
        applicationCode: '',
        menuNo: '',
        menuParentNo: '',
        menuName: '',
        createUserId: '493980E1627E6D80',
        menuUrl: '',
        // visiableDisable: '',
      },
      setTreeItem: {},
      isVisiable: false,
      addVisible: false,
      setVisible: false,
      listdata: [],
      MenuData: [],
      filterDate: [],
      filterDates: [],
    };
  },
  mounted() {
    this.getTable();
    axios
      .get('/auth/application/list?createUserId=493980E1627E6D80')
      .then((response) => {
        this.MenuData = response.data.data;
        console.log(this.listdata);
      })
      .catch((error) => {
        console.log(error);
      });
  },
  methods: {
    // 获取列表
    getTable() {
      axios
        .post('/auth/menu/treeMenu')
        .then((response) => {
          this.listdata = response.data.message;
          console.log(this.listdata);
        })
        .catch((error) => {
          console.log(error);
        });
      axios
        .get('/auth/menu/getLevelMenu', { params: { type: 1 } })
        .then((response) => {
          this.filterDates = response.data.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    // 添加菜单
    submitForm(addTreeItem) {
      this.$refs[addTreeItem].validate((valid) => {
        if (valid) {
          // this.addTreeItem.visiableDisable = this.isVisiable ? 1 : 0;
          axios
            .post('/auth/menu/save', this.addTreeItem)
            .then((response) => {
              console.log(response);
              this.addVisible = false;
              this.$notify({
                title: '成功',
                message: `${this.addTreeItem.menuName}添加成功`,
                type: 'success',
              });
              this.getTable();
              this.$refs[addTreeItem].resetFields();
            })
            .catch((error) => {
              console.log(error);
            });
        } else {
          console.log('error submit!!');
        }
        return false;
      });
    },
    // 打开修改菜单
    setMenu(index, row) {
      this.setTreeItem = Object.assign({}, row, { createUser: '493980E1627E6D80', childs: '' });
      console.log(this.setTreeItem);
      this.setVisible = true;
    },
    // 修改菜单
    setForm() {
      this.$refs.setTreeItem.validate((valid) => {
        if (valid) {
          axios
            .get('/auth/menu/update', { params: this.setTreeItem })
            .then((response) => {
              console.log(response);
              this.setVisible = false;
              this.$notify({
                title: '成功',
                message: `${this.setTreeItem.menuName}修改成功`,
                type: 'success',
              });
              this.getTable();
            })
            .catch((error) => {
              console.log(error);
            });
        } else {
          console.log('error submit!!');
        }
        return false;
      });
    },
    // 获取一级菜单
    changeVal(data) {
      this.filterDate = [];
      this.addTreeItem.menuParentNo = '';
      this.filterDates.map((item) => {
        if (item.applicationCode === data) {
          this.filterDate.push(item);
        }
        return false;
      });
    },
    resetForm(addTreeItem) {
      this.$refs[addTreeItem].resetFields();
    },
    // 添加系统
    addMenu() {
      this.addVisible = true;
      this.$nextTick(() => {
        this.$refs.addTreeItem.resetFields();
      });
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style >
.el-select-dropdown__item{
  display: block;
}
.el-tree {
  border: 1px solid #ccc;
  padding: 20px;
  margin-left: 20px;
  border-radius: 20px;
}
.el-tree .el-button {
  margin-left: 20px;
}
.el-tree-node__content {
  height: 50px;
}
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
