<template>
  <input type="text" :value="value" @input="setInput($event.target.value)">
</template>

<script>
export default {
  name: "Input",
  props: ["value"],
  model: {
    prop: "value",
    event: "newValue"
  },
  mounted() {
    console.log(this.value)
  },
  methods: {
    setInput(val) {
      this.$emit("newValue", val)
    }
  }
}
</script>

<style scoped>

  input {
    width: 100%;
    height: 40px;
  }

</style>
