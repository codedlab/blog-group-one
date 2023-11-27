<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>
<template>
  <header>
    <div>
      <nav>
        <RouterLink to="/">Home</RouterLink>
        <!-- <RouterLink to="/login">Login</RouterLink> -->
        <RouterLink to="/allposts">AllPosts</RouterLink>
        <RouterLink to="/userpage">Users</RouterLink>
      </nav>
    </div>
  </header>
  <RouterView />
</template>
<style scoped>
* {
  margin: 0px;
  padding: 0px;
  box-sizing: border-box;
}
body {
  font-family: Arial, sans-serif;
  background-color: #f4f4f4;
}
nav {
  display: flex;
  /* align-content: center; */
  max-width: 500px;
  margin: 0 auto;
  justify-content: space-evenly;
}
</style>
