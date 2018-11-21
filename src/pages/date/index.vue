<template>
<div  class="contain">
  <div class="dTitle">
    <div  v-for="(item,index) in dateTitle"  v-bind:class="['weekDay',{ 'activeWeek': index==idx}]">{{item}}</div>
  </div>
  <div class="dTitle">
    <div v-for="(item,index) in dateArr" @click="activeMyday(index)"  v-bind:class="['dArr',{ 'activeDay': item==today}]">{{item}}</div>
  </div>
  <div class="loadBox">
  <my-Loading :show="isShow"></my-Loading>
  <div class="resiBox" v-for="(item,index) in conList">
    <div class="top">
      <div class="left">
        <div class="time">{{item.time}}</div>
        <div class="">{{item.name}}</div>
      </div>
      <div class="right">
         <div class="">{{item.status}}</div>
      </div>
    </div>
    <div class="bottom">Welcome , That's how i know you are so stupido </div>
  </div>
</div>

</div>
</template>
<script>
import myLoading from '@/components/loading/loading'
import { setTimeout, clearTimeout } from 'timers'
export default {
  data () {
    return {
       dateTitle:['周一','周二','周三','周四','周五','周六','周日'],
       dateArr:[],
       today:0,
       idx:0,
       isShow: false,
       conList:[
         {time:'10:00 ~ 11:00',name:'Bobby Cico',status:'已预订'},
         {time:'12:00 ~ 13:00',name:'Pietro Mantu',status:'已核销'},
         {time:'14:00 ~ 15:00',name:'Andrea Palani',status:'已取消'}
       ]
    }
  },

  components: {
   myLoading
  },

  methods: {
    getWeekTime() {
        var now = new Date(); 
        var nowTime = now.getTime() ; 
        var day = now.getDay();
        var oneDayLong = 24*60*60*1000 ; 
        this.today = now.getDate();
        this.idx = day-1;
        var monday =new Date( nowTime - (day-1)*oneDayLong ).getDate() + ','; 
        var tuesday =new Date( nowTime - (day-2)*oneDayLong ).getDate() + ','; 
        var wednesday =new Date(  nowTime - (day-3)*oneDayLong).getDate() + ','; 
        var thursday =new Date( nowTime - (day-4)*oneDayLong ).getDate() + ','; 
        var friday =new Date( nowTime - (day-5)*oneDayLong ).getDate() + ','; 
        var saturday =new Date( nowTime - (day-6)*oneDayLong ).getDate() + ','; 
        var sunday =new Date(  nowTime + (7-day)*oneDayLong ).getDate() ; 
        return (monday+tuesday+wednesday+thursday+friday+saturday+sunday).split(',') ;
    },
    activeMyday(index){
      this.idx = index;
      if(a) clearTimeout('a');
       this.isShow=true;
       this.today = this.dateArr[index];
       let _this = this ;
       let a = setTimeout(() => {
          _this.isShow=false;
       }, 500);
    }

  },
  mounted() {
    this.dateArr = this.getWeekTime();
  }
}
</script>

<style lang="less" scoped>
 .contain{
   width:375px;
   min-height:100vh;
   overflow: hidden;
   display:flex;
   flex-direction: column;
   justify-content: flex-start;
   align-items: center;
   background: #e6e6e6;
   .loadBox{
     width:355px;
     height:90vh;
     overflow-y: scroll;
     position: relative;
   }
    .dTitle{
      width:335px;
      display:flex;
      padding: 0 20px;
      justify-content: space-between;
      align-items: center;
      background: white;
      .weekDay{
        font-size: 12px;
        width:34px;
        text-align: center;
        line-height: 20px;
        color:#b7b7b7;
      }
      .dArr{
        font-size: 18px;
        z-index:10000;
        width:34px;
        text-align: center;
        line-height: 36px;
      }
      .activeWeek{
        color:#000;
      }
      .activeDay{
        color:#800000;
        font-weight: bold;
        font-size: 24px;
        margin-top:10px;
        position: relative;
      }
      .activeDay:after{
        content: '';
        width:70px;
        height:50px;
        position: absolute;
        bottom:-10px;
        left:-18px;
       border-radius:0 0 60px 60px;
        background: #fff;
        display: block;
        z-index:-10;
      }
    }
    .resiBox{
       width:315px;
       height:110px;
       padding:20px;
       background: white;
       margin-top:20px;
       border-radius: 7px;
       color:#a8a8a8;
       font-size: 15px;
       .top{
         width:315px;
         height:70%;
         display:flex;
         justify-content: space-between;
         align-items: center;
         border-bottom:1px solid #e8e8e8;
         .left{
            width:50%;
            height:100%;
            display:flex;
            flex-direction: column;
            justify-content: flex-start;
            align-items: flex-start;
            .time{
              font-size: 18px;
              color:#444;
              margin-bottom:15px;
            }
         }
          .right{
            flex:1;
            height:100%;
            display:flex;
            justify-content: flex-end;
            align-items: flex-start;
          }
       }
       .bottom{
         flex:1;
         height:30%;
         line-height: 40px;
         overflow: hidden;
         text-overflow:ellipsis;
         white-space:nowrap;
       }
    }
   }
</style>
