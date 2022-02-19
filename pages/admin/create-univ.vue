<template>
  <div class="wrapper">
    <form @submit.prevent="SubmitHandler">
      <label>Name English</label>
      <select v-model="nameEn" class="form-control">
        <option v-for="(name,i) in universityDataEn" :value="name" :key="i">{{ name }}</option>
      </select>
      <label>Name Spanish</label>
      <select v-model="nameSp" class="form-control">
        <option v-for="(name,i) in universityDataSp" :value="name" :key="i">{{ name }}</option>
      </select>
      <label>Location</label>
      <select v-model="location" class="form-control">
        <option v-for="(name,i) in cities" :value="name" :key="i">{{ name }}</option>
      </select>
      <label>Description English</label>
      <input v-model="descriptionEn" class="form-control" type="text" placeholder="Description">
      <label>Description Spanish</label>
      <input v-model="descriptionSp" class="form-control" type="text" placeholder="Description">
      <label>Int'l Students</label>
      <input v-model="intStudents" class="form-control" type="text" placeholder="Int'l students">
      <label>Founded</label>
      <input v-model="founded" class="form-control" type="text" placeholder="Founded">
      <label>Faculty</label>
      <input v-model="faculty" class="form-control" type="text" placeholder="Faculty">
      <label>Total Students</label>
      <input v-model="totalStudents" class="form-control" type="text" placeholder="Total Students">
      <label>Image</label>
      <label>Image</label>
      <label for="file-upload" class="custom-file-upload">
        Upload Image
      </label>
      <input id="file-upload" @change="getFile" class="form-control" type="file" ref="file">
      <img v-if="data.images" width="100" height="130" :src="`/images${data.images[1].url}`" alt="image">
      <button class="btn btn-primary mt-5 w-100" type="submit">Submit</button>
    </form>
  </div>
</template>

<script>
import {city, universityData, universityDataEn} from "../../assets/data";

export default {
  layout: 'admin',
  data: () => {
    return {
      data: [],

      descriptionEn: '',
      descriptionSp: '',

      nameEn: '',
      nameSp: '',

      location: '',
      totalStudents: '',
      intStudents: '',
      founded: '',
      file: '',
      faculty: '',

      universityDataEn: universityDataEn,
      universityDataSp: universityData,

      cities: city
    }
  },
  methods: {
    async SubmitHandler(e) {
      e.preventDefault()
      try {
        const formData = new FormData()

        if(this.file !== '') {
          formData.append('file', this.file)
        }

        formData.append('nameEn', this.nameEn)
        formData.append('nameSp', this.nameSp)
        formData.append('location', this.location)
        formData.append('descriptionEn', this.descriptionEn)
        formData.append('descriptionSp', this.descriptionSp)
        formData.append('founded', this.founded)
        formData.append('intStudents', this.intStudents)
        formData.append('faculty', this.faculty)
        formData.append('totalStudents', this.totalStudents)

        console.log(formData)

        await this.$axios.$post('/api/univ', formData, {headers: {
            Authorization: `Bearer ` + localStorage.getItem('jwt'),
            "Content-Type": 'multipart/form-data'
          }})
        this.$store.dispatch('setMessage', {
          value: 'Univ created',
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
