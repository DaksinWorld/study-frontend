<template>
  <header>
    <div class="my-wrapper">
      <h1 class="header-text">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. A aliquam delectus dolorum inventore mollitia, nisi nobis obcaecati perspiciatis repellendus soluta?
      </h1>
      <img class="header-image" src="https://gt.education/img/graphic/in-circles/biology-scientist/1-h400.webp" alt="scientist">
    </div>
  </header>
</template>
<script>
export default {
name: "Header"
}
</script>

<style scoped>
.my-wrapper {
  display: flex;
  flex-direction: row;
  padding: 100px 0;
  justify-content: center;
}

header {
  padding: 0 10px 0px 10px;
  width: 100%;
  background-color: rgb(var(--color_primary));
  align-items: center;
}

.header-image {
  width: 500px;
  height: 500px;
  border-radius: 50%;
  background-size: cover;
  align-items: center;
}

@media screen and (max-width: 1054px){
  .header-image {
    width: 400px;
    height: 400px;
  }
  .header-text {
    font-size: 40px !important;
    margin: 0;
    padding: 0 !important;
  }

  .my-wrapper {
    justify-content: space-between;
  }
}

@media screen and (max-width: 800px){
  .header-image {
    width: 350px;
    height: 350px;
  }
  .header-text {
    font-size: 36px !important;
    margin: 0;
    padding: 0 !important;
    width: 100% !important;
  }

  .my-wrapper {
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
}

.header-text {
  padding: 50px 0 0 0 ;
  width: 42%;
  font-size: 52px;
}

h1 {
  font-weight: 700;
  color: white;
}
</style>
