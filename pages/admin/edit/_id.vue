<template>
  <div class="container" v-if="data">
    <form @submit.prevent="SubmitHandler">
      <label>Name English</label>
      <input v-model="nameEn" class="form-control" type="text" :placeholder="data.nameEn">

      <label>Name Spanish</label>
      <input v-model="nameSp" class="form-control" type="text" :placeholder="data.nameSp">


      <label>Deadline</label>
      <input v-model="deadline" class="form-control" type="text" :placeholder="data.deadline">

      <label>Universities English</label>
      <select v-model="universityEn" class="form-control">
        <option v-for="(name,i) in universityDataEn" :value="name" :key="i">{{ name }}</option>
      </select>
      <label>Universities Spanish</label>
      <select v-model="universitySp" class="form-control">
        <option v-for="(name,i) in universityDataSp" :value="name" :key="i">{{ name }}</option>
      </select>

      <label>Cities</label>
      <select v-model="city" class="form-control">
        <option v-for="(name,i) in cityData" :value="name" :key="i">{{ name }}</option>
      </select>
      <label>Field Of Course</label>
      <select v-model="fieldOfCourse" class="form-control">
        <option v-for="(name,i) in fieldOfCourseData" :value="name" :key="i">{{ name }}</option>
      </select>
      <label>Price</label>
      <input v-model="price" class="form-control" type="text" :placeholder="data.price">
      <label>Start Date</label>
      <input v-model="startDate" class="form-control" type="text" :placeholder="data.startDate">
      <label>Location</label>
      <input v-model="location" class="form-control" type="text" :placeholder="data.location">
      <label>Duration</label>
      <input v-model="duration" class="form-control" type="text" :placeholder="data.duration">
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
import {city, fieldOfCourses, PRODUCT_UPDATED} from "@/assets/data";
import {PRODUCT_DELETED} from "@/assets/data";
import {universityDataEn, universityData} from "../../../assets/data";

export default {
  layout: 'admin',
  async asyncData({$axios, params}) {
    const data = await $axios.$get('/api/courses/find/' + params.id)

    return {
      data
    }
  },
  data: () => {
    return {
      data: [],
      nameEn: '',
      nameSp: '',
      fieldOfCourse: '',
      description: '',
      price: '',
      location: '',
      duration: '',

      universityEn: '',
      universitySp: '',

      deadline: '',
      city: '',
      startDate: '',
      fieldOfCourseData: fieldOfCourses,

      universityDataEn: universityDataEn,
      universityDataSp: universityData,

      cityData: city,
    }
  },
  async mounted() {
    this.nameEn = this.data.nameEn
    this.nameSp = this.data.nameSp
    this.fieldOfCourseEn = this.data.fieldOfCourseEn
    this.fieldOfCourseSp = this.data.fieldOfCourseSp
    this.price = this.data.price
    this.city = this.data.cities
    this.universityEn = this.data.universitiesEn
    this.universitySp = this.data.universitiesSp
    this.location = this.data.location
    this.deadline = this.data.deadline
    this.duration = this.data.duration
    this.file = this.data.images
    this.startDate = this.data.startDate
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
        formData.append('fieldOfCourse', this.fieldOfCourse)
        formData.append('startDate', this.startDate)
        formData.append('description', this.description)
        formData.append('price', this.price)
        formData.append('universities', this.university)
        formData.append('location', this.location)
        formData.append('duration', this.duration)
        formData.append('deadline', this.deadline)
        formData.append('cities', this.city)
        formData.append('createdAt', Date.now().toString())

        await this.$axios.$patch('/api/courses/' + this.$route.params.id, formData, {headers: {
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
        await this.$axios.$delete('/api/courses/'+this.$route.params.id, {headers: {
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
