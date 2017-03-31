/********************************************************************************/
/*										*/
/*		config.js							*/
/*										*/
/*	Configuration parameters for sample zip code server			*/
/*										*/
/********************************************************************************/

// THIS SHOULD BE UPDATED WITH VALID USER, PASSWORD

var DB_CONNECT = 'mysql://USER:PASSWORD@localhost/zips';
var DB_CONNECT = 'mysql://spr:feast2run@eadotc.cs.brown.edu/zips';

var PORT = 18888;



/********************************************************************************/
/*										*/
/*	Exports 								*/
/*										*/
/********************************************************************************/

exports.DB_CONNECT = DB_CONNECT;
exports.PORT = PORT;


/* end of config.js */
