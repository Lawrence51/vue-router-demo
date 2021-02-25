<template>
  <div>
    <div @click="handlepush">5555</div>
    <button @click="closeLink">断开连接</button>
    <button @click="openLink">打开连接</button>
    <button @click="sendString">点我发送一个 string</button>
    <button @click="sendArrayBuffer">点我发送一个 ArrayBuffer</button>
    <button @click="sendUint32Array">点我发送一个 Uint32Array</button>
    <button @click="sendBlob">点我发送一个 二进制Blob</button>
  </div>
</template>

<script>
import {sen} from './sentence'
export default {
  data() {
    return {
      socket: null,
    };
  },
  methods: {
    openLink() {
      console.log("========");
      this.websocketLink();
    },
    closeLink() {
      console.log("========");
      this.socket.close(1000, "不想连了");
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
    sendString() {
    
      // 发送字符串
      const buffer = '飞雪连天射白鹿，笑书神侠倚碧鸳';
      this.socket.send(buffer);
    },
    sendArrayBuffer() {
    
      // 发送二进制ArrayBuffer
      const buffer = new ArrayBuffer(128);
      this.socket.send(buffer);
    },
    sendUint32Array() {
      const buffer = new ArrayBuffer(128);
      // 发送二进制ArrayBufferView
      const intview = new Uint32Array(buffer);
      this.socket.send(intview);
    },
    sendBlob() {
      console.log('====================');
      // 发送二进制Blob
      const blob = new Blob([sen], { type: "text/plain" });;
      this.socket.send(blob);
      console.log(`未发送至服务器的字节数：${this.socket.bufferedAmount}`);
      let timer = setInterval(()=>{
        console.log(`未发送至服务器的字节数：${this.socket.bufferedAmount}`);
        if (this.socket.bufferedAmount === 0) {
          clearInterval(timer)
        }
      },2)
    },
    websocketLink() {
      this.socket = new WebSocket(
        "ws://localhost:3001/ifc/userinfo",
        "jsonrpc"
      );
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
        console.log(" _this.socket", _this.socket);
        console.log("websocket只读属性", _this.socket.protocol);
        console.log("websocket只读属性", _this.socket.extensions);
        console.log("websocket只读属性", _this.socket.url);
        console.log("websocket只读属性", _this.socket.readyState);
      });
    },
  },
  mounted() {
    this.websocketLink();
    // this.queryInfo();
  },
};
</script>

<style>
</style>