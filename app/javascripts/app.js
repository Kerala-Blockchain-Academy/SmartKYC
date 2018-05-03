$("#sign-up-btn").click(function() {
  
  $("#sign-up-form").show();
  $("#log-in-form").hide();
  $("#payments-form").hide();
  $("#balance-form").hide();
  $("#transaction-form").hide();
  $("#sign-up-btn").addClass("active");
  $("#log-in-btn").removeClass("active");
  $("#payments-btn").removeClass("active");
  $("#balance-btn").removeClass("active");
  $("#transaction-btn").removeClass("active");
});

$("#log-in-btn").click(function() {
  $("#sign-up-form").hide();
  $("#log-in-form").show();
  $("#payments-form").hide();
  $("#balance-form").hide();
  $("#transaction-form").hide();
  $("#sign-up-btn").removeClass("active");
  $("#log-in-btn").addClass("active");
  $("#payments-btn").removeClass("active");
  $("#balance-btn").removeClass("active");
  $("#transaction-btn").removeClass("active");
});

$("#payments-btn").click(function() {
  $("#sign-up-form").hide();
  $("#log-in-form").hide();
  $("#payments-form").show();
  $("#balance-form").hide();
  $("#transaction-form").hide();
  $("#sign-up-btn").removeClass("active");
  $("#log-in-btn").removeClass("active");
  $("#payments-btn").addClass("active");
  $("#balance-btn").removeClass("active");
  $("#transaction-btn").removeClass("active");
});

$("#balance-btn").click(function() {
  $("#sign-up-form").hide();
  $("#log-in-form").hide();
  $("#payments-form").hide();
  $("#balance-form").show();
  $("#transaction-form").hide();
  $("#sign-up-btn").removeClass("active");
  $("#log-in-btn").removeClass("active");
  $("#payments-btn").removeClass("active");
  $("#balance-btn").addClass("active");
  $("#transaction-btn").removeClass("active");
});

$("#transaction-btn").click(function() {
  $("#sign-up-form").hide();
  $("#log-in-form").hide();
  $("#payments-form").hide();
  $("#balance-form").hide();
  $("#transaction-form").show();
  $("#sign-up-btn").removeClass("active");
  $("#log-in-btn").removeClass("active");
  $("#payments-btn").removeClass("active");
  $("#balance-btn").removeClass("active");
  $("#transaction-btn").addClass("active");
});

var accounts;
var account;
var address1;

function setStatus(message) {
  var status = document.getElementById("status");
  status.innerHTML = message;
};

function refreshBalance(address1,address) {
  var meta = MetaCoin.at("0x9e054b299b757509d9c3d66b8e8d3a644fd662d2");
	console.log(address);
  meta.getBalance.call(address, {from: account}).then(function(value) {
    var balance_element = document.getElementById("balance");
    var from_address = document.getElementById("SenderBalance");
    from_address.innerHTML = address1; 
    balance_element.innerHTML = value.valueOf();
  }).catch(function(e) {
    console.log(e);
    setStatus("Error getting balance; see log.");
  });
};

function refresh() {
  var meta = MetaCoin.at("0x9e054b299b757509d9c3d66b8e8d3a644fd662d2");
	
  var sender = parseInt(document.getElementById("SenderBalance").value);
    meta.getBalance.call(sender, {from: account}).then(function(value) {
    var balance_element = document.getElementById("balance");
    console.log("balance is");
    balance_element.innerHTML = value.valueOf();
  }).catch(function(e) {
    console.log(e);
    setStatus("Error getting balance; see log.");
  });
};


function getBalance(address) {
	return web3.fromWei(web3.eth.getBalance(address).toNumber(), 'ether');
}

// switch to hooked3webprovider which allows for external Tx signing
// (rather than signing from a wallet in the Ethereum client)
function switchToHooked3(_keystore) {

	console.log("switchToHooked3");

	var web3Provider = new HookedWeb3Provider({
	  host: "http://localhost:8545", // check what using in truffle.js
	  transaction_signer: _keystore
	});

	web3.setProvider(web3Provider);
}

function fundEth(newAddress, amt) {

	console.log("fundEth");

	var fromAddr = accounts[0]; // default owner address of client
	var toAddr = newAddress;
	var valueEth = amt;
	var value = parseFloat(valueEth)*1.0e18;
	var gasPrice = 1000000000000;
	var gas = 50000;
	web3.eth.sendTransaction({from: fromAddr, to: toAddr, value: value, gas: 500000}, function (err, txhash) {
	  if (err) console.log('ERROR: ' + err)
	  console.log('txhash: ' + txhash + " (" + amt + " in ETH sent)");
	//	$("#balance").html(getBalance(toAddr));
	console.log(getBalance(address1));
	});
}

