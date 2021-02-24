<template>
  <div>
    <div @click="handlepush">5555</div>
    <button @click="closeLink">断开连接</button>
    <button @click="openLink">打开连接</button>
  </div>
</template>

<script>
export default {
  data(){
    return {
      socket: null
    }
  },
  methods: {
    openLink() {
      console.log('========')
      this.websocketLink()
    },
    closeLink() {      
      console.log('========')
      this.socket.close(1000, '不想连了')
    },
    handlepush() {
      this.$router.push({ name: "hello" });
    },
    queryInfo() {
      fetch("/wsApi/goods/goods-list", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        mode: "cors",
        body: JSON.stringify({
          content: "留言内容",
        }),
      })
        .then(function (res) {
          if (res.status === 200) {
            return res.json();
          } else {
            return Promise.reject(res.json());
          }
        })
        .then(function (data) {
          console.log(data);
        })
        .catch(function (err) {
          console.log(err);
        });
    },
    websocketLink() {
      this.socket = new WebSocket("ws://localhost:3001/ifc/userinfo",'jsonrpc');
      const _this = this;
      this.socket.addEventListener("open", function (event) {
        console.log("socket is open", event);
        _this.socket.send("这里是html发送过来的");
      });
      this.socket.onclose = function (event) {
        console.log("socket is closed", event);
        // _this.socket.send("这里是html发送过来的");
      };

      this.socket.addEventListener("message", function (event) {
        console.log("Message from server", event);
        console.log(" _this.socket",  _this.socket);
        console.log("websocket只读属性", _this.socket.protocol );
        console.log("websocket只读属性", _this.socket.extensions );
        console.log("websocket只读属性", _this.socket.url );
        console.log("websocket只读属性", _this.socket.readyState );
      });
    },
  },
  mounted() {
    this.websocketLink();
    this.queryInfo();
  },
};
</script>

<style>
</style>