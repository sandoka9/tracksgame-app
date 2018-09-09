/* eslint-disable */
import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import Home from '@/components/Home'
import DetailsGame from '@/components/DetailsGame'
import Help from '@/components/Help'
import Info from '@/components/Info'
import Clues from '@/components/Clues'
import Steps from '@/components/Steps'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/detailsGame/:gameId',
      name: 'DetailsGame',
      props: true,
      component: DetailsGame
    },
    {
      path: '/steps/:gameId',
      name: 'Steps',
      props: true,
      component: Steps
    },
    {
      path: '/clues',
      name: 'Clues',
      component: Clues
    },
    {
      path: '/help',
      name: 'Help',
      component: Help
    },
    {
      path: '/info',
      name: 'Info',
      component: Info
    }
  ]
})
