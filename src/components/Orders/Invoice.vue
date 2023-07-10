<template>
    <div class="w-full flex flex-col py-4 sm:py-8 md:py-16 px-4 sm:px-10 md:px-12 lg:px-24 xl:px-48">
        <div class="w-full flex justify-end">
            <Button v-print="printObj" label="Print" icon="pi pi-print" /><div id="loading" v-show="printLoading"></div>
        </div>

        <div id="printInvoice">
            <div class="bg-white shadow-md mt-6">
                <div class="p-4">
                    <img src="../../assets/logo.png" class="h-24" alt="logo" />
                </div>
                <div class="px-8 flex justify-between">
                    
                    <!-- Logo & Shop Details -->
                    <div class="w-72 text-left">
                        <p class="text-xl pb-2 text-black">UTM - Digimart</p>
                        <p class="text-sm text-primary">Belakang Parkir Bus UTM JHB UTM, 81310 Johor Bahru, Johor</p>
                        <div class="flex pt-2 gap-2 text-sm">
                            <p>Issue Date:</p>
                            <p class="text-utm">{{ new Date().toDateString() }}</p>
                        </div>
                    </div>
                    <div class="text-left text-black w-96 text-sm pl-10">
                        <div class="flex">
                            <p class="w-24">Invoice To:</p>
                            <p v-if="invoiceItem.user" class="text-primary">{{ invoiceItem.user.first_name }} {{ invoiceItem.user.last_name }}</p>
                        </div>
                        <div class="flex pt-1">
                            <p class="w-24">Phone No:</p>
                            <p v-if="invoiceItem.user" class="text-primary">{{ invoiceItem.user.additional_info.phone_no }}</p>
                        </div>
                        <div class="flex pt-1">
                            <p class="w-24">Email:</p>
                            <p v-if="invoiceItem.user" class="text-primary">{{ invoiceItem.user.email }}</p>
                        </div>
                        <div class="flex pt-1">
                            <p class="w-24">Address:</p>
                            <p v-if="invoiceItem.user" class="text-primary">{{ invoiceItem.user.additional_info.address }}, {{ invoiceItem.user.additional_info.city }}</p>
                        </div>
                    </div>
                </div>

                <div class="bg-gray-200">
                    <!-- Invoice -->
                    <div class="w-full flex justify-center mt-6 bg-gray-100 py-6">
                        <p class="text-xl lg:text-3xl font-semibold text-black">INVOICE</p>
                    </div>

                    <!-- Checkout List -->
                    <div class="px-8 mb-8" v-if="invoiceItem.orderitem_set">
                        <DataTable :value="invoiceItem.orderitem_set" stripedRows responsiveLayout="scroll">
                            <Column header="PRODUCT" style="width: 43%;">
                                <template #body="slotProps">
                                    <p>{{slotProps.data.product.name}}</p> 
                                </template>
                            </Column>
                            <Column header="PRICE" style="width: 18%;">
                                <template #body="slotProps">
                                    <div>
                                        <p>RM {{slotProps.data.product.sell_price}}</p>
                                    </div>
                                </template>
                            </Column>
                            <Column header="QUANTITY" style="width: 18%;">
                                <template #body="slotProps">
                                    <div v-if="slotProps.data">
                                        <p>1</p>
                                    </div>
                                </template>
                            </Column>
                            <Column header="TOTAL" style="width: 18%;">
                                <template #body="slotProps">
                                    <div>
                                        <p>RM {{ slotProps.data.product.sell_price }}</p>
                                    </div>
                                </template>
                            </Column>
                        </DataTable> 
                    </div>


                    <div class="flex justify-end px-8 pb-6 mb-6">
                        <div class="flex justify-between p-4 bg-primary w-64 text-lgs font-semibold text-white">
                            <p>Grand Total</p>
                            <p>RM {{ invoiceItem.total_price }}</p>
                        </div>
                    </div>
                </div>

                <!-- Invoice Footer -->
                <div class="w-full flex items-center bg-gray-200 px-8">
                    <div class="w-1/3 flex justify-center items-center p-4 text-left text-md text-primary">
                        <i class="pi pi-map-marker mr-3 text-primary"></i>
                        <p class="w-56 text-xs md:text-sm lg:text-md">Belakang Parkir Bus UTM JHB UTM, 81310 Johor Bahru, Johor</p>
                    </div>
                    <div class="w-1/3"></div>
                    <div class="w-1/3 flex flex-col p-4">
                        <div class="flex items-center">
                            <i class="pi pi-phone mr-3 text-primary"></i>
                            <div class="text-left text-xs md:text-sm lg:text-md text-primary">
                                <p>06-745 3534</p>
                            </div>
                        </div>
                        <div class="flex items-center pt-0.5">
                            <i class="pi pi-envelope mr-3 text-primary"></i>
                            <div class="text-left text-xs md:text-sm lg:text-md text-primary">
                                <p>digimart@gmail.com</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState } from "vuex";
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Toast from "primevue/toast";
import Button from "primevue/button";

export default {
    props: ['slug'],

    data() {
        return {
            invoiceItem: {},
            printLoading: true,
            printObj: {
              id: "printInvoice",
              popTitle: 'UTM - DigiMart',
              extraCss: "https://cdn.bootcdn.net/ajax/libs/animate.css/4.1.1/animate.compat.css, https://cdn.bootcdn.net/ajax/libs/hover.css/2.3.1/css/hover-min.css",
              previewBeforeOpenCallback (vue) {
                // console.log('正在加载预览窗口')
              },
              previewOpenCallback (vue) {
                // console.log('已经加载完预览窗口')
              },
              beforeOpenCallback (vue) {
                vue.printLoading = true
                // console.log('打开之前')
              },
              openCallback (vue) {
                vue.printLoading = false
                // console.log('执行了打印')
              },
              closeCallback (vue) {
                // console.log('关闭了打印工具')
              }
            }
        }
    },

    components: {
        DataTable,
        Column,
        Toast,
        Button
    },

    computed: {
        ...mapState({
            invoice: state => state.orders.invoice
        })
    },

    watch: {
        invoice (newValue, oldValue){
            this.invoiceItem = this.invoice;
        }
    },

    created() {
        this.$store.dispatch('orders/getInvoice', this.slug);
        this.invoiceItem = this.invoice;
    },

    methods: {
        // print () {
        //     window.print();
        // }
    }
}
</script>

<style scoped></style>