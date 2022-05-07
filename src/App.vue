<template>
  <div class="app">
    <h1>Posts page</h1>
    <div class="app_btns">
      <my-button
          @click="showDialog"
      >
        Create post
      </my-button>
      <my-select
        @select="optionSelect"
        :options="sortOptions"
        :selected="selectedSortName"
      ></my-select>
    </div>
    <my-dialog v-model:show="dialogVisible">
      <post-form
          @create="createPost"
      />
    </my-dialog>
    <post-list
        :posts="sortedPosts"
        @remove="removePost"
        v-if="!isPostsLoading"
    />
    <div v-else>Loading...</div>
  </div>
</template>

<script>
    import PostForm from "@/components/PostForm";
    import PostList from "@/components/PostList";
    import MyDialog from "@/components/UI/MyDialog";
    import MyButton from "@/components/UI/MyButton";
    import axios from 'axios';
    import MySelect from "@/components/UI/MySelect";

    export default {
      components: {
        MySelect,
        MyButton,
        MyDialog,
        PostList, PostForm
      },
      data() {
        return {
          posts: [],
          dialogVisible: false,
          isPostsLoading: false,
          selectedSortName: 'Select from the list',
          selectedSort: '', //модель по которой происходит сортировка
          sortOptions: [
            {value: 'title', name: 'Order by name'},
            {value: 'body', name: 'Order by description'}
          ]
        }
      },
      methods: {
        // createPost(post) -> (post) - типа return из одноим. метода в PostForm.vue
        // далее внутри {} описываю любые манипалюции с полученным post
        createPost(post) {
          this.posts.push(post)
          this.dialogVisible = false;
        },
        removePost(post) {
          this.posts = this.posts.filter(p => p.id !== post.id)
        },
        showDialog() {
          this.dialogVisible = true;
        },
        async fetchPosts() {
          try {
            this.isPostsLoading = true
            const response = await axios.get('https://jsonplaceholder.typicode.com/posts?_limit=10')
            this.posts = response.data
          } catch (e) {
            alert('Error')
          } finally {
            this.isPostsLoading = false
          }
        },
        optionSelect(option) {
          this.selectedSortName = option.name
          this.selectedSort = option.value
        }
      },
      mounted() {
        this.fetchPosts()
      },
      computed: {
        sortedPosts() {
          return [...this.posts].sort((p1,p2) =>
              p1[this.selectedSort]?.localeCompare(p2[this.selectedSort]))
        }
      },
      watch: {
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

.app_btns {
  margin: 15px 0px;
  display: flex;
  justify-content: space-between;
}

</style>