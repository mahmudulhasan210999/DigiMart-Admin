<template>
    <div class="w-full flex flex-col bg-gray-100 screen-height">
        <Toast :breakpoints="{'640px': {width: '80%', right: '0'}}" />
        <div class="p-6">
            <div class="bg-white p-5 rounded-lg">
                <p class="text-left text-xl font-semibold pb-6">View Orders</p>
                <DataTable ref="dt" :value="orders" dataKey="id" :paginator="true" :rows="5" paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown" :rowsPerPageOptions="[5,10,15]" currentPageReportTemplate="Showing {first} to {last} of {totalRecords} orders" responsiveLayout="scroll">

                    <Column field="serial" header="#" style="width:5rem">
                        <template #body="{data}">
                            {{ orders.indexOf(data) + 1 }}
                        </template>
                    </Column>

                    <Column header="Customer" :sortable="true" style="width:19rem">
                        <template #body="{data}">
                            <div class="flex flex-col">
                                <p>{{ data.user.first_name }} {{ data.user.last_name }}</p>
                                <button class="update-button w-28" @click="getCustomerDetails(data.user)">View Details</button>
                            </div>
                        </template>
                    </Column>

                    <Column header="Date" :sortable="true" style="width:13rem">
                        <template #body="{data}">
                            <p>{{ getDateFormat(data.created_at) }}</p>
                        </template>
                    </Column>

                    <Column :exportable="false" header="Product" :sortable="true" style="width:17rem">
                        <template #body="{data}">
                            <button class="update-button" @click="getProductList(data.orderitem_set)">View Products</button>
                        </template>
                    </Column>

                    <Column header="Total" :sortable="true" style="width:15rem">
                        <template #body="{data}">
                            <p>RM {{ data.total_price }}</p>
                        </template>
                    </Column>

                    <Column :exportable="false" header="Order Status" style="width:12rem">
                        <template #body="{data}">
                            <div @click="updateStatus(data)">
                                <p v-if="data.order_status == 'PENDING'" class="cursor-pointer py-1 px-2 text-center border border-yellow-500 bg-yellow-500 text-white rounded-md">{{data.order_status}}</p>
                                <p v-if="data.order_status == 'REJECTED'" class="cursor-pointer py-1 px-2 text-center border border-red-500 bg-red-500 text-white rounded-md">{{data.order_status}}</p>
                                <p v-if="data.order_status == 'APPROVED'" class="cursor-pointer py-1 px-2 text-center border border-blue-500 bg-blue-500 text-white rounded-md">{{data.order_status}}</p>
                            </div>
                        </template>
                    </Column>

                    <Column :exportable="false" header="Delivery Status" style="width:12rem">
                        <template #body="{data}">
                            <div @click="updateStatus(data)">
                                <p v-if="data.delivery_status == 'PENDING'" class="cursor-pointer py-1 px-2 text-center border border-yellow-500 bg-yellow-500 text-white rounded-md">{{data.delivery_status}}</p>
                                <p v-if="data.delivery_status == 'DISMISSED'" class="cursor-pointer py-1 px-2 text-center border border-red-500 bg-red-500 text-white rounded-md">{{data.delivery_status}}</p>
                                <p v-if="data.delivery_status == 'DELIVERED'" class="cursor-pointer py-1 px-2 text-center border border-blue-500 bg-blue-500 text-white rounded-md">{{data.delivery_status}}</p>
                                <p v-if="data.delivery_status == 'OUT-FOR-DELIVERY'" class="cursor-pointer py-1 px-2 text-center border border-utm bg-utm text-white rounded-md">{{data.delivery_status}}</p>
                            </div>
                        </template>
                    </Column>

                    <!-- <Column header="Actions" :exportable="false" style="min-width:8rem">
                        <template #body="slotProps">
                            <div class="flex">
                                <Button icon="pi pi-trash" class="p-button-rounded p-button-danger" @click="confirmDeleteOrder(slotProps.data)" />
                            </div>
                        </template>
                    </Column> -->
                </DataTable>
            </div>

            <!-- Product Dialog -->
            <Dialog v-model:visible="product_dialog" :style="{width: '720px'}" header="Ordered Products" :modal="true">
                <div>
                    <DataTable ref="dt" :value="product_list" dataKey="id" :paginator="true" :rows="5" paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown" :rowsPerPageOptions="[5,10,15]" currentPageReportTemplate="Showing {first} to {last} of {totalRecords} products" responsiveLayout="scroll">
                        <Column field="serial" header="#" style="width:3rem">
                            <template #body="{data}">
                                {{ product_list.indexOf(data) + 1 }}
                            </template>
                        </Column>

                        <Column header="Product" :sortable="true" style="width:12rem">
                            <template #body="{data}">
                                <p>{{ data.product.name }}</p>
                            </template>
                        </Column>

                        <Column header="Product ID" :sortable="true" style="width:10rem">
                            <template #body="{data}">
                                <p>{{ data.product.pid }}</p>
                            </template>
                        </Column>

                        <Column header="Price" :sortable="true" style="width:8rem">
                            <template #body="{data}">
                                <p>{{ data.product.sell_price }}</p>
                            </template>
                        </Column>

                    </DataTable>
                </div>
            </Dialog>

            <!-- Customer Dialog -->
            <Dialog v-model:visible="customer_dialog" :style="{width: '520px'}" header="Customer Details" :modal="true">
                <div class="w-full flex flex-col">
                   <div class="flex pb-4">
                        <p class="w-28">Name:</p>
                        <p class="font-semibold">{{ customer_details.first_name }} {{ customer_details.last_name }}</p>
                   </div>
                   <div class="flex pb-4">
                        <p class="w-28">Phone No:</p>
                        <p class="font-semibold">{{ customer_details.additional_info.phone_no }}</p>
                   </div>
                   <div class="flex pb-4">
                        <p class="w-28">Email:</p>
                        <p class="font-semibold">{{ customer_details.email }}</p>
                   </div>
                   <div class="flex pb-4">
                        <p class="w-28">Address:</p>
                        <p class="font-semibold">{{ customer_details.additional_info.address }}, <br/> City: {{ customer_details.additional_info.city }}</p>
                   </div>
                </div>
            </Dialog>

            <!-- Status Dialog -->
            <Dialog v-model:visible="statusDialog" :style="{width: '450px'}" header="Update Status" :modal="true">
                <div>
                    <div class="w-full">
                        <p class="pb-1 text-gray-500">Order Status</p>
                        <vSelect 
                            class="text-gray-500"
                            :options="order_statuses"
                            :reduce="(label) => label.value" 
                            label="label" 
                            v-model="order_status"
                            placeholder="Select"
                        >
                        </vSelect>
                        <div class="flex w-full justify-center">
                            <button class="update-button" @click="updateOrderStatus()">Update Order Status</button>
                        </div>
                    </div>
                    <div class="w-full mt-5">
                        <p class="pb-1 text-gray-500">Delivery Status</p>
                        <vSelect 
                            class="text-gray-500"
                            :options="delivery_statuses"
                            :reduce="(label) => label.value" 
                            label="label" 
                            v-model="delivery_status"
                            placeholder="Select"
                        >
                        </vSelect>
                        <div class="flex w-full justify-center mb-12">
                            <button class="update-button" @click="updateDeliveryStatus()">Update Delivery Status</button>
                        </div>
                    </div>
                </div>
            </Dialog>

            <!-- <Dialog v-model:visible="deleteOrderDialog" :style="{width: '450px'}" header="Confirm" :modal="true">
                <div class="confirmation-content">
                    <i class="pi pi-exclamation-triangle mr-3 text-red-700" style="font-size: 2rem" />
                    <span v-if="temp_order">Are you sure you want to delete <b>{{ temp_order.name }}</b>?</span>
                </div>
                <template #footer>
                    <Button label="No" icon="pi pi-times" class="p-button-text" @click="deleteOrderDialog = false" />
                    <Button label="Yes" icon="pi pi-check" class="p-button-text" @click="deleteOrder(temp_order.pid)" />
                </template>
            </Dialog> -->
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
import moment from 'moment';
import vSelect from 'vue-select';
import 'vue-select/dist/vue-select.css';

