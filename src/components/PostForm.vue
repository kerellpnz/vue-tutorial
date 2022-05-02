<template>
  <form @submit.prevent class="form">
    <h4>Create post</h4>
    <my-input
        v-model="post.title"
        placeholder="Name"/>
    <my-input
        v-model="post.body"
        placeholder="Description"/>
    <my-button
        style="align-self: flex-start; margin: 15px 0px"
        @click="createPost"
    >
      Create
    </my-button>
  </form>
</template>

<script>
export default {
  data() {
    return {
      post: {
        title: '',
        body: ''
      }
    }
  },
  methods: {
    createPost() {
      this.post.id = Date.now()
      this.$emit('create', this.post)
      this.post = {
        title: '',
        body: ''
      }
    },
  }
}
</script>

<style>
.form {
  display: flex;
  flex-direction: column;
}
</style>