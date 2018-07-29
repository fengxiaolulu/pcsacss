import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import VueContextMenu from 'vue-contextmenu'
import 'vue-contextmenu/style/css/font-awesome.min.css'

Vue.use(VueContextMenu);
//import { Button, Select } from 'element-ui'
// 引用API文件
import api from './api/$ajax.js'
// 将API方法绑定到全局

Vue.prototype.$api = api
Vue.config.productionTip = false
Vue.config.Debug = true
Vue.use(ElementUI)
// 引用工具文件
import 'element-ui/lib/theme-chalk/index.css'
import utils from './utils/index.js'
import directive from './utils/directive.js'
// 将工具方法绑定到全局
Vue.prototype.$utils = utils
/*import lodash from 'lodash'
import VueLodash from 'vue-lodash'

Vue.use(VueLodash, lodash)
	console.log(Vue._.random(20));
*/
/* eslint-disable no-new */
// 配置百度编辑器
import '../static/ue/ueditor.config.js'
import '../static/ue/ueditor.all.min.js'
import '../static/ue/lang/zh-cn/zh-cn.js'
import '../static/ue/ueditor.parse.min.js'
import store from './vuex/store'

/* eslint-disable no-new */
new Vue({
	el: '#app',
	router,
	store,
	
	template: '<App/>',
	components: {
		App
	}
})