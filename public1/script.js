const burger = document.querySelector(".hamburger");
const menu = document.querySelector(".mobile-nav");
const price = document.getElementById("sub");
const signup = document.getElementById('signup');
const starte = document.getElementById("get");
const login = document.getElementById('login');


login.addEventListener("click", () => {
    alert('driver added successfully')
});
price.addEventListener("click", () => {
   window.open('./login.html');
});

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

document.getElementById('availabilitySwitch').addEventListener('change', function(event) {
    const isAvailable = event.target.checked;
    // Send the new availability status to the backend
    fetch('/api/driver/availability', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ available: isAvailable }),
    })
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.error('Error:', error));
  });

  app.post('/api/driver/availability', async (req, res) => {
    const { driverId, available } = req.body;
    try {
      // Update the driver's availability in the database
      await Driver.findByIdAndUpdate(driverId, { isAvailable: available });
      res.status(200).json({ message: 'Availability updated' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
  
  
