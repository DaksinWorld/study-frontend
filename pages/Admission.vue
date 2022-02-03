<template>
  <div class="wrapper">
    <h1 class="title-1">Admission</h1>
    <h2>The most important things about admission and coming to Russia. How to apply? How to get a student visa? How to get to a university? And other crucial issues about starting study in Russia.</h2>
    <div class="d-flex flex-wrap">
      <div class="w-33" v-for="(d,i) in admissionData" :key="i">
        <AdmissionCard :data="d"/>
      </div>
    </div>
  </div>
</template>

<script>
import {AdmissionCards} from "../assets/data";

export default {
  layout: 'light',
  data: () => {
    return {
      admissionData: AdmissionCards
    }
  }
}
</script>

<style scoped>
.wrapper {
  margin-top: 100px;
}

.title-1 {
  font-family: Montserrat;
  font-weight: 700;
  color: rgb(var(--color_primary));
}

h2 {
  width: 35%;
  font-size: 18px;
  color: rgb(var(--color_primary));
}

</style>
