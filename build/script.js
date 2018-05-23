let long_months = ["January", "February", "March", "April", "May", "June", "July","August", "September", "October", "November", "December"];
let long_days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

let fillhead = ()=>{
	let el = "";
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
let requestFoot = new XMLHttpRequest();

let loadFoot = () => {
	requestFoot.open('GET', 'json/foot.json');
	requestFoot.onload = loadCompleteFoot;
  	requestFoot.send();	
}


let loadCompleteFoot = (evt) => {
  	let dataX = JSON.parse(requestFoot.responseText);
	buildFoot(dataX["foot-info"]);
}
let buildFoot = (jsondata) =>{
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

let resized = () =>{
	if(window.innerWidth<768){ showtitles();}
	else{ hidetitles();}
	
	if(document.getElementById('calendar-minimal-size')){		
		let doc = document.getElementById('calendar-minimal-size');
		if(window.innerWidth<577){// 518
			console.log("window min");
			doc.style.padding = 0;
			doc.style.marginLeft = "-15px";
			doc.style.marginRight = "-15px";		
		}
		else{		
			doc.style.padding = 0;
			doc.style.marginLeft = "10px";
			doc.style.marginRight = "10px";
		}
	}	
}

//Nav
let requestNav = new XMLHttpRequest();
let loadNav = () =>{
	requestNav.open('GET', 'json/nav.json');
	requestNav.onload = loadCompleteNav;
  	requestNav.send();
} 
let loadCompleteNav = (evt) => {
  	let dataX = JSON.parse(requestNav.responseText);
	buildNav(dataX["nav-info"]);
	
	$(document).ready(function(){
    $('[data-toggle="tooltip"]').tooltip({animation: true, delay: {show: 50, hide: 100}});   
	});
	resized();
}

let setActive = ()=>{	
	let path = window.location.pathname;
	let page = path.split("/").pop();
	console.log(page);
	if(page=="_applicationsubmitted.html"){
		page="_application.html";
	}
		
	let temp = document.getElementById(page);
	if(temp != null){
		temp.className +=" active";		
	}
}
let buildNav = (jsondata) =>{
	let el = "";	
	let elfull = "";	
	let elr = "";//opening
//	var right;
	let x;
	//brand
	elfull +='<div class="navbar-brand"></div>';
	//hamburger
     elfull +='<button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation" id="hamburger-btn"><i class="fa fa-bars" id="hamburger"></i></button>';
//	<span class="material-icons" id="hamburger">dehaze</span></button>
	//build
	elfull+='<div class="collapse navbar-collapse" id="navbarCollapse"><ul class="navbar-nav mr-auto">';
	
	for(let i=0; i<jsondata.length; i++){
		x=jsondata[i];		
		el='<li id="'+x.href+'" ';
		
		if(x.type && x.type=="dropdown"){
			el+='class="nav-item dropdown"><a href="'+x.href+'" class="nav-link dropdown-toggle" href="#" id="navbardrop" data-toggle="dropdown" ';
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
			else if(x.icon=="google"){		
				el+=' data-toggle="tooltip" data-placement="bottom" title="'+x.name+'"><div class="nav-links iconed-inner"><i class="material-icons">'+x.iconpath+'</i></div>';
			}
			else{
				el+='><div class="nav-links">'+x.name+'</div>';
			}
			el+='</a><div class="dropdown-menu">';
			
			let i;
			for(i=0; i<x.dropdowns.length; i++){
				el+='<a class="dropdown-item" href="'+x.dropdowns[i].href+'">'+x.dropdowns[i].name+'</a>';
			}
			el+='</div>'
		}
		else if(x.icon=="award"){
			el+='class="nav-item"><a href="'+x.href+'" class="nav-link" data-toggle="tooltip" data-placement="bottom" title="'+x.name+'"><div class="nav-links"><span class="fa-stack fa-lg" style="margin:0;margin-bottom:-10px;margin-top:0;padding:0;margin-left:0;width:35px;max-height:42px">'
				+'<i class="fa fa-certificate fa-stack-2x" style="font-size:28px"></i>'
				+'<i class="fa fa-chevron-up fa-stack-3x fa-inverse" style="font-size:26px;margin-top:0;margin-left:4.75px;margin-right:-5px"></i>'
				+'<i class="fa fa-circle fa-stack-1x fa-inverse" style="font-size:16px;margin-top:-6.5px;margin-left:0"></i>'
				+'</span><span class="sidetitle"> '+x.name+'</span></div></a>';
		}
		else if(x.icon=="awasome"){
			el+='class="nav-item"><a href="'+x.href+'" class="nav-link" data-toggle="tooltip" data-placement="bottom" title="'+x.name+'"><div class="nav-links"><i class="fa '+x.iconpath+'"></i><span class="sidetitle"> '+x.name+'</span></div></a>';
		}
		else if(x.icon=="google"){		
			el+='class="nav-item"><a href="'+x.href+'" class="nav-link iconed" data-toggle="tooltip" data-placement="bottom" title="'+x.name+'"><div class="nav-links iconed-inner"><i class="material-icons">'+x.iconpath+'</i></div></a></li>';
		}
		else{					
			el+='class="nav-item"><a href="'+x.href+'" class="nav-link"><div class="nav-links">'+x.name+'</div></a>';
		}
		el+='</li>';
		if(x.side && x.side=="right"){
			elr+=el;
		}
		else{
			elfull+=el;
		}
	}
	elr+="";//closure
	elfull+='</ul>'+elr+'</div>';			  
			  
	let conHol = document.getElementById("navbar-n");
	conHol.innerHTML=elfull;
	setActive();
}


let showtitles = () =>{
	let iconed = document.getElementsByClassName("sidetitle");
	let i;
	for(i=0; i<iconed.length; i++){
		iconed[i].style.display = "inline";
	}
	$(document).ready(function(){
    $('[data-toggle="tooltip"]').tooltip('dispose');   
	});
}
let hidetitles = () =>{
	let iconed = document.getElementsByClassName("sidetitle");
	let i;
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

let buildElementsContact = (jsondata) =>{
	let el = "";
	let x;
	let i;
	for( i=0; i<jsondata.length; i++){
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
	let contentHolder = document.getElementById("contacts-area");
	contentHolder.innerHTML=el;
}
let buildElementsProject = (jsondata) =>{
	let el = "";
	let x;
	let i;
	for(i=0; i<jsondata.length; i++){
		x=jsondata[i];
		el +='<div class="project-card box-shadow">'
			+'<div class="row card-head"><h4>'+x.name+'</h4></div>'
			+'<div class="card-body">'
			+'<div class="row">'
			+'<div class="col-lg-1"><label>Project Details:</label></div>'
			+'<div class="col-lg-11"><p class="text-left">'+x.details+'</p></div>'
			+'</div></div></div>';
	}	
	let	contentHolder = document.getElementById("projects-area");
	contentHolder.innerHTML=el;	
	
//for(var i=0; i<1; i++){
//	x=jsondata[i];
//	el +='<div class="card" id="card_"><div class="card-header bg-dark" id="name_">'+x.name+'</div><div class="card-body bg-secondary"><p id="date_">'+x.date+'</p><p id="details_">'+x.details+'</p><img id="image_" src="'+x.image+'"></div></div>'
//	<div class="col-lg-2 card-image"><img src="'+x.image+'" alt="This Project\'s image could not be found."></div>;
	//<div class="project-card"><div class="card-info"><div class="row card-head"><h4>'+x.name+'</h4></div><div class="row card-body"><div class="col-md-2"><h6>Project Details:</h6></div><div class="col-md-10"><p>'+x.details+'</p></div></div></div></div>
//}
}
let buildElementsAward = (jsondata) =>{
	let el = "";
	let x;
	let i;
	for(i=0; i<jsondata.length; i++){
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
	let contentHolder = document.getElementById("awards-area");
	contentHolder.innerHTML=el;	
	
//for(var i=0; i<jsondata.length; i++){
//	x=jsondata[i];	
//	el +='<div class="contact-card"><div class="card-head"><h3>'+x.name+'</h3></div></div>';
//}
}
let buildElementsCalendar = (jsondata) =>{
	console.log("Calendar build invoked:", calendarDay);
	let el = "";
	let x;
	let jsondata2;
	let i;
	if(calendarDay=="emptyday"){	}
	else {
//		if(calendarDay.charAt(0)=="M"){
//			console.log("month:", calendarDay);
//			var y;
//			var t=0;
//			var jsondata2 = [];
//			for(var i=0; i<jsondata.length; i++){
//				y=jsondata[i];
//				if('M'+(y.year+y.month)==calendarDay){
//					jsondata2[t] = y;
//					t +=1;
//				}
//			}
//			jsondata = jsondata2;
//		}
		if(calendarDay!="all"){
			console.log("day:", calendarDay);
			let y;
			let t=0;
			let i;
		 	jsondata2 = [];
			for(i=0; i<jsondata.length; i++){
				y=jsondata[i];
				if((y.year+y.month+y.day)==calendarDay){
					jsondata2[t] = y;
					t +=1;
				}
			}
			jsondata = jsondata2;
		}
		
		for(i=0; i<jsondata.length; i++){
			x=jsondata[i];
			let time = x.time+' '+(x.isAM?'AM': 'PM');
			el +='<div class="calendar-card box-shadow '+x.year+x.month+x.day+'">'// id="'+x.year+x.month+x.day+x.time+x.isAM+'"
				+'<div class="card-head"><h3>'+x.title+'</h3></div>'
				+'<div class="card-body"><div class="row">'
				+'<div class="col-sm-2"><label>Date:</label></div>'
				+'<div class="col-sm-10"><p>'+long_months[x.month-1]+' '+x.day+', '+time+'</p></div>'
				+'</div><div class="row">'
				+'<div class="col-sm-2"><label>Location:</label></div>'
				+'<div class="col-sm-10"><p>'+x.location+'</p></div>'
				+'</div></div></div>';
		}
	}
	
	let contentHolder = document.getElementById("calendars-area");
	contentHolder.innerHTML=el;
}

//Page content
let requestContact;	// = new XMLHttpRequest();
let requestProject;	// = new XMLHttpRequest();
let requestAward;	// = new XMLHttpRequest();
let requestCalendar;// = new XMLHttpRequest();
let calendarDay = 'emptyday';
//var type="";
//var contentHolder="";

let loadDataContact = () =>{
	if(document.getElementById("contacts-area")){
		requestContact = new XMLHttpRequest();
		requestContact.open('GET', 'json/contacts.json');
	  	requestContact.onload = loadCompleteContact;
	  	requestContact.send();
	}
}
let loadDataProject = () => {
	if(document.getElementById("projects-area")){
		requestProject = new XMLHttpRequest();
		requestProject.open('GET', 'json/projects.json');
  		requestProject.onload = loadCompleteProject;
  		requestProject.send();
	}
}
let loadDataAward = () =>{
	if(document.getElementById("awards-area")){
		requestAward = new XMLHttpRequest();
		requestAward.open('GET', 'json/awards.json');	
  		requestAward.onload = loadCompleteAward;
  		requestAward.send();
	}
}
let loadDataCalendar = () =>{
	if(document.getElementById("calendars-area")){
		requestCalendar = new XMLHttpRequest();
		requestCalendar.open('GET', 'json/calendars.json');	
  		requestCalendar.onload = loadCompleteCalendar;
  		requestCalendar.send();
	}	
} 
let loadDataCalendarDay = (dayid) =>{
	let dataX = JSON.parse(requestCalendar.responseText);
	calendarDay = dayid;
	console.log("dayid: ", dayid);
	buildElementsCalendar(dataX["calendar-info"]);
} 

let loadCompleteContact = (evt) =>{
  	let dataX = JSON.parse(requestContact.responseText);
	buildElementsContact(dataX["contact-info"]);
}
let loadCompleteProject = (evt) =>{
	let dataX = JSON.parse(requestProject.responseText);
	buildElementsProject(dataX["project-info"]);
}
let loadCompleteAward = (evt) =>{
  	let dataX = JSON.parse(requestAward.responseText);
	buildElementsAward(dataX["award-info"]);
}
let loadCompleteCalendar = (evt) =>{
	let dataX = JSON.parse(requestCalendar.responseText);
	buildElementsCalendar(dataX["calendar-info"]);
	$(document).ready(function(){
			$("#calendar-minimal-size").MEC({
				events: dataX["calendar-info"]
			});
		});
//}

//Calendar visual code
//body: data-spy="scroll"
//set div id = event.id, href="#section1"
//function cal(){


	
(function( $ ) {
	console.log("$ executed");
	// onclick="loadDataCalendarDay(\'all\')"
	
	let today = new Date();
	let cur_month = today.getMonth();
	let cur_year = today.getFullYear();

    $.fn.miniEventCalendar = $.fn.MEC = function(options) {
		let mover;
    	let settings = $.extend({
    		calendar_link : "",
    		events: []
        }, options );

    	mini_cal = this;

        mini_cal.addClass('mini-cal').html(calenderTpl);

        let tbody = mini_cal.find("#calTbody");
		let cal_title = mini_cal.find("#monthYear");
		let cal_footer = mini_cal.find("#calTFooter");
        let event_title = mini_cal.find("#eventTitle");
		let events_link = mini_cal.find("#calLink");

		cal_title.text(long_months[cur_month]+" "+cur_year);
        event_title.text("No events today.");
//		events_link.text("ALL EVENTS");
//		events_link.attr("href", '#calendars-area');
//		events_link.attr("onclick", "loadDataCalendarDay('M"+(cur_year+cur_month)+"')");

		let count= 0;
		if(!settings.calendar_link.length && !settings.events.length)
			cal_footer.css("display", "none");

			
		//  mini_cal.find(".month-mover").each(function(){
		// 	 mover = $(this);
		// 	 console.log("m:", mover);
		//  	mover.bind("click", function(){
		//  		if(count==1){//!mover.hasClass("next")){
		// 			 viewNextMonth();
		// 			 count=0;
		// 		 }
		// 		else if(count==0){//mover.hasClass("next")){
		// 			 viewPrevMonth();
		// 			 count =1;
		//  		}
		//  	});
		//  });
		 mini_cal.find(".next").bind("click", function(){
			// if(count==1){//!mover.hasClass("next")){
				viewNextMonth();
				//count=0;
			});
			
			mini_cal.find(".prev").bind("click", function(){
				// if(count==1){//!mover.hasClass("next")){
					viewPrevMonth();
					//count=0;
				});

		mini_cal.on("click, focusin", ".a-date", function(){
		    if(!$(this).hasClass('blurred'))
		        showEvent($(this).data('event'));
		});

		let populateCalendar = (month, year) => {
			let i;
			tbody.html("");
			cal_title.text(long_months[month] + " " + year);

			cur_month = month;
			cur_year = year;

			let ldate = new Date(year, month);
			let dt = new Date(ldate);
			
			if(ldate.getDate() === 1 && dt.getDay() != 1)
					tbody.append(last_prev_month_days(dt.getDay()));

			while (ldate.getMonth() === month) {
     			dt = new Date(ldate);
     			let isToday = areSameDate(ldate, new Date());
     			let event = null;
     			let event_index = settings.events.findIndex(function(ev) {
//			console.log("ev:", ev);
				let date2 = new Date(ev.year, ev.month-1, ev.day);
//			console.log("date2:", date2);
//			console.log("year:", date2.getFullYear);
		     		return areSameDate(dt, date2);//new Date(ev.date));
		     	});

		        if(event_index != -1){
		        	event = settings.events[event_index];

		        	if(isToday)
		        		showEvent(event);
		        }
				//day is made
     			tbody.append(date_tpl(false, ldate.getDate(), isToday, event));

     			ldate.setDate(ldate.getDate() + 1);

     			let buffer_days = 43 - mini_cal.find(".a-date").length;

		        if(ldate.getMonth() != month)
		        	for (i = 1; i < buffer_days; i++)
		     			tbody.append(date_tpl(true, i));
     		}
 		}

 		let last_prev_month_days = (day) =>{
			 let month_idx;
			 let year_idx;
 			if(cur_month > 0){
     			 month_idx = cur_month - 1;
     			 year_idx = cur_year;
     		}else{
     			if(cur_month < 11){
     				month_idx = 0;
     				year_idx = cur_year + 1;
     			}else{
     				month_idx = 11;
     				year_idx = cur_year - 1;
     			}
     		}
     		
     		let prev_month = getMonthDays(month_idx, year_idx);
     		let last_days = "";
        	for (let i = day; i > 0; i--)
     			last_days += date_tpl(true, prev_month[ prev_month.length - i]);

        	return last_days;
 		}

		function date_tpl(blurred, date, is_today, event){
		
		let tpl = "<div class='a-date blurred'><span>"+date+"</span></div>";
			if(!blurred){
		        let cls = is_today ? "current " : "";
		        cls += event && event !== null ? "event " : "";
				let funcval = "emptyday";
		        if(event && event !== null && event !==undefined && event.year){
					funcval = event.year+event.month+event.day+"";
				}
		    	 tpl ="<button class='a-date "+cls+"' data-event='"+JSON.stringify(event)+"'><span>"+date+"</span></button>";				
			}

			return tpl;
		}

		function showEvent(event){
			let dayid;
			if(event && event !== null && event !== undefined){
				event_title.text(event.title+" ...");
				console.log("event:", event);
				dayid = event.year+event.month+event.day+"";
				loadDataCalendarDay(dayid);
			}else{
				event_title.text("No events on this day.");
				dayid = "emptyday";
				loadDataCalendarDay(dayid);
			}
		}

		function viewNextMonth(){
			let next_month = cur_month < 11 ? cur_month + 1 : 0;
			let next_year = cur_month < 11 ? cur_year : cur_year + 1;

			populateCalendar(next_month, next_year);
		}

		function viewPrevMonth(){
			let prev_month = cur_month > 0 ? cur_month - 1 : 11;
			let prev_year = cur_month > 0 ? cur_year : cur_year - 1;
			
			populateCalendar(prev_month, prev_year);
		}

		function areSameDate(d1, d2) {
			return d1.getFullYear() == d2.getFullYear()
		        && d1.getMonth() == d2.getMonth()
		        && d1.getDate() == d2.getDate();
		}

		function getMonthDays(month, year) {
		     let date = new Date(year, month, 1);
		     let days = [];
		      	while (date.getMonth() === month) {
		        days.push(date.getDate());
		        date.setDate(date.getDate() + 1);
		     }
		     return days;
		}

		populateCalendar(cur_month, cur_year);

        return mini_cal;
    };
 
}( jQuery ));

let calenderTpl = '<div id="calTitle">'
+'<button class="month-mover prev">'
	+'<svg fill="#FFFFFF" height="30" viewBox="0 0 24 24" width="30" xmlns="http://www.w3.org/2000/svg">'
		+'<path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/>'
		+'<path d="M0 0h24v24H0z" fill="none"/></svg></button>'
+'<div id="monthYear"></div>'
+'<button class="month-mover next">'
	+'<svg fill="#FFFFFF" height="30" viewBox="0 0 24 24" width="30" xmlns="http://www.w3.org/2000/svg">'
		+'<path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/>'
		+'<path d="M0 0h24v24H0z" fill="none"/></svg></button></div>'
+'<div>'
	+'<div id="calThead">'
		+'<div>S</div>'
		+'<div>M</div>'
		+'<div>T</div>'
		+'<div>W</div>'
		+'<div>T</div>'
		+'<div>F</div>'
		+'<div>S</div>'
	+'</div>'
	+'<div id="calTbody"></div>'
+'</div>'
+'<div id="calTFooter">'
	+'<h3 id="eventTitle">No events today.</h3>'
	+'<a href="#calendars-area" id="calLink" onclick="loadDataCalendarDay(\'all\')">ALL EVENTS</a></div>';
	}

loadFoot();
loadNav();
loadDataContact();
loadDataProject();
loadDataAward();
loadDataCalendar();