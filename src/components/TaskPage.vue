<template>
  <div class="wrapper">
    <router-link to="/">
      <h2>
        Main Page
      </h2>
    </router-link>
    <form action="">
      <Input v-model="input" />
      <Button text="Add" v-bind:click="addTask" />
    </form>
    <div class="tasksWrapper">
      <Loader v-if="pending" />
      <Task v-else v-for="task in tasks" v-bind:key="task.id" v-bind:text="task.text" v-bind:id="task.id" />
    </div>
  </div>
</template>

<script>
import Task from "./Task"
import Button from "./Button";
import Input from "./Input";
import Loader from "./Loader"

export default {
  name: "TaskPage",
  components: {Task, Button, Input, Loader},
  data() {
    return {
      input: ""
    }
  },
  mounted() {
    this.$store.dispatch("getTasks")
  },
  methods: {
    addTask() {
      this.$store.dispatch("addTask", this.input)
    }
  },
  computed: {
    tasks() {
      return this.$store.state.tasks
    },
    pending() {
      return this.$store.state.pending
    }
  }
}
</script>

<style scoped>

  .wrapper {
    max-width: 1400px;

    padding: 0 20px;
    margin: 0 auto;
  }

  form {
    display: flex;
    gap: 10px;

    margin-bottom: 10px;
  }

</style>
