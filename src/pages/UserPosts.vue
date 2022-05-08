<template>
  <div>
    <h1>Posts page</h1>
    <my-input
        v-model="searchQuery"
        placeholder="Search..."
    />
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
        :posts="sortedAndSearchedPosts"
        @remove="removePost"
        v-if="!isPostsLoading"
    />
    <div v-else>Loading...</div>
    <div ref="observer" class="observer"></div>
    <!--    <my-page-->
    <!--      :total-pages="totalPages"-->
    <!--      :page="page"-->
    <!--      @changePage="changePage"-->
    <!--    />-->
  </div>
</template>

<script>
import PostForm from "@/components/PostForm";
import PostList from "@/components/PostList";
import MyDialog from "@/components/UI/MyDialog";
import MyButton from "@/components/UI/MyButton";
import axios from 'axios';
import MySelect from "@/components/UI/MySelect";
import MyInput from "@/components/UI/MyInput";

export default {
  components: {
    MyInput,
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
      ],
      searchQuery: '',
      page: 1,
      limit: 10,
      totalPages: 0
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
        const response = await axios.get('https://jsonplaceholder.typicode.com/posts', {
          params: {
            _page: this.page,
            _limit: this.limit
          }
        })
        this.totalPages = Math.ceil(response.headers['x-total-count'] / this.limit)
        this.posts = response.data
      } catch (e) {
        alert('Error')
      } finally {
        this.isPostsLoading = false
      }
    },
    async loadMorePosts() {
      try {
        this.page += 1
        const response = await axios.get('https://jsonplaceholder.typicode.com/posts', {
          params: {
            _page: this.page,
            _limit: this.limit
          }
        })
        this.totalPages = Math.ceil(response.headers['x-total-count'] / this.limit)
        this.posts = [...this.posts, ...response.data]
      } catch (e) {
        alert('Error')
      }
    },
    optionSelect(option) {
      this.selectedSortName = option.name
      this.selectedSort = option.value
    },
    // changePage(pageNumber) {
    //   this.page = pageNumber
    // }
  },
  mounted() {
    this.fetchPosts()
    const options = {
      rootMargin: '0px',
      threshold: 1.0
    }
    const callback = entries => {
      if (entries[0].isIntersecting && this.page < this.totalPages) {
        this.loadMorePosts()
      }
    };
    const observer = new IntersectionObserver(callback, options);
    observer.observe(this.$refs.observer)
  },
  computed: {
    sortedPosts() {
      return [...this.posts].sort((p1,p2) =>
          p1[this.selectedSort]?.localeCompare(p2[this.selectedSort]))
    },
    sortedAndSearchedPosts() {
      return this.sortedPosts.filter(post => post.title.toLowerCase().includes(this.searchQuery.toLowerCase()))
    }
  },
  watch: {
    // page() {
    //   this.fetchPosts()
    // }
  }
}
</script>

<style>

.app_btns {
  margin: 15px 0px;
  display: flex;
  justify-content: space-between;
}

.observer {
  height: 30px;
  background: green;
}

</style>