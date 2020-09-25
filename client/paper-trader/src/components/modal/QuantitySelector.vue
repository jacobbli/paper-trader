<template>
  <div class="modal-backdrop">
    <div class="modal">
      <header class="modal-header">
        <h1 class="heading">Choose the number of shares</h1>
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
          @keyup.enter='buyStock'
        > shares
      </section>
      <footer class="modal-footer">
        <button
          type="button"
          class="btn-green"
          @click="buyStock"
        >
        Buy stock
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

  export default {
    name: 'QuantitySelector',
    props:{
      stock: Object,
    },

    data() {
      return{
        quantity: 0
      }
    },

    methods: {
      close() {
        this.$emit('close');
      },

      buyStock() {
        if(this.quantity > 0) {
          this.$store.dispatch('buy', {stock: this.stock, quantity: this.quantity})
        }
        this.close()
      }
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
