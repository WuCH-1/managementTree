<template>
  <div class="hello">
    <el-table :data="tableData">
        <el-table-column prop="date" label="日期" width="140">
        </el-table-column>
        <el-table-column prop="name" label="姓名" width="120">
        </el-table-column>
        <el-table-column prop="address" label="地址">
        </el-table-column>
        <el-table-column prop="address" label="地址">
            <!-- <el-button>查看</el-button>
            <el-button>新增</el-button> -->
            <el-button>删除</el-button>
        </el-table-column>
    </el-table>
    <el-dialog title="添加按钮" :visible.sync="addBtnVisible" width="500px" center>
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
    </el-dialog>
    <el-dialog title="添加按钮" :visible.sync="addBtnVisible" width="500px" center>
      <el-row>
        <el-col :span="6" v-for="item in addForm" :key="item.id" style="height:30px;">
          <el-checkbox-group v-model="hasForm">
            <el-checkbox :label="item.btnName">{{item.btnName}}</el-checkbox>
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
    const item = {
      date: '2016-05-02',
      name: '王小虎',
      address: '上海市普陀区金沙江路 1518 弄',
    };
    return {
      tableData: Array(20).fill(item),
      id: 1000,
      setTreeItem: {
        applicationCode: '',
        applicationName: '',
        applicationDesc: '',
        applicationUrl: '',
      },
      addBtnVisible: false,
      listdata: [],
      defaultProps: {
        children: 'childs',
      },
      hasForm: [],
      addForm: [
        {
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
        },
      ],
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
    appendBtnVeiw(data) {
      console.log(data);
      this.addBtnVisible = true;
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
