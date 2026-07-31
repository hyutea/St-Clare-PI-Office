import { auth, db } from "./firebase.js";


import {

onAuthStateChanged,
signOut

}

from

"https://www.gstatic.com/firebasejs/12.2.1/firebase-auth.js";


import {

collection,
addDoc,
getDocs,
deleteDoc,
doc,
updateDoc,
serverTimestamp

}

from

"https://www.gstatic.com/firebasejs/12.2.1/firebase-firestore.js";




// CHECK LOGIN


onAuthStateChanged(auth,(user)=>{


if(!user){

window.location.replace("login.html");

}

});





// LOGOUT


document
.getElementById("logoutBtn")
.addEventListener("click",()=>{


signOut(auth)

.then(()=>{

window.location.href="index.html";

});


});





// POST ANNOUNCEMENT


document
.getElementById("postBtn")
.addEventListener("click",async()=>{


await addDoc(

collection(db,"announcements"),

{


title:
document.getElementById("title").value,


category:
document.getElementById("category").value,


deadline:
document.getElementById("deadline").value,


priority:
document.getElementById("priority").value,


description:
document.getElementById("description").value,


createdAt:
serverTimestamp()


}

);



document.getElementById("message").innerText =
"Announcement posted!";


loadAnnouncements();


});





// DISPLAY EXISTING


async function loadAnnouncements(){

const container =
document.getElementById(
"dashboardAnnouncements"
);


container.innerHTML="";


const snapshot =
await getDocs(
collection(db,"announcements")
);



snapshot.forEach((item)=>{


const data=item.data();


container.innerHTML += `

<div class="card">

<h2>${data.title}</h2>


<p>
Category:
${data.category}
</p>


<p>
Priority:
${data.priority}
</p>


<p>
Deadline:
${data.deadline}
</p>


<p>
${data.description}
</p>


<button onclick="editAnnouncement('${item.id}')">
Edit
</button>


<button onclick="deleteAnnouncement('${item.id}')">
Delete
</button>


</div>

`;

});


}




window.deleteAnnouncement = async(id)=>{


await deleteDoc(
doc(db,"announcements",id)
);


loadAnnouncements();


}

let currentEditId = null;


window.editAnnouncement = async(id)=>{


const snapshot =
await getDocs(collection(db,"announcements"));


snapshot.forEach((item)=>{


if(item.id === id){


const data=item.data();


currentEditId=id;


document.getElementById("editTitle").value =
data.title;


document.getElementById("editCategory").value =
data.category;


document.getElementById("editDeadline").value =
data.deadline;


document.getElementById("editPriority").value =
data.priority;


document.getElementById("editDescription").value =
data.description;


document.getElementById("editSection").style.display =
"block";


}


});


};

loadAnnouncements();

document
.getElementById("saveEditBtn")
.addEventListener("click",async()=>{


await updateDoc(

doc(db,"announcements",currentEditId),

{


title:
document.getElementById("editTitle").value,


category:
document.getElementById("editCategory").value,


deadline:
document.getElementById("editDeadline").value,


priority:
document.getElementById("editPriority").value,


description:
document.getElementById("editDescription").value


}

);



document.getElementById("editSection").style.display="none";


loadAnnouncements();

});
