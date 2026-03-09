let button = document.getElementById("SingIn");
button.addEventListener("click", function(event) {

     event.preventDefault();
 let username = document.getElementById("NewEnter");
 let Newvalue = username.value;
 let password = document.getElementById("password");
 let Passwordvalue = password.value;
 if(Newvalue == "admin" && Passwordvalue == "admin123"){
     window.location.assign("./home.html");
 }
 else{
        alert("Invalid username or password. Please try again.");
 }
  
 });

