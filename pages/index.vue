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
        <h1 class="find-programs-title m-4">Find education programs
        </h1>
        <FilterCard class="m-2"/>
        <div class="find-programs d-flex flex-wrap">
          <div class="w-33" v-for="(d, i) in data" :key="i">
            <Card class="m-2" :data="d"/>
          </div>
        </div>
        <nuxt-link class="searchMore m-2" to="/Programs">
          <button class="btn">Search more...</button>
        </nuxt-link>
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
  width: 33%;
}

.find-programs-title {
  font-weight: 700;
  font-family: 'Montserrat',serif;
  color: var(--dark_blue);
}

.searchMore {
  color: var(--dark_blue) !important;
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
.btn {
   font-size: 20px;
   font-weight: 600;
   color: rgb(var(--green_light));
 }

.hello-circle {
  padding: 10px 26px;
  background-color: rgb(var(--green_light));
  font-size: 50px;
  border-radius: 50%;
}

@media screen and (max-width: 1024px){
  .hello-main-page__inner{
    width: 100%;
  }
}

@media screen and (max-width: 1024px) {
  .find-programs {
    flex-direction: column;
  }
  .w-33 {
    width: 100%;
  }
}


</style>
