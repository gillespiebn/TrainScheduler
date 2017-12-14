// Initialize Firebase
  var config = {
    apiKey: "AIzaSyAkwo5_gMfVlgD2BRAlDz21X_F9zRn05hY",
    authDomain: "trainhomework-d10aa.firebaseapp.com",
    databaseURL: "https://trainhomework-d10aa.firebaseio.com",
    projectId: "trainhomework-d10aa",
    storageBucket: "trainhomework-d10aa.appspot.com",
    messagingSenderId: "1006596814724"
  };

  firebase.initializeApp(config);

var database = firebase.database();

// A button to add trains

$('#addTrainButton').on("click", function(event) {

	event.preventDefault();

	// inputs
	var trainName = $('#trainNameInput').val().trim();
	var trainDestination = $('#destinationInput').val().trim();
	var firstTrainTime = $('#firstTrainTimeInput').val().trim();
	var trainFrequency = $('#frequencyInput').val().trim();


	var newTrain = {
		name: trainName,
		destination: trainDestination,
		trainTime: firstTrainTime,
		frequency: trainFrequency
	};

	// Pushes everything to the database
	database.ref().push(newTrain);

	// log everything
	console.log(newTrain.name);
	console.log(newTrain.destination);
	console.log(newTrain.trainTime);
	console.log(newTrain.frequency);

	// alert
	alert("Train succesfully added");

	$("#trainNameInput").val("");
	$("#destinationInput").val("");
	$("#firstTrainTimeInput").val("");
	$("#frequencyInput").val("");	

});

database.ref().on("child_added", function(childSnapshot, prevChildKey) {

	console.log("Child Snapshot: " + childSnapshot.val());

	var trainName = childSnapshot.val().name;
	var trainDestination = childSnapshot.val().destination;
	var firstTrainTime = childSnapshot.val().trainTime;
	var trainFrequency = childSnapshot.val().frequency;	

	console.log("Train name: " + trainName);
	console.log("Destination: " + trainDestination);
	console.log("First train time: " + firstTrainTime);
	console.log("Frequency: " + trainFrequency);

// Moment Train time

	// current time
	var currentTime = moment().format("hh:mm A");

	console.log("The current time is: " + currentTime);

	// first train time -> moment time

	var firstTrainTimeMoment = parseInt(firstTrainTime);

	console.log("first train time moment: " + moment(childSnapshot.val().trainTime));

	// frequency - comes from input, needs to be able to add to moment.js

	var frequencyMoment = parseInt(trainFrequency);

	console.log(frequencyMoment);

	// Next arrival - first train time + frequency

	var nextArrival = moment().add(frequencyMoment, "minutes").format("hh:mm A");

	console.log("nextArrival: " + nextArrival);

	// minutes away - moment().subtract(nextArrival)

	var minutesAway = moment().subtract("minutes", nextArrival).format("hh:mm");

	console.log("minutes away: " + minutesAway);

	$("#trainTable > tbody").append("<tr><td>" + trainName + "</td><td>" +  trainDestination
	 + "</td><td>" + trainFrequency + "</td><td>" + nextArrival + "</td><td>" + minutesAway
	  + "</td></tr>");
});