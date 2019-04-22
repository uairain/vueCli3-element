import Vue from 'vue'
import Router from 'vue-router'

/* layout */
import Layout from '../views/layout/Layout'
// const _import = require('./_import_' + process.env.NODE_ENV)
// in development env not use Lazy Loading,because Lazy Loading large page will cause webpack hot update too slow.so only in production use Lazy Loading
Vue.use(Router)
// 登录
const login = () => import(/* webpackChunkName: 'login' */ 'views/login/index')

const authredirect = () => import(/* webpackChunkName: 'authredirect' */ 'views/login/authredirect')

const error404 = () => import(/* webpackChunkName: 'error404' */ 'views/error/404')

const error401 = () => import(/* webpackChunkName: 'error401' */ 'views/error/401')

const dashboard = () => import(/* webpackChunkName: 'dashboard' */ 'views/dashboard/index')
const introduction = () => import(/* webpackChunkName: 'introduction' */ 'views/introduction/index')
/**
 * icon : the icon show in the sidebar
 * hidden : if `hidden:true` will not show in the sidebar
 * redirect : if `redirect:noredirect` will no redirct in the levelbar
 * noDropdown : if `noDropdown:true` will has no submenu
 * meta : { role: ['admin'] }  will control the page role
 **/

export const constantRouterMap = [{
  path: '/login',
  component: login,
  hidden: true
},
{
  path: '/authredirect',
  component: authredirect,
  hidden: true
},
{
  path: '/404',
  component: error404,
  hidden: true
},
{
  path: '/401',
  component: error401,
  hidden: true
},
{
  path: '/',
  component: Layout,
  redirect: '/dashboard',
  name: '首页',
  hidden: true,
  children: [{
    path: 'dashboard',
    component: dashboard
  }]
},
{
  path: '/introduction',
  component: Layout,
  redirect: '/introduction/index',
  icon: 'form',
  noDropdown: true,
  children: [{
    path: 'index',
    component: introduction,
    name: '简述'
  }]
}
]

export default new Router({
  mode: 'history', // 后端支持可开
  scrollBehavior: () => ({
    y: 0
  }),
  routes: constantRouterMap
})
