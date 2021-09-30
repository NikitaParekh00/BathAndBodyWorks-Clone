document.getElementById("loginBtn").addEventListener("click", startLogin);

function startLogin() {
  let email = document.getElementById("loginEmailVal").value;
  let password = document.getElementById("loginPassVal").value;

  let all_users = JSON.parse(localStorage.getItem("users"));
  // console.log(all_users);

  all_users.forEach(function (user) {
    if (email === user.email && password === user.password) {
      alert("Logged in successfully");
      window.location.href = "../Homepage/homepage.html";
    }
    // if (email === undefined && password === undefined) {
    //   alert("Invalid Email or Password");
    // }
  });
}

document.getElementById("createAccount").addEventListener("click", function () {
  window.location.href = "../Login_SignUp/signup.html";
});
