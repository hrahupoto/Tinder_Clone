$(document).ready(function () {
  // Get value on button click and show alert
  $("#login_btn").click(function () {
    var email = $("#email").val();
    var password = $("#password").val();

    // var img = $('<img id="dynamic">');
    // img.attr("src", "./images/User_1.jpg");
    // img.appendTo("#content");

    $.ajax({
      type: "GET",
      url: "/check_user",
      data: { email, password },
      success: function (data) {
        if (data == "./user.html") {
          window.location.href = data;
          sessionStorage.setItem("user_Session", "logged-in");
        } else {
          alert("Incorrect email or password");
        }
      },
      error: function () {},
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
      type: "GET",
      url: "/save_userdetails",
      data: userDetails,
      success: function (newdata) {
        //alert(newdata);
      },
      error: function () {
        alert("error saving data");
      },
    });

    window.location.href = "./index.html";
  });
});

$(document).ready(function () {
  $("#profile").click(function () {
    document.getElementById("content").style.display = "none";
    document.getElementById("userdetails").style.display = "block";
    document.getElementById("profile_photo").style.display = "block";
    //document.getElementById("add_btn").style.display = "block";

    $("#userdetails").html(
      "<ul class='collection'><li id='item1' class='collection-item'></li><li id='item2' class='collection-item'></li><li id='item3' class='collection-item'></li></ul>"
    );

    $.ajax({
      type: "GET",
      url: "/userdetails",
      success: function (data) {
        document.getElementById("item1").innerHTML =
          "First Name: " + data.firstName;
        document.getElementById("item2").innerHTML =
          "Last Name: " + data.lastName;
        document.getElementById("item3").innerHTML =
          "Email: " + data.signupEmail;
      },
    });
  });
});

$(document).ready(function () {
  $("#matches").click(function () {
    document.getElementById("content").style.display = "block";
    document.getElementById("userdetails").style.display = "none";
    document.getElementById("profile_photo").style.display = "none";
    //document.getElementById("add_btn").style.display = "none";
  });
});

$(document).ready(function () {
  $("#content").draggable({ revert: "valid" });

  $("#droppable_left").droppable({
    classes: {
      "ui-droppable-active": "ui-state-active",
      "ui-droppable-hover": "ui-state-hover",
    },
    drop: function (event, ui) {
      $(this).addClass("ui-state-highlight").find("p").html("Dropped!");
      
      $("#content").append('<div id="dislike" class="dislike">Dislike!</div>');
      

      $("#content > img").remove();
      $("#dislike").fadeOut(700);
      setTimeout(function () {
        var img = $('<img id="dynamic">');
        img.attr("src", "./images/User_1.jpg");

        img.appendTo("#content");
      }, 500);
    },
  });

  $("#droppable_right").droppable({
    classes: {
      "ui-droppable-active": "ui-state-active",
      "ui-droppable-hover": "ui-state-hover",
    },
    drop: function (event, ui) {
      $(this).addClass("ui-state-highlight").find("p").html("Dropped!");
      $("#content").append('<div id="like" class="like">Like!</div>');
      $("#content > img").remove();
      
      $("#like").fadeOut(700);
      setTimeout(function () {
        var img = $('<img id="dynamic">');
        img.attr("src", "./images/User_1.jpg");

        img.appendTo("#content");
      }, 700);
    },
  });
});

// $(document).ready(function () {
//   $('#btn-floating').click(function(){
//      $(this).trigger('click');
//     });
// });
