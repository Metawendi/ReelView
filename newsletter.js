document.getElementById('newsletterForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the default form submission

    var email = document.getElementById('email').value;
    var modal = document.getElementById('myModal');
    var modalMessage = document.getElementById('modalMessage');

    // Email validation regex pattern
    var emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;

    if (emailPattern.test(email)) {
        // If email is valid
        modalMessage.innerText = 'Thank you for subscribing!';
    } else {
        // If email is not valid
        modalMessage.style.color = 'red';
        modalMessage.innerText = 'Please enter a valid email address.';
    }
    modal.style.display = 'block'; // Show the modal
});

// Get the modal
var modal = document.getElementById('myModal');

// Get the <span> element that closes the modal
var span = document.getElementsByClassName('close')[0];

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
    modal.style.display = 'none';
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = 'none';
    }
}