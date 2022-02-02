<template>
  <div>
    <Header/>
    <main>
      <div class="hello-main-page__inner">
        <div class="hello-circle">
          ✌️
        </div>
        <p class="hello-main-text">
          {{ mainText }}
        </p>
        <nuxt-link to="/AboutUs" class="about-us-text">
          <button class="button-about-us">
            About Us
          </button>
        </nuxt-link>
      </div>
      <div class="container">
        <div class="find-programs d-flex flex-wrap">
          <div class="w-33" v-for="(d, i) in data" :key="i">
            <Card :data="d"/>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import {mainTextEn} from "../assets/data";

export default {
  layout: 'default',
  data: () => {
    return {
      mainText: mainTextEn,
      data: []
    }
  },
  async mounted(){
    this.data = await this.$axios.$get('/api/product')
    this.data.slice(0,4)
  }
}
</script>
<style scoped>
.w-33 {
  width: 50%;
}

.about-us-text {
  color: white;
}

.about-us-text:hover {
  text-decoration: none;
}

main {
  height: 500px;
  display: flex;
  align-items: center;
  flex-direction: column;
}

.hello-main-text {
  color: rgb(43,57,144);
  font-size: 1.6rem;
  text-align: center;
  font-weight: 600;
}

.hello-main-page__inner {
  padding: 40px;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -ms-flex-direction: column;
  flex-direction: column;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  width: 40%;
  position: relative;
  justify-self: center;
}

.button-about-us {
  color: var(--white_hex);
  background-color: var(--middle_lavender);
  border-radius: 10px;
  border: none;
  transition: background-color .2s linear;
  padding: 5px 7px;
}

.button-about-us:hover {
  background-color: #b5b8d6;
  transition: background-color .2s linear;
}

.hello-circle {
  padding: 10px 26px;
  background-color: rgb(var(--green_light));
  font-size: 50px;
  border-radius: 50%;
}
</style>
