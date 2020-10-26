<template>
    <div class="hierarchy-template">
        <div class="fieldset-header">
            <button v-bind:class="['toggle-tab-button', {'active': current.is_ancestor}]" v-on:click="toggleTab($event)" aria-label="expand hierarchy" v-if="current.children.length > 0"></button>
            <span v-else></span>
            <span v-bind:class="[{'browsed-item': current.is_selected}]">
                <router-link to="" class="mgn-right">{{current.title}}</router-link> {{current.children_desc}}
            </span>
            <span class="record-details">
                <span>{{current.archival_level}}</span>
                <span>{{current.creation_dates}}</span>
            </span>
        </div>
        <div v-bind:class="['fieldset-body', {'expand': current.is_ancestor}]" v-if="current.children.length > 0">
            <div class="child-level" v-for="(child, i) in current.children" v-bind:key="i">
                <hierarchy-template v-bind:current="child"></hierarchy-template>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'HierarchyTemplate',
    props: ['current'],
    methods: {
        toggleTab: function(e) {
            e.preventDefault();
            let header = e.target.closest('.fieldset-header');
            header.nextSibling.classList.toggle('expand');
            header.querySelector('.toggle-tab-button').classList.toggle('active');
            header.querySelector('.toggle-tab-button').setAttribute('aria-expanded', String(header.querySelector('.toggle-tab-button').getAttribute('aria-expanded') !== 'true'));
        }
    }
}
</script>