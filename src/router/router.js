import Main from "@/pages/Main";
import {createRouter, createWebHistory} from "vue-router";
import UserPosts from "@/pages/UserPosts";
import About from "@/pages/About";
import PostPage from "@/pages/PostPage";

const routes = [
    {
        path: '/',
        component: Main
    },
    {
        path: '/posts',
        component: UserPosts
    },
    {
        path: '/about',
        component: About
    },
    {
        path: '/posts/:id',
        component: PostPage
    },
]

const router = createRouter({
    routes,
    history: createWebHistory(process.env.BASE_URL)
})

export default router;