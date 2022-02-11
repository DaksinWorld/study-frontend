<template>
  <div>
    <article class="card" v-if="type === 'program'">
      <div class="card-top">
        <div class="card-header">
          <div class="logo"><img height="90" width="90" :src="`${imageUrl}${data.images[1].url}`" alt=""></div>
          <div class="card-university-info">
            <div class="d-flex flex-column">
              <span class="university-description">{{data.description}}</span>
              <span class="university-location d-flex align-items-center"><img width="20" height="20" src="https://gt.education/img/svg/home.svg" alt="location"> {{ data.location}}</span>
            </div>
            <span class="university-degree">{{data.degree}}/{{data.fieldOfStudy}}</span>
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
    <article class="card" v-else>
      <div class="card-top">
        <div class="card-header">
          <div class="logo"><img height="90" width="90" :src="`${imageUrl}${data.images[1].url}`" alt=""></div>
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
            Application deadline
            <span>{{data.deadline}}</span>
          </li>
          <li>
            Start Date
            <span>{{data.startDate}}</span>
          </li>
        </ul>
      </div>
    </article>
  </div>
</template>

<script>
import {imageUrl} from "../../assets/data";

export default {
  props: ['data', 'type'],
  data: () => {
    return {
      imageUrl: imageUrl
    }
  },
}
</script>

<style scoped>
@import "../../assets/css/card.styles.css";
</style>
