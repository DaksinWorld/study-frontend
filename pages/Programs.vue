<template>
  <div class="wrapper grid-temp">
    <div class="toggle-buttons">
      <div class="filter-card">
        <div class="card t23 p-3">
          <div class="card-toggle">
            <button
              :class="{pickedBtn: pickedValue === 'degree'}"
              @click="setPickedValue('degree')"
              class="btn">DEGREE PROGRAMS
            </button>
            <button
              @click="setPickedValue('courses')"
              :class="{pickedBtn: pickedValue === 'courses'}"
              class="btn">FOUNDATION COURSES
            </button>
          </div>
          <div class="filters">
            <div class="firstFilters" v-if="pickedValue === 'degree'">
              <div class="degree" v-if="isIncludesSp">
                <label for="degree">Degree</label>
                <select v-model="degreeValSp" id="degree" class="form-control">
                  <option value="">All Degrees</option>
                  <option v-for="(name,i) in degreeSp" :value="name" :key="i">{{ name }}</option>
                </select>
              </div>
              <div class="degree" v-else>
                <label >Degree</label>
                <select v-model="degreeValEn" class="form-control">
                  <option value="">All Degrees</option>
                  <option v-for="(name,i) in degreeEn" :value="name" :key="i">{{ name }}</option>
                </select>
              </div>
              <div class="fieldOfStudy" v-if="isIncludesSp">
                <label for="fieldOfStudy" >Field Of Study</label>
                <select v-model="fieldStudyValueSp" id="fieldOfStudy" class="form-control">
                  <option value="">All Fields of study</option>
                  <option v-for="(name,i) in fieldOfStudySp" :value="name" :key="i">{{ name }}</option>
                </select>
              </div>
              <div class="fieldOfStudy" v-else>
                <label>Field Of Study</label>
                <select v-model="fieldStudyValueEn" class="form-control">
                  <option value="">All Fields of study</option>
                  <option v-for="(name,i) in fieldOfStudyEn" :value="name" :key="i">{{ name }}</option>
                </select>
              </div>
              <div class="fieldOfStudy" v-if="isIncludesSp">
                <label>Programs</label>
                <select v-model="programsValueSp" class="form-control">
                  <option value="">All Fields of study</option>
                  <option v-for="(name,i) in programsDataSp" :value="name" :key="i">{{ name }}</option>
                </select>
              </div>
              <div class="fieldOfStudy" v-else>
                <label>Programs</label>
                <select v-model="programsValueEn" class="form-control">
                  <option value="">All Fields of study</option>
                  <option v-for="(name,i) in programsDataEn" :value="name" :key="i">{{ name }}</option>
                </select>
              </div>

            </div>
            <div class="secondFilters" v-else>
              <div class="degree" v-if="isIncludesSp">
                <label for="fieldOfStudy12">Field Of Study</label>
                <select v-model="fieldCoursesValueSp" id="fieldOfStudy12" class="form-control">
                  <option value="">All Fields of study</option>
                  <option v-for="(name,i) in fieldOfCoursesSp" :value="name" :key="i">{{ name }}</option>
                </select>
              </div>
              <div class="degree" v-else>
                <label for="fieldOfStudy1">Field Of Study</label>
                <select v-model="fieldCoursesValueEn" id="fieldOfStudy1" class="form-control">
                  <option value="">All Fields of study</option>
                  <option v-for="(name,i) in fieldOfCoursesEn" :value="name" :key="i">{{ name }}</option>
                </select>
              </div>
              <div class="fieldOfStudy" v-if="isIncludesSp">
                <label for="UniversitiesSp">Universities</label>
                <select v-model="universitiesValueSp" id="UniversitiesSp" class="form-control">
                  <option value="">All Universities</option>
                  <option v-for="(name,i) in universitiesSp" :value="name" :key="i">{{ name }}</option>
                </select>
              </div>
              <div class="fieldOfStudy" v-else>
                <label for="Universities">Universities</label>
                <select v-model="universitiesValueEn" id="Universities" class="form-control">
                  <option value="">All Universities</option>
                  <option v-for="(name,i) in universitiesEn" :value="name" :key="i">{{ name }}</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="catalog">
      <div class="center" v-if="isLoading">
        <LoaderPure class="loader"/>
      </div>
      <div v-else class="d-flex flex-wrap flex-column">
        <div class="catalog-sort my-2">
          <div class="first-filter">
            <label for="sortBy">Sort By</label>
            <select class="form-control" id="sortBy" v-model="sortBy">
              <option value="newest">Newest</option>
              <option value="oldest">Oldest</option>
              <option value="cost_lowest">Cost: Lowest first</option>
              <option value="cost_highest">Cost: Highest first</option>
            </select>
          </div>
          <span class="were-found" v-if="pickedValue === 'courses'">{{ sortedCoursesData.length }} courses were found in {{ courses.length }} courses</span>
          <span class="were-found"
                v-else>{{ products.length }} programs were found in {{ sortedData.length }} programs</span>
        </div>
        <div class="d-flex flex-wrap flex-row">
          <div v-for="(d, i) in sortedData" :key="i" v-if="pickedValue === 'degree'" class="w-33">
            <Card class="mr-3 my-2" :data="d"/>
          </div>
          <div class="w-33" v-if="pickedValue === 'courses'" v-for="(d, i) in sortedCoursesData" :key="i">
            <CoursesCard class="mr-3 my-2" :data="d"/>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CoursesCard from "../components/CoursesCard";
