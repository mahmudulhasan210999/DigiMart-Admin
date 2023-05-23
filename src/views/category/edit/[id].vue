<template>
    <div>
        <Header />
        <CategoryEdit :slug="getEditCategory()" />
    </div>
</template>
<script>
import CategoryEdit from '../../../components/Category/Edit.vue'
import Header from '../../../components/Header/Header.vue'

export default {
    components:{
        CategoryEdit,
        Header
    },
    methods:{
        getEditCategory(){
            return this.$route.params.id 
        }
    }
}
</script>