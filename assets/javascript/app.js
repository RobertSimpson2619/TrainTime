// initialize firebase

var config = {
      apiKey: "AIzaSyC7k5orn72raCsECSpgRKxDPadMmaqJ1-E",
      authDomain: "fir-recent-user-push-4a3ad.firebaseapp.com",
      databaseURL: "https://employeedata-118ff.firebaseio.com/",
      projectId: "fir-recent-user-push-4a3ad",
      storageBucket: "fir-recent-user-push-4a3ad.appspot.com",
      messagingSenderId: "572750486144"
    };

firebase.initializeApp(config);

var database = firebase.database();


var trainName = "";
var destination = "";
var originalTime = "";
var frequency = 0;
var nextArrival = "";
var minutesAway = 0;


$("#addTrain").on("click", function (event){
	event.preventDefault();

	trainName = $("#trainName-Input").val().trim();
	destination = $("#destination-Input").val().trim();
	originalTime = $("#trainTime-Input").val().trim();
	frequency = $("#frequency-Input").val().trim();

	console.log(originalTime);

	database.ref().push({
		trainName: trainName,
		destination: destination,
		originalTime: originalTime,
		frequency: frequency
	});
});

database.ref().on("child_added",function(childSnapshot){
	// this is where we will append data and calculate minutesaway and nextx arrival time
	
	var trainDepartureTime = moment().format("MMMM Do YYYY, " + childSnapshot.val().originalTime + " a");
		console.log(trainDepartureTime);



	var a = childSnapshot.val().originalTime;
	var b = moment().format("HHmm");

	
	
	

	
    var firstdigit = (''+a)[0];
	var seconddigit = (''+a)[1];
	var thirddigit = (''+a)[2];
	var fourthdigit = (''+a)[3];

	var bfirstdigit = (''+b)[0];
	var bseconddigit = (''+b)[1];
	var bthirddigit = (''+b)[2];
	var bfourthdigit = (''+b)[3];



	

	var addedMinutes = thirddigit + fourthdigit;
	addedMinutes = parseInt(addedMinutes);

	


	var baddedMinutes = bthirddigit + bfourthdigit;
	baddedMinutes = parseInt(baddedMinutes);

	
		

	var addeddigit = firstdigit + seconddigit;
	var toMinutes = addeddigit * 60;

	


	var baddeddigit = bfirstdigit + bseconddigit
	var btoMinutes = baddeddigit * 60;

	


	var totalMinutesA = addedMinutes + toMinutes;
	var totalMinutesB = baddedMinutes + btoMinutes;

	var absouluteMinutes = totalMinutesB - totalMinutesA;


	

	var minutes = absouluteMinutes % 60;
	console.log(minutes);

	minutes = minutes % childSnapshot.val().frequency;
	console.log(minutes);

	minutesAway = childSnapshot.val().frequency - minutes;

	nextArrival = new moment().add(minutesAway, 'minutes').format("hh:mm a");


	



	$("#tableContent-Display").append("<tr><td>" + childSnapshot.val().trainName + "</td><td>" 
		+ childSnapshot.val().destination + "</td><td>" +  childSnapshot.val().frequency + "</td><td>"
		+ nextArrival + "</td><td>" +  minutesAway +  "</td></tr>" );
})

database.ref().on("value", function(snapshot){


	if(snapshot == undefined){
		database-ref().push({
			trainName: trainName,
			destination: destination,
			originalTime: originalTime,
			frequency: frequency
		});
	}
	else{
		var sv = snapshot.val();
		var svArr = Object.keys(sv);
		var lastIndex = svArr.length -1; 
		var lastKey = svArr[lastIndex];
		var lastObj = sv[lastKey];

	}
}, function(errorObject){
	console.log("Errors Handled: " + errorObject.code);
});

 var time = new Date().getTime();
     $(document.body).bind("mousemove keypress", function(e) {
         time = new Date().getTime();
     });

     function refresh() {
         if(new Date().getTime() - time >= 60000) 
             window.location.reload(true);
         else 
             setTimeout(refresh, 10000);
     }

     setTimeout(refresh, 10000);