import Vue from 'vue';
import App from './App.vue';
import store from './store/store'
import { Button, Row, Col, Layout, Menu, Space, Popconfirm, Input} from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';
import { Form } from 'ant-design-vue';

Vue.use(Button)
Vue.use(Row)
Vue.use(Col)
Vue.use(Layout)
Vue.use(Menu)
Vue.use(Space)
Vue.use(Popconfirm)
Vue.use(Input)
app.use(Form)

Vue.config.productionTip = false

new Vue({
  store,
  render: h => h(App),
}).$mount('#app')
