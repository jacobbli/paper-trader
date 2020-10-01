<template>
  <div class="modal-backdrop">
    <div class="modal">
      <header class="modal-header">
        <h1 class="heading">{{ headingMessage }}</h1>
        <button
          type="button"
          class="btn-close"
          @click="close"
        >
          x
        </button>
      </header>
      <section class="modal-body">
        <input 
          id='number-of-shares' 
          type="number" 
          min=0
          v-model='quantity'
          @keyup.enter='placeOrder'
        > shares
      </section>
      <footer class="modal-footer">
        <button
          type="button"
          class="btn-green"
          @click="placeOrder"
        >
        Place order
        </button>
        <button
          type="button"
          class="btn-green"
          @click="close"
        >
          Cancel
        </button>
      </footer>
    </div>
  </div>
</template>

<script>
  import { buySecurity } from '../../api/Api.js'
  import { sellSecurity } from '../../api/Api.js'

  export default {
    name: 'QuantitySelector',
    props:{
      stock: String,
      price: Number,
      ownedQuantity: Number,
      action: String
    },

    data() {
      return{
        quantity: 0,
        oversellMessage: ''
      }
    },

    computed:{
      headingMessage: function() {
        if (this.action == 'buy') {
          return 'Choose the number of shares to buy'
        } else if (this.action == 'sell') {
          return 'Choose the number of shares to sell'
        }
        return ''
      } 
    },

    methods: {
      close() {
        this.$emit('close');
      },

      placeOrder() {
        if (this.action == 'buy') {
          this.buyStock()
        } else if (this.action == 'sell') {
          if (this.quantity > this.ownedQuantity) {
            this.oversellMessage = 'You cannot sell more than what you own!'
          } else {
            this.sellStock()
          }
        }
      },

      buyStock() {
        if(this.quantity > 0) {
          buySecurity(this.stock, this.price, this.quantity)
        }
        this.close()
      },

      sellStock() {
        if (this.quantity > 0) {
          sellSecurity(this.stock, this.price, this.quantity)
        }
        this.close()
      },
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .modal-backdrop {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: rgba(0, 0, 0, 0.3);
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .modal {
    background: #FFFFFF;
    box-shadow: 2px 2px 20px 1px;
    overflow-x: auto;
    display: flex;
    flex-direction: column;
  }

  .heading {
    font-size: 12pt;
  }

  .modal-header,
  .modal-footer,
  .modal-body {
    padding: 15px;
    display: flex;
    justify-content:flex-end;
  }

  .modal-header {
    color: #4AAE9B;
  }

  .modal-footer {
    border-top: 1px solid #eeeeee;
    justify-content: flex-end;
  }

  /* .modal-body {
    position: relative;
    padding: 20px 10px;
  } */

  .btn-close {
    border: none;
    font-size: 20px;
    cursor: pointer;
    font-weight: bold;
    color: #4AAE9B;
    background: transparent;
  }

  .btn-green {
    margin-left: 10px;
    color: white;
    background: #4AAE9B;
    border: 1px solid #4AAE9B;
    border-radius: 2px;
  }

  #number-of-shares {
    text-align: right;
    margin-right: 1em;
    font-size: 12pt;
  }
</style>
