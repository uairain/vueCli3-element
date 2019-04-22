import Layout from 'views/layout/Layout'
// const file = (src) => `views/${src}`
// 用户管理
const userManager = () => import(/* webpackChunkName: 'userManager' */ 'views/admin/user/index')
// 菜单管理
const menuManager = () => import(/* webpackChunkName: 'menuManager' */ 'views/admin/menu/index')
// 角色权限管理
const groupManager = () => import(/* webpackChunkName: 'groupManager' */ 'views/admin/group/index')
// 角色类型管理
const groupTypeManager = () => import(/* webpackChunkName: 'groupTypeManager' */ 'views/admin/groupType/index')
// 操作日志管理
const gateLogManager = () => import(/* webpackChunkName: 'gateLogManager' */ 'views/admin/gateLog/index')
// 用户管理
const serviceManager = () => import(/* webpackChunkName: 'serviceManager' */ 'views/auth/service/index')
// Eureka注册中心
const serviceEurekaManager = () => import(/* webpackChunkName: 'serviceEurekaManager' */ 'views/monitor/eureka/index')
// 服务状态监控
const serviceMonitorManager = () => import(/* webpackChunkName: 'serviceMonitorManager' */ 'views/monitor/service/index')
// 服务状态监控
const serviceZipkinManager = () => import(/* webpackChunkName: 'serviceZipkinManager' */ 'views/monitor/zipkin/index')

export const asyncRouterMap = [{
  path: '/baseManager',
  component: Layout,
  name: '基础配置管理',
  icon: 'setting',
  authority: 'baseManager',
  children: [{
    path: 'userManager',
    icon: 'fa-user',
    component: userManager,
    name: '用户管理',
    authority: 'userManager'
  }, {
    path: 'menuManager',
    icon: 'category',
    component: menuManager,
    name: '菜单管理',
    authority: 'menuManager'
  }, {
    path: 'groupManager',
    icon: 'group_fill',
    component: groupManager,
    name: '角色权限管理',
    authority: 'groupManager'
  }, {
    path: 'groupTypeManager',
    icon: 'fa-users',
    component: groupTypeManager,
    name: '角色类型管理',
    authority: 'groupTypeManager'
  }, {
    path: 'gateLogManager',
    icon: 'viewlist',
    component: gateLogManager,
    name: '操作日志管理',
    authority: 'gateLogManager'
  }]
},
{
  path: '/authManager',
  component: Layout,
  name: '基础配置管理',
  icon: 'setting',
  authority: 'authManager',
  children: [{
    path: 'serviceManager',
    component: serviceManager,
    name: '用户管理',
    authority: 'serviceManager'
  }]
},
{
  path: '/monitorManager',
  component: Layout,
  name: '监控模块管理',
  icon: 'setting',
  authority: 'monitorManager',
  children: [{
    path: 'serviceEurekaManager',
    component: serviceEurekaManager,
    name: 'Eureka注册中心',
    authority: 'serviceEurekaManager'
  }, {
    path: 'serviceMonitorManager',
    component: serviceMonitorManager,
    name: '服务状态监控',
    authority: 'serviceMonitorManager'
  }, {
    path: 'serviceZipkinManager',
    component: serviceZipkinManager,
    name: '服务状态监控',
    authority: 'serviceZipkinManager'
  }]
}]
