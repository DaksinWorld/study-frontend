<template>
  <header>
    <div class="wrapper">
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
.wrapper {
  display: flex;
  flex-direction: row;
  padding: 100px 0;
  justify-content: space-between;
}

header {
  height: 700px;
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
