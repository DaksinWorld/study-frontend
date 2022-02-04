<template>
  <div class="card p-3">
    <div class="card-toggle">
      <button
        :class="{pickedBtn: pickedValue === 'degree'}"
        @click="selectPickedValue('degree')"
        class="btn">DEGREE PROGRAMS</button>
      <button
        @click="selectPickedValue('courses')"
        :class="{pickedBtn: pickedValue === 'courses'}"
        class="btn">FOUNDATION COURSES</button>
    </div>
    <div class="filters">
      <div class="firstFilters" v-if="pickedValue === 'degree'">
        <div class="degree">
          <label for="degree">Degree</label>
          <select v-model="degreeVal" id="degree" class="form-control">
            <option value="">All Degrees</option>
            <option v-for="(name,i) in degree" :value="name" :key="i">{{ name }}</option>
          </select>
        </div>
        <div class="fieldOfStudy">
          <label for="fieldOfStudy">Field Of Study</label>
          <select v-model="fieldStudyValue" id="fieldOfStudy" class="form-control">
            <option value="">All Fields of study</option>
            <option v-for="(name,i) in fieldOfStudy" :value="name" :key="i">{{ name }}</option>
          </select>
        </div>
      </div>
      <div class="secondFilters" v-else>
        {{fieldCoursesValue}}
        {{universitiesValue}}
        <div class="degree">
          <label for="fieldOfStudy2">Field Of Study</label>
          <select v-model="fieldCoursesValue" id="fieldOfStudy2" class="form-control">
            <option value="">All Fields of study</option>
            <option v-for="(name,i) in fieldOfCourses" :value="name" :key="i">{{ name }}</option>
          </select>
        </div>
        <div class="fieldOfStudy">
          <label for="Universities">Universities</label>
          <select v-model="universitiesValue" id="Universities" class="form-control">
            <option value="">All Universities</option>
            <option v-for="(name,i) in universities" :value="name" :key="i">{{ name }}</option>
          </select>
        </div>
      </div>
    </div>
    <button @click="HandleSubmit" type="submit" class="btn btn-primary w-100 mt-4">Search Programs</button>
  </div>
</template>

<script>
import {degree, fieldOfCourses, fieldOfStudy, universityData} from "../../assets/data";

export default {
  data: () => {
    return {
      fieldOfStudy: fieldOfStudy,
      fieldOfCourses: fieldOfCourses,
      universities: universityData,
      pickedValue: 'degree',
      degree: degree,
      universitiesValue: '',
      fieldCoursesValue: '',
      fieldStudyValue: '',
      degreeVal: '',
    }
  },
  methods: {
    HandleSubmit() {
      if(this.pickedValue === 'degree') {
        this.$router.push(`/programs/?degree=${this.degreeVal}&fieldStudy=${this.fieldStudyValue}&type=degree`)
      } else {
        this.$router.push(`/programs/?univ=${this.universitiesValue}&fieldCourses=${this.fieldCoursesValue}&type=courses`)
      }
    },
    selectPickedValue(text){
      this.pickedValue = text
      this.$router.push(`/programs/?type=${text}`)
    }
  },
  mounted() {
    if(this.$route.query.type === 'courses') {
      this.pickedValue = 'courses'
    }
  }
}
</script>

<style scoped>
button[type=submit] {
  border-radius: 5px;
}

.card {
  background: var(--light_yellow);
  width: 100%;
  border-radius: 15px;
}

label {
  font-family: "Source Sans Pro",serif;
  color: rgb(var(--color_primary));
  font-size: 20px;
}

.btn-primary {
  text-align: center !important;
  color: white !important;
}

.btn {
  border-radius: 0;
  outline: 0;
  width: 49.5%;
  font-family: 'Source Sans Pro';
  color: rgb(var(--color_primary));
  font-weight: 700;
  font-size: 14px;
  text-align: left;
}

.btn.focus, .btn:focus {
  box-shadow: none;
}

.pickedBtn {
  border-bottom: #ffffff solid 2px;
}

</style>
