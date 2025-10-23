import { createRouter, createWebHashHistory} from 'vue-router';
import { auth } from '@/firebase';

const routes = [
    {
        path: '/',
        name: 'home',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        // component: () => import('@/views/HomeView'),
        meta: {
            title: 'Thoughts Journal Pro',
            requiresAuth: true
        }
    },
    {
        path: "/login",
        name: 'login',
        // component: () => import('@/views/LoginView'),
        meta: {
            title: 'Login',
            requiresAuth: false
        }
    }
];

const router = createRouter({
    history: createWebHashHistory(),
    routes // short for routers:routers
});

// check for auth requirement for each page
router.beforeEach((to, from, next) => {
    auth.authStateReady().then(() => {
        document.title = to.meta.title;
        const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);
        if (requiresAuth && !auth.currentUser) {
            next('/login');
        } else {
            next();
        }
    }); // end of auth.authStateReady()
});

export default router;
