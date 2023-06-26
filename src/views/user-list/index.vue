<template>
    <div class="w-full">
        <Header />
        <UserList />
    </div>
</template>

<script>
import Header from '../../components/Header/Header.vue'
import UserList from '../../components/User/UserList.vue';

export default {
    components: {
        UserList,
        Header
    }
}
</script>