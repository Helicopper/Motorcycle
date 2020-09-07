<template>
  <div class="footer _bg-grey">
    <div class="_container">
      <span>&copy;<router-link to="/" tag="a">方舟-Ark</router-link>. All Rights Reserved </span>
    </div>
  </div>  
</template>

<script>
export default {
  name: "Footer"
}
</script>

<style>
.footer {
  text-transform: capitalize;
  text-align: center;
}
.item {
  margin: 0 .5em;
}
</style>

