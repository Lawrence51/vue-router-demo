<template>
  <div @click="handlepush">5555</div>
</template>

<script>
export default {
  methods: {
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
      var socket = new WebSocket("ws://localhost:3001/ifc/userinfo");
      socket.addEventListener("open", function (event) {
        console.log("socket is open");
        socket.send("这里是html发送过来的");
      });

      socket.addEventListener("message", function (event) {
        console.log("Message from server", event.data);
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