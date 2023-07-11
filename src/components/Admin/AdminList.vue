<template>
    <div class="w-full flex flex-col bg-gray-100 screen-height">
        <Toast :breakpoints="{'640px': {width: '80%', right: '0'}}" />
        <div class="p-6">
            <div class="bg-white p-5 rounded-lg">
                <p class="text-left text-xl font-semibold pb-6">View Admin List</p>
                <DataTable ref="dt" :value="admins" dataKey="id" :paginator="true" :rows="5" paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown" :rowsPerPageOptions="[5,10,15]" currentPageReportTemplate="Showing {first} to {last} of {totalRecords} users" responsiveLayout="scroll">

                    <Column field="serial" header="#" style="width:5rem">
                        <template #body="{data}">
                            {{ admins.indexOf(data) + 1 }}
                        </template>
                    </Column>

                    <Column header="Name" :sortable="true" style="width:15rem">
                        <template #body="{data}">
                            <div>
                                <p>{{ data.first_name }} {{ data.last_name }}</p>
                            </div>
                        </template>
                    </Column>

                    <Column field="username" header="Username" :sortable="true" style="width:12rem"></Column>

                    <Column field="email" header="Email" :sortable="true" style="width:17rem"></Column>

                    <Column field="additional_info.phone_no" header="Phone No" :sortable="true" style="width:10rem"></Column>

                    <Column field="additional_info.gender" header="Gender" :sortable="true" style="width:8rem"></Column>

                    <Column field="additional_info.city" header="City" :sortable="true" style="width:8rem"></Column>

                    <Column field="additional_info.address" header="Address" :sortable="true" style="width:19rem"></Column>
                </DataTable>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState } from "vuex";
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';

export default {
    components: {
        DataTable,
        Column
    },

    data() {
        return {
            host: "https://digimart.samiur.me",
        }
    },

    computed: {
        ...mapState ({
            admins: state => state.login.admins
        })
    },

    mounted() {
        this.$store.dispatch('login/getAdminList')
    }
}
</script>

<style scoped>
.update-button {
    @apply my-3 py-1 px-2 bg-utm text-white rounded-md;
}
</style>