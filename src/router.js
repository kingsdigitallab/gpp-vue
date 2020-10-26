import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Timeline from './views/Timeline.vue'
import ArchivalRecords from './views/ArchivalRecords.vue'
import ArchiveRecord from './views/ArchiveRecord.vue'
import CollectionsSeries from './views/CollectionsSeries.vue'
import FilesItems from './views/FilesItems.vue'
import Entity from './views/Entity.vue'
import Entities from './views/Entities.vue'
import Accessibility from './views/Accessibility.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/timeline',
      name: 'timelines',
      redirect: {name: 'timeline', params: {subpage: 'early-georgians'}},
    },
    {
      path: '/timeline/:subpage',
      name: 'timeline',
      component: Timeline
    },
    {
      path: '/archival-records',
      name: 'archival-records',
      component: ArchivalRecords
    },
    {
      path: '/archival-records/:id',
      name: 'archival-record',
      component: ArchiveRecord
    },
    {
      path: '/archival-records/collections-series/:id',
      name: 'collections-series',
      component: CollectionsSeries
    },
    {
      path: '/archival-records/files-items/:id',
      name: 'files-items',
      component: FilesItems
    },
    {
      path: '/people-and-corporate-bodies',
      name: 'entities',
      component: Entities
    },
    {
      path: '/people-and-corporate-bodies/:id',
      name: 'entity',
      component: Entity
    },
    {
      path: '/accessibility-statement',
      name: 'Accessibility',
      component: Accessibility
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    },
  ],
  scrollBehavior () {
    return { x: 0, y: 0 }
  }
})
