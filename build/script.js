function fillhead(){
	var el = "";
	el+='<meta name="viewport" content="width=device-width, initial-scale=1">';//'<meta name="viewport" content="width=device-width">';
	//'<meta name="viewport" content="width=device-width, initial-scale=1">'
	el+='<link rel="shortcut icon" href="https://instructure-uploads.s3.amazonaws.com/account_86650/attachments/112327819/favicon32x32-charcoal-100.jpg">';
	el+='<link rel=stylesheet href="css/style.css" type="text/css">';
	el+='<meta name="viewport" content="width=device-width">';
	el+='<!-- Bootstrap CSS --><link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">';
	el+='<!--Google Icons--><link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons">';
	el+='<!--Font Awasome--><link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">';	
	document.head.innerHTML += el;
}
fillhead();

//Foot
var requestFoot = new XMLHttpRequest();
loadFoot();
function loadFoot() {
	requestFoot.open('GET', 'json/foot.json');
	requestFoot.onload = loadCompleteFoot;
  	requestFoot.send();	
}
function loadCompleteFoot(evt) {
  	dataX = JSON.parse(requestFoot.responseText);
	buildFoot(dataX["foot-info"]);
}
function buildFoot(jsondata){
	var el = "<div>";
	var x;
	for(var i=0; i<jsondata.length; i++){
		x=jsondata[i];
		el +='<p>'+x.text+'</p>';
	}	
	el+="<div>";
	var conHol = document.getElementById("foot-area");
	conHol.innerHTML=el;
}

//Nav
var requestNav = new XMLHttpRequest();
loadNav();
function loadNav() {
	requestNav.open('GET', 'json/nav.json');
	requestNav.onload = loadCompleteNav;
  	requestNav.send();
} 
function loadCompleteNav(evt) {
  	dataX = JSON.parse(requestNav.responseText);
	buildNav(dataX["nav-info"]);
	
	$(document).ready(function(){
    $('[data-toggle="tooltip"]').tooltip({animation: true, delay: {show: 50, hide: 100}});   
	});
	resized();
}
function buildNav(jsondata){
	var el = "";
//	var right;
	var x;
	//brand
	el +='<div class="navbar-brand"></div>';
	//hamburger
     el +='<button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation" id="hamburger-btn"><i class="fa fa-bars" id="hamburger"></i></button>';
//	<span class="material-icons" id="hamburger">dehaze</span></button>
	//build
	el+='<div class="collapse navbar-collapse" id="navbarCollapse"><ul class="navbar-nav mr-auto">';
	
	for(var i=0; i<jsondata.length; i++){
		x=jsondata[i];		
		el+='<li id="'+x.href+'" class="nav-item ';
		
		if(x.type=="dropdown"){
			el+='<li class="nav-item dropdown" id="'+x.href+'">><a href="'+x.href+'" class="nav-link dropdown-toggle" href="#" id="navbardrop" data-toggle="dropdown" ';
			if(x.icon=="award"){
				el+=' data-toggle="tooltip" data-placement="bottom" title="'+x.name+'"><div class="nav-links"><span class="fa-stack fa-lg" style="margin:0;margin-bottom:-10px;margin-top:0;padding:0;margin-left:0;width:35px;max-height:42px">'
				+'<i class="fa fa-certificate fa-stack-2x" style="font-size:28px"></i>'
				+'<i class="fa fa-chevron-up fa-stack-3x fa-inverse" style="font-size:26px;margin-top:0;margin-left:4.75px;margin-right:-5px"></i>'
				+'<i class="fa fa-circle fa-stack-1x fa-inverse" style="font-size:16px;margin-top:-6.5px;margin-left:0"></i>'
				+'</span><span class="sidetitle"> '+x.name+'</span></div>';
			}
			else if(x.icon=="awasome"){
				el+=' data-toggle="tooltip" data-placement="bottom" title="'+x.name+'"><div class="nav-links"><i class="fa '+x.iconpath+'"></i><span class="sidetitle"> '+x.name+'</span></div>';
			}
			else{
				el+='><div class="nav-links">'+x.name+'</div>';
			}
			el+='</a><div class="dropdown-menu">';
			
			var i;
			for(i=0; i<x.dropdowns.length; i++){
				el+='<a class="dropdown-item" href="'+x.dropdowns[i].href+'">'+x.dropdowns[i].name+'</a>';
			}
			el+='</div>'
		}
		else if(x.icon=="award"){
			el+='><a href="'+x.href+'" class="nav-link" data-toggle="tooltip" data-placement="bottom" title="'+x.name+'"><div class="nav-links"><span class="fa-stack fa-lg" style="margin:0;margin-bottom:-10px;margin-top:0;padding:0;margin-left:0;width:35px;max-height:42px">'
				+'<i class="fa fa-certificate fa-stack-2x" style="font-size:28px"></i>'
				+'<i class="fa fa-chevron-up fa-stack-3x fa-inverse" style="font-size:26px;margin-top:0;margin-left:4.75px;margin-right:-5px"></i>'
				+'<i class="fa fa-circle fa-stack-1x fa-inverse" style="font-size:16px;margin-top:-6.5px;margin-left:0"></i>'
				+'</span><span class="sidetitle"> '+x.name+'</span></div></a>';
		}
		else if(x.icon=="awasome"){
			el+='><a href="'+x.href+'" class="nav-link" data-toggle="tooltip" data-placement="bottom" title="'+x.name+'"><div class="nav-links"><i class="fa '+x.iconpath+'"></i><span class="sidetitle"> '+x.name+'</span></div></a>';
		}
//		else if(x.icon=="google"){		
//			el+='<li class="nav-item" id="'+x.href+'"><a href="'+x.href+'" class="nav-link iconed" data-toggle="tooltip" data-placement="bottom" title="'+x.name+'"><div class="nav-links iconed-inner"><i class="material-icons">'+x.iconpath+'</i></div></a></li>';
//		}
		else{					
			el+='><a href="'+x.href+'" class="nav-link"><div class="nav-links">'+x.name+'</div></a>';
		}
		el+='</li>';
	}
	el+='</ul></div>';			  
			  
	var conHol = document.getElementById("navbar-n");
	conHol.innerHTML=el;
	setActive();
}
function setActive(){	
	var path = window.location.pathname;
	var page = path.split("/").pop();
	console.log(page);
	if(page=="_applicationsubmitted.html"){
		page="_application.html";
	}
		
	var temp = document.getElementById(page);
	if(temp != null){
		temp.className +=" active";		
	}
}

