<template>
  <div class='main grid-container'>
    <h1 class='grid-item'>Paper Trader</h1>
    <base-dashboard class='grid-item'></base-dashboard>
  </div>
</template>

<script>
import BaseDashboard from './pages/BaseDashboard.vue'

export default {
  name: 'Main',
  components: {
    BaseDashboard
  },
  props: {}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.grid-container {
  display:grid;
}
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
