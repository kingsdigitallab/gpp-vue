import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import ArchivalRecords from './views/ArchivalRecords.vue'
import ArchiveRecord from './views/ArchiveRecord.vue'
import PeopleAndCorporate from './views/PeopleAndCorporate.vue'
import PersonAndCorporateBody from './views/PersonAndCorporateBody.vue'
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
      path: '/people-and-corporate-bodies',
      name: 'entities',
      component: PeopleAndCorporate
    },
    {
      path: '/people-and-corporate-bodies/:id',
      name: 'entity',
      component: PersonAndCorporateBody
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
