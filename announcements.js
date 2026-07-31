import { db } from "./firebase.js";


import {

collection,

getDocs,

query,

orderBy

}

from

"https://www.gstatic.com/firebasejs/12.2.1/firebase-firestore.js";



const container = 

document.getElementById(
"announcementContainer"
);



async function loadAnnouncements(){


const q = query(

collection(db,"announcements"),

orderBy(

"createdAt",

"desc"

)

);



const snapshot = await getDocs(q);



container.innerHTML="";



snapshot.forEach((doc)=>{


const data = doc.data();



container.innerHTML += `


<div class="card">


<h2>

${data.title}

</h2>



<div class="info">


<span class="badge ${data.category.toLowerCase()}">

${data.category}

</span>


<span class="badge ${data.priority.toLowerCase()}">

${data.priority}

</span>


</div>



<p>

<strong>Deadline:</strong>

${data.deadline}

</p>


<br>


<p>

${data.description}

</p>


</div>


`;


});


}



loadAnnouncements();
