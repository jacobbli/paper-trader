<template>
  <div id='quantity-selector'>
    <a-input-number id="quantity-input" v-model='quantity' :min="1" :max='ownedQuantity' @change='onChange'/>
    Currently owned: {{ this.ownedQuantity }}
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'

  export default {
    name: 'QuantitySelector',
    props:{
      ownedQuantity: Number,
    },

    data() {
      return{
        quantity: 1,
      }
    },

    computed:{
      ...mapGetters(['getAccessToken'])
    },

    methods: {
      onChange() {
        this.$emit('changeOrderQuantity', this.quantity)
      }
    }
  }
</script>
