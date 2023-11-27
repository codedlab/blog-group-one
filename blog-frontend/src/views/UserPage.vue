<template>
  <h1>Welcome to {{ userPost.username }}'s Profile Page</h1>
  <div class="post-container">
    <h2 class="post-header">Create Your Post</h2>
    <form @submit="sendPost()" id="post-form">
      <label for="title">Write your title</label>
      <input
        id="title"
        type="text"
        placeholder="Enter your title"
        v-model="postData.title"
        name="title"
        required
      />
      <label for="post-text">Write your Content:</label>
      <textarea
        id="post-text"
        v-model="postData.content"
        placeholder="Enter your Content..."
        name="post-text"
        rows="4"
        required
      ></textarea>
      <input type="submit" value="Submit" />
    </form>
  </div>
  <div>
    <div v-for="(post, index) in allPosts2" :key="index">
      <div class="post-container">
        <div class="user-info">
          <div class="user-name">{{ post.user.username }}</div>
        </div>
        <h2>{{ post.title }}</h2>
        <h4>{{ post.slug }}</h4>
        <p>
          {{ post.content }}
        </p>
        <div class="post-actions">
          <button @click="likePost(post.id, post.likes)">
            <i :class="[{ fas: liked(post.likes), far: !liked(post.likes) }, 'fa-heart']"></i
            >{{ post.likes.length }}
          </button>
          <button @click="editPost(post.id)">Edit</button>
          <button @click="deletePost(post.id)">Delete</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from 'axios'
import jwtDecode from 'jwt-decode'
export default {
  data() {
    return {
      postData: {
        title: '',
        content: ''
      },
      allPosts2: [],
      userPost: {},
      editingPost: false,
      userId: '',
      deletingLike: '',
      posterId: ''
    }
  },
  created() {
    const token = localStorage.getItem('token')
    const user_id = jwtDecode(token).id
    this.userId = user_id
    axios
      .get('http://localhost:3000/user/posts', { headers: { token } })
      .then((res) => {
        console.log(res)
        this.allPosts2 = res.data.data
        this.userPost = res.data.user
      })
      .catch((error) => {
        console.log(error)
      })
  },
  methods: {
    deletePost(postId) {
      const token = localStorage.getItem('token')
      axios
        .delete(`http://localhost:3000/post/${postId}`, { headers: { token } })
        .then((res) => {
          console.log(res)
        })
        .catch((err) => {
          console.log(err)
        })
    },
    editPost(postId) {
      this.editingPost = true
      const token = localStorage.getItem('token')
      axios
        .get(`http://localhost:3000/post/${postId}`, { headers: { token } })
        .then((res) => {
          console.log(res)
          if (res.data.post.user_id == this.userId && res.data.post.id == postId) {
            this.postData = {
              title: res.data.post.title,
              content: res.data.post.content
            }
            this.posterId = postId
            console.log(this.posterId)
          }
        })
        .catch((error) => {
          console.log(error)
        })
    },
    sendPost() {
      const formInfo = { title: this.postData.title, content: this.postData.content }
      const token = localStorage.getItem('token')
      if (this.editingPost) {
        axios
          .put(`http://localhost:3000/post/${this.posterId}`, formInfo, { headers: { token } })
          .then((res) => {
            console.log(res)
          })
          .catch((err) => {
            console.log(err)
          })
      } else {
        axios
          .post('http://localhost:3000/post', formInfo, { headers: { token } })
          .then((res) => {
            console.log(res)
          })
          .catch((err) => console.log(err))
      }
      this.posterId = ''
      this.editingPost = false
    },
    likePost(postId, likes) {
      console.log(likes)
      const token = localStorage.getItem('token')
      const hasLiked = this.liked(likes)
      if (hasLiked) {
        axios
          .delete(`http://localhost:3000/like/${this.deletingLike}`, { headers: { token } })
          .then((res) => console.log(res))
          .catch((err) => console.log(err))
      } else {
        axios
          .post('http://localhost:3000/like', { post_id: postId }, { headers: { token } })
          .then((res) => console.log(res))
          .catch((err) => console.log(err))
      }
      this.deletingLike = ''
    },
    liked(likes) {
      let isLiked = likes.find((like) => {
        if (like.user_id == this.userId) {
          return true
        } else {
          return false
        }
      })
      if (isLiked) {
        console.log(isLiked.id)
        this.deletingLike = isLiked.id
        return true
      } else {
        this.deletingLike = ''
        return false
      }
    }
  }
}
</script>
<style>
body {
  font-family: Arial, sans-serif;
  background-color: #f4f4f4;
}
h1 {
  text-align: center;
}
.post-container {
  max-width: 500px;
  margin: 0 auto;
  background: #fff;
  padding: 20px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
  border-radius: 5px;
  margin-top: 20px;
}
.post-container h2 {
  margin: 0;
}
.post-header {
  text-align: center;
}
.post-container p {
  margin: 10px 0;
}
.post-container form {
  display: flex;
  flex-direction: column;
}
.post-container form label,
.post-container form input,
.post-container form textarea {
  margin-bottom: 10px;
}
.post-container form input,
.post-container form textarea {
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
}
.post-container form input[type='submit'] {
  background: #007bff;
  margin-bottom: 10px;
  color: #fff;
  padding: 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}
.post-container form input[type='submit']:hover {
  background: #0056b3;
}
.user-info {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}
.user-info .user-name {
  font-weight: bold;
}
.post-actions {
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
}
.post-actions button {
  background: transparent;
  border: none;
  cursor: pointer;
}
.post-actions button i {
  font-size: 20px;
}
.liked {
  color: rgb(187, 24, 24);
}
</style>
