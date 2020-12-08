// https://blog.csdn.net/weixin_44135121/article/details/103998832
import Vue from 'vue';
export default class Routes {
  constructor(options) {
    this.$options = options;
    this.routeMap = {};
    this.app = new Vue({
      data() {
        return {
          current: '/'
        }
      }
    })
  }

  init() {
    this.bindEvents();
    this.createRouteMap(this.$options);
    this.initComponent();
  }

  bindEvents() {
    window.addEventListener('load', this.onHashChange.bind(this))
    window.addEventListener('hashchange', this.onHashChange.bind(this))
  }

  onHashChange() {
    this.app.current = window.location.hash.slice(1) || '/'; // 获取hash值，如果没有，则回到根路由
  }

  createRouteMap(options) {
    // 遍历路由获取每一个组件
    options.routes.forEach(item => {
      this.routeMap[item.path] = item.component;
    });
  }

  initComponent() {
    Vue.component('router-view-demo', {
      render: h => {
        // hash改变的时候 组件对应改变
        const component = this.routeMap[this.app.current];
        return h(component); // 把组件给渲染出去
      }
    })
  }

}

Routes.install = function (Vue) {
  Vue.mixin({
    beforeCreate() {
      console.log('-------------1', this.$options.router)
      if (this.$options.router) {
        Vue.prototype.$router = this.$options.router;
        Vue.prototype.$router.push = function (options) {
          window.location.hash = '/' + options.name;
        };
        this.$options.router.init();
      }
    }
  })
}