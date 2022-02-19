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
      <input v-model="intStudents" class="form-control" type="text" placeholder="Description">
      <label>Founded</label>
      <input v-model="founded" class="form-control" type="text" placeholder="Description">
      <label>Faculty</label>
      <input v-model="faculty" class="form-control" type="text" placeholder="Description">
      <label>Total Students</label>
      <input v-model="totalStudents" class="form-control" type="text" placeholder="Subtitle">
      <label>Image</label>
      <label>Image</label>
      <label for="file-upload" class="custom-file-upload">
        Upload Image
      </label>
      <input id="file-upload" @change="getFile" class="form-control" type="file" ref="file">
      <img v-if="data.images" width="100" height="130" :src="file" alt="image">
      <button class="btn btn-primary mt-5 w-100" type="submit">Submit</button>
    </form>
    <button class="btn btn-danger my-5" @click="deleteProduct">Delete</button>
  </div>
</template>

<script>
import {city, universityDataEn, universityData} from "../../../assets/data";

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
  async mounted() {
    this.data = await this.$axios.$get('/api/univ/find/' + this.$route.params.id)
    const data = this.data
    this.descriptionEn = data.descriptionEn
    this.descriptionSp = data.descriptionSp
    this.nameEn = data.nameEn
    this.nameSp = data.nameSp
    this.location = data.location
    this.faculty = data.faculty
    this.totalStudents = data.totalStudents
    this.intStudents = data.intStudents
    this.founded = data.founded
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

        await this.$axios.$patch('/api/univ/' + this.$route.params.id, formData, {headers: {
            Authorization: `Bearer ` + localStorage.getItem('jwt'),
            "Content-Type": 'multipart/form-data'
          }})
        this.$store.dispatch('setMessage', {
          value: 'Univ updated',
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
        await this.$axios.$delete('/api/univ/'+this.$route.params.id, {headers: {
            Authorization: `Bearer ` + localStorage.getItem('jwt'),
          }})
        this.$store.dispatch('setMessage', {
          value: 'Univ deleted',
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
