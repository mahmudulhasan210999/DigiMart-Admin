<template>
    <div>
        <Header />
        <ProductsEdit :slug="getEditProducts()" />
    </div>
</template>
<script>
import ProductsEdit from '../../../components/Products/Edit.vue'
import Header from '../../../components/Header/Header.vue'
export default{
    components:{
        ProductsEdit,
        Header
    },
    methods:{
        getEditProducts(){
            return this.$route.params.id
        }
    }
}
</script>