import {
  degree, degreeSp,
  fieldOfCourses,
  fieldOfCoursesSp,
  fieldOfStudy, fieldOfStudySp,
  programsEn,
  universityData,
  universityDataEn
} from "../assets/data";

export default {
  components: {CoursesCard},
  layout: 'light',
  data: () => {
    return {
      products: [],
      courses: [],
      isLoading: null,
      sortBy: 'newest',
      pickedValue: 'degree',

      universitiesValueEn: '',
      universitiesValueSp: '',

      fieldCoursesValueEn: '',
      fieldCoursesValueSp: '',

      degreeValEn: '',
      degreeValSp: '',

      fieldStudyValueEn: '',
      fieldStudyValueSp: '',

      programsValueEn: '',
      programsValueSp: '',

      degreeEn: degree,
      degreeSp: degreeSp,

      fieldOfStudyEn: fieldOfStudy,
      fieldOfStudySp: fieldOfStudySp,

      fieldOfCoursesEn: fieldOfCourses,
      fieldOfCoursesSp: fieldOfCoursesSp,

      universitiesEn: universityDataEn,
      universitiesSp: universityData,

      programsDataEn: programsEn,
      programsDataSp: programsEn
    }
  },
  async mounted() {
    try {
      this.isLoading = true
      this.products = await this.$store.dispatch('requests/getAll', 'product')
      this.courses = await this.$store.dispatch('requests/getAll', 'courses')
      this.isLoading = false

      const field = this.$route.query.field
      const univ = this.$route.query.univ

      const degree = this.$route.query.degree

      const type = this.$route.query.type
      const fieldStudy = this.$route.query.fieldStudy
      const programs = this.$route.query.program

      if (type === 'degree') {
        if(this.isIncludesSp) {
          this.degreeValSp = degree
          this.fieldStudyValueSp = fieldStudy
          this.programsValueSp = programs
        } else {
          this.degreeValEn = degree
          this.fieldStudyValueEn = fieldStudy
          this.programsValueEn = programs
        }
      } else if (type === 'courses') {
        if(this.isIncludesSp){
          this.pickedValue = 'courses'
          this.universitiesValueSp = univ
          this.fieldCoursesValueSp = field
        } else {
          this.pickedValue = 'courses'
          this.universitiesValueEn = univ
          this.fieldCoursesValueEn = field
        }
      }

    } catch (e) {

    }
  },
  computed: {
    sortedData() {
      return this.products
        .filter((d) => {
          const DEGREE = this.degreeValEn
          if (DEGREE) {
            return d.degreeEn.includes(DEGREE)
          }
          return d
        })
        .filter((d) => {
          const DEGREE = this.degreeValSp
          if (DEGREE) {
            return d.degreeSp.includes(DEGREE)
          }
          return d
        })
        .filter((d) => {
          const FIELDOFSTUDY = this.fieldStudyValueEn
          if (FIELDOFSTUDY) {
            return d.fieldOfStudyEn.includes(FIELDOFSTUDY)
          }
          return d
        })
        .filter((d) => {
          const FIELDOFSTUDY = this.fieldStudyValueSp
          if (FIELDOFSTUDY) {
            return d.fieldOfStudySp.includes(FIELDOFSTUDY)
          }
          return d
        })
        .filter((d) => {
          const PROGRAMS = this.programsValueEn
          if (PROGRAMS) {
            return d.programsEn.includes(PROGRAMS)
          }
          return d
        })
        .filter((d) => {
          const PROGRAMS = this.programsValueSp
          if (PROGRAMS) {
            return d.programsSp.includes(PROGRAMS)
          }
          return d
        })
        .sort((a, b) => {
          const sortValue = this.sortBy
          if (sortValue === 'newest') {
            return a.createdAt - b.createdAt ? -1 : 1
          } else if (sortValue === 'oldest') {
            return a.createdAt - b.createdAt ? 1 : -1
          } else if (sortValue === 'cost_highest') {
            return parseFloat(a.price) - parseFloat(b.price) ? -1 : 1
          } else {
            return parseFloat(a.price) - parseFloat(b.price) ? 1 : -1
          }
        })
    },
    sortedCoursesData() {
      return this.courses
        .filter((d) => {
          const UNIVEn = this.universitiesValueEn
          if (UNIVEn) {
            return d.universitiesEn.includes(UNIVEn)
          }
          return d
        })
        .filter((d) => {
          const UNIVSp = this.universitiesValueSp
          if (UNIVSp) {
            return d.universitiesSp.includes(UNIVSp)
          }
          return d
        })
        .filter((d) => {
          const fieldCoursesEn = this.fieldCoursesValueEn
          if (fieldCoursesEn) {
            return d.fieldOfCourseEn.includes(fieldCoursesEn)
          }
          return d
        })
        .filter((d) => {
          const fieldCoursesSp = this.fieldCoursesValueSp
          if (fieldCoursesSp) {
            return d.fieldOfCourseSp.includes(fieldCoursesSp)
          }
          return d
        })
        .sort((a, b) => {
          const sortValue = this.sortBy
          if (sortValue === 'newest') {
            return a.createdAt - b.createdAt ? -1 : 1
          } else if (sortValue === 'oldest') {
            return a.createdAt - b.createdAt ? 1 : -1
          } else if (sortValue === 'cost_highest') {
            return parseFloat(a.price) - parseFloat(b.price) ? -1 : 1
          } else {
            return parseFloat(a.price) - parseFloat(b.price) ? 1 : -1
          }
        })
    },
    catalog() {
      return this.$route.query.type
    },
    isIncludesSp() {
      return this.$route.fullPath.includes('sp')
    }
  },
  methods: {
    setPickedValue(text) {
      this.pickedValue = text
    }
  }
}
</script>

<style scoped>

.pickedBtn {
  border: 1px solid rgb(var(--color_primary));
}

label {
  font-family: "Source Sans Pro", serif;
  font-weight: 400;
  color: rgb(var(--color_primary))
}

.center {
  display: flex;
  justify-content: center;
}

.loader {
  width: 200px;
  text-align: center;
}

.t23 {
  border: 1px solid rgb(var(--color_primary));
}

.filter-card {
  position: sticky;
}

.were-found {
  font-weight: 500;
  color: rgb(var(--color_primary));
  display: flex;
  align-items: center;
  padding-left: 20px;
}

.grid-temp {
  display: grid;
  grid-template: 'sidebar catalog' / 23% 76%;
  grid-gap: 10px;
}

@media screen and (max-width: 1024px) {
  .grid-temp {
    grid-template:
      'sidebar'
      'catalog' / 1fr;
  }
}

.first-filter {
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  width: 170px;
}

.catalog-sort {
  display: flex;
  flex-direction: row;
}

.wrapper {
  margin-top: 100px;
}


</style>
