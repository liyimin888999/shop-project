let unloginUl = document.querySelector("#unlogin-ul");
let loginUl = document.querySelector("#login-ul");
let usernameSpan = document.querySelector("#username-span");

let username = tools.cookie("username");
if(username) {
  unloginUl.classList.add("hidden");
  usernameSpan.innerHTML = username;
  loginUl.classList.remove("hidden");
}

let quit = document.querySelector("#quit");
if(quit){
	quit.onclick = function() {
		loginUl.classList.add("hidden");
	  unloginUl.classList.remove("hidden");
	}
}
