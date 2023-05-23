<template>
    <div class="h-screen bg-background flex items-center">
        <Toast :breakpoints="{'640px': {width: '80%', right: '0'}}" />
        <div class="w-full flex justify-center">
            <div class="container flex justify-center">

                <div class="bg-white text-left p-4 sm:p-6 lg:p-8 text-sm flex flex-col justify-center rounded-md shadow-md">
                    <div class="w-full flex justify-center">
                        <img class="h-24 md:h-28" src="../../assets/logo.png" alt="logo">
                    </div>
                    <div class="py-4 md:py-6 w-full sm:w-96">
                        <p class="text-xl font-semibold">Welcome to DigiMart Admin</p>
                        <p class="text-sm text-gray-500">Sign in your account</p>
                    </div>

                    <Form class="w-full flex flex-col items-center" @submit="login" :validation-schema="schema">

                        <div class="pb-4 w-full">
                            <p class="pb-1 text-gray-600">Email</p>
                            <div> 
                                <Field 
                                    class="w-full sm:w-96 outline-none text-gray-700 border border-gray-300 rounded p-2" 
                                    type="text" 
                                    placeholder="Enter email" 
                                    v-model="user.email"
                                    name="Email"
                                />
                            </div>
                            <ErrorMessage class="text-red-700 text-left text-sm mt-1" name="Email" />
                        </div> 

                        <div class="pb-4 w-full">
                            <p class="pb-1 text-gray-600">Password</p>
                            <div class="relative w-full">
                                <div class="absolute inset-y-0 right-0 pr-6 flex items-center">
                                    <i class="absolute text-gray-500 flex justify-center cursor-pointer" :class="passwordToggleIcon" @click="togglePasswordVisibility" />
                                </div>
                                <div>
                                    <Field 
                                        class="w-full sm:w-96 outline-none text-gray-700 border border-gray-300 rounded p-2" 
                                        :type="passwordFieldType"
                                        placeholder="Enter password" 
                                        v-model="user.password"
                                        name="Password"
                                    />
                                </div>
                            </div>
                            <ErrorMessage class="text-red-700 text-left text-sm mt-1" name="Password" />
                        </div>

                       <button class="bg-primary hover:bg-gray-600 text-white rounded-md w-full py-2">LOGIN</button>
                   </Form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { Field, Form, ErrorMessage } from "vee-validate";
import * as Yup from "yup";
import Toast from 'primevue/toast';

export default {
    data(){
        return {
            passwordFieldType: 'password',
            user: {
                email: "",
                password: "",
            }
        }
    },

    components: {
        Field, 
        Form, 
        ErrorMessage,
        Toast
    },

    computed: {
        schema() {
            return Yup.object({
                'Email': Yup.string().required("Email is required"),
                'Password': Yup.string().required("Password is required")
            });
        },

        passwordToggleIcon() {
            return this.passwordFieldType === 'password' ? 'pi pi-eye' : 'pi pi-eye-slash'
        },
    },

    methods: {
        togglePasswordVisibility() {
            this.passwordFieldType = this.passwordFieldType === 'password' ? 'text' : 'password'
        },

        login() {
            // console.log('payload -->', this.user)
            this.$store.dispatch('login/get_Login', this.user)
            .then(response => {
                console.log('response -->', response)    
                if(response.data.code !== 200) { 
                    this.$toast.add({severity: 'error', summary: 'Error!', detail: 'Something Wrong. Please try again.', closable: false, life: 3000})
                } else {
                    this.$router.push('/')
                }
            })
        }
    }
}
</script>


