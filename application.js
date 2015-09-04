var express = require('express'),
    jade    = require('jade'),
    app     = express(),
    bodyParser = require('body-parser'),
    flash   = require('flash'),
    router  = express.Router(),
    session = require('session'),
    logger  = require('morgan');

var port = process.env['PORT'] || 8000;

// IMPORT ROUTES
//===============================================
app.use(require('./routes'));

// ==============================================
// MIDDLEWARES
//===============================================

app.set('view engine', 'jade');
app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/views'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({'extended':true}));
// app.use(session());
// app.use(require(flash)());

//================================================
// AUTHENTICATION
//================================================

/* To be ...*/

//*************************************************
// ERROR HANDLING
//=================================================

// 404
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// DEVELOPMENT -- STACKTRACE
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// PRODUCTION -- NO STACKTRACE
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

app.use('/', router)

// App Server
app.listen(port, function() {
  console.log("Running Water Cooler on port " + port);
});


module.exports = router;