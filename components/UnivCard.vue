<template>
  <div>
      <article @click="navigateTo(data._id)" class="card" v-if="data">
        <img :src="imageUrl + data.images[0].url" alt="university-image" class="img">
        <div class="grid-area">
          <div class="left-col">
            <h4 class="location">{{data.location}}</h4>
            <h3 class="name" v-if="isIncludesSp">{{data.nameSp}}</h3>
            <h3 class="name" v-else>{{data.nameEn}}</h3>
            <hr>
            <h5 class="description" v-if="isIncludesSp">{{data.descriptionSp}}</h5>
            <h5 class="description" v-else>{{data.descriptionEn}}</h5>
          </div>
          <div class="right-col">
            <ul>
              <li>
                Founded
                <span>{{data.founded}}</span>
              </li>
              <li>
                Int'l Students
                <span>{{data.intStudents}}</span>
              </li>
              <li>
                Faculty
                <span>{{data.faculty}}</span>
              </li>
              <li>
                Total Students
                <span>{{data.totalStudents}}</span>
              </li>
            </ul>
          </div>
        </div>
      </article>
  </div>
</template>

<script>
import {imageUrl} from "../assets/data";

export default {
  props: {
    data: {
      type: Array,
      required: true
    }
  },
  computed: {
    isIncludesSp() {
      return this.$route.fullPath.includes('sp')
    }
  },
  data: () => {
    return {
      imageUrl: imageUrl
    }
  },
  methods: {
    navigateTo(id){
      if(this.isIncludesSp) {
        this.$router.push('/sp/univ-page/?id=' + id)
      } else {
        this.$router.push('/univ-page/?id=' + id)
      }
    }
  }
}
</script>

<style scoped>
.img {
  width: 100%;
  height: 120px;
  object-fit: cover;
  border-radius: var(--standard_border_radius) var(--standard_border_radius) 0 0;
}

.location, .name, .description {
  color: var(--gray_light);
  font-weight: 400;
  font-family: "Source Sans Pro";
  font-size: 12px;
}

.name {
  color: var(--white_hex);
  font-size: 14px;
}

.description {
  text-overflow: ellipsis;
}

.card {
  background-color: rgb(var(--color_primary));
  border: 0;
  border-radius: var(--standard_border_radius);
}

.grid-area {
  display: grid;
  grid-template-columns: 50% 50%;
  padding: 20px;
}

ul {
  display: grid;
  grid-template-columns: 50% 50%;
}

li {
  display: flex;
  flex-direction: column;
  color: var(--gray_light);
  font-family: 'Source Sans Pro',serif;
  font-weight: 600;
  padding: 5px;
  font-size: 14px;
}

span {
  color: white;
}

</style>
