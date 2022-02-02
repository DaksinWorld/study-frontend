<template>
  <div class="container">
    <form @submit.prevent="SubmitHandler">
      <label>Name</label>
      <input v-model="name" class="form-control" type="text" placeholder="name">
      <label>Deadline</label>
      <input v-model="deadline" class="form-control" type="text" placeholder="deadline">
      <label>Universities</label>
      <select v-model="university" class="form-control">
        <option v-for="(name,i) in universitiesData" :value="name" :key="i">{{ name }}</option>
      </select>
      <label>Cities</label>
      <select v-model="city" class="form-control">
        <option v-for="(name,i) in citiesData" :value="name" :key="i">{{ name }}</option>
      </select>
      <label>Field Of Study</label>
      <select v-model="fieldOfCourse" class="form-control">
        <option v-for="(name,i) in fieldOfCourseData" :value="name" :key="i">{{ name }}</option>
      </select>
      <label>Price</label>
      <input v-model="price" class="form-control" type="number" placeholder="price">
      <label>Start Date</label>
      <input v-model="startDate" class="form-control" type="text" placeholder="startDate">
      <label>Location</label>
      <input v-model="location" class="form-control" type="text" placeholder="location">
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
  city, universityData
} from "../../assets/data";

export default {
  layout: 'admin',
  data: () => {
    return {
      response: '',
      name: '',
      fieldOfCourse: '',
      description: '',
      price: '',
      location: '',
      duration: '',
      university: '',
      deadline: '',
      city: '',
      startDate: '',
      fieldOfCourseData: fieldOfCourses,
      universityData: universityData,
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
        formData.append('name', this.name)
        formData.append('fieldOfCourse', this.fieldOfCourse)
        formData.append('startDate', this.startDate)
        formData.append('description', this.description)
        formData.append('price', this.price)
        formData.append('university', this.university)
        formData.append('location', this.location)
        formData.append('duration', this.duration)
        formData.append('deadline', this.deadline)
        formData.append('city', this.city)

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
