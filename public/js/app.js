const contactForm = document.querySelector('.contact-form');

let names = document.getElementById('name');
let email = document.getElementById('email');
let subject = document.getElementById('subject');
let message = document.getElementById('message');

contactForm.addEventListener('submit', (e)=>{
    e.preventDefault(); // refresh the page when its submitted
    //console.log("Submitted");
    let formData = { //js object
        names: names.value,
        email: email.value,
        subject: subject.value,
        message: message.value
    }
    //console.log(formData);
    // using ajax to send this data
    let xhr = new XMLHttpRequest();
    xhr.open('POST', '/');
    xhr.setRequestHeader('content-type', 'application/json'); // send req in json format
    xhr.onload = function(){
        console.log(xhr.responseText);
        if(xhr.responseText == 'success'){  
            alert('Email sent');
            names.value = '';
            email.value = '';
            subject.value = '';
            message.value = '';
        } else {
            alert('Something went wrong')
        }
    }
    // send method
    xhr.send(JSON.stringify(formData)); // wrap the data in the json.strignify method
})