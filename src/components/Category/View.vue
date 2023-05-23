<template>
    <div class="w-full flex flex-col bg-gray-100 screen-height">
        <Toast :breakpoints="{'640px': {width: '80%', right: '0'}}" />
        <div class="p-6">
            <div>
                <div class="bg-white p-5 rounded-lg">
                    <p class="text-left text-xl font-semibold pb-6">View Categories</p>

                    <DataTable ref="dt" :value="categories" dataKey="id" :paginator="true" :rows="5" paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown" :rowsPerPageOptions="[5,10,15]" currentPageReportTemplate="Showing {first} to {last} of {totalRecords} Categories" responsiveLayout="scroll">

                        <Column field="serial" header="#" style="width: 10%">
                            <template #body="{data}">
                                {{ categories.indexOf(data) + 1 }}
                            </template>
                        </Column>

                        <Column field="name" header="Name" :sortable="true" style="max-width:20rem"></Column>

                        <Column :exportable="false" header="Status" style="max-width:15rem">
                            <template #body="{data}">
                                <div class="pl-2">
                                    <i @click="toggleCategoryStatus(data.id)" v-if="data.status == true" class="pi pi-check p-1 text-secondary-green border rounded cursor-pointer"></i>
                                    <i @click="toggleCategoryStatus(data.id)" v-else class="pi pi-times p-1 text-red-700 border rounded cursor-pointer"></i>
                                </div>
                            </template>
                        </Column>

                        <Column header="Action" :exportable="false" style="max-width:8rem">
                            <template #body="slotProps">
                                <div class="flex">
                                    <div class="">
                                        <button @click="editCategory(slotProps.data)" class="bg-secondary hover:bg-primary rounded-full w-9 h-9"><i class="pi pi-pencil" style="font-size: 1rem; color: white;"></i></button>
                                    </div>
                                    <div class="ml-2">
                                        <Button @click="confirmDeleteCategory(slotProps.data)" icon="pi pi-trash" class="p-button-rounded p-button-danger" />
                                    </div>
                                </div>
                            </template>
                        </Column>
                    </DataTable>
                </div>

                <!-- Edit Dialog -->
                <Dialog v-model:visible="editDialog" :style="{ width: '800px' }" header="Edit Category Data" :modal="true" class="p-fluid">
                    <div class="flex pb-4">
                        <div class="w-full pr-3">
                            <p class="pb-1 text-gray-500">Name</p>
                            <InputText type="text" class="w-full dropdown-height" v-model="temp_category.name" placeholder="Name" />
                        </div>

                        <div class="pl-3 w-40">
                            <p class="pb-1 text-gray-500">Status</p>
                            <ToggleButton v-model="temp_category.status" onIcon="pi pi-check" offIcon="pi pi-times" class="w-full dropdown-height" aria-label="Confirmation" />
                        </div>
                    </div>

                    <template #footer>
                        <Button label="Cancel" icon="pi pi-times" class="p-button-text" @click="hideEditDialog" />
                        <Button label="Save" icon="pi pi-check" class="p-button-text" @click="saveCategoryEdit" />
                    </template>
                </Dialog>

                <!-- Delete Dialog -->
                <Dialog v-model:visible="deleteCategroyDialog" :style="{width: '450px'}" header="Confirm" :modal="true">
                    <div class="confirmation-content">
                        <i class="pi pi-exclamation-triangle mr-3 text-red-700" style="font-size: 2rem" />
                        <span v-if="temp_category">Are you sure you want to delete <b>{{ temp_category.name }}</b>?</span>
                    </div>
                    <template #footer>
                        <Button label="No" icon="pi pi-times" class="p-button-text" @click="deleteCategroyDialog = false"/>
                        <Button label="Yes" icon="pi pi-check" class="p-button-text" @click="deleteCategory(temp_category.id)" />
                    </template>
                </Dialog>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState } from "vuex";
import InputText from 'primevue/inputtext';
import ToggleButton from 'primevue/togglebutton';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Button from 'primevue/button';
import Dialog from 'primevue/dialog';
import Toast from "primevue/toast";

export default {
    components: {
        InputText,
        ToggleButton,
        DataTable,
        Column,
        Button,
        Dialog,
        Toast
    },

    data() {
        return {
            host: "https://digimart.samiur.me",

            editDialog: false,
            deleteCategroyDialog: false,
            temp_category: {},

            temp_category: {
                id: null,
                name: "",
                status: null
            }
        }
    },

    computed: {
        ...mapState ({
            categories: state => state.category.category
        })
    },

    mounted() {
        this.$store.dispatch('category/get_category')
    },

    methods: {
        toggleCategoryStatus (id) {
            this.$store.dispatch('category/toggle_category_status', id).then(response => {
                console.log(response.data)
                if(response.code == 200) { 
                    this.$toast.add({severity: 'success', summary: 'Success!', detail: response.response, closable: false, life: 3000})
                }
                else {
                    this.$toast.add({severity: 'error', summary: 'Error!', detail: response.response, closable: false, life: 3000})
                }
            })
        },

        editCategory(category) {
            this.editDialog = true;
            this.temp_category = category;
        },

        hideEditDialog () {
            this.editDialog = false;
            this.$store.dispatch('category/get_category')
        },

        saveCategoryEdit () {
            console.log(this.temp_category)
            this.$store.dispatch('category/edit_category', { category: this.temp_category, id: this.temp_category.id }).then(response => {
                console.log(response.data.response)
                if(response.data.code == 200) { 
                    this.$toast.add({severity: 'success', summary: 'Success!', detail: response.data.response, closable: false, life: 3000})
                    this.hideEditDialog()
                }
                else {
                    this.$toast.add({severity: 'error', summary: 'Error!', detail: response.data.response, closable: false, life: 3000})
                }
            })
        },

        confirmDeleteCategory (category) {
            this.temp_category = category;
            this.deleteCategroyDialog = true;
        },

        deleteCategory (id) {
            this.$store.dispatch("category/delete_category", id).then(response => {
                if(response.data.code == 200) { 
                    this.$toast.add({severity: 'success', summary: 'Success!', detail:response.data.response, closable: false, life: 3000})
                    this.deleteCategroyDialog = false;
                    this.temp_category = {};
                }
                else {
                    this.$toast.add({severity: 'error', summary: 'Error!', detail: 'Something Wrong', closable: false, life: 3000})
                }
            })
        },
    }
}
</script>
