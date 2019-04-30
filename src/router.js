import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import ArchivalRecords from './views/ArchivalRecords.vue'
import ArchiveRecord from './views/ArchiveRecord.vue'
import PeopleAndCorporate from './views/PeopleAndCorporate.vue'
import PersonAndCorporateBody from './views/PersonAndCorporateBody.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/archival-records',
      name: 'Archival Records',
      component: ArchivalRecords
    },
    {
      path: '/archival-records/:id',
      name: 'Archive Record',
      component: ArchiveRecord
    },
    {
      path: '/people-and-corporate-bodies',
      name: 'People and Corporate Bodies',
      component: PeopleAndCorporate
    },
    {
      path: '/people-and-corporate-bodies/:id',
      name: 'Person and Corporate Body',
      component: PersonAndCorporateBody
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    }
  ],
  scrollBehavior () {
    return { x: 0, y: 0 }
  }
})
