<template>
  <div class='main grid-container'>
    <a-layout>
      <div class='header'>
        <a-layout-header>
          <div class="logo" >
          </div>
          <a-menu
            theme="dark"
            mode="horizontal"
            :default-selected-keys="['1']"
          >
            <a-menu-item key="1">
              Home
            </a-menu-item>
          </a-menu>
        </a-layout-header>
      </div>
      
      <a-layout-content :style="{ padding: '5em' }">
        <a-layout>
          <div class='content'>
            <a-layout-content>
              <base-dashboard id='dashboard'></base-dashboard>
            </a-layout-content>
          </div>
        </a-layout>
      </a-layout-content>
    </a-layout>
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
</style>
