"use strict";

process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '0';
const port = process.env.PORT || 3000
const express = require('express')
const request = require('request')

const Scrap = require('./src/scrap')

const app = express()


const headers = {
  'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/73.0.3683.103 Safari/537.36'
};
const timeout = 10000; //10 seconds 


// Router
app.use('/scrap', function (req, res) {
	res.setHeader('Content-Type', 'application/json');
	let result = {
    status: 200,
    data: {},
    message: 'Scraper NodeJS'
  }

	let url = req.query.url;

	if (url === undefined){
		result.status = 400
		result.message = "URL is undefined"
	} else {
		// REQUEST URL
		request({
			'url': url, 
			gzip: true, 
			timeout: timeout, 
			headers: headers
		}, function (err, resp, body) {
			if (resp.statusCode !== 200){
				// HANDLE ERROR INVALID URL
				result = {
					status: resp.statusCode,
					url: url,
					message: "URL is Invalid"
				}
				res.status(resp.statusCode).json(result);	
			} else {

				let scrap = Scrap(body)

				result.data = scrap
				result.message = "OK"
				res.status(result.status).json(result);	
			}
			
		})
		
	}

	
});
app.use('/', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  let result = {
    status: 200,
    message: 'Scrapper NodeJS'
  }
  res.status(200).json(result);
});


app.listen(port, '0.0.0.0');
console.log('Your server goes on localhost:' + port);