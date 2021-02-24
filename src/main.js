import Vue from 'vue';
import App from './App.vue';
import store from './store/store'
import { Button, Row, Col, Layout, Menu, Space, Popconfirm, Input, InputNumber, Form, Table, Divider, Card, Avatar, Modal} from 'ant-design-vue';
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
Vue.use(Table)
Vue.use(Divider)
Vue.use(Card)
Vue.use(Avatar)
Vue.use(Modal)
Vue.use(InputNumber)

Vue.config.productionTip = false

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')
