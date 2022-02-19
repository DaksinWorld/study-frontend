<template>
  <div class="container">
    <form @submit.prevent="SubmitHandler">
      <label>Name English</label>
      <select v-model="nameEn" class="form-control">
        <option v-for="(name,i) in universityDataEn" :value="name" :key="i">{{name}}</option>
      </select>
      <label>Name Spanish</label>
      <select v-model="nameSp" class="form-control">
        <option v-for="(name,i) in universityDataSp" :value="name" :key="i">{{name}}</option>
      </select>

      <label>Degree English</label>
      <select v-model="degreeEn" class="form-control">
        <option v-for="(name,i) in degreeDataEn" :value="name" :key="i">{{name}}</option>
      </select>

      <label>Degree Spanish</label>
      <select v-model="degreeSp" class="form-control">
        <option v-for="(name,i) in degreeDataSp" :value="name" :key="i">{{name}}</option>
      </select>

      <label>Field Of Study English</label>
      <select v-model="fieldOfStudyEn" class="form-control">
        <option v-for="(name,i) in fieldOfStudyDataEn" :value="name" :key="i">{{ name }}</option>
      </select>

      <label>Field Of Study Spanish</label>
      <select v-model="fieldOfStudySp" class="form-control">
        <option v-for="(name,i) in fieldOfStudyDataSp" :value="name" :key="i">{{ name }}</option>
      </select>

      <label>Programs English</label>
      <select v-model="programsEn" class="form-control">
        <option v-for="(name,i) in programsDataEn" :value="name" :key="i">{{ name }}</option>
      </select>

      <label>Programs Spanish</label>
      <select v-model="programsSp" class="form-control">
        <option v-for="(name,i) in programsDataSp" :value="name" :key="i">{{ name }}</option>
      </select>

      <label>Price</label>
      <input v-model="price" class="form-control" type="number" placeholder="price">
      <label>Language</label>
      <select class="form-control" v-model="language">
        <option value="Russian">Russian</option>
        <option value="English">English</option>
      </select>
      <label>Location</label>
      <select v-model="location" class="form-control">
        <option v-for="(name,i) in citiesData" :value="name" :key="i">{{ name }}</option>
      </select>
      <label>Duration(month)</label>
      <input v-model="duration" class="form-control" type="number" placeholder="duration">
      <label>Foundation Course Price</label>
      <input multiple value v-model="foundationCoursePrice" class="form-control" type="number" placeholder="foundationCoursePrice">
      <button class="btn btn-primary mt-5 w-100" type="submit">Submit</button>
    </form>
  </div>
</template>

<script>
import {
  fieldOfStudy,
  PRODUCT_CREATED,
  programs,
  degree,
  universityDataEn,
  city,
  universityData, degreeSp, fieldOfStudySp, programsSp, programsEn
} from "../../assets/data";

export default {
  layout: 'admin',
  data: () => {
    return {
      response: '',

      nameEn: '',
      nameSp: '',

      degreeEn: '',
      degreeSp: '',

      programsEn: '',
      programsSp: '',

      fieldOfStudyEn: '',
      fieldOfStudySp: '',

      price: '',
      language: '',
      location: '',
      duration: '',
      foundationCoursePrice: '',
      file: '',

      degreeDataEn: degree,
      degreeDataSp: degreeSp,

      fieldOfStudyDataEn: fieldOfStudy,
      fieldOfStudyDataSp: fieldOfStudySp,

      programsDataEn: programsEn,
      programsDataSp: programsSp,

      universityDataEn: universityDataEn,
      universityDataSp: universityData,

      citiesData: city
    }
  },
  methods: {
    async SubmitHandler(e) {
      e.preventDefault()
      try {
        let obj = {
          programsEn: this.programsEn,
          programsSp: this.programsSp,
          degreeEn: this.degreeEn,
          degreeSp: this.degreeSp,
          location: this.location,
          fieldOfStudyEn: this.fieldOfStudyEn,
          fieldOfStudySp: this.fieldOfStudySp,
          nameEn: this.nameEn,
          nameSp: this.nameSp,
          language: this.language,
          price: this.price,
          duration: this.duration,
          foundationCoursePrice: this.foundationCoursePrice,
          createdAt: Date.now().toString()
        }

        await this.$axios.$post('/api/product/create', obj, {
          headers: {
            Authorization: `Bearer ` + localStorage.getItem('jwt'),
          }})

        this.$store.dispatch('setMessage', {
          value: PRODUCT_CREATED,
          type: 'primary'
        })

      } catch(e) {
        await this.$store.dispatch('setMessage', {
          value: e,
          type: 'danger'
        })
      }
    },
    getFile(){
      this.file = this.$refs.file.files[0]
    },
  }
}
</script>

<style scoped>

</style>
