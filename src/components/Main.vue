<template>
  <div class="main">
    <h1>{{msg}}</h1>
    <router-link to="/tasks">
      <h2>
        Tasks Page
      </h2>
    </router-link>
  </div>
</template>

<script>
export default {
  name: "Main",
  data() {
    return {
      msg: "Main page for Tasks app"
    }
  }
}
</script>
