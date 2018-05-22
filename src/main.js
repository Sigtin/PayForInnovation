const name = 'World';

console.log(`Hello, ${name}!`);

let buildElementsC = (jsondata) =>{
let el = "";
let x;
for(let i=0; i<jsondata.length; i++){
	x=jsondata[i];
	el +='<div class="contact-card"><div class="card-head"><h3>'+x.name+'</h3></div><div class="card-body"><div class="row"><div class="col-sm-2"><h6>Email:</h6></div><div class="col-sm-10"><p>';
	if(x.emailhref!="disable"){
		el+='<a href="'+x.emailhref+'">'+x.email+'</a>';
	}
	else{	
		el+=x.email;
	}
	el+='</p></div></div><div class="row"><div class="col-sm-2"><h6>Buissnes:</h6></div><div class="col-sm-10"><p>'+x.number+'</p></div></div><div class="row"><div class="col-sm-2"><h6>Office:</h6></div><div class="col-sm-10"><p>'+x.office+'</p></div></div><div class="row"><div class="col-md-2"><h6>Other:</h6></div><div class="col-md-10"><p>'+x.message+'</p></div></div></div></div>';
}
	let contentHolder = document.getElementById("contacts-area");
contentHolder.innerHTML=el;
}

let buildElementsP = (jsondata) =>{
let el = "";
let x;
//for(var i=0; i<1; i++){
//	x=jsondata[i];
//	el +='<div class="card" id="card_"><div class="card-header bg-dark" id="name_">'+x.name+'</div><div class="card-body bg-secondary"><p id="date_">'+x.date+'</p><p id="details_">'+x.details+'</p><img id="image_" src="'+x.image+'"></div></div>';
//}
	for(let i=0; i<jsondata.length; i++){
	x=jsondata[i];
	el +='<div class="row project-card"><div class="col-lg-2 card-image"><img src="'+x.image+'" alt="This Project\'s image could not be found."></div><div class="col-lg-10 card-info"><div class="row card-head"><h4>'+x.name+'</h4></div><div class="row"><div class="col-sm-7"><h6>Start Date:</h6></div><div class="col-sm-5 align-r"><p>'+x.date+'</p></div></div><div class="row"><div class="col-md-2"><h6>Details:</h6></div><div class="col-md-10"><p>'+x.details+'</p></div></div></div></div>';
	}
	
let	contentHolder = document.getElementById("projects-area");
	
contentHolder.innerHTML=el;
}

let buildElementsA = (jsondata) =>{
let el = "";
let x;
//for(var i=0; i<jsondata.length; i++){
//	x=jsondata[i];	
//	el +='<div class="contact-card"><div class="card-head"><h3>'+x.name+'</h3></div></div>';
//}
	for(let i=0; i<jsondata.length; i++){
	x=jsondata[i];
	el +='<div class="row award-card"><div class="col-lg-2 card-image"><img src="'+x.image+'" alt="This Award\'s image could not be found."></div><div class="col-lg-10 card-info"><div class="row card-head"><h4>'+x.name+'</h4></div><div class="row"><div class="col-sm-7"><h6>Date:</h6></div><div class="col-sm-5 align-r"><p>'+x.date+'</p></div></div><div class="row"><div class="col-md-2"><h6>Person:</h6></div><div class="col-md-10"><p>'+x.person+'</p></div></div></div></div>';
	}
	let contentHolder = document.getElementById("awards-area");
contentHolder.innerHTML=el;
}

let buildElementsD = (jsondata) => {
let el = "";
let x;
for(let i=0; i<jsondata.length; i++){
	x=jsondata[i];
	el +='<div class="calendar-card"><div class="card-head"><h3>'+x.event+'</h3></div><div class="card-body"><div class="row"><div class="col-sm-2"><h6>Date:</h6></div><div class="col-sm-10"><p>'+x.date+', '+x.time+'</p></div></div><div class="row"><div class="col-sm-2"><h6>Location:</h6></div><div class="col-sm-10"><p>'+x.location+'</p></div></div></div></div>';
}
	let contentHolder = document.getElementById("calendars-area");
contentHolder.innerHTML=el;
}


//Page content
let request1 = new XMLHttpRequest();
let request2 = new XMLHttpRequest();
let request3 = new XMLHttpRequest();
let request4 = new XMLHttpRequest();
//var type="";
//var contentHolder="";
loadData1();
loadData2();
loadData3();
loadData4();

let loadData1=()=>{
	if(document.getElementById("contacts-area")){
		request1.open('GET', 'json/contacts.json');
	  	request1.onload = loadComplete1;
	  	request1.send();
	}
}
let loadData2 =()=>{
	if(document.getElementById("projects-area")){
		request2.open('GET', 'json/projects.json');
  		request2.onload = loadComplete2;
  		request2.send();
	}
}
let loadData3 = () => {
	if(document.getElementById("awards-area")){
		request3.open('GET', 'json/awards.json');	
  		request3.onload = loadComplete3;
  		request3.send();
	}
}
let loadData4 = () => {
	if(document.getElementById("calendars-area")){
		request4.open('GET', 'json/calendars.json');	
  		request4.onload = loadComplete4;
  		request4.send();
	}
} 
let loadComplete1 = (evt) => {
  	dataX = JSON.parse(request1.responseText);
	buildElementsC(dataX["contact-info"]);
}
let loadComplete2 = (evt) => {
	dataX = JSON.parse(request2.responseText);
	buildElementsP(dataX["project-info"]);
}

