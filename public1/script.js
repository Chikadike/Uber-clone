const burger = document.querySelector(".hamburger");
const menu = document.querySelector(".mobile-nav");
const signup = document.getElementById('signup');
const starte = document.getElementById("get");
const button = document.getElementById('sign');


button.addEventListener("click", () => {
   window.open('./signin.html');
})

starte.addEventListener("click",  () =>{
    window.open('./buzins.html');
});

burger.addEventListener("click", () => {
menu.classList.toggle("is-active");
burger.classList.toggle('is-active');
});

document.addEventListener("click", (event) => {
if (event.target === burger || event.target === menu) {
return;
}

menu.classList.remove("is-active");
burger.classList.remove("is-active");
});

// listening for the login button click event
signup.addEventListener('click', function(){
    window.location.href = './login.html';
});

//document.getElementById('availabilitySwitch').addEventListener('change', function(event) {
   // const isAvailable = event.target.checked;
    // Send the new availability status to the backend
    //fetch('/api/driver/availability', {
      //method: 'POST',
      //headers: {
        //'Content-Type': 'application/json',
      ////},
      //body: JSON.stringify({ available: isAvailable }),
    //})
    //.then(response => response.json())
   // .then(data => console.log(data))
    //.catch(error => console.error('Error:', error));
  //});

 // app.post('/api/driver/availability', async (req, res) => {
   // const { driverId, available } = req.body;
    //try {
      // Update the driver's availability in the database
      //await Driver.findByIdAndUpdate(driverId, { isAvailable: available });
      //res.status(200).json({ message: 'Availability updated' });
    //} catch (error) {
      //res.status(500).json({ message: error.message });
   // }
 // });
  
 // When the user clicks "Request Ride"
function requestRide(pickup, destination) {
  const rideRequest = {
      type: 'requestRide',
      pickup,
      destination,
  };
  userSocket.send(JSON.stringify(rideRequest));
}

// Handle responses from the server
userSocket.addEventListener('message', (event) => {
  const data = JSON.parse(event.data);
  if (data.type === 'rideAccepted') {
      // Display a message to the user that their ride has been accepted
  } else if (data.type === 'rideRejected') {
      // Display a message that the ride request was rejected
  }
});

// When a driver receives a ride request
driverSocket.addEventListener('message', (event) => {
  const data = JSON.parse(event.data);
  if (data.type === 'newRideRequest') {
      // Display the ride details (pickup, destination) to the driver
      // Allow the driver to accept or reject the request
      // Example: Show a modal with ride details and buttons for accept/reject
  }
});

// When the driver responds (accepts or rejects)
function respondToRideRequest(rideId, accepted) {
  const response = {
      type: 'driverResponse',
      rideId, // You'll need to track ride IDs
      accepted,
  };
  driverSocket.send(JSON.stringify(response));
}
  
