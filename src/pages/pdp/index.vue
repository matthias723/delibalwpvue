<template>
<div  class="contain">
  <my-Loading :show="isShow"></my-Loading>
    <movable-area style="height: 350px; width: 375px; background: transparent;position:fixed;left:0;top:0;z-index:70000;">
    <movable-view v-if="showZoom" id="myZoom" @touchstart="start1" @touchmove="move1" @touchend="end1" style="height: 160px; width: 160px; background: rgba(0,0,0,.2);position:absolute;top:50%;left:50%;margin:-80px 0 0 -80px;" scale="true" scale-min="0.5" scale-max="2" x="0" y="0" direction="all" @scale="">
    </movable-view>
  </movable-area>
<div class="banBox" v-if="showPic"> 
   <image class="banner" mode="scaleToFill" :src="banner" @load="finished"></image>
    <!-- <ClipImg imgSrc="banner" @myevent="btnNo"></ClipImg> -->
    <canvas canvas-id="myCanvas" style="width:375px;height:350px;" class="hideCan">
      </canvas>
      <!-- <cover-view  id="myZoom" :style="{transform: 'translate(' + moveX + 'px'+','+moveY+ 'px)'}" class="zoom" @touchstart="start1" @touchmove="move1" @touchend="end1"></cover-view > -->
 </div>
 <div class="banBox" v-else > 
   <!-- <image class="holy" src="/static/dd.jpg"></image> -->
   <view class="">{{text}}<span v-if="!cursor">|</span></view>
 </div>
 <div class="info">
   <div class="buy" @click="chose">upload Now</div>
   <div class="buy" @click="showMypic">save Now</div>
 </div>
 <div class="slipBox">
 <div class="goodsBox">
   <div class="good" v-for="(item, index) in lists" :index="index" :key="index">
     <div class="pic" v-bind:style="{ 'background-image': 'url(' + item.url + ')','background-repeat':'no-repeat','background-size':'contain'}"
