module.exports = file => () => import(/* webpackChunkName: '' */ 'views/' + file + '.vue')
