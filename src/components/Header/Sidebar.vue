<template>
    <div class="flex w-full h-full px-5 pt-4 bg-secondary">
        <div class="w-full text-gray-500">
            <!-- Logo -->
            <div class="flex justify-center mb-4">
                <router-link to="/">
                    <img class="h-24 full" src="../../assets/logo.png" alt="">
                </router-link>
            </div>

            <!-- Dashboard -->
            <div class="my-3">
                <router-link to="/">
                    <p @click="showDashboard" :class="{'clicked': $route.meta.isDashboardOpen || displayDashboard}" class="bg-background px-6 py-5 rounded-md font-semibold mb-2 flex items-center"><i class="pi pi-home pr-5" style="font-size: 1.2rem"></i>Dashboard</p>
                </router-link>
            </div>

            <!-- Category -->
            <div class="bg-background rounded-md my-3">
                <p class="flex items-center px-6 py-5 font-semibold cursor-pointer" @click="showCategory" :class="{'clicked': $route.meta.isCategoryOpen}"><i class="pi pi-th-large pr-5" style="font-size: 1.2rem"></i>Category</p>

                <div v-if="$route.meta.isCategoryOpen || displayCategory" class="text-sm">
                    <router-link to="/category/create">
                        <div @click="selectCategoryCreate" :class="$route.meta.isCategoryCreate ? 'bg-gray-300 text-gray-600 font-semibold' : 'text-gray-500'" class="flex items-center justify-start px-16 py-3 hover:bg-gray-300">
                            <i class="pi pi-file-edit pr-1 sm:pr-2 flex items-center" style="font-size: 0.8rem"></i>
                            <p>Create</p>
                        </div>
                    </router-link>

                    <router-link to="/category/view">
                        <div @click="selectCategoryView" :class="$route.meta.isCategoryView ? 'bg-gray-300 text-gray-600 font-semibold' : 'text-gray-500'" class="flex items-center justify-start px-16 py-3 hover:bg-gray-300 rounded-b-md">
                            <i class="pi pi-eye pr-1 sm:pr-2" style="font-size: 0.8rem"></i>
                            <p>View</p>
                        </div>        
                    </router-link>
                </div>
            </div>

            <!-- Products -->
            <div class="bg-background rounded-md my-3">
                <p class="flex items-center px-6 py-5 font-semibold cursor-pointer" @click="showProjects" :class="{'clicked': $route.meta.isProjectOpen}"><i class="pi pi-star pr-5" style="font-size: 1.2rem"></i>Products</p>

                <div v-if="$route.meta.isProjectOpen || displayProjects" class="text-sm">
                    <router-link to="/products/create">
                        <div @click="selectProjectCreate" :class="$route.meta.isProjectCreate ? 'bg-gray-300 text-gray-600 font-semibold' : 'text-gray-500'" class="flex items-center justify-start px-16 py-3 hover:bg-gray-300">
                            <i class="pi pi-file-edit pr-1 sm:pr-2" style="font-size: 0.8rem"></i>
                            <p>Create</p>
                        </div>        
                    </router-link>

                    <router-link to="/products/view">
                        <div @click="selectProjectView" :class="$route.meta.isProjectView ? 'bg-gray-300 text-gray-600 font-semibold' : 'text-gray-500'" class="flex items-center justify-start px-16 py-3 hover:bg-gray-300 rounded-b-md">
                            <i class="pi pi-eye pr-1 sm:pr-2" style="font-size: 0.8rem"></i>
                            <p>View</p>
                        </div>    
                    </router-link>
                </div>
            </div>

            <!-- Students Products -->
            <div class="my-3">
                <router-link to="/students-products">
                    <p @click="showStudentsProducts" :class="{'clicked': $route.meta.isStuProdOpen || displayStuProd}" class="bg-background px-6 py-5 rounded-md font-semibold mb-2 flex items-center"><i class="pi pi-shield pr-5" style="font-size: 1.2rem"></i>Student's Product</p>
                </router-link>
            </div>

            <!-- Orders -->
            <div class="my-3">
                <router-link to="/orders">
                    <p @click="showOrders" :class="{'clicked': $route.meta.isOrderOpen || displayOrder}" class="bg-background px-6 py-5 rounded-md font-semibold mb-2 flex items-center"><i class="pi pi-shopping-cart pr-5" style="font-size: 1.2rem"></i>Orders</p>
                </router-link>
            </div>

            <!-- User List -->
            <div class="my-3">
                <router-link to="/user-list">
                    <p @click="showUsers" :class="{'clicked': $route.meta.isUserOpen || displayUser}" class="bg-background px-6 py-5 rounded-md font-semibold mb-2 flex items-center"><i class="pi pi-users pr-5" style="font-size: 1.2rem"></i>User List</p>
                </router-link>
            </div>

            <!-- Admin List -->
            <div class="my-3">
                <router-link to="/admin-list"> 
                    <p @click="showAdmins" :class="{'clicked': $route.meta.isAdminOpen || displayAdmin}" class="bg-background px-6 py-5 rounded-md font-semibold mb-2 flex items-center"><i class="pi pi-user-edit pr-5" style="font-size: 1.2rem"></i>Admin List</p>
                </router-link>
            </div>
        </div>
    </div>
