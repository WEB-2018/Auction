var q = require('q'),
    categoryRepo = require('../models/categoryRepo');

module.exports = function(req, res, next) {
    q.all([
        categoryRepo.loadAll()
    ]).spread(function(cRows) {
        res.locals.layoutVM = {
            categories: cRows
            // suppliers: []
        };
        next();
    });
}