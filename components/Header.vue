<template>
  <header class="d-flex align-items-center justify-content-center">
    <div class="wrapper grid justify-content-center">
      <div class="col d-flex flex-column align-items-center justify-content-between h-100">
        <div class="text-white">
          <span>Universities:</span>
          <animated-number
            :value="741"
            :formatValue="formatToPrice"
            :duration="1500"
          />
        </div>
        <div class="text-white">
          <span>Students:</span>
          <animated-number
            :value="700"
            :formatValue="formatToPrice"
            :duration="1500"
          />
        </div>
      </div>
      <div class="text-white justify-content-center ye">
        <span>Price:</span>
        <animated-number
          :value="2500"
          :formatValue="formatToDollar"
          :duration="1500"
        />
      </div>
      <div class="col d-flex flex-column align-items-center justify-content-between h-100">
        <div class="text-white">
          <span>Programs:</span>
          <animated-number
            :value="168"
            :formatValue="formatToPrice"
            :duration="1500"
          />
        </div>
        <div class="text-white">
          <span>Programs:</span>
          <animated-number
            :value="168"
            :formatValue="formatToPrice"
            :duration="1500"
          />
        </div>
      </div>
    </div>
  </header>
</template>
<script>
import AnimatedNumber from 'animated-number-vue'

export default  {
  components: {
    AnimatedNumber
  },
  data(){
    return {
      value: 1000
    }
  },
  methods: {
    formatToPrice(value) {
      return `${value.toFixed()}`;
    },

    formatToDollar(value) {
      return `${value.toFixed()}$`;
    }
  }
}
</script>

<style scoped>
.wrapper {
  display: grid;
  grid-template-columns: 33% 33% 33%;
  padding: 100px 0;
}

.grid {
  display: grid;
  grid-template-columns: 33% 33% 33%;
}

.h-100 {
  height: 500px !important;
}

header {
  padding: 0 10px 0px 10px;
  width: 100%;
  background-image: url("/header-br.png");
  height: 900px;
  align-items: center;
}

.ye {
  color: var(--light_yellow) !important;
  display: flex;
  align-content: center;
  align-items: center;
}

.text-white {
  font-weight: 600;
  font-size: 30px;
  font-family: 'Montserrat';
}


@media screen and (max-width: 1054px){

  .wrapper {
    justify-content: space-between;
    grid-template-columns: 100%;
  }
}

h1 {
  font-weight: 700;
  color: white;
}
</style>
