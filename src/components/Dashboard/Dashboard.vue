<template>
    <div class="w-full flex flex-col items-center bg-gray-100 screen-height">
        <div class="w-full">
            <div class="text-left p-6 w-full">
                <div class="pb-6 text-gray-500">
                    <p class="text-xl font font-semibold pb-1">Dashboard</p>
                    <p class="text-sm">Hi! Welcome to the Dashboard of UTM - DigiMart</p>
                </div>
                <div class="w-full grid grid-cols-4 gap-4">

                    <!-- Total Categories -->
                    <router-link to="/category/view">
                        <div class="bg-white rounded-lg shadow-lg p-6 flex items-center">
                            <div class="bg-gray-600 rounded-full w-12 h-12">
                                <p class="flex justify-center items-center h-full text-white"><i class="pi pi-th-large" style="font-size: 1.6rem"></i></p>
                            </div>
                            <div class="pl-6 flex items-center">
                                <div class="text-gray-600">
                                    <p class="font-semibold text-2xl">{{ items.categories }}</p>
                                    <p>Categories</p>
                                </div>
                            </div>
                        </div>
                    </router-link>

                    <!-- Total Products -->
                    <router-link to="/products/view">
                        <div class="bg-white rounded-lg shadow-lg p-6 flex items-center">
                            <div class="bg-primary rounded-full w-12 h-12">
                                <p class="flex justify-center items-center h-full text-white"><i class="pi pi-star" style="font-size: 1.4rem"></i></p>
                            </div>
                            <div class="pl-6 flex items-center">
                                <div class="text-primary">
                                    <p class="font-semibold text-2xl">{{ items.products }}</p>
                                    <p>Products</p>
                                </div>
                            </div>
                        </div>
                    </router-link>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
    components: {},

    data() {
        return {}
    },

    computed: {
        ...mapState({
            items: state => state.dashboard.items
        })
    },

    mounted() {
        this.$store.dispatch('dashboard/get_items_count')
    },
}
</script>