function Web3SendEth(newAddress, amt) {

	console.log("Send Transaction");

	var fromAddr = address1; //  address of client
	var toAddr = newAddress;
	var valueEth = amt;
	var value = parseFloat(valueEth)*1.0e18;
	var gasPrice = 1000000000000;
	var gas = 50000;
	web3.eth.sendTransaction({from: fromAddr, to: toAddr, value: value, gas:500000}, function (err, txhash) {
	  if (err) console.log('ERROR: ' + err)
	  console.log('txhash: ' + txhash + " (" + amt + " in ETH sent)");
	//	$("#balance").html(getBalance(toAddr));
	console.log(getBalance(toAddr));
	});

}

//create Wallet
function RegisterUser() {
	
    var metaset = KYCregister.deployed();
	var meta = MetaCoin.at("0x9e054b299b757509d9c3d66b8e8d3a644fd662d2");
	var email = document.getElementById('email').value;
    var firstname = document.getElementById('first-name').value;
    var middlename = document.getElementById('middle-name').value;
	var lastname = document.getElementById('last-name').value;
    var upassword = document.getElementById('Upassword').value;
	var dob = document.getElementById('dob').value;
	var gender;
	var country;
	var aadhar = document.getElementById('aadhar').value;
	if (document.getElementById('g1').checked) {
    gender = document.getElementById('g1').value;
    }
	else if(document.getElementById('g2').checked) {
    gender = document.getElementById('g2').value;
    }
	else if(document.getElementById('g3').checked) {
    gender = document.getElementById('g3').value;
    }
	
	if (document.getElementById('c1').checked) {
    country = document.getElementById('c1').value;
    }else if(document.getElementById('c2').checked) {
    country = document.getElementById('c2').value;
    }
	
	console.log(country);
	console.log(gender);
	console.log("Initiating transaction... (please wait)");
  
	var msgResult;
	console.log("inside function");
	
	var secretSeed = lightwallet.keystore.generateRandomSeed();
		

	lightwallet.keystore.deriveKeyFromPassword(upassword, function (err, pwDerivedKey) {

		console.log("createWallet");
		
		console.log(secretSeed);
	
		var keystore = new lightwallet.keystore(secretSeed, pwDerivedKey);
		
		keystore.generateNewAddress(pwDerivedKey);
		// generate one new address/private key pairs
		// the corresponding private keys are also encrypted
		var address = keystore.getAddresses()[0];

		var privateKey = keystore.exportPrivateKey(address, pwDerivedKey);
		address1 = address;
		metaset.RegisterUserDetails(parseInt(address), email, firstname, middlename, lastname, upassword, dob, gender,country,aadhar, {from: account,gas:800000}).then(function() {
		console.log("registration done");
		console.log("Transaction complete!");
     
		}).catch(function(e) {
		console.log(e);
		setStatus("Error registering user; see log.");
  });

		/* $("#wallet").html("0x"+address);
		$("#privateKey").html(privateKey);
		$("#balance").html(getBalance(address));
		*/
		
		console.log(address);
		console.log(privateKey);
		console.log(getBalance(address));
		// Now set ks as transaction_signer in the hooked web3 provider
		// and you can start using web3 using the keys/addresses in ks!

		switchToHooked3(keystore);
		var lightwalletaddr = document.getElementById("lightwalletaddr");
		lightwalletaddr.innerHTML = address;
		
		meta.fundaddr(parseInt(address), {from: account,gas:200000}).then(function() {
		console.log("account funded");
		console.log("Transaction complete!");
     
		}).catch(function(e) {
		console.log(e);
		setStatus("Error funding user; see log.");
  });


	});
	
// var address1 = keystore.getAddresses()[0];
//	console.log(address1);
	
 
};

