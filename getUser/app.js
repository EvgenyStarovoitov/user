var express = require('express'),
    app = express(),
    handlebars = require('express-handlebars').create({ defaultLayout:'main' }),
    bodyParser = require('body-parser'),
    url = "mongodb://localhost:27017/test",
    db = require('./public/libs/db'),
    // controllers = require('./controllers/index'), 
    urlencodedParser = bodyParser.urlencoded({extended: false}); 

app.engine('handlebars', handlebars.engine); 
app.set('view engine', 'handlebars'); 
app.set('port', process.env.PORT || 3000);

db.connect(url, function(err) {
    if (err) {
        console.log('Unable to connect to Mongo.')
          process.exit(1)
    } else {
        app.listen(app.get('port'), function() {
            console.log('Listening on port: ' +  app.get('port') + '; click ctrl+c to shutdown');
        });
    };
});

app.use(express.static(__dirname + '/public'));

app.use(bodyParser.json());

app.use(require('./controllers/index'));

app.use(function(req, res, next){
    res.status(404), res.render('404');
});

app.use(function(err, req, res, next){
    console.error(err.stack);
    res.status(500), res.render('500');
});



