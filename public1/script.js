const burger = document.querySelector(".hamburger");
const menu = document.querySelector(".mobile-nav");
const price = document.getElementById("sub");
const signup = document.getElementById('signup');
const starte = document.getElementById("get");

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

