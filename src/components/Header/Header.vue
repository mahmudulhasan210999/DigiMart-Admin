<template>
    <div class="flex justify-between items-center px-6 bg-secondary py-4 mx-6 mt-6 rounded-md">
        <div class="">
            <p class="text-gray-500">{{ getDateTime() }}</p>
        </div>

        <div class="bg-white w-8 h-7 rounded-md flex justify-center items-center cursor-pointer">
            <p @click="getLogout"><i class="pi pi-sign-out self-center text-gray-500" style="font-size: 0.9rem"></i></p>
        </div>
    </div>
</template>

<script>
import moment from 'moment'

export default {
    methods: {
        getDateTime(){
            return moment().format('dddd, MMMM Do YYYY')
        },
        getLogout() {
            localStorage.removeItem('access_token')
            localStorage.removeItem('refresh_token')
            localStorage.removeItem('loggedIn')
            this.$router.push('/login')
        }
    }
}
</script>
