<template>
    <div class="w-full flex flex-col bg-gray-100 screen-height">
        <Toast :breakpoints="{'640px': {width: '80%', right: '0'}}" />
        <div class="p-6">
            <div class="bg-white p-5 rounded-lg">
                <p class="text-left text-xl font-semibold pb-6">View Products</p>
                <DataTable ref="dt" :value="products" dataKey="id" :paginator="true" :rows="5" paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown" :rowsPerPageOptions="[5,10,15]" currentPageReportTemplate="Showing {first} to {last} of {totalRecords} products" responsiveLayout="scroll">

                    <Column field="serial" header="#" style="width: 5%">
                        <template #body="{data}">
                            {{ products.indexOf(data) + 1 }}
                        </template>
                    </Column>

                    <Column field="name" header="Name" :sortable="true" style="min-width:10rem"></Column>

                    <Column :exportable="false" header="Image" :sortable="true" style="min-width:8rem">
                        <template #body="{data}">
                            <img class="h-16" :src="data.images[0]" alt="">
                        </template>
                    </Column>

                    <Column header="Offer Price" :sortable="true" style="min-width:10rem">
                        <template #body="{data}">
                            <p>RM {{ data.offer_price }}</p>
                        </template>
                    </Column>

                    <Column header="Sell Price" :sortable="true" style="min-width:10rem">
                        <template #body="{data}">
                            <p>RM {{ data.sell_price }}</p>
                        </template>
                    </Column>

                    <Column :exportable="false" header="Status" style="max-width:15rem">
                        <template #body="{data}">
                            <div class="pl-2">
                                <i @click="toggleProductStatus(data.pid)" v-if="data.status == true" class="pi pi-check p-1 text-secondary-green border rounded cursor-pointer"></i>
                                <i @click="toggleProductStatus(data.pid)" v-else class="pi pi-times p-1 text-red-700 border rounded cursor-pointer"></i>
                            </div>
                        </template>
                    </Column>

                    <Column :exportable="false" header="Featured" style="max-width:15rem">
                        <template #body="{data}">
                            <div class="pl-2">
                                <i @click="toggleProductFeatured(data.pid)" v-if="data.featured == true" class="pi pi-check p-1 text-secondary-green border rounded cursor-pointer"></i>
                                <i @click="toggleProductFeatured(data.pid)" v-else class="pi pi-times p-1 text-red-700 border rounded cursor-pointer"></i>
                            </div>
                        </template>
                    </Column>

                    <Column header="Actions" :exportable="false" style="min-width:8rem">
                        <template #body="slotProps">
                            <div class="flex">
                                <div class="">
                                    <router-link :to="{ path:'/products/edit/' + slotProps.data.pid }">
                                        <Button icon="pi pi-pencil" class="p-button-rounded p-button-success mr-2"/>
                                    </router-link>
                                </div>
                                <div class="ml-2">
                                    <Button icon="pi pi-trash" class="p-button-rounded p-button-danger" @click="confirmDeleteProduct(slotProps.data)" />
                                </div>
                            </div>
                        </template>
                    </Column>
                </DataTable>
            </div>

            <Dialog v-model:visible="deleteProductDialog" :style="{width: '450px'}" header="Confirm" :modal="true">
                <div class="confirmation-content">
                    <i class="pi pi-exclamation-triangle mr-3 text-red-700" style="font-size: 2rem" />
                    <span v-if="temp_product">Are you sure you want to delete <b>{{ temp_product.name }}</b>?</span>
                </div>
                <template #footer>
                    <Button label="No" icon="pi pi-times" class="p-button-text" @click="deleteProductDialog = false"/>
                    <Button label="Yes" icon="pi pi-check" class="p-button-text" @click="deleteProduct(temp_product.pid)" />
                </template>
            </Dialog>
        </div>
    </div>
</template>

<script>
import { mapState } from "vuex";
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Button from 'primevue/button';
import Dialog from 'primevue/dialog';
import Toast from "primevue/toast";

export default {
    components: {
        DataTable,
        Column,
        Button,
        Dialog,
        Toast
    },

    data() {
        return {
            host: "https://digimart.samiur.me",

            deleteProductDialog: false,
            temp_product: {},
        }
    },

    computed: {
        ...mapState ({
            products: state => state.products.product
        })
    },

    mounted() {
        this.$store.dispatch('products/get_product')
    },

    methods: {
        toggleProductStatus (pid) {
            this.$store.dispatch('products/toggle_product_status', pid).then(response => {
                console.log(response.data)
                if(response.code == 200) { 
                    this.$toast.add({severity: 'success', summary: 'Success!', detail: response.message, closable: false, life: 3000})
                }
                else {
                    this.$toast.add({severity: 'error', summary: 'Error!', detail: response.message, closable: false, life: 3000})
                }
            })
        },

        toggleProductFeatured (pid) {
            this.$store.dispatch('products/toggle_product_featured', pid).then(response => {
                console.log(response.data)
                if(response.code == 200) { 
                    this.$toast.add({severity: 'success', summary: 'Success!', detail: response.message, closable: false, life: 3000})
                }
                else {
                    this.$toast.add({severity: 'error', summary: 'Error!', detail: response.message, closable: false, life: 3000})
                }
            })
        },

        confirmDeleteProduct (product) {
            this.temp_product = product;
            this.deleteProductDialog = true;
        },

        deleteProduct (id) { 
            this.$store.dispatch("products/delete_product", id).then(response => {
                if(response.data.code == 200) {
                    this.$toast.add({severity: 'success', summary: 'Success!', detail:response.data.response, closable: false, life: 3000})
                    this.deleteProductDialog = false;
                    this.temp_product = {};
                } else {
                    this.$toast.add({severity: 'error', summary: 'Error!', detail: 'Something Wrong', closable: false, life: 3000})
                }
            })
        },
    }
}
</script>
