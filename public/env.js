$(document).ready(function () {
  // Get value on button click and show alert
  $("#login_btn").click(function () {
    var email = $("#email").val();
    var password = $("#password").val();
    
    let userDetails=JSON.parse(localStorage.getItem("userDetails"))
    
 
    if (userDetails.signupEmail === email && userDetails.signupPassword === password) {
      alert("Go Ahead!");
    } else {
        alert("Ooops");
    }
  });

});


$(document).ready(function () {
  // Get value on button click and show alert
  $("#signup_btn").click(function () {

    let userDetails={
        firstName: $("#first_name").val(),
        lastName: $("#last_name").val(),
        signupEmail: $("#signup_email").val(),
        signupPassword: $("#signup_password").val(),
            
    }

    

    localStorage.setItem("userDetails",JSON.stringify(userDetails))
    
   
    window.location.href= "./index.html"
    
  });
});
