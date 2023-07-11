<template>
    <div class="w-full">
        <Header />
        <AdminList />
    </div>
</template>

<script>
import Header from '../../components/Header/Header.vue'
import AdminList from '../../components/Admin/AdminList.vue';

export default {
    components: {
        AdminList,
        Header
    }
}
</script>