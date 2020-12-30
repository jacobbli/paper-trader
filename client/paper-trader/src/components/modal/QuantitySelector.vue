<template>
  <div id='quantity-selector'>
    <a-input-number id="quantity-input" v-model='quantity' :min="1" :max='ownedQuantity' @change='onChange'/>
    Currently owned: {{ this.ownedQuantity }}
  </div>
</template>

<script>
  // import { buySecurity } from '../../api/SecuritiesApi.js'
  // import { sellSecurity } from '../../api/SecuritiesApi.js'
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

    //   placeOrder() {
    //     if (this.action == 'buy') {
    //       this.buyStock()
    //     } else if (this.action == 'sell') {
    //       if (this.quantity > this.ownedQuantity) {
    //         this.oversellMessage = 'You cannot sell more than what you own!'
    //       } else {
    //         this.sellStock()
    //       }
    //     }
    //   },

    //   buyStock() {
    //     if(this.quantity > 0) {
    //       buySecurity(this.getAccessToken, this.stock, this.price, this.quantity, this.exchangeName)
    //     }
    //     this.close()
    //   },

    //   sellStock() {
    //     if (this.quantity > 0) {
    //       if(this.quantity <= this.ownedQuantity) {
    //         sellSecurity(this.getAccessToken, this.stock, this.price, this.quantity, this.exchangeName)
    //       }
    //     }
    //     this.close()
    //   },
    }
  }
</script>
