<template>
    <div>
        <Header />
        <Invoice :slug="getInvoiceId()" />
    </div>
</template>

<script>
import Invoice from '../../../components/Orders/Invoice.vue'
import Header from '../../../components/Header/Header.vue'

export default {
    components:{
        Invoice,
        Header
    },

    methods:{
        getInvoiceId(){
            return this.$route.params.id
        }
    }
}
</script>