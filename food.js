// Dependencies
// =============================================================
var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");

// Sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.PORT || 3000;

// Sets up the Express app to handle data parsing
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


var reservation = [
    {
      routeName: "Anthony",
      name: "Anthony",
      time: "7pm",
      phone: 345-345-3459
    },
    {  
        routeName: "Jarrett",
        name: "Jarrett",
        time: "8pm",
        phone: 567-345-1237
    },
    {
        routeName: "Dan",
        name: "Dan",
        time: "6pm",
        phone: 274-967-8573
    }
  
  ];

  var waitlist = [];



  app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "home.html"));
  });
  
  app.get("/reserve", function(req, res) {
    res.sendFile(path.join(__dirname, "reserve.html"));
  });

  app.get("/tables", function(req, res) {
    res.sendFile(path.join(__dirname, "tables.html"));
  });
  
  // Displays all reservations
  app.get("/api/reservations", function(req, res) {
    return res.json(reservation);
  });
  
  // Displays a single reservation, or returns false
  app.get("/api/reservation/:reservation", function(req, res) {
    var makeRes = req.params.reservation;
  
    console.log(makeRes);
  
    for (var i = 0; i < reservation.length; i++) {
      if (makeRes === reservation[i].routeName) {
        return res.json(reservation[i]);
      }
    }
  
    return res.json(false);
  });

  app.post("/api/reservations", function(req, res) {
  
    var newRes = req.body;
  
    newRes.routeName = newRes.name;
    
    if(reservation.length > 4){
        waitlist.push(newRes);
    }
    else{
        console.log(newRes);
  
        reservation.push(newRes);
      
        res.json(newRes) 
    }
  });

  app.post("/api/waitlist", function(req, res){
      var newWaitlist = req.body;

      newWaitlist.push(waitlist);

      console.log(newWaitlist);
  })

  app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });