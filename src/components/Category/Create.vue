<template>
    <div class="w-full flex flex-col bg-gray-100 screen-height">
        <Toast :breakpoints="{'640px': {width: '80%', right: '0'}}" />
        <div class="p-6">
            <div class="bg-white text-left p-6 rounded-lg shadow-md 2xl:px-52">
                <div class="pb-6">
                    <p class="text-xl font font-semibold pb-1">Create Category</p>
                </div>

                <div>
                    <div class="pb-4 flex">
                        <div class="pr-3 w-4/5">
                            <p class="pb-1 text-gray-500">Name</p>
                            <InputText type="text" class="w-full dropdown-height" v-model="category.name" />
                        </div>

                        <div class="pl-3 w-40">
                            <p class="pb-1 text-gray-500">Status</p>
                            <ToggleButton v-model="category.status" onIcon="pi pi-check" offIcon="pi pi-times" class="w-full dropdown-height" aria-label="Confirmation" />
                        </div>
                    </div>
                    
                    <div class="flex justify-center py-10">
                        <button @click="submit" :disabled="submit_loading" class="submit-button">Submit</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState } from "vuex";
import InputText from 'primevue/inputtext';
import ToggleButton from 'primevue/togglebutton';
import Toast from 'primevue/toast';

export default {
    components: {
        InputText,
        ToggleButton,
        Toast
    },

    data() {
        return {
            category: {
                name: "",
                status: false,
                parent: 0
            }
        }
    },

    computed: {
        ...mapState ({
            submit_loading: state => state.category.submit_loading
        })
    },

    methods: {
        submit() {
            this.$store.dispatch('category/create_category', this.category).then(response => {
                if(response.data.code == 200) { 
                    this.$toast.add({severity: 'success', summary: 'Success!', detail: response.data.response, closable: false, life: 3000})
                    this.category.name = ""
                    this.category.status = false
                }
                else {
                    this.$toast.add({severity: 'error', summary: 'Error!', detail: response.data.response, closable: false, life: 3000})
                }
            })
        }
    }
}
</script>
