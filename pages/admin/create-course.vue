<template>
  <div class="container">
    <form @submit.prevent="SubmitHandler">
      <label>Name English</label>
      <input v-model="nameEn" class="form-control" type="text" placeholder="name">

      <label>Name Spanish</label>
      <input v-model="nameSp" class="form-control" type="text" placeholder="name">

      <label>Deadline</label>
      <input v-model="deadline" class="form-control" type="text" placeholder="deadline">

      <label>Universities English</label>
      <select v-model="universityEn" class="form-control">
        <option v-for="(name,i) in universityDataEn" :value="name" :key="i">{{ name }}</option>
      </select>

      <label>Universities Spanish</label>
      <select v-model="universitySp" class="form-control">
        <option v-for="(name,i) in universityDataSp" :value="name" :key="i">{{ name }}</option>
      </select>


      <label>Cities</label>
      <select v-model="location" class="form-control">
        <option v-for="(name,i) in citiesData" :value="name" :key="i">{{ name }}</option>
      </select>

      <label>Field Of Study English</label>
      <select v-model="fieldOfCourseEn" class="form-control">
        <option v-for="(name,i) in fieldOfCourseDataEn" :value="name" :key="i">{{ name }}</option>
      </select>

      <label>Field Of Study Spanish</label>
      <select v-model="fieldOfCourseSp" class="form-control">
        <option v-for="(name,i) in fieldOfCourseDataSp" :value="name" :key="i">{{ name }}</option>
      </select>

      <label>Price</label>
      <input v-model="price" class="form-control" type="number" placeholder="price">
      <label>Start Date</label>
      <input v-model="startDate" class="form-control" type="text" placeholder="startDate">
      <label>Duration</label>
      <input v-model="duration" class="form-control" type="number" placeholder="duration">
      <label>Image</label>
      <label for="file-upload" class="custom-file-upload w-100">
        Upload Image
      </label>
      <span v-if="file.name">{{file.name}}</span>
      <input id="file-upload" @change="getFile" class="form-control" type="file" ref="file">
      <button class="btn btn-primary mt-5 w-100" type="submit">Submit</button>
    </form>
  </div>
</template>

<script>
import {
  PRODUCT_CREATED,
  fieldOfCourses,
  city, universityDataEn, universityData, fieldOfCoursesSp
} from "../../assets/data";

export default {
  layout: 'admin',
  data: () => {
    return {
      response: '',

      nameEn: '',
      nameSp: '',

      fieldOfCourseEn: '',
      fieldOfCourseSp: '',

      price: '',
      location: '',
      duration: '',

      universityEn: '',
      universitySp: '',

      deadline: '',
      city: '',
      startDate: '',
      fieldOfCourseDataEn: fieldOfCourses,
      fieldOfCourseDataSp: fieldOfCoursesSp,

      universityDataEn: universityDataEn,
      universityDataSp: universityData,

      citiesData: city,
      file: ''
    }
  },
  methods: {
    async SubmitHandler(e) {
      e.preventDefault()
      try {
        const formData = new FormData()

        formData.append('file', this.file)
        formData.append('nameEn', this.nameEn)
        formData.append('nameSp', this.nameSp)
        formData.append('fieldOfCourseEn', this.fieldOfCourseEn)
        formData.append('fieldOfCourseSp', this.fieldOfCourseSp)
        formData.append('startDate', this.startDate)
        formData.append('price', this.price)
        formData.append('universitiesEn', this.universityEn)
        formData.append('universitiesSp', this.universitySp)
        formData.append('location', this.location)
        formData.append('duration', this.duration)
        formData.append('deadline', this.deadline)
        formData.append('createdAt', Date.now().toString())

        await this.$axios.$post('/api/courses/create', formData, {
          headers: {
            Authorization: `Bearer ` + localStorage.getItem('jwt'),
            "Content-Type": 'multipart/form-data'
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
