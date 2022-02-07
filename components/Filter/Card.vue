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
        <label for="Programs">Programs</label>
        <select v-model="programsValue" id="Programs" class="form-control">
          <option value="">All Fields of study</option>
          <option v-for="(name,i) in programsData" :value="name" :key="i">{{ name }}</option>
        </select>
      </div>
      <div class="secondFilters" v-else>
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
import {degree, fieldOfCourses, fieldOfStudy, programs, universityData} from "../../assets/data";

export default {
  data: () => {
    return {
      fieldOfStudy: fieldOfStudy,
      fieldOfCourses: fieldOfCourses,
      universities: universityData,
      degree: degree,
      programsData: programs,

      pickedValue: 'degree',

      universitiesValue: '',
      programsValue: '',
      fieldCoursesValue: '',
      fieldStudyValue: '',
      degreeVal: '',
    }
  },
  methods: {
    HandleSubmit() {
      if(this.pickedValue === 'degree') {
        this.$router.push(`/programs/?degree=${this.degreeVal}&fieldStudy=${this.fieldStudyValue}&program=${this.programsValue}&type=degree`)
      } else {
        this.$router.push(`/programs/?univ=${this.universitiesValue}&field=${this.fieldCoursesValue}&type=courses`)
      }
    },
    selectPickedValue(text){
      this.pickedValue = text
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
  background: var(--dark_blue);
  width: 100%;
  border-radius: 15px;
}

label {
  font-family: "Source Sans Pro",serif;
  color: var(--white_hex);
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
  color: var(--white_hex);
  font-weight: 700;
  font-size: 14px;
  text-align: left;
}

.btn.focus, .btn:focus {
  box-shadow: none;
}

.pickedBtn {
  border-bottom: var(--white_hex) solid 2px;
}

</style>
