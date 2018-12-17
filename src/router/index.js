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
    // app
    {
      path: '/clues',
      name: 'Clues',
      component: Clues
    },
    {
      path: '/detailsGame/:gameId',
      name: 'DetailsGame',
      props: true,
      component: DetailsGame
    },
    {
      path: '/help',
      name: 'Help',
      component: Help
    },
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/info',
      name: 'Info',
      component: Info
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },    
    {
      path: '/steps/:gameId',
      name: 'Steps',
      props: true,
      component: Steps
    }
    // site
    /*
    {
      path: '/site',
      name: 'Site',
      component: Site
    } 
    */
  ]
})
