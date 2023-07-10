<template>
    <div class="w-full flex flex-col bg-gray-100 screen-height">
        <Toast :breakpoints="{'640px': {width: '80%', right: '0'}}" />
        <div class="p-6">
            <div class="bg-white text-left p-6 rounded-lg shadow-md 2xl:px-52">
                <div class="pb-6">
                    <p class="text-xl font font-semibold pb-1">Edit Product</p>
                </div>

                <div>
                    <div class="pb-4 flex w-full">
                        <div class="pr-3 w-1/2">
                            <p class="pb-1 text-gray-500 ">Name</p>
                            <InputText type="text" class="w-full dropdown-height" v-model="edit_product.name" />
                        </div>

                        <div class="pl-3 w-1/2">
                            <p class="pb-1 text-gray-500">Category</p>
                            <vSelect 
                                class="text-gray-400"
                                :options="category"
                                :reduce="(name) => name.id"
                                label="name" 
                                v-model="edit_product.category"
                                placeholder="Select"
                            >
                            </vSelect>
                        </div>
                    </div>

                    <div class="pb-4 flex w-full">
                        <div class="w-1/3 pr-3 flex">
                            <div class="pr-2 w-full">
                                <p class="pb-1 text-gray-500 ">Regular Price</p>
                                <InputText type="text" class="w-full dropdown-height" v-model="edit_product.sell_price" placeholder="e.g: 50000" />
                            </div>
                        </div>

                        <div class="w-2/3 flex">
                            <div class="w-1/4">
                                <p class="pb-1 text-gray-500 ">Status</p>
                                <ToggleButton v-model="edit_product.status" onIcon="pi pi-check" offIcon="pi pi-times" class="w-full dropdown-height" aria-label="Confirmation" />
                            </div>

                            <div class="w-1/4 pl-2">
                                <p class="pb-1 text-gray-500 ">Featured</p>
                                <ToggleButton v-model="edit_product.featured" onIcon="pi pi-check" offIcon="pi pi-times" class="w-full dropdown-height" aria-label="Confirmation" />
                            </div>

                            <div class="w-1/4 pl-2">
                                <p class="pb-1 text-gray-500 ">On Sale</p>
                                <ToggleButton v-model="edit_product.on_sale" onIcon="pi pi-check" offIcon="pi pi-times" class="w-full dropdown-height" aria-label="Confirmation" />
                            </div>

                            <div class="w-1/4 pl-2">
                                <p class="pb-1 text-gray-500 ">Hot Item</p>
                                <ToggleButton v-model="edit_product.hot_items" onIcon="pi pi-check" offIcon="pi pi-times" class="w-full dropdown-height" aria-label="Confirmation" />
                            </div>
                        </div>
                    </div>

                    <div class="pb-4">
                        <p class="pb-1 text-gray-500">Image</p>
                        <div class="flex items-center">
                            <img class="h-40" :src="show_image">
                            <input class="ml-4" type="file" accept="image/*" @change="uploadImage">
                        </div>
                    </div>

                    <div>
                        <p class="pb-1 text-gray-500">Description</p>
                        <ckeditor
                            :editor="editor"
                            v-model="edit_product.description"
                            :config="editorConfig"
                        ></ckeditor>
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
import vSelect from 'vue-select';
import 'vue-select/dist/vue-select.css';
import ToggleButton from 'primevue/togglebutton';
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import Toast from 'primevue/toast';

export default {
    components: {
        InputText,
        vSelect,
        ToggleButton,
        ClassicEditor,
        Toast,
    },

    props:["slug"],

    data() {
        return {
            host: "https://alhassanapi.smicee.com",

            edit_product: {
                name: "",
                pid: "",
                status: null,
                featured: null,
                on_sale: null,
                hot_items: null,
                category: null,
                sell_price: null,
                offer_price: null,
                description: "",
                tags: "",
                images: [] 
            },
            show_image: [],
            
            editor: ClassicEditor,
            editorData: "<p>What's on your mind ?</p>",
            editorConfig: {
                fillEmptyBlocks: false,
                basicEntities: false,
                entities: false,
                entities_greek: false,
                entities_latin: false,
                entities_additional: "",
                language: "fr",
                wordCount: {
                container: document.getElementById("wordcount")
                },
                ckfinder: {
                uploadUrl:
                    "https://example.com/ckfinder/core/connector/php/connector.php?command=QuickUpload&type=Images&responseType=json",
                options: {
                    resourceType: "Images"
                }
                },
                mediaEmbed: {
                previewsInData: true
                }
            }
        }
    },

    computed: {
        ...mapState ({
            category: state => state.category.category,
            productData: state => state.products.product_details,
            submit_loading: state => state.products.submit_loading
        })
    },

    mounted() {
        this.$store.dispatch('products/get_product_details', this.slug),
        this.$store.dispatch('category/get_category')
    },

    watch:{
        productData (oldValue, newValue) {
            this.edit_product.name = this.productData.name
            this.edit_product.pid = this.productData.pid
            this.edit_product.category = this.productData.category.id
            this.edit_product.status = this.productData.status
            this.edit_product.featured = this.productData.featured
            this.edit_product.on_sale = this.productData.on_sale
            this.edit_product.hot_items = this.productData.hot_items
            this.edit_product.sell_price = this.productData.sell_price
            this.edit_product.offer_price = this.productData.offer_price
            this.edit_product.description = this.productData.description
            this.edit_product.tags = this.productData.tags
            this.show_image = this.productData.images[0]
        }
    },

    methods: {
        submit() {
            console.log(this.edit_product)  
            this.$store.dispatch('products/edit_product', this.edit_product)
            .then(response => {
                console.log(response.data)    
                if(response.data.code == 200) { 
                    this.$toast.add({severity: 'success', summary: 'Success!', detail: response.data.response, closable: false, life: 3000})
                    setTimeout( ()=> this.$router.push('/products/view'),3000)
                }
                else {
                    this.$toast.add({severity: 'error', summary: 'Error!', detail: response.data.response, closable: false, life: 3000})
                }
            })
        },

        uploadImage(e){
            const image = e.target.files[0];
            const reader = new FileReader();
            reader.readAsDataURL(image);
            reader.onload = e =>{
                this.edit_product.images[0] = e.target.result; 
                this.show_image = e.target.result; 
            };
        },
    }
}
</script>
