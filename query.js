/********************************************************************************/
/*										*/
/*		query.js							*/
/*										*/
/*	Code to handle queries for cd database					*/
/*										*/
/********************************************************************************/


/********************************************************************************/
/*										*/
/*	Imports 								*/
/*										*/
/********************************************************************************/

var database = require("./database.js");



/********************************************************************************/
/*										*/
/*	Query handler								*/
/*										*/
/********************************************************************************/

function handleZip(req,res)
{
   var zip = req.params.zip;
   if (zip == null) zip = req.body.zip;

   var q = "SELECT Z.* " +
	   "FROM Zips Z " +
	   "WHERE Z.zip = $1";
   database.query(q,[zip],function (e1,d1) { handleZip1(req,res,e1,d1); } );
}



function handleZip1(req,res,err,data)
{
   var zip = req.params.zip;
   if (zip == null) zip = req.body.zip;

   if (err != null || data.rows.length != 1) {
      var rdata = { title: "Invalid Zip Code",
		       error: "Invalid Zip Code: " + zip,
		       zip: zip };
      res.rener("zipresult",rdata);
    }
   else {
      var rdata = { title: "Zip Code Result",
		       zip : data.rows[0].zip,
		       valid: true,
		       city : data.rows[0].city,
		       state : data.rows[0].state,
		       tz : data.rows[0].tz,
		       dst : data.rows[0].dst,
		       lat : data.rows[0].latitude,
		       lng : data.rows[0].longitude };
      res.render('zipresult',rdata);
    }
}




/********************************************************************************/
/*										*/
/*	Exports 								*/
/*										*/
/********************************************************************************/

exports.handleZip = handleZip;




/* end of query.js */