</template>

<script>
import Sidebar from 'primevue/sidebar';

export default {
    components: {
        Sidebar,
    },

    data() {
        return {
            displayDashboard: false,
            displayCategory: false,
            displayProjects: false,
            displayOrder: false,
            displayStuProd: false,
            displayUser: false,
            displayAdmin: false,
            
            showCategoryColor: true,
            categoryCreateColor: false,
            categoryViewColor: false,

            showProjectColor: true,
            projectCreateColor: false,
            projectViewColor: false
        }
    },

    methods: {
        showDashboard() {
            if(this.displayDashboard == false) {
                this.displayDashboard = true
                this.displayCategory = false
                this.displayProjects = false
                this.displayOrder = false
                this.displayStuProd = false
                this.displayUser = false
                this.displayAdmin = false
            } else {
                this.displayDashboard = true
            }
        },

        showCategory() {
            if(this.displayCategory == false) {
                this.displayDashboard = false
                this.displayCategory = true
                this.displayProjects = false
                this.displayOrder = false
                this.displayStuProd = false
                this.displayUser = false
                this.displayAdmin = false
            } else {
                this.displayCategory = true
            }
        },

        selectCategoryCreate() {
            this.$route.meta.isCategoryOpen = true
            this.showCategoryColor = false
            this.categoryCreateColor = true
            this.categoryViewColor = false
        },

        selectCategoryView() {
            this.$route.meta.isCategoryOpen = true
            this.showCategoryColor = false
            this.categoryCreateColor = false
            this.categoryViewColor = true
        },

        showProjects() {
            if(this.displayProjects == false) {
                this.displayDashboard = false
                this.displayCategory = false
                this.displayProjects = true
                this.displayOrder = false
                this.displayStuProd = false
                this.displayUser = false
                this.displayAdmin = false
            } else {
                this.displayProjects = true
            }
        },

        selectProjectCreate() {
            this.$route.meta.isProjectOpen = true
            this.showProjectColor = false
            this.projectCreateColor = true
            this.projectViewColor = false
        },

        selectProjectView() {
            this.$route.meta.isProjectOpen = true
            this.showProjectColor = false
            this.projectCreateColor = false
            this.projectViewColor = true
        },

        showOrders() {
            if(this.displayOrder == false) {
                this.displayDashboard = false
                this.displayCategory = false
                this.displayProjects = false
                this.displayOrder = true
                this.displayStuProd = false
                this.displayUser = false
                this.displayAdmin = false
            } else {
                this.displayOrder = true
            }
        },

        showStudentsProducts() {
            if(this.displayStuProd == false) {
                this.displayDashboard = false
                this.displayCategory = false
                this.displayProjects = false
                this.displayOrder = false
                this.displayStuProd = true
                this.displayUser = false
                this.displayAdmin = false
            } else {
                this.displayStuProd = true
            }
        },

        showUsers() {
            if(this.displayUser == false) {
                this.displayDashboard = false
                this.displayCategory = false
                this.displayProjects = false
                this.displayOrder = false
                this.displayStuProd = false
                this.displayUser = true
                this.displayAdmin = false
            } else {
                this.displayUser = true
            }
        },

        showAdmins() {
            if(this.displayAdmin == false) {
                this.displayDashboard = false
                this.displayCategory = false
                this.displayProjects = false
                this.displayOrder = false
                this.displayStuProd = false
                this.displayUser = false
                this.displayAdmin = true
            } else {
                this.displayAdmin = true
            }
        },

        getLogout() {
            localStorage.removeItem('access_token')
            localStorage.removeItem('refresh_token')
            this.$router.push('/login')
        }
    }
}
</script>

<style scoped>
.clicked {
    @apply text-black;
}
</style>