let loadComplete3 = (evt) => {
  	dataX = JSON.parse(request3.responseText);
	buildElementsA(dataX["award-info"]);
}
let loadComplete4 = (evt) => {
	dataX = JSON.parse(request4.responseText);
	buildElementsD(dataX["calendar-info"]);
}


//Nav
let requestNav = new XMLHttpRequest();
loadNav();
let loadNav = () => {
	requestNav.open('GET', 'json/nav.json');
	requestNav.onload = loadCompleteNav;
  	requestNav.send();	
} 
let loadCompleteNav = (evt) => {
  	dataX = JSON.parse(requestNav.responseText);
	buildNav(dataX["nav-info"]);
}
let buildNav = (jsondata) =>{
	let el = "";
	let x;
	//brand
	el +='<div class="navbar-brand"></div>';
	//hamburger
     el +='<button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation" id="hamburger-btn"><span class="material-icons" id="hamburger">dehaze</span></button>';
	//build
	el+='<div class="collapse navbar-collapse" id="navbarCollapse"><ul class="navbar-nav mr-auto">';
	for(let i=0; i<jsondata.length; i++){
		x=jsondata[i];
		if(x.icon=="awasome2"){
			el+='<li class="nav-item '+x.href+'"><a href="'+x.href+'" class="nav-link" data-toggle="tooltip" data-placement="bottom" title="'+x.name+'"><div class="nav-links"><span class="fa-stack fa-lg" style="margin:-5px;margin-top:0;padding:0"><i class="fa fa-certificate fa-stack-2x"></i><i class="fa fa-circle fa-stack-1x fa-inverse" style="font-size:18px;margin-top:-6px"></i></span></div></a></li>';
		}
		else if(x.icon=="awasome"){
			el+='<li class="nav-item '+x.href+'"><a href="'+x.href+'" class="nav-link" data-toggle="tooltip" data-placement="bottom" title="'+x.name+'"><div class="nav-links"><i class="fa '+x.iconpath+'"></i></div></a></li>';
		}
		else if(x.icon=="google"){		
			el+='<li class="nav-item '+x.href+'"><a href="'+x.href+'" class="nav-link" data-toggle="tooltip" data-placement="bottom" title="'+x.name+'"><div class="nav-links"><i class="material-icons">'+x.iconpath+'</i></div></a></li>';
		}
		else{					
			el+='<li class="nav-item '+x.href+'"><a href="'+x.href+'" class="nav-link"><div class="nav-links">'+x.name+'</div></a></li>';
		}
	}
//	for(var i=0; i<jsondata.length; i++){
//		x=jsondata[i];
//		if(x.icon=="awasome2"){
//			el+='<li class="nav-item" id="'+x.href+'"><a href="'+x.href+'" class="nav-link" data-toggle="tooltip" data-placement="bottom" title="'+x.name+'"><div class="nav-links"><span class="fa-stack fa-lg" style="margin:-5px;margin-top:0;padding:0"><i class="fa fa-certificate fa-stack-2x"></i><i class="fa fa-circle fa-stack-1x fa-inverse" style="font-size:18px;margin-top:-6px"></i></span></div></a></li>';
//		}
//		else if(x.icon=="awasome"){
//			el+='<li class="nav-item" id="'+x.href+'"><a href="'+x.href+'" class="nav-link" data-toggle="tooltip" data-placement="bottom" title="'+x.name+'"><div class="nav-links"><i class="fa '+x.iconpath+'"></i></div></a></li>';
//		}
//		else if(x.icon=="google"){		
//			el+='<li class="nav-item" id="'+x.href+'"><a href="'+x.href+'" class="nav-link" data-toggle="tooltip" data-placement="bottom" title="'+x.name+'"><div class="nav-links"><i class="material-icons">'+x.iconpath+'</i></div></a></li>';
//		}
//		else{					
//			el+='<li class="nav-item" id="'+x.href+'"><a href="'+x.href+'" class="nav-link"><div class="nav-links">'+x.name+'</div></a></li>';
//		}
//	}
	el+='</ul></div>';			  
			  
	let conHol = document.getElementById("navbar-n");
	conHol.innerHTML=el;
	setActive();
}
let setActive = () =>{	
	let path = window.location.pathname;
	let page = path.split("/").pop();
	console.log(page);
	if(page=="_applicationsubmitted.html"){
		page="_application.html";
	}
	
	let temps = document.getElementsByClassName(page);
	let i;
	for(i=0; i<temps.length; i++){
		temps[i].className +=" active";
	}
	
//	var temp = document.getElementById(page);
//	if(temp != null){
//		console.log("active set");
//		temp.className +=" active";		
//	}
}


//Foot
let requestFoot = new XMLHttpRequest();
loadFoot();
let loadFoot = () => {
	console.log("made to foot");
	requestFoot.open('GET', 'json/foot.json');
	requestFoot.onload = loadCompleteFoot;
  	requestFoot.send();	
}
let loadCompleteFoot = (evt) => {
  dataX = JSON.parse(requestFoot.responseText);
	jsondata=dataX["foot-info"];//buildFoot(dataX["foot-info"]);
	let el = "<div>";
	let x;
	for(let i=0; i<jsondata.length; i++){
		x=jsondata[i];
		el +='<p>'+x.text+'</p>';
	}	
	el+="<div>";
	let conHol = document.getElementById("foot-area");
	conHol.innerHTML=el;
}
