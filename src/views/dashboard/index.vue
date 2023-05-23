<template>
    <div class="w-full">
        <Header />
        <Dashboard />
    </div>
</template>

<script>
import Dashboard from '../../components/Dashboard/Dashboard.vue'
import Header from '../../components/Header/Header.vue'

export default {
    components: {
        Dashboard,
        Header
    }
}
</script>
