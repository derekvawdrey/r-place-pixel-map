const routes = require('express').Router()
const { grabMap } = require('./handler')

routes.get('/map', grabMap)

module.exports = { routes }