<template>
<div  class="contain">
  <!-- <popup :isShow="pop"></popup>
  <turntable :list="lists" v-if="!isShow" @changePic="picChange"></turntable> -->
  <my-Loading :show="isShow"></my-Loading>
<div class="banBox" v-if="showPic"> 
   <!-- <image class="banner" mode="aspectFit" :src="banner" @load="finished"></image> -->
    <canvas canvas-id="myCanvas" style="width:375px; height: 300px;" :class="{'hideCan':banner==''}">
      </canvas>
      <div class="zoom" @touchstart="start1" @touchmove="move1" @touchend="end1"></div>
 </div>
 <div class="banBox" v-else > 
   <image class="holy" src="/static/dd.jpg"></image>
 </div>
 <div class="info">
   <div class="buy" @click="chose">upload Now</div>
   <div class="buy" @click="showMOdal">save Now</div>
 </div>
 <div class="goodsBox" :style="{transform: 'translateX(' +distance  + 'px)'}" @touchstart="start" @touchmove="move" @touchend="end">
   <div class="good" v-for="(item, index) in lists" :index="index" :key="index">
     <div class="pic" v-bind:style="{ 'background-image': 'url(' + item.url + ')','background-repeat':'no-repeat','background-size':'contain'}"
></div>
   </div>
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
      x1:0,
      x2:0,
      distance:0,
      pop: false,
      value1: 0,
      banner:'',
      lists:[],
      isShow:true,
      showPic:false,
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
    chose(){
      let _this = this ;
       wx.chooseImage({
        count: 1,
        sizeType: ['original', 'compressed'],
        sourceType: ['album', 'camera'],
        success (res) {
        // tempFilePath可以作为img标签的src属性显示图片
          const tempFilePaths = res.tempFilePaths
          console.log("---------",tempFilePaths)
           _this.banner = tempFilePaths[0] ;
           _this.drawImage(tempFilePaths[0]);
            // wx.getImageInfo({
            //   src: tempFilePaths[0],
            //   success (res) {
            //     console.log(res)
            //     console.log(res.height)
            //   }
            // })
          }
        })
    },
    drawImage(val){
       let my_carvas = wx.createCanvasContext('myCanvas',this);
      // canvas.ctx = ctx;
       my_carvas.drawImage(val,0,0,375,280);
        my_carvas.draw()   //将之前在绘图上下文中的描述（路径、变形、样式）画到 canvas 中。
        this.showPic= true;
    },
    start:function(ev) {
        ev = ev || event;
        ev.preventDefault();
        console.log("start----",ev)
        this.x1=ev.clientX;
    },
    move:function(ev) {
        ev = ev || event;
        ev.preventDefault();
        console.log("move----",ev)
        this.x2=ev.clientX;
    },
    end:function(ev){
        ev = ev || event;
        ev.preventDefault();
        console.log("end----",ev)
        if(Math.abs(this.x2-this.x1)>20){
          this.distance+= this.x2-this.x1;
        }
    },
     start1:function(ev) {
        ev = ev || event;
        ev.preventDefault();
        console.log("start----",ev)
    },
    move1:function(ev) {
        ev = ev || event;
        ev.preventDefault();
        console.log("move----",ev)
    },
    end1:function(ev){
        ev = ev || event;
        ev.preventDefault();
        console.log("end----",ev)
    },
    showMOdal(){
      console.log("----fff--")
       this.pop = true ;
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
     height:300px;
     position: relative;
     .zoom{
       width:100px;
       height:100px;
       border: 1px dashed #ccc;
       position:absolute;
       top:50%;
       left:50%;
       z-index:5000;
       background: rgba(255, 255, 255, .3);
       transform: translate(-50%,-50%);
     }
     .hideCan{
            position: fixed;
            top:999999rpx;
        }
    .banner{
      width:100%;
      height:280px;
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
     height:100px;
     margin-top:20px;
     margin-bottom:10px;
     text-align: center;
    border-bottom:1px solid #e6e6e6;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
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
      width:110px;
      hieght:35px;
      line-height: 35px;
      text-align: center;
      color:white;
      font-size: 15px;
      font-weight:bolder;
      background: black;
    }
   }
   .goodsBox{
     margin-top:50px;
     width:1000px;
     min-height:250px;
     padding: 0 10px;
     display:flex;
     flex-direction:row;
     flex-wrap:wrap ;
     justify-content: space-around;
     align-items: center;
     position: absolute;
     left:0;
     bottom:-60px;
     transition: all 1s ;
     .good{
       width:120px;
       height:120px;
       display: inline-block;
       border-radius: 50%;
       overflow: hidden;
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
