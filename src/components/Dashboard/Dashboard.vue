<template>
    <div class="w-full flex flex-col items-center bg-gray-100 screen-height">
        <Toast :breakpoints="{'640px': {width: '80%', right: '0'}}" />
        <div class="w-full px-6">
            <div class="text-left py-10 w-full border-b-2 border-secondary">
                <div class="pb-6">
                    <p class="text-black">Hi! Welcome to the Dashboard of <span class="text-utm font-semibold">UTM - DigiMart</span></p>
                </div>
                <div class="w-full grid grid-cols-4 gap-4">

                    <!-- Total Categories -->
                    <router-link to="/category/view">
                        <div class="bg-secondary rounded-lg shadow p-6 flex items-center">
                            <div class="bg-utm rounded-full w-12 h-12">
                                <p class="flex justify-center items-center h-full text-white"><i class="pi pi-th-large" style="font-size: 1.6rem"></i></p>
                            </div>
                            <div class="pl-6 flex items-center">
                                <div class="text-black font-semibold">
                                    <p class="font-semibold text-2xl">{{ items.Category }}</p>
                                    <p>Categories</p>
                                </div>
                            </div>
                        </div>
                    </router-link>

                    <!-- Total Products -->
                    <router-link to="/products/view">
                        <div class="bg-secondary rounded-lg shadow p-6 flex items-center">
                            <div class="bg-utm rounded-full w-12 h-12">
                                <p class="flex justify-center items-center h-full text-white"><i class="pi pi-star" style="font-size: 1.6rem"></i></p>
                            </div>
                            <div class="pl-6 flex items-center">
                                <div class="text-black font-semibold">
                                    <p class="font-semibold text-2xl">{{ items.Product }}</p>
                                    <p>Products</p>
                                </div>
                            </div>
                        </div>
                    </router-link>

                    <!-- Total Student's Products -->
                    <router-link to="/students-products">
                        <div class="bg-secondary rounded-lg shadow p-6 flex items-center">
                            <div class="bg-utm rounded-full w-12 h-12">
                                <p class="flex justify-center items-center h-full text-white"><i class="pi pi-shield" style="font-size: 1.6rem"></i></p>
                            </div>
                            <div class="pl-6 flex items-center">
                                <div class="text-black font-semibold">
                                    <p class="font-semibold text-2xl">{{ items.Student_Product }}</p>
                                    <p>Student's Products</p>
                                </div>
                            </div>
                        </div>
                    </router-link>

                    <!-- Total Orders -->
                    <router-link to="/orders">
                        <div class="bg-secondary rounded-lg shadow p-6 flex items-center">
                            <div class="bg-utm rounded-full w-12 h-12">
                                <p class="flex justify-center items-center h-full text-white"><i class="pi pi-shopping-cart" style="font-size: 1.6rem"></i></p>
                            </div>
                            <div class="pl-6 flex items-center">
                                <div class="text-black font-semibold">
                                    <p class="font-semibold text-2xl">{{ items.Orders }}</p>
                                    <p>Orders</p>
                                </div>
                            </div>
                        </div>
                    </router-link>
                </div>
            </div>

            <!-- Add New Admin -->
            <div class="py-10">
                <p class="text-xl font-semibold">Add New Admin</p>
                <div class="px-20 xl:px-28 2xl:px-40">
                    <Form class="mt-6 w-full flex flex-col items-center" @submit="register" :validation-schema="schema">
                        <div class="flex w-full gap-5">
                            <div class="w-1/2 flex flex-col">
                                <p class="text-gray-500 text-sm text-left">FIRST NAME</p>
                                <div class="flex flex-col w-full mt-1">
                                    <Field class="text-sm border border-gray-300 rounded-md p-2 w-full" name="First name" v-model="registration_info.fname" type="text" />
                                    <ErrorMessage class="text-red-500 text-left text-sm mt-1" name="First name" />
                                </div>
                            </div> 
                            <div class="w-1/2 flex flex-col">
                                <p class="text-gray-500 text-sm text-left">LAST NAME</p>
                                <div class="flex flex-col w-full mt-1">
                                    <Field class="text-sm border border-gray-300 rounded-md p-2 w-full" name="Last name" v-model="registration_info.lname" type="text" />
                                    <ErrorMessage class="text-red-500 text-left text-sm mt-1" name="Last name" />
                                </div>
                            </div>
                        </div>
                        <div class="flex w-full gap-5 mt-4">
                            <div class="w-1/2 flex flex-col">
                                <p class="text-gray-500 text-sm text-left">USERNAME</p>
                                <div class="flex flex-col w-full mt-1">
                                    <Field class="text-sm border border-gray-300 rounded-md p-2 w-full" name="Username" v-model="registration_info.username" type="text" />
                                    <ErrorMessage class="text-red-500 text-left text-sm mt-1" name="Username" />
                                </div>
                            </div>
                            <div class="w-1/2 flex flex-col">
                                <p class="text-gray-500 text-sm text-left">EMAIL</p>
                                <div class="flex flex-col w-full mt-1">
                                    <Field class="text-sm border border-gray-300 rounded-md p-2 w-full" name="Email" v-model="registration_info.email" type="text" />
                                    <ErrorMessage class="text-red-500 text-left text-sm mt-1" name="Email" />
                                </div>
                            </div>
                        </div>
                        <div class="flex w-full gap-5 mt-4">
                            <div class="w-1/2 flex flex-col">
                                <p class="text-gray-500 text-sm text-left">GENDER</p>
                                <div class="flex flex-col w-full mt-1">
                                    <Field class="text-sm border border-gray-300 rounded-md p-2 w-full" name="Gender" v-model="registration_info.gender" type="text" />
                                    <ErrorMessage class="text-red-500 text-left text-sm mt-1" name="Gender" />
                                </div>
                            </div>
                            <div class="w-1/2 flex flex-col">
                                <p class="text-gray-500 text-sm text-left">PHONE</p>
                                <div class="flex flex-col w-full mt-1">
                                    <Field class="text-sm border border-gray-300 rounded-md p-2 w-full" name="Phone" v-model="registration_info.phone" type="text" />
                                    <ErrorMessage class="text-red-500 text-left text-sm mt-1" name="Phone" />
                                </div>
                            </div>
                        </div>
                        <div class="flex w-full gap-5 mt-4">
                            <div class="w-1/2 flex flex-col">
                                <p class="text-gray-500 text-sm text-left">CITY</p>
                                <div class="flex flex-col w-full mt-1">
                                    <Field class="text-sm border border-gray-300 rounded-md p-2 w-full" name="City" v-model="registration_info.city" type="text" />
                                    <ErrorMessage class="text-red-500 text-left text-sm mt-1" name="City" />
                                </div>
                            </div>
                            <div class="w-1/2 flex flex-col">
                                <p class="text-gray-500 text-sm text-left">ADDRESS</p>
                                <div class="flex flex-col w-full mt-1">
                                    <Field class="text-sm border border-gray-300 rounded-md p-2 w-full" name="Address" v-model="registration_info.address" type="text" />
                                    <ErrorMessage class="text-red-500 text-left text-sm mt-1" name="Address" />
                                </div>
                            </div>
                        </div>
                        <div class="flex w-full gap-5 mt-4">
                            <div class="w-1/2 flex flex-col">
                                <p class="text-gray-500 text-sm text-left">PASSWORD</p>
                                <div class="flex flex-col w-full mt-1">
                                    <Field class="text-sm border border-gray-300 rounded-md p-2 w-full" name="Password" v-model="registration_info.password" type="password" />
                                    <ErrorMessage class="text-red-500 text-left text-sm mt-1" name="Password" />
                                </div>
                            </div>
                            <div class="w-1/2 flex flex-col">
                                <p class="text-gray-500 text-sm text-left">RE-ENTER PASSWORD</p>
                                <div class="flex flex-col w-full mt-1">
                                    <Field class="text-sm border border-gray-300 rounded-md p-2 w-full" name="Confirm password" v-model="registration_info.confirm_password" type="password" />
                                    <ErrorMessage class="text-red-500 text-left text-sm mt-1" name="Confirm password" />
                                </div>
                            </div>
                        </div>
                        <button class="mt-4 w-72 sm:w-96 bg-utm py-2 rounded-md text-white hover:bg-primary">Add</button>
                    </Form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex';
