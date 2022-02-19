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
        <div class="degree" v-if="isIncludesSp">
          <label for="degree">Degree</label>
          <select v-model="degreeVal" id="degree" class="form-control">
            <option value="">All Degrees</option>
            <option v-for="(name,i) in degreeSp" :value="name" :key="i">{{ name }}</option>
          </select>
        </div>
        <div class="degree" v-else>
          <label>Degree</label>
          <select v-model="degreeVal" class="form-control">
            <option value="">All Degrees</option>
            <option v-for="(name,i) in degreeEn" :value="name" :key="i">{{ name }}</option>
          </select>
        </div>
        <div class="fieldOfStudy" v-if="isIncludesSp">
          <label>Field Of Study</label>
          <select v-model="fieldStudyValue" class="form-control">
            <option value="">All Fields of study</option>
            <option v-for="(name,i) in fieldOfStudySp" :value="name" :key="i">{{ name }}</option>
          </select>
        </div>
        <div class="fieldOfStudy" v-else>
          <label>Field Of Study</label>
          <select v-model="fieldStudyValue" id="fieldOfStudy" class="form-control">
            <option value="">All Fields of study</option>
            <option v-for="(name,i) in fieldOfStudyEn" :value="name" :key="i">{{ name }}</option>
          </select>
        </div>
        <div class="degree" v-if="isIncludesSp">
          <label>Programs</label>
          <select v-model="programsValue" class="form-control">
            <option value="">All Fields of study</option>
            <option v-for="(name,i) in programsDataSp" :value="name" :key="i">{{ name }}</option>
          </select>
        </div>
        <div class="degree" v-else>
          <label>Programs</label>
          <select v-model="programsValue" class="form-control">
            <option value="">All Fields of study</option>
            <option v-for="(name,i) in programsDataEn" :value="name" :key="i">{{ name }}</option>
          </select>
        </div>
      </div>
      <div class="secondFilters" v-else>
        <div class="degree" v-if="isIncludesSp">
          <label>Field Of Study</label>
          <select v-model="fieldCoursesValue" class="form-control">
            <option value="">All Fields of study</option>
            <option v-for="(name,i) in fieldOfCoursesSp" :value="name" :key="i">{{ name }}</option>
          </select>
        </div>
        <div class="degree" v-else>
          <label>Field Of Study</label>
          <select v-model="fieldCoursesValue"class="form-control">
            <option value="">All Fields of study</option>
            <option v-for="(name,i) in fieldOfCoursesEn" :value="name" :key="i">{{ name }}</option>
          </select>
        </div>
        <div class="fieldOfStudy" v-if="isIncludesSp">
          <label>Universities</label>
          <select v-model="universitiesValue" class="form-control">
            <option value="">All Universities</option>
            <option v-for="(name,i) in universitiesSp" :value="name" :key="i">{{ name }}</option>
          </select>
        </div>
        <div class="fieldOfStudy" v-else>
          <label>Universities</label>
          <select v-model="universitiesValue" class="form-control">
            <option value="">All Universities</option>
            <option v-for="(name,i) in universitiesEn" :value="name" :key="i">{{ name }}</option>
          </select>
        </div>
      </div>
    </div>
    <button @click="HandleSubmit" type="submit" class="btn btn-primary w-100 mt-4">Search Programs</button>
  </div>
</template>

<script>
import {
  degree, degreeSp,
  fieldOfCourses,
  fieldOfCoursesSp,
  fieldOfStudy,
  fieldOfStudySp,
  programsEn, programsSp,
  universityData, universityDataEn
} from "../../assets/data";

export default {
  data: () => {
    return {
      fieldOfStudyEn: fieldOfStudy,
      fieldOfStudySp: fieldOfStudySp,

      fieldOfCoursesEn: fieldOfCourses,
      fieldOfCoursesSp: fieldOfCoursesSp,

      universitiesEn: universityDataEn,
      universitiesSp: universityData,

      degreeEn: degree,
      degreeSp: degreeSp,

      programsDataEn: programsEn,
      programsDataSp: programsSp,

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
        if(this.isIncludesSp) {
          this.$router.push(`/sp/programs/?degree=${this.degreeVal}&fieldStudy=${this.fieldStudyValue}&program=${this.programsValue}&type=degree`)
        } else {
          this.$router.push(`/programs/?degree=${this.degreeVal}&fieldStudy=${this.fieldStudyValue}&program=${this.programsValue}&type=degree`)
        }
      } else {
        if(this.isIncludesSp) {
          this.$router.push(`/sp/programs/?univ=${this.universitiesValue}&field=${this.fieldCoursesValue}&type=courses`)
        } else {
          this.$router.push(`/programs/?univ=${this.universitiesValue}&field=${this.fieldCoursesValue}&type=courses`)
        }
      }
    },
    selectPickedValue(text){
      this.pickedValue = text
    }
  },
  computed: {
    isIncludesSp() {
      return this.$route.fullPath.includes('sp')
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

@media screen and (max-width: 500px) {
  .btn {
    width: 100%;
    text-align: center;
  }
}

</style>
