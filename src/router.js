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
import SearchResults from './views/SearchResults.vue'

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
      path: '/search',
      name: 'search-results',
      component: SearchResults
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
  // scrollBehavior () {
  //   // TODO update scroll behaviour on the archival records and people and corporate bodies list
  //   return { x: 0, y: 0 }
  // }
  scrollBehavior (to, from, savedPosition) {
    // savedPosition is only available for popstate navigations.
    if (savedPosition) return savedPosition

    // if the returned position is falsy or an empty object,
    // will retain current scroll position.
    if (to.params.savePosition) return {}

    // scroll to anchor by returning the selector
    if (to.hash) {
      let position = {selector: to.hash}

      // specify offset of the element
      // if (to.hash === '#anchor2') {
      //   position.offset = { y: 100 }
      // }
      return position
    }
  }
})
