<template>
  <div>
    <input type="text" v-model="message" />
    {{msg}}
  </div>
</template>

<script>
export default {
  props: ["msg"],
  data() {
    return {
      message: "",
      message2: {
        a: 1,
        b: 2
      }
    };
  },
  watch: {
    message: function() {
      this.$emit("getMessage", this.message2);
    }
  }
};
</script>

<style lang="scss" scoped>
</style>