function GetUserDetails() {
	
	
  
	var meta = KYCregister.deployed();
	var userid = document.getElementById("userlogid").value;
	var userid1 = parseInt(document.getElementById("userlogid").value);
	var lpassword = document.getElementById("lpassword").value;
	setStatus("Initiating transaction... (please wait)");
	
     console.log(userid);
  meta.getUserDetails.call( userid1, {from: account}).then(function(value) {
	// var res0 = web3.toAscii(value[0].valueOf());
	  var res1 = web3.toAscii(value[1].valueOf());
	  var res2 = web3.toAscii(value[2].valueOf());
	  var res3 = web3.toAscii(value[3].valueOf());
	  var res4 = web3.toAscii(value[4].valueOf());
    console.log("Gettting UserDetails");
	//console.log(res0);
	console.log(res1);
	console.log(res2);
	console.log(res3);
	console.log(res4);
	console.log("outside");
	console.log(lpassword);
	var pass = String(lpassword);
	var res = String(res4);
	console.log(pass);
	console.log(res);
	refreshBalance(userid,userid1);
	if (pass.localeCompare(res)==0){
	$("#sign-up-form").hide();
	$("#log-in-form").hide();
	$("#payments-form").hide();
	$("#balance-form").show();
	$("#transaction-form").hide();
	$("#sign-up-btn").removeClass("active");
	$("#log-in-btn").removeClass("active");
	$("#payments-btn").removeClass("active");
	$("#balance-btn").addClass("active");
	$("#transaction-btn").removeClass("active");
	console.log("inside");
	}
		
	
	setStatus("Transaction complete!");
    
  }).catch(function(e) {
    console.log(e);
    setStatus("Error registering user; see log.");
  });
    
};



function sendCoin() {
	
	var meta = MetaCoin.at("0x9e054b299b757509d9c3d66b8e8d3a644fd662d2");
	var sender = parseInt(document.getElementById("SenderBalance").value);
	var amount = parseInt(document.getElementById("amount").value);
	var receiver = parseInt(document.getElementById("receiver").value);
	var transactions = document.getElementById("trans");
    
  setStatus("Initiating transaction... (please wait)");
  meta.sendCoin(receiver, amount, sender, {from: account,gas:300000}).then(function(values) {
    setStatus("Transaction complete!");
  
  
  }).catch(function(e) {
    console.log(e);
    setStatus("Error sending coin; see log.");
  });
  
 // fundEth(address1,amount+100);
 // Web3SendEth(receiver,amount);
 
  
  meta.set(receiver, amount, {from: account,gas:300000}).then(function(value) {
    setStatus("Transaction complete!");
    getTransactions();
	  
  }).catch(function(e) {
    console.log(e);
    setStatus("Error sending coin; see log.");
  });
	
	
	setTimeout(function(){
		
			refresh();
						  
		}, 8000);
		
	


};


function getTransactions() {
	
  var meta = MetaCoin.at("0x9e054b299b757509d9c3d66b8e8d3a644fd662d2");
  
  var receiver;
  var amount;
  var entry = document.createElement('li');
  var transactions = document.getElementById("trans");
  var concat;
    meta.getTransactionReceiver.call({from: account}).then(function(value1) {
		receiver = String(value1.valueOf());
		console.log(value1.valueOf());
	//	console.log(receiver);
	concat = "Receiver: "+ receiver + "\n";	
    setStatus("Transaction complete!");
	entry.appendChild(document.createTextNode(concat));
    
    transactions.appendChild(entry);
  
  }).catch(function(e) {
    console.log(e);
    setStatus("Error sending coin; see log.");
  });
  
    meta.getTransactionAmount.call({from: account}).then(function(value2) {
	   amount = String(value2.valueOf());
	   console.log(value2.valueOf());
//	   console.log(amount);
	   concat = "Amount: " + amount + "\n" ;
	   entry.appendChild(document.createTextNode(concat));
    
    transactions.appendChild(entry);
    setStatus("Transaction complete!");
  
  }).catch(function(e) {
    console.log(e);
    setStatus("Error sending coin; see log.");
  });
  
  	
 
	
};


window.onload = function() {
	
  $("#sign-up-form").show();
  $("#log-in-form").hide();
  $("#payments-form").hide();
  $("#balance-form").hide();
  $("#transaction-form").hide();
  $("#sign-up-btn").addClass("active");
  $("#log-in-btn").removeClass("active");
  $("#payments-btn").removeClass("active");
  $("#balance-btn").removeClass("active");
  $("#transaction-btn").removeClass("active");
  
  web3.eth.getAccounts(function(err, accs) {
    if (err != null) {
      alert("There was an error fetching your accounts.");
      return;
    }

    if (accs.length == 0) {
      alert("Couldn't get any accounts! Make sure your Ethereum client is configured correctly.");
      return;
    }

    accounts = accs;
    account = accounts[0];
	
	//refreshBalance();
	
  });
}
