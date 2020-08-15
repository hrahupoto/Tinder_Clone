$(document).ready(function () {
  // Get value on button click and show alert
  $("#login_btn").click(function () {
    var email = $("#email").val();
    var password = $("#password").val();

    $.ajax({
        type:'GET',
        url:'/check_user',
        data: {email,password},
        success: function(data){
            window.location.href = data;
            if(data=="./index.html"){
                alert("User not found!")
            }
        },
        error:function(){
            
        }
    });
    

  
  });
});

$(document).ready(function () {
  // Get value on button click and show alert
  $("#signup_btn").click(function () {
    let userDetails = {
      firstName: $("#first_name").val(),
      lastName: $("#last_name").val(),
      signupEmail: $("#signup_email").val(),
      signupPassword: $("#signup_password").val(),
    };


    $.ajax({
        type:'GET',
        url:'/save_userdetails',
        data: userDetails,
        success: function(newdata){
            alert(newdata)
        },
        error:function(){
            alert('error saving data')
        }
    });
    window.location.href = "./index.html";
  });
});
