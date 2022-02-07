<template>
  <div>
    <nav>
      <div class="wrapper">
        <div class="d-flex">
          <a href="/">
            <img src="/logo.svg" width="100" height="100" alt="logo">
          </a>
          <div class="right d-flex">
            <div class="menu-opened">
              <div v-for="m in menu" :key="m">
                <a :href="`/${m.path}`" class="links">{{ m.name }}</a>
              </div>
            </div>
            <CartBtn :theme="'dark'" class="mx-3"/>
            <img @click="openMenu" class="menu" width="29px" height="22px" src="/white-menu.svg" alt="menu">
          </div>
        </div>
      </div>
    </nav>
    <div class="menus">
      <div v-for="m in menu" :key="m">
        <a :href="`/${m.path}`" class="links">{{ m.name }}</a>
      </div>
      <button @click="closeMenu" class="close">x</button>
    </div>
  </div>
</template>

<script>
import {menuEn} from "../assets/data";

export default {
  data: () => {
    return {
      menu: menuEn
    }
  },
  methods: {
    openMenu() {
      const menus = document.querySelector('.menus')

      menus.style.display = 'flex'
    },
    closeMenu() {
      const menus = document.querySelector('.menus')

      menus.style.display = 'none'
    }
  }
}
</script>

<style scoped>

.links {
  font-size: 16px;
  font-family: 'Source Sans Pro';
  color: rgb(var(--white));
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

.menu-opened {
  display: flex;
  flex-direction: row;
}

.menus {
  display: none;
  flex-direction: column;
  position: fixed;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  z-index: 99;
  background-color: white;
  padding: 15px;
  align-items: baseline;
  align-content: baseline;
  justify-content: start;
}

.menus div a {
  color: rgb(var(--color_primary));
  padding: 10px;
  font-size: 18px;
}

.close {
  background: none;
  border: 0;
  margin-left: 20px;
  color: rgb(var(--color_primary));
}

@media screen and (max-width: 768px) {
  .menu-opened {
    display: none;
  }
}

</style>
