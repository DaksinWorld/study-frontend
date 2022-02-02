<template>
  <div class="container">
    <form @submit.prevent="SubmitHandler">
      <label>Name</label>
      <input v-model="name" class="form-control" type="text" placeholder="name">
      <label>Degree</label>
      <select v-model="degree" class="form-control">
        <option v-for="(name,i) in degreeData" :value="name" :key="i">{{name}}</option>
      </select>
      <label>Field Of Study</label>
      <select v-model="fieldOfStudy" class="form-control">
        <option v-for="(name,i) in fieldOfStudyData" :value="name" :key="i">{{ name }}</option>
      </select>
      <label>Programs</label>
      <select v-model="programs" class="form-control">
        <option v-for="(name,i) in programsData" :value="name" :key="i">{{ name }}</option>
      </select>
      <label>Description</label>
      <input v-model="description" class="form-control" type="text" placeholder="description">
      <label>Price</label>
      <input v-model="price" class="form-control" type="number" placeholder="price">
      <label>Language</label>
      <input v-model="language" class="form-control" type="text" placeholder="language">
      <label>Location</label>
      <input v-model="location" class="form-control" type="text" placeholder="location">
      <label>Duration</label>
      <input v-model="duration" class="form-control" type="number" placeholder="duration">
      <label>Foundation Course Price</label>
      <input multiple value v-model="foundationCoursePrice" class="form-control" type="number" placeholder="foundationCoursePrice">
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
import {fieldOfStudy, PRODUCT_CREATED, programs,degree} from "../../assets/data";

export default {
  layout: 'admin',
  data: () => {
    return {
      response: '',
      name: '',
      degree: '',
      programs: '',
      fieldOfStudy: '',
      description: '',
      price: '',
      language: '',
      location: '',
      duration: '',
      foundationCoursePrice: '',
      file: '',
      degreeData: degree,
      fieldOfStudyData: fieldOfStudy,
      programsData: programs
    }
  },
  methods: {
    async SubmitHandler(e) {
      e.preventDefault()
      try {
        const formData = new FormData()

        formData.append('file', this.file)
        formData.append('name', this.name)
        formData.append('fieldOfStudy', this.fieldOfStudy)
        formData.append('programs', this.programs)
        formData.append('degree', this.degree)
        formData.append('description', this.description)
        formData.append('price', this.price)
        formData.append('language', this.language)
        formData.append('location', this.location)
        formData.append('duration', this.duration)
        formData.append('foundationCoursePrice', this.foundationCoursePrice)

        await this.$axios.$post('/api/product/create', formData, {
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
