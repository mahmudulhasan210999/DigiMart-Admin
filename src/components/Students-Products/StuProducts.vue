<template>
    <div class="w-full flex flex-col bg-gray-100 screen-height">
        <Toast :breakpoints="{'640px': {width: '80%', right: '0'}}" />
        <div class="p-6">
            <div class="bg-white p-5 rounded-lg">
                <p class="text-left text-xl font-semibold pb-6">View Student's Products</p>
                <DataTable ref="dt" :value="products" dataKey="id" :paginator="true" :rows="5" paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown" :rowsPerPageOptions="[5,10,15]" currentPageReportTemplate="Showing {first} to {last} of {totalRecords} products" responsiveLayout="scroll">

                    <Column field="serial" header="#" style="width:5rem">
                        <template #body="{data}">
                            {{ products.indexOf(data) + 1 }}
                        </template>
                    </Column>

                    <Column header="Student" :sortable="true" style="min-width:12rem">
                        <template #body="{data}">
                            <div class="flex flex-col gap-1">
                                <p>{{ data.owner_name }}</p>
                                <button class="bg-utm text-white py-1 px-2 rounded-md w-28" @click="getStudentDetails(data)">View Details</button>
                            </div>
                        </template>
                    </Column>

                    <Column field="product_name" header="Product" :sortable="true" style="min-width:13rem"></Column>

                    <Column :exportable="false" header="Image" :sortable="true" style="min-width:9rem">
                        <template #body="{data}">
                            <img class="h-16" :src="host + data.image" alt="">
                        </template>
                    </Column>

                    <Column header="Sell Price" :sortable="true" style="min-width:9rem">
                        <template #body="{data}">
                            <p>RM {{ data.sell_price }}</p>
                        </template>
                    </Column>

                    <Column :exportable="false" header="Available Status" style="max-width:13rem">
                        <template #body="{data}">
                            <div class="pl-2">
                                <i @click="toggleProductStatus(data.id)" v-if="data.availability_status == true" class="pi pi-check p-1 text-secondary-green border rounded cursor-pointer"></i>
                                <i @click="toggleProductStatus(data.id)" v-else class="pi pi-times p-1 text-red-700 border rounded cursor-pointer"></i>
                            </div>
                        </template>
                    </Column>

                    <Column :exportable="false" header="Approval Status" style="max-width:13rem">
                        <template #body="{data}">
                            <div class="pl-2">
                                <i @click="toggleProductApprove(data.id)" v-if="data.approve_status == true" class="pi pi-check p-1 text-secondary-green border rounded cursor-pointer"></i>
                                <i @click="toggleProductApprove(data.id)" v-else class="pi pi-times p-1 text-red-700 border rounded cursor-pointer"></i>
                            </div>
                        </template>
                    </Column>

                    <Column header="Action" :exportable="false" style="min-width:7rem">
                        <template #body="slotProps">
                            <div>
                                <Button icon="pi pi-trash" class="p-button-rounded p-button-danger" @click="confirmDeleteProduct(slotProps.data)" />
                            </div>
                        </template>
                    </Column>
                </DataTable>
            </div>

            <!-- Student Dialog -->
            <Dialog v-model:visible="student_dialog" :style="{width: '550px'}" header="Student Details" :modal="true">
                <div class="w-full flex flex-col">
                   <div class="flex pb-4">
                        <p class="w-28">Name:</p>
                        <p class="font-semibold">{{ student.owner_name }}</p>
                   </div>
                   <div class="flex pb-4">
                        <p class="w-28">Phone No:</p>
                        <p class="font-semibold">{{ student.phone }}</p>
                   </div>
                   <div class="flex pb-4">
                        <p class="w-28">Email:</p>
                        <p class="font-semibold">{{ student.email }}</p>
                   </div>
                   <div class="flex pb-4">
                        <p class="w-28">Address:</p>
                        <p class="font-semibold">{{ student.address }}</p>
                   </div>
                   <div class="flex flex-col gap-1 pb-4">
                        <p class="w-40">Product Description:</p>
                        <p class="font-semibold">{{ student.description }}</p>
                   </div>
                </div>
            </Dialog>

            <!-- Delete Dialog -->
            <Dialog v-model:visible="deleteProductDialog" :style="{width: '450px'}" header="Confirm" :modal="true">
                <div class="confirmation-content">
                    <i class="pi pi-exclamation-triangle mr-3 text-red-700" style="font-size: 2rem" />
                    <span v-if="temp_product">Are you sure you want to delete <b>{{ temp_product.product_name }}</b>?</span>
                </div>
                <template #footer>
                    <Button label="No" icon="pi pi-times" class="p-button-text" @click="deleteProductDialog = false"/>
                    <Button label="Yes" icon="pi pi-check" class="p-button-text" @click="deleteProduct(temp_product.id)" />
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

            student: null,
            student_dialog: false,

            deleteProductDialog: false,
            temp_product: {},
        }
    },

    computed: {
        ...mapState ({
            products: state => state.students.product
        })
    },

    mounted() {
        this.$store.dispatch('students/get_students_product')
    },

    methods: {
        getStudentDetails(student) {
            this.student = student
            this.student_dialog = true
        },

        toggleProductStatus (pid) {
            this.$store.dispatch('students/toggle_students_product_status', pid).then(response => {
                if(response.code == 200) { 
                    this.$toast.add({severity: 'success', summary: 'Success!', detail: response.response, closable: false, life: 3000})
                }
                else {
                    this.$toast.add({severity: 'error', summary: 'Error!', detail: response.response, closable: false, life: 3000})
                }
            })
        },

        toggleProductApprove (pid) {
            this.$store.dispatch('students/toggle_students_product_approval', pid).then(response => {
                if(response.code == 200) { 
                    this.$toast.add({severity: 'success', summary: 'Success!', detail: response.response, closable: false, life: 3000})
                }
                else {
                    this.$toast.add({severity: 'error', summary: 'Error!', detail: response.response, closable: false, life: 3000})
                }
            })
        },

        confirmDeleteProduct (product) {
            this.temp_product = product;
            this.deleteProductDialog = true;
        },

        deleteProduct (id) { 
            this.$store.dispatch("students/delete_student_product", id).then(response => {
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
