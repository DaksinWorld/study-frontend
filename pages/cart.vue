<template>
  <div class="wrapper">
    <div
      class="row"
      v-if="cartList.length > 0"
      key="noEmpty"
    >
      <div class="w-100 p-5">
        <div class="cart-table-container">
          <table class="table table-cart">
            <thead>
            <tr>
              <th class="thumbnail-col">Image</th>
              <th class="product-col">Name</th>
              <th class="price-col">Price</th>
            </tr>
            </thead>

            <tbody>
            <tr
              class="product-row"
              v-for="(product,index) in cartItems"
              :key="'cart-product-' + index"
            >
              <td>
                <figure class="product-image-container">
                    <img
                      height="40"
                      width="40"
                      :src="`${imageUrl}${product.images[0].url}`"
                      alt="product"
                    />

                  <a
                    href="javascript:;"
                    class="btn-remove icon-cancel"
                    title="Remove Product"
                    @click="removeCart(product.name)"
                  ></a>
                </figure>
              </td>

              <td class="product-col">
                <h5 class="product-title">
                  {{ product.name }}
                </h5>
              </td>

              <td>{{ product.price }}₽</td>
            </tr>
            </tbody>
          </table>
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
      imageUrl: imageUrl
    }
  },
  computed: {
    ...mapGetters( 'cart', [ 'cartList', 'totalPrice' ] )
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

th, td {
  font-size: 15px;
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
