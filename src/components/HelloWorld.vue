<template>
  <div class="hello">
    <el-form :model="setTreeItem" ref="setTreeItem" label-width="100px" class="demo-ruleForm">
      <el-form-item label="编码" prop="code" :rules="{ required: true, message: '编码不能为空'}">
        <el-input type="text" v-model.number="numberValidateForm.age" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item
        label="名称"
        prop="name"
        :rules="[
          { required: true, message: '名称不能为空'},
        ]"
      >
        <el-input type="text" v-model.number="numberValidateForm.age" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item
        label="描述"
        prop="description"
        :rules="[
          { required: true, message: '描述不能为空'},
        ]"
      >
        <el-input type="text" v-model.number="numberValidateForm.age" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item
        label="url"
        prop="url"
        :rules="[
          { required: true, message: 'url不能为空'},
        ]"
      >
        <el-input type="text" v-model.number="numberValidateForm.age" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('numberValidateForm')">提交</el-button>
        <el-button @click="resetForm('numberValidateForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      numberValidateForm: {
        age: '',
      },
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert('submit!');
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
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
