const jobList =
document.getElementById("jobList");

const searchInput =
document.getElementById("search");

const filterStatus =
document.getElementById("filterStatus");


function getJobs() {

return JSON.parse(
localStorage.getItem(
"kunalTechJobs"
)
) || [];

}


function saveJobs(jobs) {

localStorage.setItem(
"kunalTechJobs",
JSON.stringify(jobs)
);

}


function renderJobs() {

const jobs =
getJobs();

const search =
searchInput.value.toLowerCase();

const filter =
filterStatus.value;


const filtered =
jobs.filter(function(job) {

const matchesSearch =

job.customer
.toLowerCase()
.includes(search)

||

job.phone
.includes(search)

||

job.id
.toLowerCase()
.includes(search);


const matchesStatus =

filter === "All"
||
job.status === filter;


return (
matchesSearch &&
matchesStatus
);

});


jobList.innerHTML = "";


if(filtered.length === 0) {

jobList.innerHTML =
"<p>No service records found.</p>";

updateStats(jobs);

return;

}


filtered.forEach(function(job) {

const card =
document.createElement("div");

card.className =
"job-card";


card.innerHTML = `

<div class="job-top">

<div>

<div class="job-id">
${job.id}
</div>

<h2>
${job.customer}
</h2>

<p>
📞 ${job.phone}
</p>

</div>

<div>

<span class="status">
${job.status}
</span>

<p>
Payment:
<b>
${job.payment}
</b>
</p>

</div>

</div>


<p>
<b>Service:</b>
${job.service}
</p>


<p>
<b>Problem:</b>
${job.problem || "Not provided"}
</p>


<p>
<b>Date:</b>
${job.date || "Not specified"}
</p>


<p>
<b>Amount:</b>
₹${job.amount}
</p>


<div class="job-actions">

<button
onclick="changeStatus('${job.id}','Pending')"
>
Pending
</button>

<button
onclick="changeStatus('${job.id}','In Progress')"
>
In Progress
</button>

<button
onclick="changeStatus('${job.id}','Completed')"
>
Completed
</button>

<button
onclick="changePayment('${job.id}')"
>
Mark Paid
</button>

<button
class="invoice"
onclick="printInvoice('${job.id}')"
>
Print Bill
</button>
<button
class="whatsapp"
onclick="sendWhatsApp('${job.id}')"
>
📱 WhatsApp
</button>

<button
class="delete"
onclick="deleteJob('${job.id}')"
>
Delete
</button>

</div>

`;


jobList.appendChild(card);

});

updateStats(jobs);

}


function changeStatus(
id,
status
) {

const jobs =
getJobs();

const job =
jobs.find(
item => item.id === id
);

if(!job) return;

job.status =
status;

saveJobs(jobs);

renderJobs();

}


function changePayment(id) {

const jobs =
getJobs();

const job =
jobs.find(
item => item.id === id
);

if(!job) return;

job.payment =
job.payment === "Paid"
? "Pending"
: "Paid";

saveJobs(jobs);

renderJobs();

}


function deleteJob(id) {

if(!confirm(
"Delete this service record?"
)) return;


const jobs =
getJobs().filter(
job => job.id !== id
);


saveJobs(jobs);

renderJobs();

}


function updateStats(jobs) {

document.getElementById(
"totalJobs"
).textContent =
jobs.length;


document.getElementById(
"pendingJobs"
).textContent =

jobs.filter(
job =>
job.status === "Pending"
).length;


document.getElementById(
"progressJobs"
).textContent =

jobs.filter(
job =>
job.status === "In Progress"
).length;


document.getElementById(
"completeJobs"
).textContent =

jobs.filter(
job =>
job.status === "Completed"
).length;

}