></div>
   </div>
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
      x:0,y:0,
      x1:0,
      y1:0,
      xx2:0,
      yy2:0,
      moveX:0,
      moveY:0,
      top:0,
      left:0,
      distance:0,
      pop: false,
      value1: 0,
      banner:'',
      lists:[],
      isShow:true,
      showPic:false,
      showZoom:false,
      w:160,
      h:160,
      info:{
        url:'/static/dd.jpg'
      },
      changed:{
        url:'/static/dd.jpg'
      },
      changing:false,
      text:"",
      cursor:false,
      arr:[]
    }
  },

  components: {
   myLoading,
   turntable,
   popup
  },

  methods: {
      //点击取消
  btnNo: function () {
    this.banner='';
  },
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
       my_carvas.drawImage(val,0,0,375,350);
        my_carvas.draw()   //将之前在绘图上下文中的描述（路径、变形、样式）画到 canvas 中。
        this.showPic= true;
        this.showZoom=true;
    },
    // start:function(ev) {
    //     ev = ev || event;
    //     ev.preventDefault();
    //     console.log("start----",ev)
    //     this.x1=ev.clientX;
    // },
    // move:function(ev) {
    //     ev = ev || event;
    //     ev.preventDefault();
    //     console.log("move----",ev)
    //     this.x2=ev.clientX;
    // },
    // end:function(ev){
    //     ev = ev || event;
    //     ev.preventDefault();
    //     console.log("end----",ev)
    //     if(Math.abs(this.x2-this.x1)>20){
    //       this.distance+= this.x2-this.x1;
    //     }
    // },
    start1:function(ev) {
        ev = ev || event;
        ev.preventDefault();
        // this.x1=ev.clientX;
        // this.y1=ev.clientY;
        console.log("start----",ev,this.x1,this.y1)
        if (ev.clientX < 288 && ev.clientY < 200 && ev.clientX > 0 && ev.clientY > 0) {
          this.x1=ev.clientX;
          this.y1=ev.clientY;
        } else {
          this.x1=288;
          this.y1=ev.clientY;
        }
        
    },
    move1:function(ev) {
        ev = ev || event;
        ev.preventDefault();
        console.log("move----",ev)
        this.xx2=ev.clientX;
        this.yy2=ev.clientY;
    },
    end1:function(ev){
        ev = ev || event;
        ev.preventDefault();
        if(this.xx2!=0 || this.yy2!=0){
          this.moveX+=this.xx2-this.x1;
          this.moveY+=this.yy2-this.y1;
        }
        console.log("-------",this.moveX,this.moveY)
    },
    scaleBack(ev){
      let scale = Number(ev.mp.detail.scale);
       this.w = this.w*scale;
       this.h = this.h*scale;
    },
    showMypic:function(){
      const query = wx.createSelectorQuery();
        query.select('#myZoom').boundingClientRect()
        query.selectViewport().scrollOffset()
        let _this = this ;
        query.exec(function(res){
          _this.top=res[0].top;
          _this.left=res[0].left;
           wx.canvasToTempFilePath({
            x: _this.left,
            y: _this.top,
            width: _this.w,
            height: _this.h,
            destWidth:700,
            destHeight:700,
            quality: 0.99,
            canvasId: 'myCanvas',
            success: (res) => {
              /**
               * 截取成功后可以上传的服务端直接调用
               * wx.uploadFile();
               */
              //成功获得地址的地方
              wx.saveImageToPhotosAlbum({
                  filePath: res.tempFilePath,
                  success(res) {
                    wx.showToast({
                       title: '成功',
                      icon: 'success',
                      duration: 1000
                    })
                   }
                })
              wx.previewImage({
                current: '', // 当前显示图片的http链接
                urls: [res.tempFilePath] // 需要预览的图片http链接列表
              })
            }
          })
        })
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
    show_text:function(key){
    var that = this;
    if(key>=that.arr.length){
      that.twinkle_stop();
      return;
    }
    that.text= that.text + that.arr[key]
    console.log("----text",this.text,this.arr[key],key)
    setTimeout(function () {
      that.show_text(key+1);
    }, 200);
  },
    /**
     * 开始闪烁
     */
    twinkle_start:function(){
      this.run_twinkle = true;
      this.twinkle_cursor();
    },
    /**
     * 停止闪烁
     */
    twinkle_stop:function(){
      this.run_twinkle = false;
      this.cursor=true;
      console.log("----cursor",this.cursor)
    },
    /**
     * 闪烁光标
     */
    twinkle_cursor:function(){
      if(!this.run_twinkle){
        return ;
      }
      var that = this;
      this.cursor= !that.cursor
      setTimeout(function () {
        that.twinkle_cursor();
      }, 200);
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
            that.info= that.lists[0];
            let timer= setTimeout(function(){that.isShow=false; }, 500);
           clearTimeout('timer')
            that.twinkle_start();
            that.show_text(0);
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
     this.text="";
       var that =this;
       this.arr= '现在请上传你的头像吧！'.split('');
       console.log("--arr---",this.arr)
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
     height:350px;
     position: relative;
     text-align:center;
     line-height: 350px;
     font-weight: bolder;
     .zoom{
       width:200px;
       height:200px;
       border: 1px dashed red;
       z-index:52000;
       position: absolute;
       top:50%;
       left:50%;
       margin-top:-100px;
       margin-left:-100px;
       background: rgba(255, 255, 255, .3);
     }
     .hideCan{
            position: fixed;
            top:999999rpx;
        }
    .banner{
      width:100%;
      height:350px;
      background-size: cover;
    }
   }
   .holy{
     width:140px;
     height:43px;
     position:absolute;
     left:50%;
     margin-left:-90px;
     margin-top:52px;
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
   .slipBox{
     width:375px;
     overflow-x:scroll;
     min-height:250px;
     -webkit-overflow-scrolling : touch;
     scroll-behavior: smooth;
     -webkit-scroll-behavior: smooth;
     transition: linear 400ms;
   }
   .goodsBox{
     margin-top:0px;
     width:1000px;
     padding: 0 10px;
     display:flex;
     flex-direction:row;
     flex-wrap:wrap ;
     justify-content: space-around;
     align-items: center;
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
       margin-bottom:50px;
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
