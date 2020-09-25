<template>
  <div class='main grid-container'>
    <div class='grid-item1'>
      <header>
        <h1 >Paper Trader</h1>
      </header>
    </div>
    <div class='grid-item2'>
      <base-dashboard id='dashboard' ></base-dashboard>
    </div>
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
  max-width: 100%;
  display:grid;
  background-color: #2196F3;
  grid-gap: 10px;
  padding: 10px;
  grid-template-areas:
  'header'
  'dashboard';
}

.main > div {
  max-width: 100%;
  padding: 20px;
  background-color: rgba(255, 255, 255, .8);
}

.grid-item1 {
  grid-area: header;
}

.grid-item2 {
  grid-area: dashboard;
}
</style>
