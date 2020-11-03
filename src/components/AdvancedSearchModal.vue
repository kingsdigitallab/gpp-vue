<template>
    <div class="advanced-search-modal">
        <div class="modal">
            <button v-on:click="close">close</button>
        </div>
    </div>
</template>

<script>
export default {
    name: 'AdvancedSearchModal',
    data: function() {
        return {
            
        }
    },
    methods: {
        close() {
            this.$emit('close');
        }
    }
}
</script>