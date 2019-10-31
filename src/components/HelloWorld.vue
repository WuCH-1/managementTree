<template>
  <div class="hello">
    <el-row>
      <el-col :span="8">
        <el-form :model="setTreeItem" ref="setTreeItem" label-width="100px" class="demo-ruleForm">
          <el-form-item
            label="编码"
            prop="applicationCode"
            :rules="{ required: true, message: '编码不能为空'}"
          >
            <el-input type="text" v-model="setTreeItem.applicationCode" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item
            label="名称"
            prop="applicationName"
            :rules="{ required: true, message: '名称不能为空'}"
          >
            <el-input type="text" v-model="setTreeItem.applicationName" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item
            label="描述"
            prop="applicationDesc"
            :rules="{ required: true, message: '描述不能为空'}"
          >
            <el-input type="text" v-model="setTreeItem.applicationDesc" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item
            label="Url"
            prop="applicationUrl"
            :rules="{ required: true, message: 'Url不能为空'}"
          >
            <el-input type="text" v-model="setTreeItem.applicationUrl" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('setTreeItem')">添加系统</el-button>
            <el-button @click="resetForm('setTreeItem')">重置</el-button>
          </el-form-item>
        </el-form>
      </el-col>
      <el-col :span="14">
        <el-tree :data="listdata" node-key="id" :props="defaultProps" :expand-on-click-node="false">
          <span class="custom-tree-node" slot-scope="{ node, data }">
            <span>{{ data.applicationName || data.menuName }}</span>
            <span v-if="data.btnName">
              <el-button type="success" icon="el-icon-star-off" size="mini" plain>{{data.btnName}}</el-button>
            </span>

            <el-button
              v-if="data.menuName&&data.hasChild==0"
              type="primary"
              icon="el-icon-plus"
              @click="() => appendBtn(data)"
              size="mini"
            >添加按钮</el-button>
            <span v-if="data.applicationName|| data.menuName&&data.hasChild!=0">
              <el-button
                type="primary"
                icon="el-icon-plus"
                @click="() => append(data)"
                size="mini"
              >添加</el-button>
              <el-button
                type="danger"
                icon="el-icon-delete"
                @click="() => addBtnVisible = true"
                size="mini"
              >删除</el-button>
            </span>
          </span>
        </el-tree>
      </el-col>
    </el-row>
    <el-dialog title="添加按钮" :visible.sync="addBtnVisible" width="500px" center>
      <el-row>
        <el-col :span="6" v-for="item in addForm" :key="item.id" style="height:30px;">
            <el-checkbox-group v-model="hasForm">
              <el-checkbox  :label="item.btnName" >{{item.btnName}}</el-checkbox>
            </el-checkbox-group>
        </el-col>
      </el-row>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addBtnVisible = false">取 消</el-button>
        <el-button type="primary" @click="addBtn">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import axios from '../utils';

export default {
  data() {
    return {
      id: 1000,
      setTreeItem: {
        applicationCode: '',
        applicationName: '',
        applicationDesc: '',
        applicationUrl: '',
      },
      addBtnVisible: true,
      listdata: [],
      defaultProps: {
        children: 'childs',
      },
      hasForm: [],
      addForm: [{
        id: 'a',
        btnName: '查看',
        btnClazz: '0',
      },
      {
        id: 'b',
        btnName: '编辑',
        btnClazz: '1',
      },
      {
        id: 'c',
        btnName: '保存',
        btnClazz: '2',
      },
      {
        id: 'd',
        btnName: '删除',
        btnClazz: '3',
      },
      {
        id: 'e',
        btnName: '列表搜索',
        btnClazz: '4',
      },
      {
        id: 'f',
        btnName: '列表查询',
        btnClazz: '5',
      },
      {
        id: 'g',
        btnName: '批量修改',
        btnClazz: '6',
      },
      {
        id: 'h',
        btnName: '分配',
        btnClazz: '7',
      },
      {
        id: 'i',
        btnName: '批量分配',
        btnClazz: '8',
      }],
    };
  },
  mounted() {
    this.getTreeList();
  },
  methods: {
    // 获取树结构
    getTreeList() {
      axios
        .get('/auth/appmenubtn/list')
        .then((response) => {
          this.listdata = response.data.data;
          console.log(this.listdata);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    // 添加子节点
    append(data) {
      console.log(data);
      axios
        .post('/auth/menu/send', {
          applicationCode: 'sales',
          menuNo: 'customermanager',
          menuName: '线索查看',
          menuUrl: 'search',
        })
        .then((response) => {
          console.log(response.data.data);
        })
        .catch((error) => {
          console.log(error);
        });

      // const newChild = { id, label: 'testtest', children: [] };
      // if (!data.children) {
      //   this.$set(data, 'children', []);
      // }
      // data.children.push(newChild);
    },
    // 移除当前节点
    remove(node, data) {
      const { parent } = node;
      const children = parent.data.children || parent.data;
      const index = children.findIndex(d => d.id === data.id);
      children.splice(index, 1);
    },
    // 添加系统
    submitForm(setTreeItem) {
      this.$refs[setTreeItem].validate((valid) => {
        if (valid) {
          axios
            .post('/auth/application/send', this.setTreeItem)
            .then((response) => {
              console.log(response);
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
    resetForm(setTreeItem) {
      this.$refs[setTreeItem].resetFields();
    },
    // 添加按钮
    addBtn() {
      this.addBtnVisible = false;
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
