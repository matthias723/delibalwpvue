<template>
<div class="container" v-if="show">
    <div class="box">
        <div class="one"></div>
        <div class="two"></div>
        <div class="three"></div>
        <div class="four"></div>
    </div>
</div>
</template>

<script>

export default {
  data () {
    return {
     
    }
  },
  props:['show'],
  components: {
   
  },

  methods: {
   
  },

  mounted  () {
    
  }
  
}
</script>

<style scoped>
    .container{
        width:100%;
        height:100vh;
    }
    .box{
        position: absolute;
        top:50%;
        left:50%;
        margin:-15px 0 0 -15px;
        width:50px;
        height:50px;
        -webkit-animation-name: x5;
        -webkit-animation-duration: 4500ms;
        -webkit-animation-iteration-count: infinite;
        -webkit-animation-timing-function: linear; 
    }
    .box div{
         width:20px;
         height:20px;
         border-radius: 25%;
         background: black;
         border:1px solid white;
         box-sizing:border-box; 
    }
    .one{
        position: absolute;
        top:0;
        left:0;
        -webkit-animation-name: x1;
        -webkit-animation-duration: 900ms;
        -webkit-animation-iteration-count: infinite;
        -webkit-animation-timing-function: linear; 
    }
    .two{
        position: absolute;
        top:0;
        left:30px;
        -webkit-animation-name: x2;
        -webkit-animation-duration: 900ms;
        -webkit-animation-iteration-count: infinite;
        -webkit-animation-timing-function: linear; 
    }
    .three{
        position: absolute;
        top:30px;
        left:0;
        -webkit-animation-name: x3;
        -webkit-animation-duration: 900ms;
        -webkit-animation-iteration-count: infinite;
        -webkit-animation-timing-function: linear; 
    }
    .four{
        position: absolute;
        top:30px;
        left:30px;
        -webkit-animation-name: x4;
        -webkit-animation-duration: 900ms;
        -webkit-animation-iteration-count: infinite;
        -webkit-animation-timing-function: linear; 
    }
    /* //transform:rotate(-90deg); */
    @-webkit-keyframes x1 { 
        0% { left:0;top:0 ;display: block;}
        25% { left:3px;top:3px ;display: none;} 
        50% { left:6px;top:6px ;display: none;} 
        75% { left:3px;top:3px ;display: none;} 
        100% {left:0px;top:0px;}
    }
    @-webkit-keyframes x2 { 
        0% { left:30px;top:0px ;display: block;}
        25% { left:27px;top:3px ;display: none;} 
        50% { left:24px;top:6px ;display: none;} 
        75% { left:27px;;top:3px ;display: none; } 
        100% {left:30px;top:0px;}
    }
    @-webkit-keyframes x3 { 
        0% { left:0 ;top:30px;display: block;} 
        25% { left:3px;top:27px ;display: none;} 
        50% { left:6px;top:24px ;display: none;} 
        75% { left:3px;;top:27px ;display: none;} 
        100% {left:0px;top:30px;}
    }
    @-webkit-keyframes x4 { 
        0%  { left:30px;top:30px ;display: block;}
        25% { left:27px;top:27px ;display: none;} 
        50% { left:24px;top:24px ;display: none;} 
        75%{ left:27px;;top:27px ;display: none;} 
        100% {left:30px;top:30px;}
    }
    @-webkit-keyframes x5 { 
        0%  { transform:rotate(0deg);}
        25% { transform:rotate(-90deg);} 
        50% { transform:rotate(-180deg);} 
        75%{ transform:rotate(-270deg);} 
        100% {transform:rotate(-360deg);}
    }
</style>
