$(document).ready(function(){
    // Get value on button click and show alert
    $("#login_btn").click(function(){
        var str_1 = $("#email").val();
        var str_2 = $("#password").val();

        window.history.forward();
        alert(str_1 + str_2);
    });
});