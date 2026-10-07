const serviceList =
document.getElementById("serviceList");

const customerService =
document.getElementById("customerService");

const bookingForm =
document.getElementById("bookingForm");


services.forEach(function(service) {

const card =
document.createElement("div");

card.className =
"service-card";

card.innerHTML = `

<h3>
${service.name}
</h3>

<p>
${service.category}
</p>

<p class="price">

${
service.price > 0
? "Starting ₹" + service.price
: "Custom Price"
}

</p>

`;

serviceList.appendChild(card);


const option =
document.createElement("option");

option.value =
service.name;

option.textContent =
service.name +
(
service.price > 0
? " - ₹" + service.price
: ""
);

customerService.appendChild(option);

});


bookingForm.addEventListener(
"submit",
function(event) {

event.preventDefault();


const name =
document.getElementById(
"customerName"
).value.trim();


const phone =
document.getElementById(
"customerPhone"
).value.trim();


const service =
document.getElementById(
"customerService"
).value;


const problem =
document.getElementById(
"problem"
).value.trim();


const date =
document.getElementById(
"serviceDate"
).value;


if(!/^[0-9]{10}$/.test(phone)) {

alert(
"Please enter a valid 10 digit mobile number."
);

return;

}


const jobs =
JSON.parse(
localStorage.getItem(
"kunalTechJobs"
)
) || [];


const jobNumber =
"KT-" +
new Date().getFullYear() +
"-" +
String(
jobs.length + 1
).padStart(4,"0");


const newJob = {

id: jobNumber,

customer: name,

phone: phone,

service: service,

problem: problem,

date: date,

status: "Pending",

payment: "Pending",

amount: getServicePrice(service),

createdAt:
new Date().toLocaleString()

};


jobs.push(newJob);


localStorage.setItem(
"kunalTechJobs",
JSON.stringify(jobs)
);


alert(
"Service request submitted!\n\n" +
"Job ID: " +
jobNumber +
"\nStatus: Pending"
);


bookingForm.reset();

});


function getServicePrice(
serviceName
) {

const service =
services.find(
item =>
item.name === serviceName
);

return service
? service.price
: 0;

}