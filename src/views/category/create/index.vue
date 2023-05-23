<template>
    <div class="w-full">
        <Header />
        <CategoryCreate />
    </div>
</template>

<script>
import CategoryCreate from '../../../components/Category/Create.vue'
import Header from '../../../components/Header/Header.vue'

export default {
    components: {
        CategoryCreate,
        Header
    }
}
</script>
