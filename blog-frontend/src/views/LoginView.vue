<template>
  <div class="limiter">
    <div class="container">
      <h1>{{ title }}</h1>
      <div class="auth" v-if="state == 'login'">
        <label for="">Email</label>
        <input v-model="data.email" type="email" />
        <label for="">Password</label>
        <input v-model="data.password" type="password" />
        <button @click="handleLogin()" type="submit">Login</button>
      </div>
      <form v-else @submit.prevent="handleRegister()">
        <label for="">Username</label>
        <input v-model="data.username" type="text" />
        <label for="">Email</label>
        <input v-model="data.email" type="email" />
        <label for="">Password</label>
        <input v-model="data.password" type="password" />
        <button type="Submit">Register</button>
      </form>
      <div>
        <h3 v-if="state == 'register'">Have an account? <a @click="toggle('login')">SignIn</a></h3>
        <h3 v-else>Don't have an account? <a @click="toggle('register')">Register</a></h3>
      </div>
    </div>
  </div>
</template>
<script>
import axios from 'axios'
export default {
  name: 'LoginItem',
  data() {
    return {
      data: {
        username: '',
        email: '',
        password: ''
      },
      state: 'login'
    }
  },
  computed: {
    title() {
      return this.state == 'login' ? 'Login' : 'Register'
    }
  },
  methods: {
    toggle() {
      if (this.state == 'login') {
        this.state = 'register'
      } else {
        this.state = 'login'
      }
    },
    handleRegister() {
      console.log(this.data)
      axios
        .post('http://192.168.8.165:3000/user', this.data)
        .then((res) => {
          console.log(res)
        })
        .catch((error) => {
          console.log(error)
        })
    },
    handleLogin() {
      axios
        .post('http://192.168.8.165:3000/user/login', this.data)
        .then((res) => {
          localStorage.setItem('token', res.data.token)
          console.log(res)
        })
        .catch((error) => {
          console.log(error)
        })
    }
    // login() {
    //   const userData = {
    //     username: this.username,
    //     password: this.password
    //   }
    //   console.log(userData)
    //   axios
    //     .post('http://localhost:3000/user/login', userData)
    //     .then((response) => {
    //       console.log(userData)
    //       localStorage.setItem('token', response.data.token)
    //       console.log(response.data)
    //       // axios.get('http://localhost:3000/post').then((response) => {
    //       //   console.log(response)
    //       // })
    //     })
    //     .catch((error) => {
    //       console.error(error)
    //     })
    // }
  }
}
</script>

<style scoped>
.container {
  margin: auto;
  width: 50%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;
  background-color: #b7c220;
  height: 60dvh;
  border: 3px solid blue;
}

form,
div.auth {
  width: 80%;
  display: flex;
  flex-direction: column;
  gap: 20px;
  border-radius: 20px;
}
form input,
div input {
  padding: 10px;
}

form button,
div button {
  width: 40%;
  padding: 20px;
  background-color: greenyellow;
}
</style>
