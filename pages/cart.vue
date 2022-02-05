<template>
  <div class="wrapper">
    <div
      class="row"
      v-if="cartList.length > 0"
      key="noEmpty"
    >
      <div class="w-100">
        <div class="cart-table-container">
          <table class="table table-cart">
            <thead>
            <tr>
              <th class="thumbnail-col"></th>
              <th class="product-col">Продукт</th>
              <th class="price-col">Цена</th>
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
      class="box-content"
      v-else
    >
      <table
        class="table-cart"
        data-pagination="no"
        data-per-page="5"
        data-page="1"
        data-id
        data-token
      >
        <thead class="d-none">
        <tr>
          <th class="product-thumbnail"></th>

          <th class="product-name">
            <span class="nobr">Product</span>
          </th>

          <th class="product-price">
            <span class="nobr">price</span>
          </th>

          <th class="product-stock-status">
            <span class="nobr">Stock status</span>
          </th>

          <th class="product-add-to-cart">
            <span class="nobr">Actions</span>
          </th>
        </tr>
        </thead>

        <tbody class="cart-items-wrapper">
        <tr class="border-0 py-0">
          <td
            colspan="6"
            class="px-3 py-2 text-center"
          >
            <i class="icon-bag-2 cart-empty"></i>
          </td>
        </tr>
        <tr class="border-0 py-0">
          <td
            colspan="6"
            class="px-3 py-2 text-center cart-empty"
          >
            No products added to the
            cart
          </td>
        </tr>
        <tr class="border-0 py-0">
          <td
            colspan="6"
            class="px-3 text-center"
          >
            <a
              href="/Programs"
              class="btn btn-go-shop"
            >В магазин</a>
          </td>
        </tr>
        </tbody>
      </table>
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
</style>
