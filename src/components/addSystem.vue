<template>
  <div class="hello">
    <el-button @click="addSystem" type="primary" style="margin:10px">添加应用系统</el-button>
    <el-table :data="listdata">
        <el-table-column prop="applicationCode" label="系统编码">
        </el-table-column>
        <el-table-column prop="applicationName" label="系统名称">
        </el-table-column>
        <el-table-column prop="applicationUrl" label="系统路由">
        </el-table-column>
        <el-table-column prop="address" label="操作">
          <template slot-scope="scope">
            <el-button type="success" plain @click="setSystem(scope.$index, scope.row)">修改</el-button>
            <!-- <el-button>删除</el-button> -->
          </template>
        </el-table-column>
    </el-table>
    <el-dialog title="添加应用系统" :visible.sync="addVisible" width="500px" center>
      <el-form :model="addTreeItem" ref="addTreeItem" label-width="100px" class="demo-ruleForm">
        <el-form-item
          label="系统编码"
          prop="applicationCode"
          :rules="{ required: true, message: '编码不能为空'}"
        >
          <el-input type="text"  maxlength="16" v-model="addTreeItem.applicationCode" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item
          label="系统名称"
          prop="applicationName"
          :rules="{ required: true, message: '名称不能为空'}"
        >
          <el-input type="text"  maxlength="16" v-model="addTreeItem.applicationName" autocomplete="off"></el-input>
        </el-form-item>
        <!-- <el-form-item
          label="系统描述"
          prop="applicationDesc"
          :rules="{ required: true, message: '描述不能为空'}"
        >
          <el-input type="text" maxlength="64" v-model="addTreeItem.applicationDesc" autocomplete="off"></el-input>
        </el-form-item> -->
        <el-form-item
          label="系统Url"
          prop="applicationUrl"
          :rules="{ required: true, message: 'Url不能为空'}"
        >
          <el-input type="text"  maxlength="32" v-model="addTreeItem.applicationUrl" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('addTreeItem')">添加系统</el-button>
          <el-button @click="resetForm('addTreeItem')">重置</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <el-dialog title="修改应用系统" :visible.sync="setVisible" width="500px" center>
      <el-form :model="setTreeItem" ref="setTreeItem" label-width="100px" class="demo-ruleForm">
        <el-form-item
          label="系统编码"
          prop="applicationCode"
          :rules="{ required: true, message: '编码不能为空'}"
        >
          <el-input type="text" maxlength="16" v-model="setTreeItem.applicationCode" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item
          label="系统名称"
          prop="applicationName"
          :rules="{ required: true, message: '名称不能为空'}"
        >
          <el-input type="text" maxlength="16" v-model="setTreeItem.applicationName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item
          label="系统Url"
          prop="applicationUrl"
          :rules="{ required: true, message: 'Url不能为空'}"
        >
          <el-input type="text" maxlength="32" v-model="setTreeItem.applicationUrl" autocomplete="off"></el-input>
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
        applicationCode: '',
        applicationName: '',
        applicationDesc: '',
        applicationUrl: '',
        createUserId: '493980E1627E6D80',
      },
      setTreeItem: {
        applicationCode: '',
        applicationName: '',
        applicationUrl: '',
        userId: '493980E1627E6D80',
      },
      addVisible: false,
      setVisible: false,
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
        .get('/auth/application/list?createUserId=493980E1627E6D80')
        .then((response) => {
          this.listdata = response.data.data;
          console.log(this.listdata);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    // 添加系统
    submitForm(addTreeItem) {
      this.$refs[addTreeItem].validate((valid) => {
        if (valid) {
          axios
            .get('/auth/application/send', { params: this.addTreeItem })
            .then((response) => {
              console.log(response);
              this.addVisible = false;
              this.$notify({
                title: '成功',
                message: `${this.addTreeItem.applicationName}添加成功`,
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
    // 打开修改系统
    setSystem(index, row) {
      this.setTreeItem = Object.assign({
        id: row.id,
        applicationCode: row.applicationCode,
        applicationName: row.applicationName,
        applicationUrl: row.applicationUrl,
      });
      console.log(this.setTreeItem);
      this.setVisible = true;
    },
    // 修改系统
    setForm(setTreeItem) {
      this.$refs[setTreeItem].validate((valid) => {
        if (valid) {
          axios
            .post('/auth/application/update?userId=493980E1627E6D80', this.setTreeItem)
            .then((response) => {
              console.log(response);
              this.setVisible = false;
              this.$notify({
                title: '成功',
                message: `${this.setTreeItem.applicationName}保存成功`,
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
    // 添加系统
    addSystem() {
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
