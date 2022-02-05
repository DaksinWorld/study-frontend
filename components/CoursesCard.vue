<template>
  <div>
    <article class="card" v-if="data">
      <div class="card-top">
        <div class="card-header">
          <div class="logo"><img height="90" width="90" :src="`http://localhost:3000${data.images[1].url}`" alt=""></div>
          <div class="card-university-info">
            <div class="d-flex flex-column">
              <span class="university-description">{{data.universities}}</span>
              <span class="university-location d-flex align-items-center"><img width="20" height="20" src="https://gt.education/img/svg/home.svg" alt="location"> {{ data.location}}</span>
            </div>
            <span class="university-degree">Foundation Course/{{data.fieldOfCourse}}</span>
          </div>
        </div>
        <div class="card-specialty">
          {{data.programs}}
        </div>
      </div>
      <div class="card-bottom">
        <ul class="card-detail-list">
          <li>
            Tuition fee
            <span>{{data.price}}</span>
          </li>
          <li>
            Duration
            <span>{{(data.duration / 12).toFixed()}} Years</span>
          </li>
          <li>
            Language
            <span>{{data.language}}</span>
          </li>
          <li>
            Foundation course
            <span>{{data.foundationCoursePrice}}</span>
          </li>
        </ul>
      </div>
    </article>
  </div>
</template>

<script>
export default {
  props: ['data']
}
</script>

<style scoped>
@import "../assets/css/card.styles.css";
</style>
