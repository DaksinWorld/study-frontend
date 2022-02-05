<template>
  <nav>
    <div class="wrapper">
      <div class="d-flex">
        <nuxt-link to="/"><h3>Logo</h3></nuxt-link>
        <div class="right d-flex">
          <div v-for="m in menu" :key="m.name">
            <nuxt-link :to="`/${m.path}`" class="links">{{ m.name }}</nuxt-link>
          </div>
          <CartBtn :theme="'dark'"/>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
import {menuEn} from "../assets/data";

export default {
  data: () => {
    return {
      menu: menuEn
    }
  }
}
</script>

<style scoped>

.links {
  font-size: 16px;
  font-family: 'Source Sans Pro';
  color: white;
  font-weight: 600;
  margin: 0 10px;
}

nav:before {
  backdrop-filter: saturate(101%) blur(10px);
}

.d-flex {
  height: 100%;
  align-items: center;
  justify-content: space-between;
}
</style>