import { Field, Form, ErrorMessage } from "vee-validate";
import * as Yup from "yup";
import Toast from 'primevue/toast';

export default {
    components: {
        Toast,
        Field,
        Form,
        ErrorMessage
    },

    data() {
        return {
            registration_info: {
                fname: "",
                lname: "",
                username: "",
                email: "",
                phone: "",
                gender: "",
                city: "",
                address: "",
                password: "",
                confirm_password: "",
            }
        }
    },

    computed: {
        schema() {
            return Yup.object({
                'First name': Yup.string().required("First name is required"),
                'Last name': Yup.string().required("Last name is required"),
                'Username': Yup.string().required("Username is required"),
                'Email': Yup.string().required("Email is required").email(),
                'Phone': Yup.number().required('Phone number is required').typeError("Doesn't look like a phone number").positive("Phone number can't start with a minus").integer("Phone number can't include a decimal point"),
                'Gender': Yup.string().required("Gender is required"),
                'City': Yup.string().required("City is required"),
                'Address': Yup.string().required("Address is required"),
                'Password': Yup.string().required("Password is required").min(6),
                'Confirm password':  Yup.string().required("Confirm your password").matches(this.registration_info.password, "Password doesn't match")
            });
        },

        ...mapState({
            items: state => state.dashboard.items
        })
    },

    mounted() {
        this.$store.dispatch('dashboard/get_items_count')
    },

    methods: {
        register() {
            this.$store.dispatch('login/getRegister', this.registration_info).then(response => { 
                if(response.data.code == 200) {
                    this.$toast.add({severity: 'success', summary: response.data.response, closable: false, life: 2000})
                    this.registration_info.fname = ""
                    this.registration_info.lname = ""
                    this.registration_info.username = ""
                    this.registration_info.email = ""
                    this.registration_info.phone = ""
                    this.registration_info.gender = ""
                    this.registration_info.city = ""
                    this.registration_info.address = ""
                    this.registration_info.password = ""
                    this.registration_info.confirm_password = ""
                    setTimeout( ()=> this.$router.push('/admin-list'), 2000)
                }
                else {
                    this.$toast.add({severity: 'error', detail: response.data.response, closable: false, life: 4000})
                }
            })
        }
    }
}
</script>