function resized(){
	if(window.innerWidth<768){ showtitles();}
	else{ hidetitles();}
}
function showtitles(){
	var iconed = document.getElementsByClassName("sidetitle");
	var i;
	for(i=0; i<iconed.length; i++){
		iconed[i].style.display = "inline";
	}
	$(document).ready(function(){
    $('[data-toggle="tooltip"]').tooltip('dispose');   
	});
}
function hidetitles(){
	var iconed = document.getElementsByClassName("sidetitle");
	var i;
	for(i=0; i<iconed.length; i++){
		iconed[i].style.display = "none";
	}
	$(document).ready(function(){
    $('[data-toggle="tooltip"]').tooltip('dispose');   
	});
	$(document).ready(function(){
    $('[data-toggle="tooltip"]').tooltip({animation: true, delay: {show: 50, hide: 100}});   
	});
}

function buildElementsContact(jsondata){
	var el = "";
	var x;
	for(var i=0; i<jsondata.length; i++){
		x=jsondata[i];
		el +='<div class="contact-card box-shadow">'
			+'<div class="card-head"><h3>'+x.name+'</h3></div>'
			+'<div class="card-body"><div class="row">'
			+'<div class="col-sm-2"><label>Email:</label></div>'
			+'<div class="col-sm-6"><p>';
		if(x.emailhref != null && x.emailhref!="disable"){
			el+='<a href="'+x.emailhref+'">'+x.email+'</a>';
		}
		else{	
			el+=x.email;
		}
		el+='</p></div></div><div class="row">'
			+'<div class="col-sm-2"><label>Buissnes:</label></div>'
			+'<div class="col-sm-5"><p>'+x.number+'</p></div>'
			+'</div><div class="row">'
			+'<div class="col-sm-2"><label>Office:</label></div>'
			+'<div class="col-sm-4"><p>'+x.office+'</p></div>'
			+'</div><div class="row">'
			+'<div class="col-md-2"><label>Other:</label></div>'
			+'<div class="col-md-10"><p>'+x.message+'</p></div>'
			+'</div></div></div>';
	}
	var contentHolder = document.getElementById("contacts-area");
	contentHolder.innerHTML=el;
}
function buildElementsProject(jsondata){
	var el = "";
	var x;
	for(var i=0; i<jsondata.length; i++){
		x=jsondata[i];
		el +='<div class="project-card box-shadow">'
			+'<div class="row card-head"><h4>'+x.name+'</h4></div>'
			+'<div class="card-body">'
			+'<div class="row">'
			+'<div class="col-lg-1"><label>Project Details:</label></div>'
			+'<div class="col-lg-11"><p class="text-left">'+x.details+'</p></div>'
			+'</div></div></div>';
	}	
	var	contentHolder = document.getElementById("projects-area");
	contentHolder.innerHTML=el;	
	
//for(var i=0; i<1; i++){
//	x=jsondata[i];
//	el +='<div class="card" id="card_"><div class="card-header bg-dark" id="name_">'+x.name+'</div><div class="card-body bg-secondary"><p id="date_">'+x.date+'</p><p id="details_">'+x.details+'</p><img id="image_" src="'+x.image+'"></div></div>'
//	<div class="col-lg-2 card-image"><img src="'+x.image+'" alt="This Project\'s image could not be found."></div>;
	//<div class="project-card"><div class="card-info"><div class="row card-head"><h4>'+x.name+'</h4></div><div class="row card-body"><div class="col-md-2"><h6>Project Details:</h6></div><div class="col-md-10"><p>'+x.details+'</p></div></div></div></div>
//}
}
function buildElementsAward(jsondata){
	var el = "";
	var x;
	for(var i=0; i<jsondata.length; i++){
		x=jsondata[i];
		el +='<div class="row award-card box-shadow">'
			+'<div class="col-lg-2 card-image">'
			+'<img src="'+x.image+'" alt="This Award\'s image could not be found.">'
			+'</div><div class="col-lg-10 card-info">'
			+'<div class="row card-head"><h4>'+x.name+'</h4></div>'
			+'<div class="row">'
			+'<div class="col-sm-7"><label>Date:</label></div>'
			+'<div class="col-sm-5 align-r"><p>'+x.date+'</p></div>'
			+'</div><div class="row">'
			+'<div class="col-md-2"><label>Recipiant:</label></div>'
			+'<div class="col-md-10"><p>'+x.person+'</p></div>'
			+'</div></div></div>';
	}	
	var contentHolder = document.getElementById("awards-area");
	contentHolder.innerHTML=el;	
	
//for(var i=0; i<jsondata.length; i++){
//	x=jsondata[i];	
//	el +='<div class="contact-card"><div class="card-head"><h3>'+x.name+'</h3></div></div>';
//}
}
function buildElementsCalendar(jsondata){
	var el = "";
	var x;
	for(var i=0; i<jsondata.length; i++){
		x=jsondata[i];
		el +='<div class="calendar-card box-shadow">'
			+'<div class="card-head"><h3>'+x.event+'</h3></div>'
			+'<div class="card-body"><div class="row">'
			+'<div class="col-sm-2"><label>Date:</label></div>'
			+'<div class="col-sm-10"><p>'+x.date+', '+x.time+'</p></div>'
			+'</div><div class="row">'
			+'<div class="col-sm-2"><label>Location:</label></div>'
			+'<div class="col-sm-10"><p>'+x.location+'</p></div>'
			+'</div></div></div>';
	}	
	var contentHolder = document.getElementById("calendars-area");
	contentHolder.innerHTML=el;
}

