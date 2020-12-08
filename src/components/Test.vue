<template>
  <div @click="handlepush">5555</div>
</template>

<script>
export default {
    methods:{
        handlepush(){
            this.$router.push({name:'hello'})
        }
    }
}
</script>

<style>

</style>