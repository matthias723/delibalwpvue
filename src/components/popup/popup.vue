<template>
<div  v-if="isShow">
 <div class="mask" ></div>
    <div class="modal">
        <div class="top">
            It's my turn
        </div>
        <div class="sumary">
            <div class="info">
                <div class="label">Title</div>
                 <input class="inpu" v-model="name"/> 
            </div>
             <div class="info">
                <div class="label">Price</div>
                 <input class="inpu" v-model="price"/> 
            </div>
        </div>
        <div class="info">
            <button class="btn" @click="doUpload">choose pic</button>
            <image class="uploader-image" src="" mode="aspectFit" bindtap="previewImg" />
        </div>
    </div>
 </div>
</template>
<script>
export default {
    data () {
    return {
       name:'',
       price:'',
       url:''
    }
  },
  props:['isShow'],
  components: {
   
  },

  methods: {
        // 上传图片
        doUpload: function () {
            // 选择图片
            wx.chooseImage({
            count: 1,
            sizeType: ['compressed'],
            sourceType: ['album', 'camera'],
            success: function (res) {

                wx.showLoading({
                title: '上传中',
                })

                const filePath = res.tempFilePaths[0]
                
                // 上传图片
                const cloudPath = 'my-image' + filePath.match(/\.[^.]+?$/)[0]
                this.url = cloudPath
                wx.cloud.uploadFile({
                cloudPath,
                filePath,
                success: res => {
                    console.log('[上传文件] 成功：', res)
                },
                fail: e => {
                    console.error('[上传文件] 失败：', e)
                    wx.showToast({
                    icon: 'none',
                    title: '上传失败',
                    })
                },
                complete: () => {
                    wx.hideLoading()
                }
                })

            },
            fail: e => {
                console.error(e)
            }
            })
        }          
  },

  mounted  () {
  }
}
</script>
<style lang="less" scoped>
.con{
    width:375px;
    height:100vh;
    background: transparent;
    position: relative;
}
  .mask{
       position: fixed;
        z-index: 10000;
        top: 0;
        right: 0;
        left: 0;
        bottom: 0;
        background:rgba(0,0,0,1);
        opacity:0.7;
       
  }
   .modal{
            position: absolute;
            top: 50%;
            left: 50%;
            z-index: 50000;
            width: 280px;
            height:360px;
            margin:-180px 0 0 -135px;
            background-color: #FFFFFF;
            overflow: hidden;
            opacity: 1;
            border-radius: 7px;
            .top{
                width:100%;
                height:40px;
                line-height: 40px;
                text-align: center;
                font-size: 24px;
                font-weight: bold;
                padding-bottom:10px;
                border-bottom: 1px solid #ccc;
            }
            .sumary{
                width:100%;
                height:120px;
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items:space-around;
                .info{
                    width:90%;
                    height:40px;
                    padding:0 10px;
                    box-sizing: content-box;
                    display: flex;
                    justify-content: center;
                    align-items:space-between;
                    .label{
                        width:40px;
                        font-size: 14px;
                        height:100%;
                        margin-right:7px;
                    }
                    .inpu{
                        flex:1;
                        text-indent:10px;
                        border-radius:4px;
                        border:1px solid #ccc;
                    }

                }
            }
        }
</style>


