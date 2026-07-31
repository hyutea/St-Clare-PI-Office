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



let allAnnouncements = [];



async function loadAnnouncements(){


const q=query(

collection(db,"announcements"),

orderBy(
"createdAt",
"desc"
)

);



const snapshot =
await getDocs(q);



allAnnouncements=[];



snapshot.forEach((doc)=>{


allAnnouncements.push({

id:doc.id,

...doc.data()

});


});


displayAnnouncements("All");


}





function displayAnnouncements(category){


container.innerHTML="";
if(allAnnouncements.length === 0){

container.innerHTML = `

<div class="card">

<h2>
No announcements yet
</h2>

<p>
Please check back later.
</p>

</div>

`;

return;

}




allAnnouncements

.filter(item=>{

return category==="All" ||

item.category===category;

})


.forEach(data=>{


container.innerHTML += `


<div class="card priority-${data.priority.toLowerCase()}">


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

<p class="date">

Posted:
${data.createdAt
?
data.createdAt.toDate().toLocaleDateString()
:
"Just now"}

</p>

</div>


`;


});


}





document
.querySelectorAll(".filter")
.forEach(button=>{


button.addEventListener(
"click",
()=>{


document
.querySelectorAll(".filter")
.forEach(btn=>

btn.classList.remove("active")

);



button.classList.add("active");



displayAnnouncements(
button.dataset.category
);



}

);


});




loadAnnouncements();
