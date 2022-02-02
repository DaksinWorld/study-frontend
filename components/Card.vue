<template>
  <article class="card" v-if="data">
    <div class="card-top">
      <div class="card-header">
        <div class="logo"><img height="50" width="50" :src="`/images/${data.images[1].url}`" alt=""></div>
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
</template>

<script>
export default {
  props: ['data']
}
</script>

<style scoped>
span {
  font-family: 'Source Sans Pro';
  font-size: 16px;
  font-weight: 400;
  color: rgb(var(--color_primary));
}

.card {
  background-color: #EEEFF6;
  border-radius: 1em;
  -webkit-box-shadow: inset 0 0 0 0.1em var(--middle_lavender);
  box-shadow: inset 0 0 0 0.1em var(--middle_lavender);
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -ms-flex-direction: column;
  flex-direction: column;
  -webkit-box-pack: justify;
  -ms-flex-pack: justify;
  justify-content: space-between;
  padding: 20px;
}

.card-header {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-pack: justify;
  -ms-flex-pack: justify;
  justify-content: space-between;
  -webkit-box-orient: horizontal;
  -webkit-box-direction: reverse;
  -ms-flex-direction: row-reverse;
  flex-direction: row-reverse;
  background: none;
  padding: 0;
  border: 0;
}

.card-specialty {
  color: rgb(var(--color_primary));
  font-weight: 700;
  font-size: 24px;
}

.card-university-info {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -ms-flex-direction: column;
  flex-direction: column;
  -webkit-box-pack: justify;
  -ms-flex-pack: justify;
  justify-content: space-between;
}

.card-detail-list {
  border-top: rgb(219,222, 236) 1px solid;
  color: #2B3990;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-pack: justify;
  -ms-flex-pack: justify;
  justify-content: space-between;
  padding: 5px;
}

li {
  display: flex;
  flex-direction: column;
}

.logo {
  border-radius: 50%;
}

.logo img {
  object-fit: cover;
  border-radius: 50%;
}
</style>
