<template>
    <div class="w-full">
        <Header />
        <ProductsView />
    </div>
</template>

<script>
import ProductsView from '../../../components/Products/View.vue'
import Header from '../../../components/Header/Header.vue'

export default {
    components: {
        ProductsView,
        Header
    }
}
</script>
