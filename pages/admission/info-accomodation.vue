<template>
  <div class="wrapper">
    <h3 class="title-h3">
      Admission
    </h3>
    <div class="cards">
      <div v-for="d in cardsData" :key="d.name">
        <AdmissionMiniCard :data="d"/>
      </div>
    </div>
    <div class="card">
      <h1 class="adm-title">ACCOMMODATION FOR FOREIGN STUDENTS IN RUSSIA
      </h1>
      <p class="adm-p">Accommodation of a student is one of the most important factors when it comes to a foreign land. The most typical lodging options for an international student in Russia are a university dormitory, a rental apartment or a host family.</p>
      <p class="adm-p-title">
        TYPES OF STUDENT ACCOMMODATION IN RUSSIA
      </p>
      <img src="https://gt.education/img/foto/admission/accommodation-for-foreign-students-in-russia/main/1-4096.webp" alt="image">
      <h2 class="card-h2-title">
      </h2>
      <p class="adm-text">
      </p>
      <p class="adm-text">
      </p>
      <img src="https://gt.education/img/foto/admission/accommodation-for-foreign-students-in-russia/main/2-4096.webp" alt="image">
      <h2 class="card-h2-title">
      </h2>
      <p class="adm-text"></p>
      <img src="https://gt.education/img/foto/admission/accommodation-for-foreign-students-in-russia/main/3-4096.webp" alt="image">
      <h2 class="card-h2-title">
      </h2>
      <p class="adm-text"></p>
      <div class="card-footer">
        <h2 class="card-h2-title"></h2>
        <p class="adm-text"></p>
      </div>
    </div>
  </div>
</template>

<script>
import {AdmissionCards} from "../../assets/data";

export default {
  data: () => {
    return {
      cardsData: AdmissionCards
    }
  }
}
</script>
