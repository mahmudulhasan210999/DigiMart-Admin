<template>
    <div class="w-full">
        <Header />
        <CategoryView />
    </div>
</template>

<script>
import CategoryView from '../../../components/Category/View.vue'
import Header from '../../../components/Header/Header.vue'

export default {
    components: {
        CategoryView,
        Header
    }
}
</script>