function printInvoice(id) {

    const job = getJobs().find(
        item => item.id === id
    );

    if (!job) return;

    const invoice = `
    <!DOCTYPE html>

    <html>

    <head>

        <title>
            KunalTech Bill - ${job.id}
        </title>

        <style>

            body {
                font-family: Arial, sans-serif;
                background: #f3f4f6;
                padding: 20px;
            }

            .bill {
                max-width: 700px;
                margin: auto;
                background: white;
                padding: 30px;
                border-radius: 12px;
            }

            .header {
                text-align: center;
            }

            .header h1 {
                color: #2563eb;
                margin-bottom: 5px;
            }

            .line {
                border-top: 1px solid #ddd;
                margin: 20px 0;
            }

            .customer,
            .service {
                margin-bottom: 20px;
            }

            .total {
                font-size: 24px;
                font-weight: bold;
            }

            .payment {
                text-align: center;
                margin-top: 25px;
            }

            .payment img {
                width: 220px;
                height: 220px;
                object-fit: contain;
            }

            .paid {
                color: green;
                font-weight: bold;
            }

            .pending {
                color: red;
                font-weight: bold;
            }

            .print-btn {
                display: block;
                margin: 20px auto;
                padding: 12px 25px;
                background: #2563eb;
                color: white;
                border: none;
                border-radius: 8px;
                cursor: pointer;
            }

            @media print {

                .print-btn {
                    display: none;
                }

                body {
                    background: white;
                }

                .bill {
                    box-shadow: none;
                }

            }

        </style>

    </head>


    <body>


        <div class="bill">


            <div class="header">

                <h1>
                    KunalTech
                </h1>

                <p>
                    Computer & Technology Services
                </p>

            </div>


            <div class="line"></div>


            <p>
                <b>Bill / Invoice:</b>
                ${job.id}
            </p>


            <p>
                <b>Date:</b>
                ${job.createdAt}
            </p>


            <div class="line"></div>


            <div class="customer">

                <h3>
                    Customer Details
                </h3>

                <p>
                    <b>Name:</b>
                    ${job.customer}
                </p>

                <p>
                    <b>Mobile:</b>
                    ${job.phone}
                </p>

            </div>


            <div class="service">

                <h3>
                    Service Details
                </h3>

                <p>
                    <b>Service:</b>
                    ${job.service}
                </p>

                <p>
                    <b>Problem:</b>
                    ${job.problem || "Not provided"}
                </p>

                <p>
                    <b>Service Status:</b>
                    ${job.status}
                </p>

            </div>


            <div class="line"></div>


            <p class="total">

                Total Amount:
                ₹${job.amount}

            </p>


            <p>

                Payment Status:

                <span class="${
                    job.payment === "Paid"
                    ? "paid"
                    : "pending"
                }">

                    ${job.payment}

                </span>

            </p>


            ${
                job.payment !== "Paid"

                ? `

                <div class="payment">

                    <h3>
                        Scan & Pay
                    </h3>

                    <img
                        src="kunaltech-qr.png"
                        alt="KunalTech UPI QR"
                    >

                    <p>
                        UPI ID:
                        <b>
                            9109836242@ybl
                        </b>
                    </p>

                    <p>
                        Scan the QR code to make payment.
                    </p>

                </div>

                `

                : ""

            }


            <div class="line"></div>


            <p style="text-align:center">

                Thank you for choosing
                <b>KunalTech</b>.

            </p>


            <button
                class="print-btn"
                onclick="window.print()"
            >

                🖨️ Print / Save Bill

            </button>


        </div>


    </body>

    </html>
    `;


    const billWindow =
        window.open(
            "",
            "_blank"
        );


    billWindow.document.write(
        invoice
    );


    billWindow.document.close();

}
function sendWhatsApp(id) {

    const job = getJobs().find(
        item => item.id === id
    );

    if (!job) return;

    const message =
        "KunalTech Service Details\n\n" +

        "Job ID: " + job.id + "\n" +

        "Customer: " + job.customer + "\n" +

        "Service: " + job.service + "\n" +

        "Problem: " +
        (job.problem || "Not provided") + "\n" +

        "Service Status: " + job.status + "\n" +

        "Payment Status: " + job.payment + "\n" +

        "Amount: ₹" + job.amount + "\n\n" +

        "Thank you for choosing KunalTech.";

    const phone =
        job.phone.replace(/\D/g, "");

    const whatsappNumber =
        "91" + phone;

    const url =
        "https://wa.me/" +
        whatsappNumber +
        "?text=" +
        encodeURIComponent(message);

    window.open(url, "_blank");
}
