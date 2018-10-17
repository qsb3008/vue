<template>
<el-container class="tree-wrapper">
  <el-aside width="200px" class="tree-list">
    <el-tree
      :data="data"
      :props="defaultProps"
      :highlight-current="true"
      :expand-on-click-node="false"
      @node-click="handleNodeClick"></el-tree>
  </el-aside>
  <el-main class="tree-node-content">
      <h3 class="tree-node-title">{{currentNode.pagename}}</h3>
      <div v-for="(val, key) in currentNode" :key="key" v-if="keyList.indexOf(key) > -1">
        <div class="item" v-if="key !== 'operation'"><span class="key">{{key}} :</span> {{val}}</div>
        <div class="item" v-if="key === 'operation' && !(val instanceof Array)">
            <span class="key">操作 :</span>
            <el-button type="text" v-for="(v, k) in val" :key="k">
              {{v}}
            </el-button>
        </div>
      </div>
  </el-main>
</el-container>
</template>

<script>
import Vue from 'vue'
import VueAdsTableTree from 'vue-ads-table-tree'
import cgiService from '../../api/cgiService'
export default {
  data () {
    return {
      data: [],
      defaultProps: {
        children: 'children',
        label: 'lastmodifiedtime'
      },
      currentNode: {},
      keyList: ['pageid', 'pageurl', 'description', 'sort', 'level', 'status', 'creator', 'createtime', 'updatetime', 'operation']
    }
  },
  methods: {
    handleNodeClick (data) {
      Vue.set(this, 'currentNode', data)
    }
  },
  components: {
    VueAdsTableTree
  },
  created () {
    cgiService.PagesOperationPageTree().then(res => {
      this.data = res.data
      Vue.set(this, 'currentNode', this.data[0])
    })
  }
}
</script>

<style lang="scss">
.tree-wrapper{
  height: 100%;
  .tree-list{
    border: 1px solid #eee;
    box-sizing: border-box;
    padding-top: 20px;
  }
  .tree-node-content{
    .key{
      color: #4f515e;
      opacity: 0.55;
      display: inline-block;
      width: 100px;
      text-align: left;
    }
    .tree-node-title{
      height: 32px;
      margin: 0;
    }
    .item{
      padding: 8px 0;
    }
  }
}
</style>
