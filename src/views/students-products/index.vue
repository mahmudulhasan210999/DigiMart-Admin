<template>
    <div class="w-full">
        <Header />
        <StuProducts />
    </div>
</template>

<script>
import Header from '../../components/Header/Header.vue'
import StuProducts from '../../components/Students-Products/StuProducts.vue';

export default {
    components: {
        Header,
        StuProducts
    }
}
</script>