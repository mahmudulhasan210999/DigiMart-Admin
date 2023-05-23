<template>
    <div class="w-full">
        <Header />
        <ProductsCreate />
    </div>
</template>

<script>
import ProductsCreate from '../../../components/Products/Create.vue'
import Header from '../../../components/Header/Header.vue'

export default {
    components: {
        ProductsCreate,
        Header
    }
}
</script>
