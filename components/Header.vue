<template>
  <header>
    <div class="wrapper">
      <div class="text-white">
        <span>Universities:</span>
        <animated-number
          :value="70"
          :formatValue="formatToPrice"
          :duration="3200"
        />
      </div>
      <div class="text-white">
        <span>Students:</span>
        <animated-number
          :value="700"
          :formatValue="formatToPrice"
          :duration="3200"
        />
      </div>
      <div class="text-white">
        <span>Programs:</span>
        <animated-number
          :value="168"
          :formatValue="formatToPrice"
          :duration="3200"
        />
      </div>

<!--      <img class="header-image" src="https://gt.education/img/graphic/in-circles/biology-scientist/1-h400.webp" alt="scientist">-->
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

header {
  padding: 0 10px 0px 10px;
  width: 100%;
  background-color: rgb(var(--color_primary));
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
