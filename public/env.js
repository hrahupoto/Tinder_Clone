$(document).ready(function () {
  // Get value on button click and show alert
  $("#login_btn").click(function () {
    var email = $("#email").val();
    var password = $("#password").val();

    $.ajax({
      type: "GET",
      url: "/check_user",
      data: { email, password },
      success: function (data) {
        if (data == "./index.html") {
          alert("Incorrect email or password");
        } else {
          sessionStorage.setItem("user_Session", "logged-in");
          sessionStorage.setItem("firstName", data.firstName);
          sessionStorage.setItem("lastName", data.lastName);
          sessionStorage.setItem("signupEmail", data.signupEmail);
          sessionStorage.setItem("signupPassword", data.signupPassword);
          sessionStorage.setItem("profilePhoto", data.profilePhoto);

          window.location.href = "./user.html";
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
    document.getElementById("reset_btn").style.display = "block";
    //document.getElementById("add_btn").style.display = "block";

    $("#userdetails").html(
      "<ul class='collection'><li id='item1' class='collection-item'></li><li id='item2' class='collection-item'></li><li id='item3' class='collection-item'></li></ul>"
    );

    // $.ajax({
    //   type: "GET",
    //   url: "/userdetails",
    //   success: function (data) {

    document.getElementById("item1").innerHTML =
      "First Name: " + sessionStorage.getItem("firstName");
    document.getElementById("item2").innerHTML =
      "Last Name: " + sessionStorage.getItem("lastName");
    document.getElementById("item3").innerHTML =
      "Email: " + sessionStorage.getItem("signupEmail");
    document
      .getElementById("photo")
      .setAttribute("src", sessionStorage.getItem("profilePhoto"));
  });
});

$(document).ready(function () {
  $("#matches").click(function () {
    document.getElementById("content").style.display = "block";
    document.getElementById("userdetails").style.display = "none";
    document.getElementById("profile_photo").style.display = "none";
    document.getElementById("reset_btn").style.display = "none";
  });
});

$(document).ready(function () {
  $("#reset_btn").click(function () {
    if (
      confirm(
        "Warning! First user entered data would be erased from the database"
      )
    ) {
      $.ajax({
        type: "GET",
        url: "/delete_userlikes",
        success: function (data) {
          if (data == null) {
            //savelikes();
            console.log(data);
          } else {
            console.log(data);
          }
        },

        error: function () {},
      });
      console.log("Data has been erased");
    } else {
      console.log("Operation Cancelled");
    }
  });
});

$(document).ready(function () {
  var img_new = [];
  var j = 0;
  var lk = 0;
  var dl = 0;
  var like = [];
  var dislike = [];

  try {
    profile_photo = sessionStorage.getItem("profilePhoto");
    current_picture = document.getElementById("dynamic").getAttribute("src");
    var imgArray = [
      "./images/user1.jpg",
      "./images/user2.jpg",
      "./images/user3.jpg",
      "./images/user4.jpg",
      "./images/user5.jpg",
      "./images/user6.jpg",
    ];

    for (var i = 0; i <= 5; i++) {
      if (
        !imgArray[i].includes(profile_photo) &&
        !imgArray[i].includes(current_picture)
      ) {
        img_new[j++] = imgArray[i];
      }
    }
  } catch (error) {
    console.log(error);
  }

  $("#content").draggable({ revert: "valid" });

  $("#droppable_left").droppable({
    classes: {
      "ui-droppable-active": "ui-state-active",
      "ui-droppable-hover": "ui-state-hover",
    },
    drop: function (event, ui) {
      $(this).addClass("ui-state-highlight").find("p").html("Dropped!");
      $("#content").append('<div id="dislike" class="dislike">Dislike!</div>');
      current_picture = document.getElementById("dynamic").getAttribute("src");

      if (img_new[count] == undefined) {
        //$("#content").detach();
        setTimeout(function () {
          $.ajax({
            type: "GET",
            url: "/check_userlikes",
            success: function (data) {
              if (data === "null") {
                savelikes();
                console.log(data);
                console.log("I am here");
              } else {
                var tempVar = sessionStorage.getItem("firstName");
                tempVar = tempVar.match(/\d/);
                console.log("I am here");
                console.log(data.usersLikes[6].firstUser[0]);

                for (var i = 0; i < data.usersLikes.length - 1; i++) {
                  console.log(data.usersLikes.length);
                  if (
                    data.usersLikes[i].userNumber ==
                    data.usersLikes[6].firstUser[0]
                  ) {
                    previousUserLikes = data.usersLikes[i].userLikes;
                    console.log(previousUserLikes);
                  }
                }
                for (var i = 0; i < like.length; i++) {
                  if (data.usersLikes[6].firstUser[0] == like[i]) {
                    console.log(
                      "User " +
                        data.usersLikes[6].firstUser[0] +
                        " is liked by User " +
                        tempVar
                    );
                  }
                }
                for (var j = 0; j < previousUserLikes.length; j++) {
                  if (tempVar == previousUserLikes[j]) {
                    console.log(
                      "User " +
                        tempVar +
                        " is liked by User " +
                        data.usersLikes[6].firstUser[0]
                    );
                  }
                }

                if (
                  tempVar == previousUserLikes[0] &&
                  data.usersLikes[6].firstUser[0] == like[0]
                ) {
                  alert(
                    "You Have Been Matched!\n" +
                      "User " +
                      data.usersLikes[6].firstUser[0] +
                      " is liked by User " +
                      tempVar +
                      "\n" +
                      "User " +
                      tempVar +
                      " is liked by User " +
                      data.usersLikes[6].firstUser[0]
                  );
                  var whoLikesWho =
                    "You Have Been Matched!\n" +
                    "User " +
                    data.usersLikes[6].firstUser[0] +
                    " is liked by User " +
                    tempVar +
                    "\n" +
                    "User " +
                    tempVar +
                    " is liked by User " +
                    data.usersLikes[6].firstUser[0];

                  $.ajax({
                    type: "GET",
                    url: "/sendEmail",
                    data: { whoLikesWho },
                    success: function (data) {
                      alert(data);
                    },

                    error: function () {},
                  });

                  localStorage.setItem(
                    "user_One",
                    data.usersLikes[6].firstUser[0]
                  );
                  localStorage.setItem("user_Two", tempVar);
                  window.location.href = "./match.html";
                  var str =
                    "You have been Emailed!\n Check Your Inboxes\n First User Email: ut9614529@gmail.com\n Second User Email: ut63620@gmail.com\n Use Password: !Q@W3e4r to Login";

                  alert(str);
                }
              }
            },

            error: function () {},
          });

          if (dislike.length == 5) {
            alert("Sorry there are no more matches now");
          }
        }, 1000);
      }

      $("#content > img").detach();
      $("#dislike").fadeOut(500, function () {
        $(this).remove();
      });

      firstDigit = current_picture.match(/\d/);
      dislike[dl++] = firstDigit[0];
      console.log(dislike);

      setTimeout(function () {
        var img = $('<img id="dynamic" src="">');

        count = localStorage.getItem("count");

        img.attr("src", img_new[count++]);

        localStorage.setItem("count", count);

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
      current_picture = document.getElementById("dynamic").getAttribute("src");

      if (img_new[count] == undefined) {
        //$("#content").detach();
        setTimeout(function () {
          $.ajax({
            type: "GET",
            url: "/check_userlikes",
            success: function (data) {
              if (data === "null") {
                console.log(data);
                console.log("I am here");
                savelikes();
              } else {
                var tempVar = sessionStorage.getItem("firstName");
                tempVar = tempVar.match(/\d/);
                console.log("I am here");
                console.log(data.usersLikes[6].firstUser[0]);

                for (var i = 0; i < data.usersLikes.length - 1; i++) {
                  console.log(data.usersLikes.length);
                  if (
                    data.usersLikes[i].userNumber ==
                    data.usersLikes[6].firstUser[0]
                  ) {
                    previousUserLikes = data.usersLikes[i].userLikes;
                    console.log(previousUserLikes);
                  }
                }
                for (var i = 0; i < like.length; i++) {
                  if (data.usersLikes[6].firstUser[0] == like[i]) {
                    console.log(
                      "User " +
                        data.usersLikes[6].firstUser[0] +
                        " is liked by User " +
                        tempVar
                    );
                  }
                }
                for (var j = 0; j < previousUserLikes.length; j++) {
                  if (tempVar == previousUserLikes[j]) {
                    console.log(
                      "User " +
                        tempVar +
                        " is liked by User " +
                        data.usersLikes[6].firstUser[0]
                    );
                  }
                }

                if (
                  tempVar == previousUserLikes[0] &&
                  data.usersLikes[6].firstUser[0] == like[0]
                ) {
                  alert(
                    "You Have Been Matched!\n" +
                      "User " +
                      data.usersLikes[6].firstUser[0] +
                      " is liked by User " +
                      tempVar +
                      "\n" +
                      "User " +
                      tempVar +
                      " is liked by User " +
                      data.usersLikes[6].firstUser[0]
                  );

                  var whoLikesWho =
                    "You Have Been Matched!\n" +
                    "User " +
                    data.usersLikes[6].firstUser[0] +
                    " is liked by User " +
                    tempVar +
                    "\n" +
                    "User " +
                    tempVar +
                    " is liked by User " +
                    data.usersLikes[6].firstUser[0];

                  $.ajax({
                    type: "GET",
                    url: "/sendEmail",
                    data: { whoLikesWho },
                    success: function () {},

                    error: function () {},
                  });

                  localStorage.setItem(
                    "user_One",
                    data.usersLikes[6].firstUser[0]
                  );
                  localStorage.setItem("user_Two", tempVar);
                  window.location.href = "./match.html";
                  var str =
                    "You have been Emailed!\n Check Your Inboxes\n First User Email: ut9614529@gmail.com\n Second User Email: ut63620@gmail.com\n Use Password: !Q@W3e4r to Login";
                 
                  alert(str);
                }
              }
            },

            error: function () {},
          });
        }, 1000);
      }
      $("#content > img").detach();

      $("#like").fadeOut(500, function () {
        $(this).remove();
      });

      firstDigit = current_picture.match(/\d/);
      like[lk++] = firstDigit[0];
      console.log(like);

      setTimeout(function () {
        var img = $('<img id="dynamic" src="">');

        count = localStorage.getItem("count");

        img.attr("src", img_new[count++]);

        localStorage.setItem("count", count);

        img.appendTo("#content");
      }, 500);
    },
  });

  const savelikes = () => {
    var users = ["1", "2", "3", "4", "5", "6"];
    var tempVar = sessionStorage.getItem("firstName");
    console.log("I am here");
    tempVar = tempVar.match(/\d/);

    var usersLikes = [
      (user1 = {
        userNumber: 1,
        userLikes: 0,
      }),
      (user2 = {
        userNumber: 2,
        userLikes: 0,
      }),
      (user3 = {
        userNumber: 3,
        userLikes: 0,
      }),
      (user4 = {
        userNumber: 4,
        userLikes: 0,
      }),
      (user5 = {
        userNumber: 5,
        userLikes: 0,
      }),
      (user6 = {
        userNumber: 6,
        userLikes: 0,
      }),
      (data = {
        count: 1,
        firstUser: 0,
        secondUser: 0,
      }),
    ];

    for (var i = 0; i < usersLikes.length; i++) {
      if (usersLikes[i].userNumber == tempVar) {
        console.log(usersLikes[i].userNumber);
        usersLikes[i].userLikes = like;
        usersLikes[6].firstUser = tempVar;
      }
    }

    $.ajax({
      type: "GET",
      url: "/insert_userLikes",
      data: { usersLikes },
      success: function (data) {},
      error: function () {},
    });
  };
});

$(document).ready(function () {
  $("#matches_1").click(function () {
    document.getElementById("content_1").style.display = "block";
    document.getElementById("userdetails_1").style.display = "none";
    document.getElementById("profile_photo_1").style.display = "none";
  });
});

$(document).ready(function () {
  $("#matches_2").click(function () {
    document.getElementById("content_2").style.display = "block";
    document.getElementById("userdetails_2").style.display = "none";
    document.getElementById("profile_photo_2").style.display = "none";
  });
});

$(document).ready(function () {
  $("#profile_1").click(function () {
    document.getElementById("content_1").style.display = "none";
    document.getElementById("userdetails_1").style.display = "block";
    document.getElementById("profile_photo_1").style.display = "block";
  });
});

$(document).ready(function () {
  $("#profile_2").click(function () {
    document.getElementById("content_2").style.display = "none";
    document.getElementById("userdetails_2").style.display = "block";
    document.getElementById("profile_photo_2").style.display = "block";
  });
});
