<template>
<div class="box">
<div class="fuck">
    <ul class="goods" :style="{transform: 'rotate(' + angle + 'deg)'}">
        <img src="/static/timg6.jpg" class="why" />
       <li v-for="item in list" :style="{transform: 'rotate(' + 360 / 6 * index  + 'deg)','background-image': 'url(' + item.url + ')'}" :class="index==isActive?'active':''" :data-index="index"   @touchstart="start" @touchmove="move" @touchend="end"></li>
    </ul>
    <!-- <div class="niddle"></div> -->
</div>
</div>
</template>

<script>

export default {
  data () {
    return {
       x1:'',
       y1:'',
       x2:'',
       y2:'',
       angle: 0,
       isRoll:false,
       isActive:0,
       deg:0
    }
  },
  props:['list'],
  components: {
   
  },

  methods: {
       start:function(ev) {
                        this.x1=0;
                        this.y1=0;
                        this.x2=0;
                        this.y2=0;
                        ev = ev || event;
                        ev.preventDefault();
                        console.log("start----",ev)
                        this.x1=ev.clientX;
                        this.y1=ev.clientY;
                    },
                    move:function(ev) {
                        ev = ev || event;
                        ev.preventDefault();
                        this.x2=ev.clientX;
                        this.y2=ev.clientY;
                    },
                    end:function(ev){
                        ev = ev || event;
                        ev.preventDefault();
                        // var p1:Point = new Point(this.x1,this.y1);
                        // var p2:Point = new Point(this.x2,this.y2);
                        
                        var angle = 360*Math.atan((this.x2-this.x1)/(this.y2-this.y1))/(2*Math.PI); //弧度 -0.6435011087932844, 即 2*Math.PI - 0.6435011087932844
                        //var theta = angle*(180/Math.PI);  //角度 -36.86989764584402，即360 - 36.86989764584402 = 323.13010235415598
                        let idx =ev.currentTarget.dataset.index;
                        console.log("The before deg i want is ", angle);
                        if(Math.abs(angle)>30&&idx==this.isActive){
                            //  if(Math.abs(angle) > 90){
                            //     this.deg= 120;
                            // }else if(Math.abs(angle) > 40 && Math.abs(angle) < 90){
                            //         this.deg= 60;
                            // }else{
                            //     console.log("试试")
                            // }
                                    this.deg= 60;
                        if(angle>0){
                            this.angle+= this.deg
                        }else{
                            this.angle+=-this.deg
                        }
                        if(angle> 0 && idx==0){
                            this.isActive = 5;
                        }
                        else if(angle< 0 && idx==5){
                            this.isActive = 0;
                        } 
                        else{
                            if(angle>0){
                                console.log("5--0")
                                this.isActive = idx-1;
                                console.log("which one is red now",this.isActive)
                            }else{
                                console.log("0---5")
                               // this.angle=-this.angle;
                                this.isActive = idx+1;
                                console.log("which one is red now",this.isActive)
                            }
                        }  
                       
                        console.log("The deg i want is ", this.angle);
                        this.isRoll=true;
                        this.$emit("changePic",this.isActive)

                        }
                       
                    }
                    
  },

  mounted  () {
     console.log("阿萨德撒不开",this.list)
  },
  created () {
    console.log("---------here i am")
  }
  
}
</script>

<style lang="less" scoped>
.box{
    width:100%;
    height:340px;
    border-radius: 50%;
    background: black;
    position: fixed;
    bottom:-32%;
}
.fuck{
    width:300px;
    z-index:50000;
    height:300px;
    background-size: cover;
    // background:-webkit-gradient(linear, 0% 0%, 0% 100%,from(rgba(192,192,192,.5)), to(rgba(0,0,0,.2)));/*谷歌*/ 
    background:white;
    // background: url(http://d2ls16jjuwnppu.cloudfront.net/wp-content/uploads/dolce-and-gabbana-summer-2019-men-fashion-show-video-450x253.jpg);
    border-radius: 50%;
    position: fixed;
    left:50%;
    bottom:-7%;
    margin:0 0 -150px -150px;
    display: flex;
    justify-content: center;
    align-items: center;
    .goods{
        width:300px;
        height:300px;
        border-radius: 50%;
        border:4px solid #e6e6e6;
        background-size: contain;
        position: relative;
         transition: all 700ms ease;
         z-index:10000;
        li{
				width: 50px;
				height: 50px;
				position: absolute;
                //background-color:rgba(0, 0, 0, 0.7);
                color:white;
				border-radius: 50%;
				line-height: 50px;
				text-align: center;
                left: 50%;
                margin-left: -25px;
                margin-top:-25px;
                transform-origin:25px 175px;
                background-size:cover;
                z-index:10000;
            }
        .active{
           color:red;
           width:90px;
           height:90px;
           margin-left: -45px;
           margin-top:-45px;
           transform-origin:45px 195px;
        }
    }
    .why{
        width:100%;
        height:100%;
        border-radius: 50%;
        z-index:-1;
        display: block;
        position: absolute;
    }
    
    .niddle{
       width:100px;
       height:100px;
       border-radius: 50%;
       background: url(http://d2ls16jjuwnppu.cloudfront.net/wp-content/uploads/brandiste_dolce-and-gabbana-velvet-incenso-perfume-men-560x315.jpg);
       background-size: cover;
    }
}
</style>
