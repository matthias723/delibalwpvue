<template>
  <div class="container" @click="clickHandle('test click', $event)">

    <div class="userinfo" >
      <img class="userinfo-avatar"  src="../../../static/delibal.png"  />
      
    </div>
    
    <a @click="bindViewTap" class="counter">Andiamo Adesso</a>
    
  </div>
</template>

<script>
import card from '@/components/card'

export default {
  data () {
    return {
      motto: 'Hello World',
      userInfo: {}
    }
  },

  components: {
    card
  },

  methods: {
    bindViewTap () {
      const url = '../home/main'
      wx.navigateTo({ url })
    },
    getUserInfo () {
      // 调用登录接口
      wx.login({
        success: () => {
          wx.getUserInfo({
            success: (res) => {
              this.userInfo = res.userInfo
            }
          })
        }
      })
    },
    clickHandle (msg, ev) {
      console.log('clickHandle:', msg, ev)
    }
  },

  created () {
    // 调用应用实例的方法获取全局数据
    this.getUserInfo()
  }
}
</script>

<style type="less" scoped>
.container{
  width:100%;
  max-height:100vh;
  overflow: hidden;
}
.userinfo {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.userinfo-avatar {
  width: 150px;
  height: 150px;
  padding:20px;
  background-size:"cover";
  border-radius: 50%;
  /* border:1rpx solid #2d3953; */
}

.userinfo-nickname {
  color: #aaa;
}

.usermotto {
  margin-top: 150px;
}

.form-control {
  display: block;
  padding: 0 12px;
  margin-bottom: 5px;
  border: 1px solid #ccc;
}

.counter {
  display: inline-block;
  margin: 10px auto;
  padding: 5px 10px;
  border: 1px solid #2d3953;
  color:#2d3953;
  border-radius:7px;
  margin-top:200px;
  /* background-image: -webkit-linear-gradient(bottom, rgb(201, 115, 255),#2d3953);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent; */
  /* background: linear-gradient(to right, red, blue); */
  /* -webkit-animation-name: count;
  -webkit-animation-duration: 1200ms;
  -webkit-animation-iteration-count: infinite;
  -webkit-animation-timing-function: linear; */
}
@-webkit-keyframes count{
  0%{border: 1px solid #2d3953;}
  40%{border: 1px solid white;}
  1000%{border: 1px solid #2d3953;}
}
</style>
