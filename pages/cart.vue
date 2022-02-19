<template>
  <div class="wrapper">
    <div
      class="row grid"
      v-if="cartList.length > 0 && $route.query.step === '1'"
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
      <div class="sidebar p-5">
        <div class="sticky-top top-70">
          <ul>
            <li v-for="item in items" :key="item.text">
              <input v-model="item.checked" type="checkbox" class="custom-checkbox" :id="item.text">
              <label class="text" :for="item.text">{{ item.text }}</label>
              <span class="price">${{ item.price }}</span>
            </li>
          </ul>
          <span class="text-white">
          Total Price: ${{ sum }}<br>
            <nuxt-link to="/cart?step=2">
              <button class="btn btn-light">Checkout</button>
            </nuxt-link>
        </span>
        </div>
      </div>
    </div>
    <div v-else-if="$route.query.step === '2' && cartList.length > 0">
      <div class="card mb-3 p-5">
        <form @submit.prevent>
          <label class="text-dark">Personal Data</label>
          <input required type="text" v-model="firstName" placeholder="First Name" class="form-control">
          <input required type="text" v-model="secondName" placeholder="Second Name" class="form-control">
          <hr>
          <label class="text-dark" >Date of birth</label>
          <select required class="form-control" v-model="day"><option value="">Day</option><option value="1">1</option><option value="2">2</option><option value="3">3</option><option value="4">4</option><option value="5">5</option><option value="6">6</option><option value="7">7</option><option value="8">8</option><option value="9">9</option><option value="10">10</option><option value="11">11</option><option value="12">12</option><option value="13">13</option><option value="14">14</option><option value="15">15</option><option value="16">16</option><option value="17">17</option><option value="18">18</option><option value="19">19</option><option value="20">20</option><option value="21">21</option><option value="22">22</option><option value="23">23</option><option value="24">24</option><option value="25">25</option><option value="26">26</option><option value="27">27</option><option value="28">28</option><option value="29">29</option><option value="30">30</option><option value="31">31</option></select>
          <select required class="form-control" v-model="month"><option disabled selected value="">Month</option><option value="January">January</option><option value="February">February</option><option value="March">March</option><option value="April">April</option><option value="May">May</option><option value="June">June</option><option value="July">July</option><option value="August">August</option><option value="September">September</option><option value="October">October</option><option value="November">November</option><option value="December">December</option></select>
          <select required class="form-control" v-model="year"><option value="">Year</option><option value="2022">2022</option><option value="2021">2021</option><option value="2020">2020</option><option value="2019">2019</option><option value="2018">2018</option><option value="2017">2017</option><option value="2016">2016</option><option value="2015">2015</option><option value="2014">2014</option><option value="2013">2013</option><option value="2012">2012</option><option value="2011">2011</option><option value="2010">2010</option><option value="2009">2009</option><option value="2008">2008</option><option value="2007">2007</option><option value="2006">2006</option><option value="2005">2005</option><option value="2004">2004</option><option value="2003">2003</option><option value="2002">2002</option><option value="2001">2001</option><option value="2000">2000</option><option value="1999">1999</option><option value="1998">1998</option><option value="1997">1997</option><option value="1996">1996</option><option value="1995">1995</option><option value="1994">1994</option><option value="1993">1993</option><option value="1992">1992</option><option value="1991">1991</option><option value="1990">1990</option><option value="1989">1989</option><option value="1988">1988</option><option value="1987">1987</option><option value="1986">1986</option><option value="1985">1985</option><option value="1984">1984</option><option value="1983">1983</option><option value="1982">1982</option><option value="1981">1981</option><option value="1980">1980</option><option value="1979">1979</option><option value="1978">1978</option><option value="1977">1977</option><option value="1976">1976</option><option value="1975">1975</option><option value="1974">1974</option><option value="1973">1973</option><option value="1972">1972</option></select>
            <label class="text-dark">Gender</label> <br>
            <input required v-model="gender1" type="radio" id="contactChoice1"
                   name="contact" value="email">
            <label class="text-dark" for="contactChoice1">Male</label>

            <input required v-model="gender2" type="radio" id="contactChoice2"
                   name="contact" value="phone">
            <label class="text-dark" for="contactChoice2">Female</label>
          <hr>
          <no-ssr>
            <vue-tel-input v-model="phone"></vue-tel-input>
          </no-ssr>
          <input required v-model="email" type="email" class="form-control" placeholder="Email">
          <button class="btn btn-primary" :disabled="firstName.length <= 2 && secondName.length <= 2 || isDisabled" @click="SubmitHandler">Send</button>
        </form>
      </div>
      <div class="sidebar p-5">
        <div class="sticky-top top-70">
          <ul>
            <li v-for="item in items" :key="item.text">
              <input v-model="item.checked" type="checkbox" class="custom-checkbox" :id="item.text">
              <label class="text" :for="item.text">{{ item.text }}</label>
              <span class="price">${{ item.price }}</span>
            </li>
          </ul>
          <span class="text-white">
          Total Price: ${{ sum }}<br>
            <nuxt-link to="/cart?step=2">
              <button class="btn btn-light mt-3">Checkout</button>
            </nuxt-link>
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
import {mapActions, mapGetters} from 'vuex';
import {imageUrl} from "../assets/data";
import 'vue-tel-input/dist/vue-tel-input.css';

