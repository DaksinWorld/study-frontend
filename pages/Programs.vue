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
              <div class="degree">
                <label for="degree">Degree</label>
                <select v-model="degreeVal" id="degree" class="form-control">
                  <option value="">All Degrees</option>
                  <option v-for="(name,i) in degree" :value="name" :key="i">{{ name }}</option>
                </select>
              </div>
              <div class="fieldOfStudy">
                <label for="fieldOfStudy">Field Of Study</label>
                <select v-model="fieldStudyValue" id="fieldOfStudy" class="form-control">
                  <option value="">All Fields of study</option>
                  <option v-for="(name,i) in fieldOfStudy" :value="name" :key="i">{{ name }}</option>
                </select>
              </div>
              <div class="fieldOfStudy">
                <label for="Programs">Programs</label>
                <select v-model="programsValue" id="Programs" class="form-control">
                  <option value="">All Fields of study</option>
                  <option v-for="(name,i) in programsData" :value="name" :key="i">{{ name }}</option>
                </select>
              </div>
            </div>
            <div class="secondFilters" v-else>
              <div class="degree">
                <label for="fieldOfStudy2">Field Of Study</label>
                <select v-model="fieldCoursesValue" id="fieldOfStudy2" class="form-control">
                  <option value="">All Fields of study</option>
                  <option v-for="(name,i) in fieldOfCourses" :value="name" :key="i">{{ name }}</option>
                </select>
              </div>
              <div class="fieldOfStudy">
                <label for="Universities">Universities</label>
                <select v-model="universitiesValue" id="Universities" class="form-control">
                  <option value="">All Universities</option>
                  <option v-for="(name,i) in universities" :value="name" :key="i">{{ name }}</option>
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
          <div class="w-33" v-if="pickedValue === 'courses'" v-for="d in sortedCoursesData" :key="d.name">
            <CoursesCard class="mr-3 my-2" :data="d"/>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CoursesCard from "../components/CoursesCard";
import {degree, fieldOfCourses, fieldOfStudy, programs, universityData} from "../assets/data";

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

      universitiesValue: '',
      fieldCoursesValue: '',

      degreeVal: '',
      fieldStudyValue: '',

      programsValue: '',

      degree: degree,
      fieldOfStudy: fieldOfStudy,
      fieldOfCourses: fieldOfCourses,
      universities: universityData,
      programsData: programs
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
        this.degreeVal = degree
        this.fieldStudyValue = fieldStudy
        this.programsValue = programs
      } else if (type === 'courses') {
        this.pickedValue = 'courses'
        this.universitiesValue = univ
        this.fieldCoursesValue = field
      }

    } catch (e) {

    }
  },
  computed: {
    sortedData() {
      return this.products
        .filter((d) => {
          const DEGREE = this.degreeVal
          if (DEGREE) {
            return d.degree.includes(DEGREE)
          }
          return d
        })
        .filter((d) => {
          const FIELDOFSTUDY = this.fieldStudyValue
          if (FIELDOFSTUDY) {
            return d.fieldOfStudy.includes(FIELDOFSTUDY)
          }
          return d
        })
        .filter((d) => {
          const PROGRAMS = this.programsValue
          if (PROGRAMS) {
            return d.programs.includes(PROGRAMS)
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
          const UNIV = this.universitiesValue
          if (UNIV) {
            return d.universities.includes(UNIV)
          }
          return d
        })
        .filter((d) => {
          const fieldCourses = this.fieldCoursesValue
          if (fieldCourses) {
            return d.fieldOfCourse.includes(fieldCourses)
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
