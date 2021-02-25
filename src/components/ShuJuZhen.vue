<template>
  <div class="shujuzhen">
    <p>测试websocket</p>
    <button @click="sendMessage">点我发送消息</button>
    <button @click="sendLongMessage">点我发送超级长的消息</button>
  </div>
</template>

<script>
import {sen} from './sentence'
export default {
  name: "shujuzhen",
  props: {
    msg: String,
  },
  data() {
    return {
      socket: null,
      count: 0,
      messageList : [],
      nameCount: 0
    };
  },
  mounted() {
    this.socket = new WebSocket("ws://localhost:3002");
    const _this = this;
    this.socket.addEventListener("open", function (event) {
      console.log("socket is open", event);
      _this.socket.send("这里是html发送过来的");
    });
    this.socket.addEventListener("message", function (event) {
      console.log("socket is message", event);
      let data = JSON.parse(event.data)
      _this.messageList.push(data);
    });
  },
  methods:{
    sendMessage(){
      this.count ++;
      this.socket.send('发送了一条消息'+this.count)
      // this.socket.send(sen) 对比着可看 opcode
    },
    sendLongMessage(){
      this.count ++;
      this.socket.send(sen) //对比着可看 opcode
    },
  }
};
</script>

