/********************************************************************************/
/*										*/
/*		server.js							*/
/*										*/
/*	Demonstration Node.JS server using CdQuery database			*/
/*										*/
/********************************************************************************/



/********************************************************************************/
/*										*/
/*	Imports 								*/
/*										*/
/********************************************************************************/

var express = require('express');
var query = require('./query.js');
var config = require("./config");

var bodyparser = require('body-parser');
var logger = require('morgan');
var exphbs = require('express-handlebars');
var handlebars = exphbs.create( { defaultLayout: 'main' } )



/********************************************************************************/
/*										*/
/*	Setup routing using express						*/
/*										*/
/********************************************************************************/

function setup()
{
   var app = express();

   app.engine('handlebars',handlebars.engine);
   app.set('view engine','handlebars');

   app.use(logger('combined'));

   app.use('/html',express.static(__dirname + "/html"));
   app.get('/',function (req,res) { res.redirect("/html/index.html"); } );

   app.use(bodyparser.urlencoded({ extended : false }));

   app.post('/findzip',query.handleZip);
   app.all('/showzip/:zip',query.handleZip);

   app.all('*',handle404);
   app.use(errorHandler);

   var server = app.listen(config.PORT);
   console.log("Listening on port " + config.PORT);
}



/********************************************************************************/
/*										*/
/*	Error handling								*/
/*										*/
/********************************************************************************/

function handle404(req,res)
{
   console.log("BAD REQUEST",req.url);

   res.redirect("/html/error.html");
}



function errorHandler(err,req,res,next)
{
   console.log("ERROR on request %s %s %s",req.method,req.url,err);
   console.log("STACK",err.stack);
   res.redirect("/html/error.html");
}




/********************************************************************************/
/*										*/
/*	Main program								*/
/*										*/
/********************************************************************************/

setup();



/* end of server.js */
