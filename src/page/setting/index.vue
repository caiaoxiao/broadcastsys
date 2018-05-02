<template>
  <div>
    <header>
      <div class="user">
        <div @click="returnSystem()"><i class="fa fa-reply"></i> 返回系统</div>
      </div>
      <div class="sysName">
        <div><i class="fa fa-cogs"></i>系统管理</div>
      </div>
      <ul class="settingMenu" @tab-click="tabClick">
        <li class="li-tab"
            v-for="(item,index) in tabsParam"
            @click="toggleTabs(index)"
            :class="{selected:index==nowIndex}">
          <div>{{item}}</div></li>
      </ul>
    </header>
    <user v-show="nowIndex===0"></user>
    <userGroup v-show="nowIndex===1"></userGroup>
    <device v-show="nowIndex===2"></device>
    <deviceGroup v-show="nowIndex===3"></deviceGroup>
    <Organization v-show="nowIndex===4"></Organization>
  </div>
</template>
<script>
  import user from './user/index.vue'
  import userGroup from './userGroup/index.vue'
  import device from './device/index.vue'
  import deviceGroup from './deviceGroup/index.vue'
  import Organization from './Organization/index.vue'
  export default {
    data() {
      return{
        nowIndex:0,
        tabsParam:['用户管理','用户组管理','设备管理','设备组管理','机构管理']
      }
    },
    components: {
      user,
      userGroup,
      device,
      deviceGroup,
      Organization
    },
    methods: {
      toggleTabs:function(index){
        this.nowIndex=index;
      },
      returnSystem(){
        this.$router.push('/');
      }
    }
  }
</script>
