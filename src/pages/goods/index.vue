<template>
<div  class="contain">
<popup :isShow="pop"></popup>
  <turntable :list="lists" v-if="!isShow" @changePic="picChange"></turntable>
  <my-Loading :show="isShow"></my-Loading>
 <div class="banBox" v-show="!changing"> 
   <image class="banner" mode="aspectFit" :src="info.url" @load="finished"></image>
 </div>
 <div class="banBox" v-show="changing" > 
   <image class="holy" src="/static/dd.jpg"></image>
 </div>
 <div class="info">
   <div class="name" @click="toDate">{{info.name}}</div>
   <div class="price">{{info.price}}</div>
   <div class="buy" @click="showMOdal">Buy Now</div>
 </div>
 <!-- <div class="goodsBox">
   <div class="good" v-for="(item, index) in lists" :index="index" :key="key">
     <div class="pic" v-bind:style="{ 'background-image': 'url(' + item.url + ')','background-repeat':'no-repeat','background-size':'contain'}"
></div>
     <div class="title">{{item.name}}</div>
   </div> -->
 </div>


</div>
</template>
<script>
import popup from '@/components/popup/popup'
import myLoading from '@/components/loading/loading'
import turntable from '@/components/turntable/turntable'
import { setTimeout } from 'timers'
export default {
  data () {
    return {
      pop: false,
      value1: 0,
      banner:'',
      lists:[],
      isShow:true,
      info:{
        url:'/static/dd.jpg'
      },
      changed:{
        url:'/static/dd.jpg'
      },
      changing:false
    }
  },

  components: {
   myLoading,
   turntable,
   popup
  },

  methods: {
    showMOdal(){
     const url = '../pdp/main'
      wx.navigateTo({ url })
    },
    toDate(){
     const url = '../date/main'
      wx.navigateTo({ url })
    },
    picChange(val){
      this.changing=true;
      let that = this ;
      that.info=that.lists[val]
    },
    finished(e){
        this.changing=false
    },
     getList(){
       let that=this;
       wx.request({
        url: 'https://www.easy-mock.com/mock/5bbebea1655c520148b1a514/delibal/goods', 
        method:'GET',
        header: {
          'content-type': 'application/json' // 默认值
        },
        success (res) {
            console.log(res.data.data)
            that.banner=res.data.data.banner;
            that.lists=res.data.data.list;
            that.info= that.lists[0]
            let timer= setTimeout(function(){that.isShow=false; }, 500);
           clearTimeout('timer')
            // that.$nextTick(function () {
            //   // DOM is now updated
            //   // `this` is bound to the current instance
            // that.isShow=false;
            // })
          }
      })
     },
  },
  mounted  () {
     this.isShow=true;
     this.getList()
  }
  
}
</script>

<style lang="less" scoped>
 .contain{
   width:100%;
   height:100%;
   overflow: hidden;
   display:flex;
   flex-direction: column;
   justify-content: center;
   align-items: center;
   .banBox{
     width:100%;
     height:210px;
    .banner{
      width:100%;
      height:210px;
      background-size: cover;
    }
   }
   .holy{
     width:190px;
     height:43px;
     position:absolute;
     left:50%;
     margin-left:-90px;
     margin-top:102px;
     transition: ease-in-out 200ms;
   }
   .info{
     width:100%;
     height:160px;
     text-align: center;
    padding:15px;
    border-bottom:1px solid #e6e6e6;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    .name{
      width:60%;
      text-align: center;
      font-size: 16px;
      color:#666;
      font-weight:bold;
    }
    .price{
      width:50%;
      text-align: center;
      font-size: 18px;
      font-weight:bold;
      color:#444;
      height:40px;
      line-height: 40px;
    }
    .buy{
      width:130px;
      hieght:40px;
      line-height: 40px;
      text-align: center;
      color:white;
      font-size: 15px;
      font-weight:bolder;
      background: black;
    }
   }
   .goodsBox{
     margin-top:50px;
     width:100%;
     min-height:300px;
     padding: 0 10px;
     display:flex;
     flex-direction:row;
     flex-wrap:wrap ;
     justify-content: space-around;
     align-items: center;
     .good{
       width:40%;
       height:140px;
       display: inline-block;
       margin-bottom:20px;
       display:flex;
      flex-direction:column;
      flex-wrap:wrap ;
      justify-content: space-around;
      align-items: center;
       .pic{
         width:150px;
         min-height:90px;
         max-height:160px;
       }
       .title{
         width:100%;
         font-size:14px;
         font-weight:bold;
         color:#666;
         text-align:Center;
         line-height:30px;
       }
     }
   }
}
</style>
