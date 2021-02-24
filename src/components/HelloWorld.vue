<template>
  <div class="hello">
    <p>测试websocket</p>
    <button @click="sendMessage">点我发送消息</button>
    <button @click="changeNickName">点我修改昵称</button>
    <div>
      <p v-for="(item, index) in messageList" :key="index">
        <span>昵称：{{ item.nickname }}</span>
        <span>内容：{{ item.message }}</span>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: "HelloWorld",
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
    this.socket = new WebSocket("ws://localhost:8090", "jsonrpc");
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
    },
    changeNickName(){
      this.nameCount ++;
      this.socket.send('/nick 张三' + this.nameCount)
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