export default {
    components: {
        DataTable,
        Column,
        Button,
        Dialog,
        Toast,
        vSelect
    },

    data() {
        return {
            host: "https://digimart.samiur.me",

            // deleteOrderDialog: false,
            // temp_order: {},

            statusDialog: false,
            submitted: false,
            product_list: null,
            product_dialog: false,
            customer_details: null,
            customer_dialog: false,
            order_id: null,
            order_status: null,
            order_statuses: [
                {
                    label: 'PENDING',
                    value: 'PENDING'
                },
                {
                    label: 'APPROVED',
                    value: 'APPROVED'
                },
                {
                    label: 'REJECTED',
                    value: 'REJECTED'
                }
            ],
            
            delivery_status: null,
            delivery_statuses: [
                {
                    label: 'PENDING',
                    value: 'PENDING'
                },
                {
                    label: 'DELIVERED',
                    value: 'DELIVERED'
                },
                {
                    label: 'DISMISSED',
                    value: 'DISMISSED'
                },
                {
                    label: 'OUT-FOR-DELIVERY',
                    value: 'OUT-FOR-DELIVERY'
                },
            ]
        }
    },

    computed: {
        ...mapState ({
            orders: state => state.orders.orders
        })
    },

    mounted() {
        this.$store.dispatch('orders/get_orders')
    },

    methods: {
        getDateFormat(date) {
            return moment(date).format('LL')
        },

        updateStatus(status) {
            this.submitted = false
            this.statusDialog = true
            this.order_id = status.id
            this.order_status = status.order_status
            this.delivery_status = status.delivery_status
        },

        updateOrderStatus () {
            this.submitted = true
            this.$store.dispatch('orders/toggle_order_status', {status:this.order_status, id:this.order_id}).then(response => {
                console.log(response.data)
                if(response.data.code == 200) { 
                    this.$toast.add({severity: 'success', summary: 'Success!', detail: response.data.response, closable: false, life: 3000})
                    this.submitted = false
                    this.statusDialog = false
                    this.order_status = null
                    this.order_id = null
                }
                else {
                    this.$toast.add({severity: 'error', summary: 'Error!', detail: response.data.response, closable: false, life: 3000})
                }
            })
        },

        updateDeliveryStatus () {
            this.submitted = true
            this.$store.dispatch('orders/toggle_delivery_status', {status:this.delivery_status, id:this.order_id}).then(response => {
                console.log(response.data)
                if(response.data.code == 200) { 
                    this.$toast.add({severity: 'success', summary: 'Success!', detail: response.data.response, closable: false, life: 3000})
                    this.statusDialog = false
                    this.submitted = false
                    this.delivery_status = null
                    this.order_id = null
                }
                else {
                    this.$toast.add({severity: 'error', summary: 'Error!', detail: response.data.response, closable: false, life: 3000})
                }
            })
        },

        getProductList(product) {
            this.product_list = product
            this.product_dialog = true
        },

        getCustomerDetails(customer) {
            this.customer_details = customer
            this.customer_dialog = true
        }

        // confirmDeleteOrder (order) {
        //     this.temp_order = order;
        //     this.deleteOrderDialog = true;
        // },

        // deleteOrder (id) { 
        //     this.$store.dispatch("orders/delete_product", id).then(response => {
        //         if(response.data.code == 200) {
        //             this.$toast.add({severity: 'success', summary: 'Success!', detail:response.data.response, closable: false, life: 3000})
        //             this.deleteOrderDialog = false;
        //             this.temp_order = {};
        //         } else {
        //             this.$toast.add({severity: 'error', summary: 'Error!', detail: 'Something Wrong', closable: false, life: 3000})
        //         }
        //     })
        // }
    }
}
</script>

<style scoped>
.update-button {
    @apply my-3 py-1 px-2 bg-utm text-white rounded-md;
}
</style>
