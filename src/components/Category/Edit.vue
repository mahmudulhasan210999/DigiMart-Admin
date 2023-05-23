<template>
    <div class="w-full flex flex-col bg-gray-100 screen-height">
        <Toast :breakpoints="{'640px': {width: '80%', right: '0'}}" />
        <div class="p-6">
            <div class="bg-white text-left p-6 rounded-lg shadow-md 2xl:px-52">
                <div class="pb-6">
                    <p class="text-xl font font-semibold pb-1">Edit Category</p>
                </div>

                <div>
                    <div class="pb-4 flex">
                        <div class="pr-3 w-4/5">
                            <p class="pb-1 text-gray-500">Name</p>
                            <InputText type="text" class="w-full dropdown-height" v-model="edit_category.name" />
                        </div>

                        <div class="pl-3 w-40">
                            <p class="pb-1 text-gray-500">Status</p>
                            <ToggleButton v-model="edit_category.status" onIcon="pi pi-check" offIcon="pi pi-times" class="w-full dropdown-height" aria-label="Confirmation" />
                        </div>
                    </div>

                    <div class="pb-4">
                        <p class="pb-1 text-gray-500">Category Icon</p>
                        <div class="flex items-center">
                            <img class="h-24" :src="show_image"> 
                            <input class="ml-4" type="file" accept="image/*" @change="uplaodImage">
                        </div>
                    </div>

                    <div class="pb-4">
                        <p class="pb-1 text-gray-500">Top Banner</p>
                        <div class="flex items-center">
                            <img class="h-40" :src="show_top_banner"> 
                            <input class="ml-4" type="file" accept="image/*" @change="uplaodTopBanner">
                        </div>
                    </div>

                    <div class="pb-4">
                        <p class="pb-1 text-gray-500">Side Banner</p>
                        <div class="flex items-center">
                            <img class="h-40" :src="show_side_banner"> 
                            <input class="ml-4" type="file" accept="image/*" @change="uplaodSideBanner">
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
import { mapState } from 'vuex';
import InputText from 'primevue/inputtext';
import ToggleButton from 'primevue/togglebutton';
import Toast from 'primevue/toast';

export default {
    components: {
        InputText,
        ToggleButton,
        Toast
    },

    props: ["slug"],

    data() {
        return {
            host: "https://alhassanapi.smicee.com",

            edit_category: {
                id: null,
                name: "",
                status: null,
                description: "something",
                image: null,
                top_banner: null,
                side_banner: null
            },
            show_image: null,
            show_top_banner: null,
            show_side_banner: null
        }
    },

    computed: {
        ...mapState({
            category: (state) => state.category.category_details,
            submit_loading: state => state.category.submit_loading
        }),
    },

    mounted() {
        this.$store.dispatch("category/get_category_details", this.slug);
        
    },
    
    watch:{
        category (oldValue, newValue) {
            this.edit_category.id = this.category.id
            this.edit_category.name = this.category.name
            this.edit_category.status = this.category.status
            this.show_image = this.host + this.category.image
            this.show_top_banner = this.host + this.category.top_banner
            this.show_side_banner = this.host + this.category.side_banner
        }
    },

    methods: {
        submit() {
            console.log(this.edit_category)
            this.$store.dispatch('category/edit_category', this.edit_category).then(response => {
                console.log(response)    
                if(response.data.code == 200) { 
                    this.$toast.add({severity: 'success', summary: 'Success!', detail: response.data.response, closable: false, life: 3000})
                    setTimeout( ()=> this.$router.push('/category/view'),3000)
                }
                else {
                    this.$toast.add({severity: 'error', summary: 'Error!', detail: response.data.response, closable: false, life: 3000})
                }
            })
        },

        uplaodImage(e){
            const image = e.target.files[0];
            const reader = new FileReader();
            reader.readAsDataURL(image);
            reader.onload = e =>{
                this.edit_category.image = e.target.result;
                this.show_image = e.target.result;
            };
        },

        uplaodTopBanner(e){
            const image = e.target.files[0];
            const reader = new FileReader();
            reader.readAsDataURL(image);
            reader.onload = e =>{
                this.edit_category.top_banner = e.target.result;
                this.show_top_banner = e.target.result;
            };
        },

        uplaodSideBanner(e){
            const image = e.target.files[0];
            const reader = new FileReader();
            reader.readAsDataURL(image);
            reader.onload = e =>{
                this.edit_category.side_banner = e.target.result;
                this.show_side_banner = e.target.result;
            };
        },
    }
}
</script>