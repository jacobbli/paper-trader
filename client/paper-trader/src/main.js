import Vue from 'vue';
import App from './App.vue';
import store from './store/store'
import { Button, Row, Col, Layout, Menu, Space, Popconfirm, Input, Form} from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';
import router from './router'

Vue.use(Button)
Vue.use(Row)
Vue.use(Col)
Vue.use(Layout)
Vue.use(Menu)
Vue.use(Space)
Vue.use(Popconfirm)
Vue.use(Input)
Vue.use(Form)

Vue.config.productionTip = false

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')
