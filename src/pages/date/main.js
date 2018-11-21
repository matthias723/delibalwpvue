import Vue from 'vue'
import App from './index'

const app = new Vue(App)
app.$mount()

export default { 
    config: {   
          usingComponents: 
          {     
        //    'i-spin': '../../../static/iview/spin/index',
        //    'Mine': '../../components/loading/loading'
          }

    }
}