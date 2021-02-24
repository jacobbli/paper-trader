<template>
  <div id='quantity-selector'>
    <a-input-number id="quantity-input" v-model='quantity' :min="1" :max='maxQuantity()' @change='onChange'/>
    Currently owned: {{ this.ownedQuantity }}
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'

  export default {
    name: 'QuantitySelector',
    props:{
      ownedQuantity: Number,
      orderType: String
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
      },
      maxQuantity() {
        return (this.orderType == 'buy' ? Infinity : this.ownedQuantity)}
    }
  }
</script>
