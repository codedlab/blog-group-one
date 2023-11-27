<template>
  <h1>Welcome to the Post Page</h1>
  <div v-for="(post, index) in allPosts" :key="index">
    <div class="post-container">
      <div class="user-info">
        <!-- <img src="profile-image.jpg" alt="User Profile Image" /> -->
        <div class="user-name">{{ post.user.username }}</div>
      </div>
      <h2>{{ post.title }}</h2>
      <h4>{{ post.slug }}</h4>
      <p>
        {{ post.content }}
      </p>
      <div class="post-actions">
        <button @click="likePost(post.id, post.likes)">
          <i :class="[{ fas: liked(post.likes), far: !liked(post.likes) }, 'fa-heart']"></i>
          {{ post.likes.length }}
        </button>
      </div>
    </div>
  </div>
  <!-- <div>
    <h1>Welcome to the Post Page</h1>
    <table style="border: 1px black solid">
      <tr>
        <th>Title</th>
        <th>Slug</th>
        <th>Content</th>
        <th>Likes</th>
        <th></th>
        <th>User ID</th>
        <th>Username</th>
      </tr>
      <tbody>
        <tr v-for="(post, index) in allPosts" :key="index">
          <td>{{ post.title }}</td>
          <td>{{ post.slug }}</td>
          <td>{{ post.content }}</td>
          <td>{{ post.likes.length }}</td>
          <td>
            <input type="submit" :value="btnTitle" @submit.prevent="likePost(post.id)" />
            <h3 v-if="state == 'like'"><a @click="handleLike(post.id)">Like</a></h3>
            <h3 v-else><a @click="handleUnlike(post.Likes)">UnLike</a></h3>
            {{ btnTitle ? 'Unlike' : 'Like' }}
            <button @click="likePost(post.id, post.likes)" :class="{ liked: liked(post.likes) }">
              like
            </button>
          </td>
          <td>{{ post.id }}</td>
          <td>{{ post.user.username }}</td>
        </tr>
      </tbody>
    </table>
  </div> -->
</template>
<script>
import axios from 'axios'
import jwtDecode from 'jwt-decode'
export default {
  data() {
    return {
      allPosts: [],
      userId: '',
      state: 'like',
      deletingLike: ''
    }
  },
  computed: {
    // btnTitle() {
    //   return this.state ? 'Unlike' : 'Like'
    // }
  },
  created() {
    const token = localStorage.getItem('token')
    const user_id = jwtDecode(token).id
    this.userId = user_id
    axios
      .get('http://localhost:3000/post', { headers: { token } })
      .then((res) => {
        console.log(res)
        this.allPosts = res.data.posts
      })
      .catch((error) => {
        console.log(error)
      })
  },
  methods: {
    // likePost(postId) {
    //       const token = localStorage.getItem('token')
    //       const data = { post_id: postId }

    //       // if (this.clicked) {
    //       //   return axios
    //       //     .del(`http://192.168.8.165:3000/like`, data, { headers: { token } })
    //       //     .then((res) => {
    //       //       console.log(res)
    //       //     })
    //       //     .catch((error) => {
    //       //       console.log(error)
    //       //     })
    //       // }
    //       axios
    //         .post('http://localhost:3000/like', data, { headers: { token } })
    //         .then((res) => {
    //           console.log(res)
    //         })
    //         .catch((error) => {
    //           console.log(error)
    //         })
    //     }

    // toggleLike(post) {
    //   if (this.isLiked(post)) {
    //     //unlike the post
    //     this.unlikePost(post)
    //   } else {
    //     //like the post
    //     this.likePost(post)
    //   }
    // },
    // isLiked(post) {
    //   return post.likes.some((like) => like.userId == this.this.userId)
    // },
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
        console.log('like', like, 'this.userId', this.userId)
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
.post-container {
  max-width: 500px;
  margin: 0 auto;
  background: #fff;
  padding: 20px;
  box-shadow: 0 0 20px rgba(216, 10, 10, 0.822);
  border-radius: 5px;
  margin-top: 20px;
}
.post-container h2 {
  margin: 0;
}
.post-container p {
  margin: 10px 0;
}
.user-info {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}
/* .user-info img {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        margin-right: 10px;
      } */
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
