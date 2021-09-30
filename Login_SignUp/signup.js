document.getElementById("createAccount").addEventListener("click", getUserData);

async function getUserData() {
  let Fname = document.getElementById("signUpFName").value;
  let Lname = document.getElementById("signUpLName").value;
  let email = document.getElementById("signUpEmail").value;
  let street = document.getElementById("signUpStreet").value;
  let city = document.getElementById("signUpCity").value;
  let state = document.getElementById("signUpState").value;
  let zipcode = document.getElementById("signUpZipcode").value;
  let phone = document.getElementById("signUpPhone").value;
  let password = document.getElementById("signUpPassword").value;

  if (localStorage.getItem("users") === null) {
    localStorage.setItem("users", JSON.stringify([]));
  }

  //grab and prepare user data
  let user = {
    Fname,
    Lname,
    email,
    street,
    city,
    state,
    zipcode,
    phone,
    password,
  };

  //get array from localStorage
  let arr = JSON.parse(localStorage.getItem("users"));

  //push new user to array
  arr.push(user);

  localStorage.setItem("users", JSON.stringify(arr));

  window.location.href = "../Login_SignUp/login.html";
}
