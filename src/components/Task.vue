<template>
  <div class="task">
    <input v-model="changeModel" v-if="change" type="text">
    <p v-else>{{text}}</p>

    <div class="actions">

      <div @click="startChangeTask" class="change">
        <img src="../assets/svg/pencil-fill.svg" alt="pencil">
      </div>

      <div @click="deleteTask" class="delete">
        <img src="../assets/svg/x-circle.svg" alt="x">
      </div>

      <div v-if="change" @click="changeTask" class="submit">
        <img src="../assets/svg/check-circle.svg" alt="">
      </div>

    </div>

  </div>
</template>

<script>
export default {
  name: "Task",
  props: ["text", "id"],
  data() {
    return {
      change: false,
      changeModel: this.text
    }
  },
  methods: {
    deleteTask() {
      this.$store.dispatch("deleteTask", this.id)
    },
    startChangeTask() {
      this.change = !this.change
    },
    changeTask() {
      this.change = false;
      this.$store.dispatch("changeTask", {text: this.changeModel, id: this.id})
    }
  }
}
</script>

<style scoped>

  .task, .actions {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .actions {
    gap: 10px;
  }

  .task {
    width: 100%;

    padding: 10px;
    margin-bottom: 10px;

    border: 1px solid #d0d0d0;
    border-radius: 6px;
  }

  .task input {
    margin: 10px 0;
  }

  p {
    margin: 10px 0
  }

  .actions > * {
    cursor: pointer;
  }

</style>
