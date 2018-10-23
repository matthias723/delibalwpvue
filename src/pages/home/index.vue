<template>
<div class="contain">
<my-Loading :show="isShow"></my-Loading>
 <swiper class="swiper"  autoplay="true" interval="3000" duration="800" circular="true" @change="intervalChange">
    <block v-for="(item, index) in movies" :index="index" :key="key">
        <swiper-item>
            <image :src="item.url" class="slide-image" mode="aspectFill"/>
        </swiper-item>
    </block>
</swiper>

<div class="scroll-part">
<div class="pic-des"  v-for="(item, index) in subject" v-if="index==value1">
<div  class="pic-content">{{item.title}}</div>
<div  class="pic-content1">{{item.subtitle}}</div>
<div class="content-fun top" @click="goList">SHOP NOW</div>
</div>
<div class="dot">
   <div  v-for="(item, index) in subject" :class="{'active':index==value1}"></div>
</div>
 

<div class="content">
   <div class="content-box" v-for="(item, index) in lists">
      <div class="content-img"><image :src="item.url"/></div>
      <div class="content-des">
         <div class="title">{{item.title}}</div>
         <div class="detail">{{item.detail}}</div>
      </div>
      <div class="content-fun" @click="goList">SHOP NOW</div>
   </div>
   
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
      movies:['vv'],
      subject:[],
      lists:[],
      isShow:true
    }
  },

  components: {
   myLoading
  },

  methods: {
     intervalChange:function(e){
       this.value1=e.target.current;
     },
     goList(){
       const url = '../goods/main'
        wx.navigateTo({ url })
     },
     getList(){
       console.log(this)
       let that=this;
       wx.request({
        url: 'https://www.easy-mock.com/mock/5bbebea1655c520148b1a514/delibal/dglist', 
        method:'GET',
        header: {
          'content-type': 'application/json' // 默认值
        },
        success (res) {
            console.log(res.data)
            console.log("ssss",that.movies)
            that.movies=res.data.movies
            that.subject=res.data.subject
            that.lists=res.data.lists
            let timer= setTimeout(function(){that.isShow=false; }, 700);
            clearTimeout('timer')
            // that.$nextTick(function () {
            //   // DOM is now updated
            //   // `this` is bound to the current instance
            //   console.log("递四方速递")
            //   that.isShow=false;
            // })
            }
      })
     },
  },

  mounted  () {
    console.log("sdfds")
    this.getList()
  }
  
}
</script>

<style lang="less" scoped>
 .contain{
   width:100%;
   min-height:100vh;
   position:relative;
   .swiper{
     position:fixed;
     top:0;
     z-index:-1;
   }
   .scroll-part{
     width:100%;
     position:absolute;
      display:flex;
      flex-direction:column;
      justify-content:center;
      align-items:center;
     top:120px;
     .pic-des{
      display:flex;
      flex-direction:column;
      justify-content:center;
      align-items:center;
       width:100%;
       height:135px;
       background:-webkit-gradient(linear, 0% 0%, 0% 100%,from(transparent), to(rgba(0,0,0,.4)));/*谷歌*/ 
       .pic-content{
         font-size:24px;
         font-weight:bolder;
         color:white;
         margin-top:-25px;
       }
       .pic-content1{
         width:70%;
         height:40px;
         text-align:center;
         font-size:14px;
         color:white;
       }
       .top{
         margin-top:0;
       }
      
     }
      .dot{
         width:100px;
         height:15px;
         position: absolute;
         top:112px;
        display:flex;
        flex-direction:row;
        justify-content:space-around;
        align-items:center;
        div{
          width:13px;
          height:13px;
          border-radius:50%;
          border:1px solid white;
          background: black;
        }
        .active{
          background: white;
        }
       }
   }
 }
.swiper{
  width:100%;
  height:285px;
}
.slide-image{
  width:100%;
  height:285px;
}
.content{
  padding-top:80px;
  width:100%;
  display:flex;
  background:white;
  flex-direction:column;
  justify-content:center;
  align-items:center;
  .content-box{
    padding:0 10px;
    width:335px;
    display:flex;
    flex-direction:column;
    justify-content:center;
    align-items:center;
    margin-bottom:60px;
    .content-img{
      width:100%;
      image{
        width:100%;
        height:200px;
      }
    }
  }
}
.content-des {
  display:flex;
  flex-direction:column;
  justify-content:center;
  align-items:center;

}
.content-des .title{
  width:100%;
  font-size:24px;
  font-weight:bolder;
  text-align:center;
  line-height:70px;
}
.content-des .detail{
  width:88%;
  font-size:14px;
  text-align:center;
  line-height:30px;
}
.content-fun{
  margin-top:25px;
  width:175px;
  height:30px;
  color:white;
  font-size:12px;
  font-weight:bold;
  text-align:center;
  line-height:30px;
  background:#252525;
}
.blue{
  width:100%;
  height:100px;
  background:blue;
  .red{
    width:50px;
    height:50px;
    background:red;
  }
}
</style>
