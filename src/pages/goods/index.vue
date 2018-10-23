<template>
<div class="contain">
  <my-Loading :show="isShow"></my-Loading>
 <div class="banner"> <image :src="banner" /></div>
 <div class="goodsBox">
   <div class="good" v-for="(item, index) in lists" :index="index" :key="key">
     <!-- <div ><image :src="item.url" /></div> -->
     <div class="pic" v-bind:style="{ 'background-image': 'url(' + item.url + ')','background-repeat':'no-repeat','background-size':'contain'}"
></div>
     <div class="title">{{item.name}}</div>
   </div>
 </div>


</div>
</template>

<script>
import myLoading from '@/components/loading/loading'
export default {
  data () {
    return {
      value1: 0,
      banner:'',
      lists:[],
      isShow:true
    }
  },

  components: {
   myLoading
  },

  methods: {
     getList(){
       console.log('sadsd',this)
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
            that.lists=res.data.data.list
            let timer= setTimeout(function(){that.isShow=false; }, 500);
           clearTimeout('timer')
            // that.$nextTick(function () {
            //   // DOM is now updated
            //   // `this` is bound to the current instance
            //   console.log("递四方速递")
            // that.isShow=false;
            // })
          }
      })
     },
  },

  mounted  () {
    this.getList()
  }
  
}
</script>

<style lang="less" scoped>
 .contain{
   width:100%;
   height:100%;
   overflow-x: hidden;
   display:flex;
   flex-direction: column;
   justify-content: center;
   align-items: center;
   .banner{
     width:100%;
     height:235px;
     image{
       width:100%;
       height:100%
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
