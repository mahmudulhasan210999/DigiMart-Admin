<template>
    <div class="w-full">
        <Header />
        <Orders />
    </div>
</template>

<script>
import Orders from '../../components/Orders/Order.vue'
import Header from '../../components/Header/Header.vue'

export default {
    components: {
        Orders,
        Header
    }
}
</script>