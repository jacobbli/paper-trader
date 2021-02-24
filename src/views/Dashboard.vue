<template>
  <div id='dashboard' class='grid-container'>
    <a-row :gutter="[16,16]">
      <a-col :span="16">
        <a-card title='My Portfolio'>
          <owned-securities></owned-securities>
        </a-card>
      </a-col>
      <a-col :span="8">
        <a-card title='My Watchlist'>
          <watchlist></watchlist>
        </a-card>
      </a-col>
    </a-row>
  </div>
</template>

<script>
import Watchlist from '../components/tables/Watchlist.vue'
import OwnedSecurities from '../components/tables/OwnedSecurities.vue'

export default {
  name: 'Dashboard',
  components: {
    Watchlist,
    OwnedSecurities,
  },
  props: {
        
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
