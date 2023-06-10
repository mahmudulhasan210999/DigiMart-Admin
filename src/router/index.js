import { createRouter, createWebHistory } from "vue-router";
import Login from '../views/login/index.vue'
import Dashboard from '../views/dashboard/index.vue'

import CategoryCrete from '../views/category/create/index.vue'
import CategoryView from '../views/category/view/index.vue'
import CategoryEdit from '../views/category/edit/[id].vue'

import ProductsCreate from '../views/products/create/index.vue'
import ProductsView from '../views/products/view/index.vue'
import ProductsEdit from '../views/products/edit/[id].vue'

import Orders from '../views/orders/index.vue'

const routes = [
    {
        path: '/login',
        name: 'Login',
        component: Login,
        meta: {
            hideSidebar: true,
        }
    },

    // Dashboard
    {
        path: '/',
        name: 'Dashboard',
        component: Dashboard,
        meta: {
            login_required: true,
            hideSidebar: false,
            isDashboardOpen: true
        }
    },

    // Category
    {
        path: '/category/create',
        name: 'CategoryCrete',
        component: CategoryCrete,
        meta: {
            login_required: true,
            hideSidebar: false,
            isCategoryOpen: true,
            isCategoryCreate: true
        }
    },
    {
        path: '/category/view',
        name: 'CategoryView',
        component: CategoryView,
        meta: {
            login_required: true,
            hideSidebar: false,
            isCategoryOpen: true,
            isCategoryView: true
        }
    },
    {
        path: '/category/edit/:id',
        name: 'CategoryEdit',
        component: CategoryEdit,
        meta: {
            login_required: true,
            hideSidebar: false,
            isCategoryOpen: true
        }
    },

    // Products
    {
        path: '/products/create',
        name: 'ProductsCreate',
        component: ProductsCreate,
        meta: {
            login_required: true,
            hideSidebar: false,
            isProjectOpen: true,
            isProjectCreate: true
        }
    },
    {
        path: '/products/view',
        name: 'ProductsView',
        component: ProductsView,
        meta: {
            login_required: true,
            hideSidebar: false,
            isProjectOpen: true,
            isProjectView: true
        }
    },
    {
        path: '/products/edit/:id',
        name: 'ProductsEdit',
        component: ProductsEdit,
        meta: {
            login_required: true,
            hideSidebar: false,
            isProjectOpen: true
        }
    },

    {
        path: '/orders',
        name: 'Orders',
        component: Orders,
        meta: {
            login_required: true,
            hideSidebar: false,
            isOrderOpen: true
        }
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes,
    scrollBehavior (to, from, savedPosition) {
        // return desired position
        if (savedPosition) return savedPosition
        else return { top: 0 }
    }
})

router.beforeEach(function (to, from, next) {
    console.log('from router -->', JSON.parse(localStorage.getItem('loggedIn')))
    let isLoggedIn = JSON.parse(localStorage.getItem('loggedIn'))
    if(to.meta.login_required){
        if(isLoggedIn) {
            next();
        }
        else {
            next('/login'); 
        }
    }
    else if(to.meta.redirectionNeeded) {
        if(isLoggedIn) {
            next(from.fullPath)
        }
        else {
            next();
        }
    }
    else {
        next();
    }
});

export default router