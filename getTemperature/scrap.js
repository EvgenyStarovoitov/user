let http = require('http'),
  	cheerio = require('cheerio'),
    resolve = require('url').resolve,
    request = require('request'),
	  urlArr = "http://meteoinfo.by/meteoarh/?city=%CC%EE%E3%E8%EB%E5%E2";

let q = function(url, callback){
	request(url , function (err, res, resHTML) {
		let temper = [],	     
			$ = cheerio.load(resHTML);
			if (err) throw err;
	    	if (res.statusCode == 302) {
	        	console.log('page ' + ' not founded or removed');
	        };
	        if (res.statusCode == 200) {
	        	console.log('Page ' + ' was founded');
	        };	      		
      // console.log($('#content #ar tbody tr').eq(1).html());
      // console.log($('#content #ar tbody tr').eq(16).html());
			$('#content #ar tbody tr').eq(16).children('.meteo').each(function(index, elem) {
        temper[index] =  parseFloat( $(elem).text())
      });	
      temper.join(', ');
      console.log(temper)
      let result = temper.reduce(function(sum, current) {
        return sum + current;
      }, 0)/temper.length;
      console.log(result)
 	});       
}; 

q(urlArr);


