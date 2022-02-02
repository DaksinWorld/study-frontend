<template>
  <div class="container" v-if="data">
    <form @submit.prevent="SubmitHandler">
      <label>Name</label>
      <input v-model="name" class="form-control" type="text" :placeholder="data.name">
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
      <input v-model="description" class="form-control" type="text" :placeholder="data.description">
      <label>Price</label>
      <input v-model="price" class="form-control" type="text" :placeholder="data.price">
      <label>Language</label>
      <input v-model="language" class="form-control" type="text" :placeholder="data.language">
      <label>Location</label>
      <input v-model="location" class="form-control" type="text" :placeholder="data.location">
      <label>Duration</label>
      <input v-model="duration" class="form-control" type="text" :placeholder="data.duration">
      <label>Foundation Course Price</label>
      <input v-model="foundationCoursePrice" class="form-control" type="text" :placeholder="data.foundationCoursePrice">
      <label>Image</label>
      <label for="file-upload" class="custom-file-upload">
        Upload Image
      </label>
      <input id="file-upload" @change="getFile" class="form-control" type="file" ref="file">
      <img v-if="data.images" width="100" height="130" :src="`/images/${data.images[1].url}`" alt="image">
      <button class="btn btn-primary mt-5 w-100" type="submit">Submit</button>
    </form>
    <button class="btn btn-danger my-5" @click="deleteProduct">Delete</button>
  </div>
</template>

<script>
import {degree, fieldOfStudy, PRODUCT_DELETED, PRODUCT_UPDATED, programs} from "../../assets/data";

export default {
  layout: 'admin',
  data: () => {
    return {
      data: [],
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
      form: [],
      degreeData: degree,
      fieldOfStudyData: fieldOfStudy,
      programsData: programs
    }
  },
  async mounted() {
    this.data = await this.$axios.$get('/api/product/find/' + this.$route.params.id)
    this.name = this.data.name
    this.fieldOfStudy = this.data.fieldOfStudy
    this.programs = this.data.programs
    this.degree = this.data.degree
    this.description = this.data.description
    this.price = this.data.price
    this.language = this.data.language
    this.location = this.data.location
    this.duration = this.data.duration
    this.foundationCoursePrice = this.data.foundationCoursePrice
    this.file = this.data.images
  },
  methods: {
    async SubmitHandler(e) {
      e.preventDefault()
      try {
        const formData = new FormData()

        if(this.file !== '') {
          formData.append('file', this.file)
        }

        formData.append('name', this.name)
        formData.append('degree', this.degree)
        formData.append('programs', this.programs)
        formData.append('fieldOfStudy', this.fieldOfStudy)
        formData.append('description', this.description)
        formData.append('price', this.price)
        formData.append('language', this.language)
        formData.append('location', this.location)
        formData.append('duration', this.duration)
        formData.append('foundationCoursePrice', this.foundationCoursePrice)

        await this.$axios.$patch('/api/product/' + this.$route.params.id, formData, {headers: {
            Authorization: `Bearer ` + localStorage.getItem('jwt'),
            "Content-Type": 'multipart/form-data'
          }})
        this.$store.dispatch('setMessage', {
          value: PRODUCT_UPDATED,
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
    async deleteProduct() {
      try {
        await this.$axios.$delete('/api/product/'+this.$route.params.id, {headers: {
            Authorization: `Bearer ` + localStorage.getItem('jwt'),
          }})
        this.$store.dispatch('setMessage', {
          value: PRODUCT_DELETED,
          type: 'primary'
        })
        this.$router.push('/admin')
      } catch(e) {
        this.$store.dispatch('setMessage', {
          value: e,
          type: 'danger'
        })
      }
    }
  }
}
</script>

<style scoped>
.custom-file-upload {
  border: 1px solid #ccc;
  display: inline-block;
  padding: 6px 12px;
  cursor: pointer;
  width: 100%;
}

input[type=file] {
  display: none;
}
</style>
