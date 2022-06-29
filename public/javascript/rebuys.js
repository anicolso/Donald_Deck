//js for rebuys (client side)
//rebuys
var div = document.getElementById("rebuyPrompt");
var numcredits = document.getElementById('creditnumber').innerHTML;
console.log('numcred', numcredits);
if (numcredits < 500) {
    console.log('less');
    div.className = '';
}

else {
    div.className = 'hidden';
}