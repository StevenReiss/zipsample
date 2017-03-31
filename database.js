/********************************************************************************/
/*										*/
/*		database.js							*/
/*										*/
/*	Database query methods							*/
/*										*/
/********************************************************************************/



/********************************************************************************/
/*										*/
/*	Imports 								*/
/*										*/
/********************************************************************************/

var adb = require('any-db');

var config = require("./config.js");



/********************************************************************************/
/*										*/
/*	Initializations 							*/
/*										*/
/********************************************************************************/

var pool = adb.createPool(config.DB_CONNECT,{ min : 1, max : 4 });




/********************************************************************************/
/*										*/
/*	Query function								*/
/*										*/
/********************************************************************************/

function query(q,prms,next)
{
   if (prms instanceof Function) {
      next = prms;
      prms = undefined;
    }

   console.log("DATABASE:",q,prms);

   q = fixQuery(q);

   return pool.query(q,prms,callback(next));
}



function callback(next)
{
   return function(err,data) {
      // console.log("DATABASE RESULT",err,data);
      if (next != null) next(err,data);
    }
}




/********************************************************************************/
/*										*/
/*	Handle mysql - postgresql differences on parameters			*/
/*										*/
/********************************************************************************/

function fixQuery(q)
{
   if (config.DB_CONNECT.substring(0,5) == "mysql") {
      q = q.replace(/\$\d+/g,"?");
    }

   return q;
}



/********************************************************************************/
/*										*/
/*	Exports 								*/
/*										*/
/********************************************************************************/

exports.query = query;




/* end of database.js */