export default {
  layout: 'light',
  data: function () {
    return {
      cartItems: [],
      imageUrl: imageUrl,
      items: [
        {
          text: 'Application fee for three education programs. Add the 4th, 5th, 6th programs for $49 each.',
          price: 399,
          checked: true
        },
        {text: 'Transfer', price: 299, checked: false},
        {text: 'Patronage', price: 999, checked: false},
        {text: 'Recognition of diploma', price: 149, checked: false},
        {text: 'Certified translation', price: 39, checked: false},
        {text: 'Health insurance', price: 84, checked: false},
      ],
      phone: '',
      firstName: '',
      secondName: '',
      email: '',
      year: '',
      month: '',
      day: '',
      gender1: '',
      gender2: '',
      isDisabled: false
    }
  },
  computed: {
    ...mapGetters('cart', ['cartList', 'totalPrice']),
    sum() {
      return this.items.reduce((acc, n) => acc + n.price * n.checked, 0);
    }
  },
  created: function () {
    this.cartItems = [...this.cartList];
  },
  watch: {
    cartList: function () {
      this.cartItems = [...this.cartList];
    }
  },
  methods: {
    ...mapActions('cart', ['updateCart', 'removeFromCart']),
    changeQty: function (value, product) {
      this.cartItems = this.cartItems.reduce((acc, cur) => {
        if (cur.name === product.name) {
          return [
            ...acc,
            {
              ...cur,
              qty: value
            }
          ]
        } else {
          return [...acc, cur];
        }
      }, [])
    },
    removeCart: function (name) {
      this.removeFromCart({name: name});
      this.cartItems = this.cartItems.reduce((acc, cur) => {
        if (cur.name !== name) {
          return [...acc, cur];
        } else {
          return acc;
        }
      }, [])
    },
    getValue(e) {
      console.log(e)
    },
    async SubmitHandler() {
      try {
        let gender;
        if(this.gender1) {
          gender = 'male'
        } else {
          gender = 'female'
        }

        await this.$axios.$post('/api/application', {
          firstName: this.firstName,
          secondName: this.secondName,
          package: this.items,
          email: this.email,
          phone: this.phone,
          program: this.cartList,
          month: this.month,
          day: parseFloat(this.day),
          year: parseFloat(this.year),
          totalPrice: parseFloat(this.sum),
          gender
        })

        this.isDisabled = true

        this.$store.dispatch('setMessage', {
          value: 'Application was succesfully sent',
          type: 'primary'
        })
      } catch (e) {
        this.$store.dispatch('setMessage', {
          value: e,
          type: 'warning'
        })
      }
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

.form-control {
  margin: 10px 0;
  background: none;
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

.custom-checkbox:not(:disabled):not(:checked) + label:hover::before {
  border-color: #b3d7ff;
}

/* стили для активного состояния чекбокса (при нажатии на него) */
.custom-checkbox:not(:disabled):active + label::before {
  background-color: #b3d7ff;
  border-color: #b3d7ff;
}

/* стили для чекбокса, находящегося в фокусе */
.custom-checkbox:focus + label::before {
  box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
}

/* стили для чекбокса, находящегося в фокусе и не находящегося в состоянии checked */
.custom-checkbox:focus:not(:checked) + label::before {
  border-color: #80bdff;
}

/* стили для чекбокса, находящегося в состоянии disabled */
.custom-checkbox:disabled + label::before {
  background-color: #e9ecef;
}

.custom-checkbox + label {
  display: inline-flex;
  align-items: center;
  user-select: none;
}

.custom-checkbox + label::before {
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

.custom-checkbox:checked + label::before {
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

@media screen and (max-width: 1400px) {
  .grid {
    grid-template-columns: 100%;
  }
}

</style>
