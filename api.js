var crypto=require("crypto");
var fs=require('fs');
MurmurHash3 = require('./imurmurhash');
var express=require("express");
var app=express();
const {Storage}=require('@google-cloud/storage');
var server=require("http").createServer(app);
var os=require("os");
var bodyParser = require('body-parser');
var XMLHttpRequest=require("xmlhttprequest").XMLHttpRequest;
var rp = require('request-promise');
var fs = require('fs') 
var limit=0;
var arr = {};
const PORT=process.env.PORT || 4000;

const storage=new Storage(
	{
		projectId:"geyser-74ddf",
		keyFilename:"geyser-74ddf-firebase-adminsdk-wooqq-a05e3465e3.json"
	});
const bucket=storage.bucket("geyser-74ddf.appspot.com");


var firebase=require("firebase");
require("firebase/firestore");
var firebaseConfig = {
    apiKey: "AIzaSyDibg-oYRpVXU9HqCAOLdxIpYXcZUPpAGM",
    authDomain: "geyser-74ddf.firebaseapp.com",
    databaseURL: "https://geyser-74ddf.firebaseio.com",
    projectId: "geyser-74ddf",
    storageBucket: "geyser-74ddf.appspot.com",
    messagingSenderId: "1001903322970",
    appId: "1:1001903322970:web:a904b91e99d67b22"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  var db = firebase.firestore();

var hostAddress=os.hostname();
console.log("Startup successful.")
console.log("Listening on port "+PORT);
server.listen(PORT);


app.use(bodyParser.json()); 
app.use(function(req,res,next){
	res.header("Access-Control-Allow-Origin","*");
	res.header("Access-Control-Allow-Headers","*");
	next();
});
app.post("/",async function(req,res){
	console.log("request received");
	//console.log(req.body);
	
	res.json(await handle(req));
	res.end();
});


///////////////////////
	var array=[];
	var idc=0;
	db.collection("users").get().then(querySnapshot=>
	{
		querySnapshot.forEach(function(doc)
		{
			var ID=doc.data().identifier;
			array[idc]=ID;
			idc++;
			//console.log(ID);
			


		});

		
	});
///////////////////////


async function handle(req)
{
	if(req.body.type=="addUser")
	{
		console.log("add user "+req.body.identifier);
		return addUser(req.body);
	}
	if(req.body.type=="removeUser")
	{
		console.log("remove user "+req.body.identifier);
		return removeUser(req.body);
	}
	if(req.body.type=="updateUser")
	{
		console.log("update user "+req.body.identifier);
		return updateUser(req.body);

	}
	if(req.body.type=="addGeyser")
	{
		console.log("add geyser "+req.body.identifier);
		return addGeyser(req.body);
	}
	if(req.body.type=="removeGeyser")
	{
		console.log("remove geyser "+req.body.identifier);
		return removeGeyser(req.body)
	}
	if(req.body.type=="updateGeyser")
	{
		console.log("update geyser "+req.body.identifier);
		return updateGeyser(req.body);
	}
	if(req.body.type=="addEmployee")
	{
		console.log("add employee "+req.body.identifier);
		return addEmployee(req.body);
	}
	if(req.body.type=="removeEmployee")
	{
		console.log("remove employee "+req.body.identifier);
		return removeEmployee(req.body);
	}
	if(req.body.type=="updateEmployee")
	{
		console.log("update employee "+req.body.identifier);
		return updateEmployee(req.body);
	}
	if(req.body.type=="addCase")
	{
		console.log("add case "+req.body.identifier);
		return addCase(req.body);
	}
	if(req.body.type=="removeCase")
	{
		console.log("remove case "+req.body.identifier);
		return removeCase(req.body);
	}
	if(req.body.type=="updateCase")
	{
		console.log("update case "+req.body.identifier);
		return updateCase(req.body);
	}
	if(req.body.type=="addCaller")
	{
		console.log("add caller "+req.body.identifier);
		return addCaller(req.body);
	}
	if(req.body.type=="removeCaller")
	{
		console.log("remove caller "+req.body.identifier);	
		return removeCaller(req.body);
	}
	if(req.body.type=="updateCaller")
	{
		console.log("update caller "+req.body.identifier);
		return updateCaller(req.body);
	}
	if(req.body.type=="addAgent")
	{
		console.log("add agent "+req.body.identifier);
		return addAgent(req.body);
	}
	if(req.body.type=="removeAgent")
	{
		console.log("remove agent "+req.body.identifier);
		return removeAgent(req.body);
	}
	if(req.body.type=="updateAgent")
	{
		console.log("update agent "+req.body.identifier);
		return updateAgent(req.body);
	}
	if(req.body.type=="login")
	{
		console.log("login attempt");
		return login(req.body);
	}
	if(req.body.type=="retrieveCaseID")
	{
		console.log("Case ID retrieve: "+req.body.identifier);
		return retrieveCaseID(req.body);
	}
	if(req.body.type=="retrieveGraph")
	{
		console.log("Graph retrieval request");
		return retrieveGraphData(req.body);
	}
	if(req.body.type=="retrieveCaseSearch")
	{
		console.log("Case search request");
		return retrieveCaseSearch(req.body);
	}
	if(req.body.type=="retrieveAgentSearch")
	{
		console.log("Agent search request");
		return retrieveAgentSearch(req.body);
	}
	if(req.body.type=="retrieveCapacitySearch")
	{
		console.log("Capacity search request");
		return retrieveCapacitySearch(req.body);
	}
	if(req.body.type=="retrieveBrandSearch")
	{
		console.log("Manufacturer search request");
		return retrieveBrandSearch(req.body);
	}
	if(req.body.type=="sendImages")
	{
		console.log("Image send request");
		return sendImages(req.body);
	}
	if(req.body.type=="retrieveImages")
	{
		console.log("Image retrieval request");
		return retrieveImages(req.body);
	}
	if(req.body.type=="updatePlumberCase")
	{
		console.log("update Plumber Case");
		return updatePlumberCase(req.body);
	}
	if(req.body.type=="addReview")
	{
		console.log("Adding review of case");
		return addReview(req.body);
	}
	if(req.body.type=="appLogin")
	{
		console.log("App login");
		return appLogin(req.body);
	}
	//retrieveBrandSearch
}

/*
for plumbers
request:
{
	identifier: identifier,
	type: addUser,
	user: username,
	pass: password,
	userType: user type,
	case: case id

}
for admins
request:
{
	identifier: identifier,
	type: addUser,
	user: username,
	pass: password,
	userType: user type

}
*/

function addUser(body)
{
	if(!validateIdentifier(body))
	{
		console.log("Invalid user detected "+body.identifier);
		return "false";
	}
	var passSalt=genSalt();

	var user=body.user;
	var pass=body.pass;
	
	var type=body.userType;
	
	var finalPass=pass+passSalt;
	//console.log(finalPass);
	finalPass=hash(finalPass);
	var useIdentifier=generateIdentifier();
	//console.log(finalPass);
	if(type=="plumber")
	{
		var caseToWork=body.case;
	db.collection("users").doc(user).set(
	{
		identifier:useIdentifier,
		caseToWorkOn:"none",
		password:finalPass,
		salt:passSalt,
		userType:type
	});
	}
	if(type=="admin"||type=="agent"||type=="guest")
	{
		var temp=body.pass+passSalt;
		var ret=crypto.createHash("sha256");
		rer.update(temp);
		passwor= rer.digest('hex');
		db.collection("users").doc(user).set(
		{
	  	identifier:useIdentifier,
		password:passwor,
		salt:passSalt,
		userType:type
		});	
	}
		var returnData={
		result:'success'
	};
	updateID();
	return JSON.stringify(returnData);


}
/*
request:
{
	identifier: identifier,
	type: removeUser,
	user: username
}
*/
function removeUser(body)
{
	if(!validateIdentifier(body))
	{
		console.log("Invalid user detected "+body.identifier);
			var returnData={
		error:'Invalid user'
	};
	return JSON.stringify(returnData);
	}
	var user=body.user;
	db.collection("users").doc(user).delete();
		var returnData={
		result:'success'
	};
	return JSON.stringify(returnData);
}

function genSalt()
{
	var result="";
	var chars="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
	var len=chars.length;
	for(var i=0; i<7;i=i+1)
	{
		result=result+chars.charAt(Math.floor(Math.random()*len));
	}
	return result;
	// return "thisissalt";
}

function generateIdentifier()
{
	var result="";
	var chars="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
	var len=chars.length;
	for(var i=0; i<10;i=i+1)
	{
		result=result+chars.charAt(Math.floor(Math.random()*len));
	}
	return result

}

function hash(password)
{
	// var hash = MurmurHash3(password, 1);
	// return hash.result();
	var hash=crypto.createHash("sha256");
	hash.update(password);
	return hash.digest('hex');
}
/*
request:
{
	identifier: identifier,
	type: updateUser,
	user: username,
	param: parameter to update,
	newVal: updated value
}
*/
function updateUser(body)
{
	if(!validateIdentifier(body))
	{
		console.log("Invalid user detected "+body.identifier);
			var returnData={
		error:'Invalid user'
	};
	return JSON.stringify(returnData);
	}
	var param=body.param;
	var user=body.user;
	var val=body.newVal;
	db.collection("users").doc(user).update(
	{
		[param]:val
	}
		);
		var returnData={
		result:'success'
	};
	return JSON.stringify(returnData);
	

}
/*
request:
{
	identifier: identifier,
	type: addEmployee,
	id: employee id,
	dob: date of birth,
	addr: address,
	cellnum: celphone number,
	gen: gender,
	idnum: id number,
	name: employee name
}
*/
function addEmployee(body)
{
	if(!validateIdentifier(body))
	{
		console.log("Invalid user detected "+body.identifier);
			var returnData={
		error: 'Invalid user'
		};
		return JSON.stringify(returnData);
	}

	var id=body.plumberID;
	var dob=body.DateOfBirth;
	var addr=body.address;
	var cellnum=body.cellNumber;
	var gen=body.gender;
	var idnum=body.idNumber;
	var userName=fullName.name;
	

	db.collection("employeesDetails").doc(id).set(
	{

		DateOfBirth:dob,
		address:addr,
		cellNumber:cellnum,
		fullName:userName,
		gender:gen,
		idNumber:idnum,
		plumberID:id

	}
	);
		var returnData={
		result:'success'
	};
	return JSON.stringify(returnData);
}
/*
request: 
{
	identifier: identifier,
	type: removeEmployee,
	id: employee id,
}
*/

function removeEmployee(body)
{
	if(!validateIdentifier(body))
	{
		console.log("Invalid user detected "+body.identifier);
			var returnData={
		error: 'Invalid user'
	};
	return JSON.stringify(returnData);
	}
	var id=body.id;
	db.collection("employeesDetails").doc(id).delete();
		var returnData={
		result:'success'
	};
	return JSON.stringify(returnData);

}
/*
request:
{
identifier: identifier,
	type: updateEmployee,
	id: employee id,
	param: parameter to update,
	newVal: updated value
	}
*/
function updateEmployee(body)
{
	if(!validateIdentifier(body))
	{
		console.log("Invalid user detected "+body.identifier);
			var returnData={
		error: 'Invalid user'
	};
	return JSON.stringify(returnData);
	}
	var param=body.param;
	var id=body.id;
	var val=body.newVal;
	db.collection("employeesDetails").doc(id).update({
		[param]:val
	});
		var returnData={
		result:'success'
	};
	return JSON.stringify(returnData);

}
/*
request:
{
	identifier: identifier,
	type: addGeyser,
	barcode: geyser number,
	cap: geyser capacity,
	caseid: case id,
	geyserTemp: temp,
	insure: insured?,
	manu: manufacturer,
	mod: model number

}
*/
function addGeyser(body)
{
	if(!validateIdentifier(body))
	{
		console.log("Invalid user detected "+body.identifier);
			var returnData={
		error: 'Invalid user'
	};
	return JSON.stringify(returnData);
	}
	var code=body.barcode;
	var cap=body.cap;
	var caseid=body.caseid;
	var temp=body.geyserTemp;
	var insure=body.insure;
	var manu=body.manu;
	var mod=body.mod;
	var geysernum=code+"-"+caseid;
	db.collection("geyser").doc(geysernum).set({
		barcode: code,
		capacity:cap,
		caseID:caseid,
		insurance:insure,
		manufacturer:manu,
		model:mod,
		geyserTemp:temp

	});
	var returnData={
		result:'success'
	};
	return JSON.stringify(returnData);

}
/*
request:
{
	identifier: identifier,
	type: removeGeyser,
	number: geyser number
}
*/
function removeGeyser(body)
{
	if(!validateIdentifier(body))
	{
		console.log("Invalid user detected "+body.identifier);
			var returnData={
		error: 'Invalid user'
	};
	return JSON.stringify(returnData);
	}
	var number=body.number;
	db.collection("geyser").doc(number).delete();
		var returnData={
		result:'success'
	};
	return JSON.stringify(returnData);

}
/*
request:
{
	identifier: identifier,
	type: updateGeyser,
	id: geyser number,
	param: update parameter,
	newVal: updated value
}
*/
function updateGeyser(body)
{
	if(!validateIdentifier(body))
	{
		console.log("Invalid user detected "+body.identifier);
		var returnData={
		error:'Invalid user'
	};
	return JSON.stringify(returnData);
	}
	var param=body.param;
	var id=body.id;
	var val=body.newVal;
	db.collection("geyser").doc(id).update({
		[param]:val
	});
		var returnData={
		result:'success'
	};
	return JSON.stringify(returnData);

}

/*
request:
{
	identifier: identifier,
	type: addCase,
	id: case id,
	addr: address of case,
	caller: caller id,
	closedby: agent closed by,
	closeddate: date closed by,
	description: case description,
	openedby: agent opened by,
	status: case status,
	date: date of incident,
	plumid: plumber id
	

}
*/
function addCase(body)
{
	if(!validateIdentifier(body))
	{
		console.log("Invalid user detected "+body.identifier);
		var returnData={
		error:'Invalid user'
	};
	return JSON.stringify(returnData);
	}
	var id=body.caseID;
	var addr=body.addressOfIncident;
	var caller=body.callerID;
	var closedby=body.caseClosedBy;
	var closeddate=body.caseClosedDate;
	var description=body.description;
	var openedby=body.caseOpenedBy;
	var status=body.caseStatus;
	var date=body.incidentDate1;
	var plumid=body.plumberID;
	db.collection("caseDetails").doc(id).set({
		addressOfIncident:addr,
		callerID:caller,
		caseClosedBy:closedby,
		caseClosedDate:closeddate,
		caseDescription:description,
		caseID:id,
		caseOpenedBy:openedby,
		caseStatus:status,
		incidentDate:date,
		plumberID:plumid
		
	});
		var returnData={
		result:'success'
	};
	return JSON.stringify(returnData);
}
/*
request:
{
	identifier: identifier,
	type: removeCase,
	id: case id
}
*/
function removeCase(body)
{
	if(!validateIdentifier(body))
	{
		console.log("Invalid user detected "+body.identifier);
		var returnData={
		error:'Invalid user'
	};
	return JSON.stringify(returnData);
	}
	var id=body.id;
	db.collection("caseDetails").doc(id).delete();
		var returnData={
		result:'success'
	};
	return JSON.stringify(returnData);
}
/*
request:
{
	identifier: identifier,
	type: updateCase,
	id: case id,
	param: update parameter,
	newVal: updated value
}
*/
function updateCase(body)
{
	if(!validateIdentifier(body))
	{
		console.log("Invalid user detected "+body.identifier);
		var returnData={
		error:'Invalid user'
	};
	return JSON.stringify(returnData);
	}
	var param=body.param;
	var id=body.id;
	var val=body.newVal;
	db.collection("caseDetails").doc(id).update({
		[param]:val
	});
		var returnData={
		result:'success'
	};
	return JSON.stringify(returnData);
}

/*
request:
{
	identifier: identifier,
	type: addCaller,
	id: caller id,
	addr: caller address,
	callback: call back number,
	cellnum: celphone number,
	client: client id,
	callername: caller name,
	callersurname: caller surname,
	callreason: reason for call,
	servtype: type of service

}
*/
function addCaller(body)
{
	if(!validateIdentifier(body))
	{
		console.log("Invalid user detected "+body.identifier);
		var returnData={
		error:'Invalid user'
	};
	return JSON.stringify(returnData);
	}
	var id=body.callerID1;
	var addr=body.address1;
	var callback=body.callBackNumber1;
	var cellnum=body.cellNumber1;
	var client=body.clientType1;
	var callername=body.name1;
	var callreason=body.reason1;
	var servtype=body.serviceType1;
	var callersurname=body.surname1;
	db.collection("callerDetails").doc(id).set({
		address:addr,
		callBackNumber:callback,
		callerID:id,
		cellNumber:cellnum,
		clientType:client,
		name:callername,
		serviceType:servtype,
		surname:callersurname,
		reason:callreason
	});
		var returnData={
		result:'success'
	};
	return JSON.stringify(returnData);
}
/*
request:
{
	identifier: identifier,
	type: removeCaller,
	id: caller id
}
*/
function removeCaller(body)
{
	if(!validateIdentifier(body))
	{
		console.log("Invalid user detected "+body.identifier);
		var returnData={
		error:'Invalid user'
	};
	return JSON.stringify(returnData);
	}
	var id=body.id;
	db.collection("callerDetails").doc(id).delete();
		var returnData={
		result:'success'
	};
	return JSON.stringify(returnData);}
/*
request:
{
	identifier: identifier,
	type: updateCaller,
	id: caller id,
	param: update parameter,
	newVal: updated value
}
*/
function updateCaller(body)
{
	if(!validateIdentifier(body))
	{
		console.log("Invalid user detected "+body.identifier);
		var returnData={
		error:'Invalid user'
	};
	return JSON.stringify(returnData);
	}
	var param=body.param;
	var id=body.id;
	var val=body.newVal;
	db.collection("callerDetails").doc(id).update({
		[param]:val
	});
		var returnData={
		result:'success'
	};
	return JSON.stringify(returnData);	
}
/*
request: 
{
	identifier: identifier,
	type: addAgent,
	id: agent id,
	agentname: username,
	agentpass: password
}
*/
function addAgent(body)
{
	if(!validateIdentifier(body))
	{
		console.log("Invalid user detected "+body.identifier);
		var returnData={
		error:'Invalid user'
	};

		return JSON.stringify(returnData);
	}

	var id=body.agentID;
	var agentname=body.agentName;
	
	db.collection("agentCredentials").doc(id).set({
		agentID:id,
		name:agentname,
	});
		var returnData={
		result:'success'
	};
	return JSON.stringify(returnData);
}
/*
request:
{
	identifier: identifier,
	type: removeAgent,
	id: agent id
}
*/
function removeAgent(body)
{
	if(!validateIdentifier(body))
	{
		console.log("Invalid user detected "+body.identifier);
		var returnData={
		error:'Invalid user'
	};
	return JSON.stringify(returnData);
	}
	var id=body.id;
	db.collection("agentCredentials").doc(id).delete();
		var returnData={
		result:'success'
	};
	return JSON.stringify(returnData);

}
/*
request:
{
	identifier: identifier,
	type: updateAgent,
	id: agent id,
	param: update parameter,
	newVal: updated value
}
*/
function updateAgent(body)
{
	if(!validateIdentifier(body))
	{
		console.log("Invalid user detected "+body.identifier);
		var returnData={
		error:'Invalid user'
	};
	return JSON.stringify(returnData);
	}
	var param=body.param;
	var id=body.id;
	var val=body.newVal;
	db.collection("agentCredentials").doc(id).update({
		[param]:val
	});
		var returnData={
		result:'success'
	};
	return JSON.stringify(returnData);
}

/*
for both login functions
{
	type: login/loginAgent,
	userName: user name,
	password: password
} 
*/
function login(body)
{
	var user=body.userName;
	console.log(user);
	return db.collection('users').doc(user).get().then(doc=>{

		
	//console.log(doc.exists);
	if(!doc.exists)
	{
		var returnData={
			Error: 'User does not exist'
		}
		return JSON.stringify(returnData);
	}else
	{
		var data=doc.data();
		var pass=body.password;
		pass=pass+data.salt;
		var hash=crypto.createHash("sha256");
		hash.update(pass);
		pass= hash.digest('hex');
	//for now
		pass=pass.toUpperCase();
		if(pass==data.password)
		{
			var returnData={
				identifier:data.identifier,
				userType: data.userType
			}
			return JSON.stringify(returnData);
		}
		else{
			var returnData={
				Error: 'Incorrect password'
			}
			return JSON.stringify(returnData);
		}
	}
	});
}


function appLogin(body)
{
	var user=body.userName;
	console.log(user);
	return db.collection('users').doc(user).get().then(doc=>{

		
	//console.log(doc.exists);
	if(!doc.exists)
	{
		var returnData={
			result: 'failed'
		}
		return JSON.stringify(returnData);
	}else
	{
		var data=doc.data();
		var pass=body.password;
		pass=pass+data.salt;
		var hash=crypto.createHash("sha256");
		hash.update(pass);
		pass= hash.digest('hex');
	//for now
		pass=pass.toUpperCase();
		if(pass==data.password)
		{
			var returnData={
				result: 'success',
				userID:data.identifier,
				caseToBeWorkedOn: data.caseToWorkOn
			}
			return JSON.stringify(returnData);
		}
		else{
			var returnData={
				result: 'Incorrect password'
			}
			return JSON.stringify(returnData);
		}
	}
	});
}

function validateIdentifier(body)
{

	var id=body.identifier;
	console.log(id);
	
	for(var j=0;j<idc;j++)
	{
		if(id==array[j])
		{
			console.log("valid user");
				return true;
		}
	}
	
	return false;	
}

/*
{
	identifier: user identifier,
	type:retrieveCaseID,
	userid: id of user
}
*/
function retrieveCaseID(body)
{
	var returnResult;
	if(validateIdentifier(body))
	{
		var record=db.collection('users').doc(body.userid);
		if(record.exists)
		{
			returnResult={
			Error: 'Invalid user ID'
		}
		return JSON.stringify(returnResult);
		}
		var data=record.data();
		returnResult= {
			casid: data.caseToWorkOn
		}
		return JSON.stringify(returnResult);


	}else
	{
		returnResult={
			Error: 'Invalid user'
		}
		return JSON.stringify(returnResult);
	}
}

/*
{
	identifier: identifier,
	type:retrieveGraph
}*/
function retrieveGraphData(body)
{
	if(!validateIdentifier(body))
	{
		console.log("Invalid user");
		var returnData={
			Error: "Invalid User"
		}
		return JSON.stringify(returnData);
	}
	var start=0;
	var end=0;
	var month=0;
	var Jan=0;
	var Feb=0;
	var Mar=0;
	var Apr=0;
	var MayMonth=0;
	var Jun=0;
	var Jul=0;
	var Aug=0;
	var Sep=0;
	var Oct=0;
	var Nov=0;
	var Dec=0;
	return db.collection("caseDetails").get().then(function(querySnapshot)
	{
		querySnapshot.forEach(function(doc)
		{
			var m=doc.data().incidentDate;
			var search=m[4];
			for(var i=0; i<m.length; i++)
			{
				if(m[i]==search)
				{
					start=i;
					break;
				}
			}
			for(var j=0; j<m.length; j++)
			{
				if(m[j]==search)
				{
					end=j;
				}
			}
			//console.log(m);

			month=m.slice(start+1,end);
			//console.log(month);
			if(month=="1")
			{
				Jan++;
			}
			if(month=="2")
			{
				Feb++;
			}
			if(month=="3")
			{
				Mar++;
			}
			if(month=="4")
			{
				Apr++;
			}
			if(month=="5")
			{
				MayMonth++;
			}
			if(month=="6")
			{
				Jun++;
			}
			if(month=="7")
			{
				Jul++;
			}
			if(month=="8")
			{
				Aug++;
			}
			if(month=="9")
			{
				Sep++;
			}
			if(month=="10")
			{
				Oct++;
			}
			if(month=="11")
			{
				Nov++;
			}
			if(month=="12")
			{
				Dec++;
			}

		});
		//console.log(Jan);
			var returnData={
		January:Jan,
		February:Feb,
		March:Mar,
		April:Apr,
		May:MayMonth,
		June:Jun,
		July:Jul,
		August:Aug,
		September:Sep,
		October:Oct,
		November:Nov,
		December:Dec	
	}
	return JSON.stringify(returnData);

	});

}
/*
{
	type: retrieveCaseSearch,
	identifier: identifier,
	id:plubmerid
}
*/

function retrieveCaseSearch(body)
{
	if(!validateIdentifier(body))
	{
		console.log("Invalid user");
		var returnData={
			Error: "Invalid User"
		}
		return JSON.stringify(returnData);
	}
	var id=body.id;
	var returnData={
		data:[]
	};
	return db.collection("caseDetails").get().then(function(querySnapshot)
	{
		querySnapshot.forEach(function(doc)
		{
			//console.log(doc.data());
			if(id == doc.data().plumberID){
				console.log("entry found");
				var row={
					caseID:doc.data().caseID,
					incidentDat:doc.data().incidentDate,
					caseStatus: doc.data().caseStatus,
					caseDescription:doc.data().caseDescription,
					addressOfIncident:doc.data().addressOfIncident,
					callerID: doc.data().callerID,
					caseOpenedBy:doc.data().caseOpenedBy,
					caseClosedBy:doc.data().caseClosedBy

				}
				returnData.data.push(row);
			}
		});
		return JSON.stringify(returnData);
	});
}

function retrieveAgentSearch(body)
{
	if(!validateIdentifier(body))
	{
		console.log("Invalid user");
		var returnData={
			Error: "Invalid User"
		}
		return JSON.stringify(returnData);
	}
	var id=body.id;
	var returnData={
		data:[]
	};
	return db.collection("caseDetails").get().then(function(querySnapshot)
	{
		querySnapshot.forEach(function(doc)
		{
			//console.log(doc.data());
			if(id == doc.data().caseOpenedBy){
				console.log("entry found");
				var row={
					caseID:doc.data().caseID,
					incidentDat:doc.data().incidentDate,
					caseStatus: doc.data().caseStatus,
					caseDescription:doc.data().caseDescription,
					addressOfIncident:doc.data().addressOfIncident,
					callerID: doc.data().callerID,
					caseOpenedBy:doc.data().caseOpenedBy,
					caseClosedBy:doc.data().caseClosedBy

				}
				returnData.data.push(row);
			}
		});
		return JSON.stringify(returnData);
	});
}

function retrieveCapacitySearch(body)
{
	if(!validateIdentifier(body))
	{
		console.log("Invalid user");
		var returnData={
			Error: "Invalid User"
		}
		return JSON.stringify(returnData);
	}
	var id=body.id;
	var returnData={
		data:[]
	};
	return db.collection("geyser").get().then(function(querySnapshot)
	{
		querySnapshot.forEach(function(doc)
		{
			//console.log(doc.data());
			if(id == doc.data().capacity){
				console.log("entry found");
				var row={
					barcode:doc.data().barcode,
					caseID:doc.data().caseID,
					insurance: doc.data().insurance,
					manufacturer:doc.data().manufacturer,
					model:doc.data().model

				}
				returnData.data.push(row);
			}
		});
		return JSON.stringify(returnData);
	});
}

function retrieveBrandSearch(body)
{
	if(!validateIdentifier(body))
	{
		console.log("Invalid user");
		var returnData={
			Error: "Invalid User"
		}
		return JSON.stringify(returnData);
	}
	var id=body.id;
	var returnData={
		data:[]
	};
	return db.collection("geyser").get().then(function(querySnapshot)
	{
		querySnapshot.forEach(function(doc)
		{
			//console.log(doc.data());
			if(id == doc.data().manufacturer){
				console.log("entry found");
				var row={
					barcode:doc.data().barcode,
					caseID:doc.data().caseID,
					insurance: doc.data().insurance,
					manufacturer:doc.data().manufacturer,
					model:doc.data().model

				}
				returnData.data.push(row);
			}
		});
		return JSON.stringify(returnData);
	});
}
/*
{
	type:sendImages,
	identifier: userid,
	caseID: id,
    geyser: any;
    pressureControlValve: any;
    vacuumBreaker: any;
    dripTray: any;
    safety: any;
}*/
function sendImages(body)
{
	if(!validateIdentifier(body))
	{
		console.log("Invalid user");
		var returnData={
			Error: "Invalid User"
		}
		return JSON.stringify(returnData);
	}
	var geyserImage="geyser.jpg";
	var pressureImage="pressureControlValve.jpg";
	var vacuumImage="vacuumBreaker.jpg";
	var dripImage="dripTray.jpg";
	var safetyImage="saftey.jpg";
	base64decode(body.geyser,geyserImage);
	base64decode(body.pressureControlValve,pressureImage);
	base64decode(body.vacuumBreaker,vacuumImage);
	base64decode(body.dripTray,dripImage);
	base64decode(body.safety,safetyImage);
	var geyserOpts={
		destination:'images/'+body.caseID+'/'+geyserImage,
		metadata:{
			contentType:'image/jpeg'
		}

	};
	var pressureOpts={
		destination:'images/'+body.caseID+'/'+pressureImage,
		metadata:{
			contentType:'image/jpeg'
		}

	};
	var vacuumOpts={
		destination:'images/'+body.caseID+'/'+vacuumImage,
		metadata:{
			contentType:'image/jpeg'
		}

	};
	var dripOpts={
		destination:'images/'+body.caseID+'/'+dripImage,
		metadata:{
			contentType:'image/jpeg'
		}

	};
	var safetyOpts={
		destination:'images/'+body.caseID+'/'+safetyImage,
		metadata:{
			contentType:'image/jpeg'
		}

	};
	bucket.upload(geyserImage,geyserOpts,function(err,file){
		if(err)
		{
			console.log(err);
			returnData={
				error: "failed"
			};
			return JSON.stringify(returnData);
		}
	});
	bucket.upload(pressureImage,pressureOpts,function(err,file){
		if(err)
		{
			console.log(err);
			returnData={
				error: "failed"
			};
			return JSON.stringify(returnData);
		}
	});
	bucket.upload(vacuumImage,vacuumOpts,function(err,file){
		if(err)
		{
			console.log(err);
			returnData={
				error: "failed"
			};
			return JSON.stringify(returnData);
		}
	});
	bucket.upload(dripImage,dripOpts,function(err,file){
		if(err)
		{
			console.log(err);
			returnData={
				error: "failed"
			};
			return JSON.stringify(returnData);
		}
	});
	bucket.upload(safetyImage,safetyOpts,function(err,file){
		if(err)
		{
			console.log(err);
			returnData={
				error: "failed"
			};
			return JSON.stringify(returnData);
		}
	});
	/*
	storage.bucket().upload(geyserImage,geyserOpts);
	storage.bucket().upload(pressureImage,pressureOpts);
	storage.bucket().upload(vacuumImage,vacuumOpts);
	storage.bucket().upload(dripImage,dripOpt);
	storage.bucket().upload(safetyImage,safetyOpts);*/


	returnData=
	{
		result: 'completed'
	};
	return JSON.stringify(returnData);
}
/*
{
	type:retrieveImages,
	identifier: userid,
	caseID: id
}
*/
async function retrieveImages(body)
{
	if(!validateIdentifier(body))
	{
		console.log("Invalid user");
		var returnData={
			Error: "Invalid User"
		}
		return JSON.stringify(returnData);
	}
	var geyserImage="images/"+body.caseID+"/geyser.jpg";
	var pressureImage="images/"+body.caseID+"/pressureControlValve.jpg";
	var vacuumImage="images/"+body.caseID+"/vacuumBreaker.jpg";
	var dripImage="images/"+body.caseID+"/dripTray.jpg";
	var safetyImage="images/"+body.caseID+"/saftey.jpg";
	var geyserOpts={destination:"geyser.jpg"};
	var pressureOpts={destination:"pressureControlValve.jpg"};
	var vacuumOpts={destination:"vacuumBreaker.jpg"};
	var dripOpts={destination:"dripTray.jpg"};
	var safetyOpts={destination:"safety.jpg"};
	await bucket.file(geyserImage).download(geyserOpts);
	await bucket.file(pressureImage).download(pressureOpts);
	await bucket.file(vacuumImage).download(vacuumOpts);
	await bucket.file(dripImage).download(dripOpts);
	await bucket.file(safetyImage).download(safetyOpts);
	var geyser64=base64encode("geyser.jpg");
	var pressure64=base64encode("pressureControlValve.jpg");
	var vacuum64=base64encode("vacuumBreaker.jpg");
	var drip64=base64encode("dripTray.jpg");
	var safety64=base64encode("safety.jpg");
	var returnData={
		geyser:geyser64,
		pressure:pressure64,
		vacuum:vacuum64,
		drip:drip64,
		safety:safety64
	}
	return JSON.stringify(returnData);
}

function base64decode(decodeString,filename)
{
	var buff=new Buffer(decodeString,'base64');
	fs.writeFileSync(filename,buff);
}

function base64encode(filename)
{
	var buff=fs.readFileSync(filename);
	return new Buffer(buff).toString('base64');
}

function updateID()
{
	idc=0;
	db.collection("users").get().then(querySnapshot=>
	{
		querySnapshot.forEach(function(doc)
		{
			var ID=doc.data().identifier;
			array[idc]=ID;
			idc++;
		});

		
	});
}

function closeCases(body)
{
	if(!validateIdentifier(body))
	{
		console.log("Invalid user");
		var returnData={
			Error: "Invalid User"
		}
		return JSON.stringify(returnData);
	}
	var id=body.identifier;
	var case=body.case;
	var com = "completed";
	var agent="";
	var date=body.date;
	  var u="unknown";
	  db.collection("users").get().then(function(querySnapshot)
	{
		querySnapshot.forEach(function(doc)
		{
			if(id==doc.data().identifier)
			{
			   
				agent=doc.id;
			}
	   });
		
	});
	  var c=0;
	db.collection("caseDetails").get().then(function(querySnapshot)
	{
		querySnapshot.forEach(function(doc)
		{
			if(com==doc.data().caseStatus&& u==doc.data().caseClosedBy &&case==doc.data().caseID)
			{
			   c++;
				db.collection("caseDetails").doc(doc.id).update({caseClosedBy: agent, caseClosedDate :date, caseStatus : "closed"  });
			}
	   });
		
	});
	if(c==0)
	{
		var returnData={
		result:'success'
		};
		return JSON.stringify(returnData);
	}
	else
	{
		var returnData={
		result:'failed'
		};
		return JSON.stringify(returnData);
	}

}

function addReview(body)
{
	if(!validateIdentifier(body))
	{
		console.log("Invalid user detected "+body.identifier);
		var returnData={
			Error: "Invalid User"
		}
		return JSON.stringify(returnData);
	}
	var id=body.id;
	var rate=body.rating;
	var fb=body.feedback;
	var cn = body.caseNumber;
	var un=body.userName;
	
	db.collection("feedback").doc(cn).set({
		rating : rate,
		feedback : fb,
		caseNumber : cn,
		userName : un
	});
	var returnData={
		result:'success'
		};
		return JSON.stringify(returnData);
}