module.exports = {
  build: {
    "index.html": "index.html",
    "app.js": [
      "javascripts/jquery.min.js",
	  "javascripts/lightwallet.js",
	  "javascripts/hooked-web3-provider.js",
	  "javascripts/app.js"
    ],
    "app.css": [
      "stylesheets/app.css"
    ],
    "images/": "images/"
  },
  rpc: {
    host: "localhost",
    port: 8545,
	gas:4712388
		
  }
};
