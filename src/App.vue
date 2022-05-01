<template>
  <div class="app">
    <post-form
        @create="createPost"
    />
    <post-list
        :posts="posts"
    />

  </div>
</template>

<script>
    import PostForm from "@/components/PostForm";
    import PostList from "@/components/PostList";
    export default {
      components: {
        PostList, PostForm
      },
      data() {
          return {
              posts: [
                {id: 1, title: 'JS 1', body: 'Description of post 1'},
                {id: 2, title: 'JS 2', body: 'Description of post 2'},
                {id: 3, title: 'JS 3', body: 'Description of post 3'},
                {id: 4, title: 'JS 4', body: 'Description of post 4'},
              ],
          }
      },
      methods: {
        // createPost(post) -> (post) - типа ретерн из одноим. метода в PostForm.vue
        // далее внутри {} описываю любые манипалюции с полученным post
        createPost(post) {
          this.posts.push(post)
        },
      }
    }
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.app {
  padding: 20px;
}

</style>