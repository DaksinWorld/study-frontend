<template>
  <div class="wrapper">
    <div
      class="row grid"
      v-if="cartList.length > 0"
      key="noEmpty"
    >
      <div class="w-100 p-5 card">
        <div class="cart-table-container">
          <div v-for="(cartItem, i) in cartItems">
            <CartCard :type="cartItem.type" :data="cartItem"/>
            <div class="vw-separator my-5"></div>
          </div>
        </div>
      </div>
      <div class="sidebar">
        <div class="sticky-top top-70">
          <ul>
            <li v-for="item in items" :key="item.text">
              <input v-model="item.checked" type="checkbox" class="custom-checkbox" :id="item.text">
              <label class="text" :for="item.text">{{item.text }}</label>
              <span class="price">${{item.price}}</span>
            </li>
          </ul>
          <span class="text-white">
          Total Price: ${{sum + totalPrice}} <br>
          <button class="btn btn-light">Checkout</button>
        </span>
        </div>
      </div>
    </div>

    <div
      class="box-content text-center"
      v-else
    >
      <h3 class="h3">No products were added to cart</h3>
      <nuxt-link to="/programs">
        <button class="btn btn-primary">
          To Catalog
        </button>
      </nuxt-link>
    </div>

    <div class="mb-6"></div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import {imageUrl} from "../assets/data";

export default {
  layout: 'light',
  data: function () {
    return {
      cartItems: [],
      imageUrl: imageUrl,
      inputValue1: '',
      inputValue2: '',
      inputValue3: '',
      inputValue4: '',
      inputValue5: '',
      inputValue6: '',
      items: [
        { text: 'Application fee for three education programs. Add the 4th, 5th, 6th programs for $49 each.', price: 399, checked: false },
        { text: 'Transfer', price: 299, checked: false },
        { text: 'Patronage', price: 999, checked: false },
        { text: 'Recognition of diploma', price: 149, checked: false },
        { text: 'Certified translation', price: 39, checked: false },
        { text: 'Health insurance', price: 84, checked: false },
      ],
    }
  },
  computed: {
    ...mapGetters( 'cart', [ 'cartList', 'totalPrice' ] ),
    sum() {
      return this.items.reduce((acc, n) => acc + n.price * n.checked, 0);
    }
  },
  created: function () {
    this.cartItems = [ ...this.cartList ];
  },
  watch: {
    cartList: function () {
      this.cartItems = [ ...this.cartList ];
    }
  },
  methods: {
    ...mapActions( 'cart', [ 'updateCart', 'removeFromCart' ] ),
    changeQty: function ( value, product ) {
      this.cartItems = this.cartItems.reduce( ( acc, cur ) => {
        if ( cur.name === product.name ) {
          return [
            ...acc,
            {
              ...cur,
              qty: value
            }
          ]
        } else {
          return [ ...acc, cur ];
        }
      }, [] )
    },
    removeCart: function ( name ) {
      this.removeFromCart( { name: name } );
      this.cartItems = this.cartItems.reduce( ( acc, cur ) => {
        if ( cur.name !== name ) {
          return [ ...acc, cur ];
        } else {
          return acc;
        }
      }, [] )
    },
    getValue(e) {
      console.log(e)
    }
  }
}
</script>
<style scoped>
.wrapper {
  padding: 100px 0;
}

.table thead th {
  border: 0;
}

.top-70 {
  top: 70px;
}

.vw-separator {
  border-bottom: 2px var(--gray_light) dashed;
  border-radius: 2px;
}

.card {
  background: #EEEFF6;
  border: 0;
  border-radius: 25px;
}

.grid {
  display: grid;
  grid-template-columns: 75% 25%;
  grid-gap: 30px;
}

label, .price {
  color: white;
  font-family: Montserrat;
  font-weight: 600;
}

th, td {
  font-size: 15px;
}

li {
  display: flex;
  align-items: center;
  align-content: center;
  justify-content: space-between;
}

.custom-checkbox {
  position: absolute;
  z-index: -1;
  opacity: 0;
}

.custom-checkbox:not(:disabled):not(:checked)+label:hover::before {
  border-color: #b3d7ff;
}
/* стили для активного состояния чекбокса (при нажатии на него) */
.custom-checkbox:not(:disabled):active+label::before {
  background-color: #b3d7ff;
  border-color: #b3d7ff;
}
/* стили для чекбокса, находящегося в фокусе */
.custom-checkbox:focus+label::before {
  box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
}
/* стили для чекбокса, находящегося в фокусе и не находящегося в состоянии checked */
.custom-checkbox:focus:not(:checked)+label::before {
  border-color: #80bdff;
}
/* стили для чекбокса, находящегося в состоянии disabled */
.custom-checkbox:disabled+label::before {
  background-color: #e9ecef;
}

.custom-checkbox+label {
  display: inline-flex;
  align-items: center;
  user-select: none;
}
.custom-checkbox+label::before {
  content: '';
  display: inline-block;
  width: 1em;
  height: 1em;
  flex-shrink: 0;
  flex-grow: 0;
  border: 1px solid #adb5bd;
  border-radius: 0.25em;
  margin-right: 0.5em;
  background-repeat: no-repeat;
  background-position: center center;
  background-size: 50% 50%;
}

.custom-checkbox:checked+label::before {
  border-color: #0b76ef;
  background-color: #0b76ef;
  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 8 8'%3e%3cpath fill='%23fff' d='M6.564.75l-3.59 3.612-1.538-1.55L0 4.26 2.974 7.25 8 2.193z'/%3e%3c/svg%3e");
}

ul {
  padding: 0;
}

.sidebar {
  background-color: #2b3990;
  border-radius: 25px;
  padding: 15px;
}

.row {
  margin: 0;
}

.table td, .table th {
  border-top: 1px solid rgb(var(--color_primary));
}

.h3 {
  font-weight: 600;
  color: rgb(var(--color_primary));
}
</style>
