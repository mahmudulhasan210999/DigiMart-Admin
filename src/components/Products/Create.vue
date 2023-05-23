<template>
    <div class="w-full flex flex-col bg-gray-100 screen-height">
        <Toast :breakpoints="{'640px': {width: '80%', right: '0'}}" />
        <div class="p-6">
            <div class="bg-white text-left p-6 rounded-lg shadow-md 2xl:px-52">
                <div class="pb-6">
                    <p class="text-xl font font-semibold pb-1">Create Products</p>
                </div>

                <div>
                    <div class="pb-4 flex w-full">
                        <div class="pr-3 w-1/2">
                            <p class="pb-1 text-gray-500 ">Name</p>
                            <InputText type="text" class="w-full dropdown-height" v-model="product.name"/>
                        </div>

                        <div class="pl-3 w-1/2">
                            <p class="pb-1 text-gray-500">Category</p>
                            <vSelect 
                                class="text-gray-400"
                                :options="categories"
                                :reduce="(name) => name.id" 
                                label="name" 
                                v-model="product.category"
                                placeholder="Select"
                            >
                            </vSelect>
                        </div>
                    </div>

                    <div class="pb-4 flex w-full">
                        <div class="w-1/2 pr-3 flex">
                            <div class="pr-2 w-1/2">
                                <p class="pb-1 text-gray-500 ">Regular Price</p>
                                <InputText type="text" class="w-full dropdown-height" v-model="product.sell_price" placeholder="e.g: 50000" />
                            </div>
                            <div class="w-1/2 pl-2">
                                <p class="pb-1 text-gray-500 ">Offer Price</p>
                                <InputText type="text" class="w-full dropdown-height" v-model="product.offer_price" placeholder="e.g: 50000" />
                            </div>
                        </div>

                        <div class="w-1/2 pl-3 flex">
                            <div class="w-1/4">
                                <p class="pb-1 text-gray-500 ">Status</p>
                                <ToggleButton v-model="product.status" onIcon="pi pi-check" offIcon="pi pi-times" class="w-full dropdown-height" aria-label="Confirmation" />
                            </div>

                            <div class="w-1/4 pl-2">
                                <p class="pb-1 text-gray-500 ">Featured</p>
                                <ToggleButton v-model="product.featured" onIcon="pi pi-check" offIcon="pi pi-times" class="w-full dropdown-height" aria-label="Confirmation" />
                            </div>

                            <div class="w-1/4 pl-2">
                                <p class="pb-1 text-gray-500 ">On Sale</p>
                                <ToggleButton v-model="product.on_sale" onIcon="pi pi-check" offIcon="pi pi-times" class="w-full dropdown-height" aria-label="Confirmation" />
                            </div>

                            <div class="w-1/4 pl-2">
                                <p class="pb-1 text-gray-500 ">Hot Item</p>
                                <ToggleButton v-model="product.hot_items" onIcon="pi pi-check" offIcon="pi pi-times" class="w-full dropdown-height" aria-label="Confirmation" />
                            </div>
                        </div>
                    </div>

                    <div class="pb-4">
                        <p class="pb-1 text-gray-500">Product Image</p>
                        <div class="flex items-center">
                            <img v-if="product.product_image" class="h-40" :src="product.product_image">
                            <img v-else class="h-40 w-52 border border-gray-300" src="../../assets/empty_image.jpg">
                            <input :class="product.product_image ? 'ml-4' : 'ml-4'" type="file" accept="image/*" @change="uploadImage">
                        </div>
                    </div>

                    <div class="pb-4">
                        <p class="pb-1 text-gray-500">Description</p>
                        <ckeditor
                            :editor="editor"
                            v-model="product.description"
                            :config="editorConfig"
                        ></ckeditor>
                    </div>

                    <div class="">
                        <p class="pb-1 text-gray-500">Tags</p>
                        <ckeditor
                            :editor="editor"
                            v-model="product.tags"
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
        Toast
    },

    data() {
        return {
            product: {
                name: "",
                status: false,
                featured: false,
                hot_items: false,
                on_sale: false,
                category: null,
                sell_price: null,
                offer_price: null,
                description: "",
                tags: "",
                product_image: null,
                unit: 1
            },

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
            products: state => state.products.product,
            categories: state => state.category.category,
            submit_loading: state => state.products.submit_loading
        })
    },

    mounted() {
        this.$store.dispatch('category/get_category')
    },

    methods: {
        submit() {
            console.log(this.product)
            this.$store.dispatch('products/create_product', this.product).then(response => {
                if(response.data.code == 200) { 
                    // console.log(response.data.response)
                    this.$toast.add({severity: 'success', summary: 'Success!', detail: response.data.response, closable: false, life: 3000})
                    this.product.name = ""
                    this.product.status = false
                    this.product.featured = false
                    this.product.hot_items = false
                    this.product.on_sale = false
                    this.product.category = null
                    this.product.sell_price = null
                    this.product.offer_price = null
                    this.product.description = ""
                    this.product.tags = ""
                    this.product.product_image = null
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
                this.product.product_image = e.target.result; 
            };
        },
    }
}
</script>
