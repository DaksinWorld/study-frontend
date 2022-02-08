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
      <div class="container">
        <div class="plan-b mt-5">
          <div class="d-flex flex-row align-items-center">
            <div class="text">
              <h2 class="plan-b-title">Plan B</h2>
              <h3 class="plan-b-subtitle">We will send your application to all universities and in two weeks you will receive the contacts of a responsible person of a university that chosen you. From this moment you get admission on your own.We will send your application to all universities and in two weeks you will receive the contacts of a responsible person of a university that chosen you. From this moment you get admission on your own.</h3>
            </div>
            <img width="400" height="200" src="/plan-b.svg" alt="plan-b-bg">
          </div>
          <button class="btn plan-b-btn" @click="isModalOpened = true">Use Plan B</button>
        </div>
        <div v-if="isModalOpened">
          <div @click="isModalOpened = false" class="modal" >
          </div>
          <PlanBCard class="plan-b-card"/>
        </div>
      </div>
      <div class="universities">
        <div class="container">
          <div class="text m-2">
            <h2>
              Universities
            </h2>
            <h3>Only regional universities. Regional doesn't mean backward. It means fresh and authentic. The education quality matches capital institutes, while tuition fees are far more affordable.</h3>
          </div>
          <div class="catalog-univ">
            <div class="d-flex flex-row flex-wrap">
              <div class="w-33" v-for="u in univ" :key="u.name">
                <UnivCard class="m-2" :data="u"/>
              </div>
            </div>
            <nuxt-link to="/universities">
              <button class="button-about-us color-lavender m-2">
                All Universities
              </button>
            </nuxt-link>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import {mainTextEn} from "../assets/data";
import UnivCard from "../components/UnivCard";

export default {
  components: {UnivCard},
  layout: 'default',
  data: () => {
    return {
      mainText: mainTextEn,
      data: [],
      univ: [],
      isModalOpened: false
    }
  },
  async mounted(){
    this.data = await this.$axios.$get('/api/product')
    this.data.slice(0,4)
    this.univ = await this.$store.dispatch('requests/getAll', 'univ')
    this.univ.slice(0,3)
  }
}
</script>
<style scoped>

.plan-b-title {
  font-size: 36px;
  font-weight: 600;
  font-family: 'Montserrat',serif;
  color: var(--white_hex);
}

.color-lavender {
  background-color: rgb(var(--middle_lavender)) !important;
  color: var(--green_light);
}

.plan-b-card {
  position: fixed;
  top: 33%;
  left: 28%;
  z-index: 1100;
}

.modal {
  position: fixed;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  background-color: rgba(0,0,0,0.7);
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

}

.plan-b-subtitle {
  font-size: 16px;
  font-weight: 500;
  font-family: Montserrat,serif;
  color: var(--gray_light);
  width: 50%;
}

.plan-b-btn {
  background-color: rgb(var(--middle_lavender));
  color: var(--white_hex) !important;
}

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

.universities {
  margin-top: 50px;
  background-color: #afb5d5;
  width: 100%;
  padding: 20px 0;
}

.universities h2,h3  {
  font-family: "Source Sans Pro";
  font-weight: 700;
  color: white;
}

.universities h3 {
  font-size: 16px;
  color: rgb(var(--gray_light)) !important;
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

.plan-b {
  width: 100%;
  background-color: #2b3990;
  padding: 30px;
  border-radius: 25px;
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
