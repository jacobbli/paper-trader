import Vue from 'vue';
import App from './App.vue';
import store from './store/store'
import { Button, Row, Col, Layout, Menu, Space, Popconfirm } from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';

Vue.use(Button)
Vue.use(Row)
Vue.use(Col)
Vue.use(Layout)
Vue.use(Menu)
Vue.use(Space)
Vue.use(Popconfirm)


Vue.config.productionTip = false

new Vue({
  store,
  render: h => h(App),
}).$mount('#app')
