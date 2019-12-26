<template>
  <div class="hello">
    <el-button @click="addBtn" type="primary" style="margin:10px">添加按钮</el-button>
    <el-table :data="listdata">
        <el-table-column prop="btnNo" label="按钮编码">
        </el-table-column>
        <el-table-column prop="btnName" label="按钮名称">
        </el-table-column>
        <el-table-column prop="menuNo" label="菜单编码">
        </el-table-column>
        <el-table-column prop="address" label="操作">
          <template slot-scope="scope">
            <el-button type="success" plain @click="setBtn(scope.$index, scope.row)">修改</el-button>
            <!-- <el-button>删除</el-button> -->
          </template>
        </el-table-column>
    </el-table>
    <el-dialog title="添加按钮" :visible.sync="addVisible" width="500px" center>
      <el-form :model="addTreeItem" ref="addTreeItem" label-width="120px" class="demo-ruleForm">
        <el-form-item
          label="上级菜单编码"
          prop="menuNo"
          required
        >
          <el-select v-model="addTreeItem.menuNo" placeholder="请选择">
            <el-option
              v-for="item in filterDates"
              :key="item.id"
              :label="item.menuName"
              :value="item.menuNo"
              >
            </el-option>
          </el-select>
        </el-form-item>
        <!-- <el-form-item
          label="上级菜单编码"
          prop="menuNo"
          :rules="{ required: true, message: '上级菜单编码不能为空'}"
        >
          <el-input type="text"  maxlength="16" v-model="addTreeItem.menuNo" autocomplete="off"></el-input>
        </el-form-item> -->
        <el-form-item
          label="按钮编码"
          prop="btnNo"
          :rules="{ required: true, message: '编码不能为空'}"
        >
          <el-input type="text"  maxlength="16" v-model="addTreeItem.btnNo" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item
          label="按钮名称"
          prop="btnName"
          :rules="{ required: true, message: '名称不能为空'}"
        >
          <el-input type="text"  maxlength="16" v-model="addTreeItem.btnName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item
          label="按钮大类"
          prop="btnClass"
          :rules="{ required: true, message: '按钮大类不能为空'}"
        >
          <el-input type="text"  maxlength="16" v-model="addTreeItem.btnClass" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('addTreeItem')">添加按钮</el-button>
          <el-button @click="resetForm('addTreeItem')">重置</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <el-dialog title="修改应用系统" :visible.sync="setVisible" width="500px" center>
      <el-form :model="setTreeItem" ref="setTreeItem" label-width="100px" class="demo-ruleForm">
        <el-form-item
          label="按钮编码"
          prop="btnNo"
          :rules="{ required: true, message: '编码不能为空'}"
        >
          <el-input type="text"  maxlength="16" v-model="setTreeItem.btnNo" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item
          label="按钮名称"
          prop="btnName"
          :rules="{ required: true, message: '名称不能为空'}"
        >
          <el-input type="text"  maxlength="16" v-model="setTreeItem.btnName" autocomplete="off"></el-input>
        </el-form-item>
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
        btnNo: '',
        btnName: '',
        btnClass: '',
        menuNo: '',
        createUserId: '493980E1627E6D80',
      },
      setTreeItem: { createUser: '493980E1627E6D80' },
      addVisible: false,
      setVisible: false,
      MenuData: {},
      listdata: [],
    };
  },
  mounted() {
    this.getTable();
  },
  methods: {
    // 获取列表
    getTable() {
      axios
        .post('/auth/button/listButton')
        .then((response) => {
          this.listdata = response.data.data;
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });
      axios
        .get('/auth/menu/getLevelMenu', { params: { type: 2 } })
        .then((response) => {
          this.filterDates = response.data.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    // 添加按钮
    submitForm(addTreeItem) {
      this.$refs[addTreeItem].validate((valid) => {
        if (valid) {
          axios
            .post('/auth/button/save', this.addTreeItem)
            .then((response) => {
              console.log(response);
              this.addVisible = false;
              this.$notify({
                title: '成功',
                message: `${this.addTreeItem.btnName}添加成功`,
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
    // 打开修改按钮
    setBtn(index, row) {
      this.setTreeItem = Object.assign({}, row, { createUser: '493980E1627E6D80' });
      console.log(this.setTreeItem);
      this.setVisible = true;
    },
    // 修改按钮
    setForm(setTreeItem) {
      this.$refs[setTreeItem].validate((valid) => {
        if (valid) {
          axios
            .post('/auth/button/update', this.setTreeItem)
            .then((response) => {
              console.log(response);
              this.setVisible = false;
              this.$notify({
                title: '成功',
                message: `${this.setTreeItem.btnName}修改成功`,
                type: 'success',
              });
              this.getTable();
              this.$refs[setTreeItem].resetFields();
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
    resetForm(addTreeItem) {
      this.$refs[addTreeItem].resetFields();
    },
    // 添加按钮
    addBtn() {
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
