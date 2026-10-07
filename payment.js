const UPI_ID =
"9109836242@ybl";


function copyUPI() {

navigator.clipboard.writeText(
UPI_ID
);

alert(
"UPI ID copied:\n" +
UPI_ID
);

}


function openUPI() {

const amount =
document.getElementById(
"amount"
).value;


if(
!amount ||
Number(amount) <= 0
) {

alert(
"Please enter payment amount."
);

return;

}


const upiURL =

"upi://pay" +

"?pa=" +
encodeURIComponent(UPI_ID) +

"&pn=" +
encodeURIComponent(
"KunalTech"
) +

"&am=" +
encodeURIComponent(
amount
) +

"&cu=INR";


window.location.href =
upiURL;

}