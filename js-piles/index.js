const butLogin = document.querySelector("#login");
const username = document.querySelector("#username").value;
const password = document.querySelector("#password").value;

const login = () => {
  console.log(document.querySelector("#username").value);
  console.log(document.querySelector("#password").value);
};

butLogin.addEventListener("click", login);