//Page content
var requestContact;	// = new XMLHttpRequest();
var requestProject;	// = new XMLHttpRequest();
var requestAward;	// = new XMLHttpRequest();
var requestCalendar;// = new XMLHttpRequest();
//var type="";
//var contentHolder="";
loadDataContact();
loadDataProject();
loadDataAward();
loadDataCalendar();
function loadDataContact() {
	if(document.getElementById("contacts-area")){
		requestContact = new XMLHttpRequest();
		requestContact.open('GET', 'json/contacts.json');
	  	requestContact.onload = loadCompleteContact;
	  	requestContact.send();
	}
}
function loadDataProject() {
	if(document.getElementById("projects-area")){
		requestProject = new XMLHttpRequest();
		requestProject.open('GET', 'json/projects.json');
  		requestProject.onload = loadCompleteProject;
  		requestProject.send();
	}
}
function loadDataAward() {
	if(document.getElementById("awards-area")){
		requestAward = new XMLHttpRequest();
		requestAward.open('GET', 'json/awards.json');	
  		requestAward.onload = loadCompleteAward;
  		requestAward.send();
	}
}
function loadDataCalendar() {
	if(document.getElementById("calendars-area")){
		requestCalendar = new XMLHttpRequest();
		requestCalendar.open('GET', 'json/calendars.json');	
  		requestCalendar.onload = loadCompleteCalendar;
  		requestCalendar.send();
	}
} 

function loadCompleteContact(evt) {
  	dataX = JSON.parse(requestContact.responseText);
	buildElementsContact(dataX["contact-info"]);
}
function loadCompleteProject(evt) {
	dataX = JSON.parse(requestProject.responseText);
	buildElementsProject(dataX["project-info"]);
}
function loadCompleteAward(evt) {
  	dataX = JSON.parse(requestAward.responseText);
	buildElementsAward(dataX["award-info"]);
}
function loadCompleteCalendar(evt) {
	dataX = JSON.parse(requestCalendar.responseText);
	buildElementsCalendar(dataX["calendar-info"]);
}