import Vue from 'vue'
import App from './App.vue'
import routes from './plugins/router'
import Routes from './plugins/router-plugins'


Vue.use(Routes);


const router = new Routes({
  routes
})

new Vue({
  render: h =>{return h(App)},
  router,
  beforeMount(){
  }
}).$mount('#app');
