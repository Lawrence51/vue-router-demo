import Vue from 'vue'
import App from './App.vue'
import routes from './plugins/router'
import Routes from './plugins/router-plugins'

console.log('-------------2')

Vue.use(Routes);

console.log('-------------3');

const router = new Routes({
  routes
})

console.log('-------------4',router);

new Vue({
  render: h =>{return h(App)},
  router,
  beforeMount(){
    console.log('-------------6');
  }
}).$mount('#app');

console.log('-------------5');
