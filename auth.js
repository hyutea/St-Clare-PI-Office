import { auth } from "./firebase.js";

import {

signInWithEmailAndPassword,

onAuthStateChanged

}

from

"https://www.gstatic.com/firebasejs/12.2.1/firebase-auth.js";



const loginButton = document.getElementById("loginBtn");



if(loginButton){


loginButton.addEventListener("click",()=>{


const email =
document.getElementById("email").value;


const password =
document.getElementById("password").value;



signInWithEmailAndPassword(

auth,

email,

password

)

.then(()=>{


window.location.href="dashboard.html";


})


.catch((error)=>{


document.getElementById("error").innerText =

"Invalid login details.";


});


});


}



onAuthStateChanged(auth,(user)=>{


if(user){

console.log(

"Logged in:",

user.email

);

}


});
