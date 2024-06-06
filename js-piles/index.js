const butLogin = document.querySelector("#login");
const integrityWarning = document.querySelector("#integrityWarning");

const login = () => {
  console.log(document.querySelector("#username").value);
  console.log(document.querySelector("#password").value);
  const username = document.querySelector("#username").value.trim();
  const password = document.querySelector("#password").value.trim();
  if (!/[^a-zA-Zא-ת0-9\s]/.test(password)) {
    integrityWarning.innerText = "הסיסמה צריכה להחיל תו מיחד כגון !@#$%^&*";
    integrityWarning.style.display = "block";
    return;
  }
  if (password.length < 6) {
    integrityWarning.innerText = "יש להזין מינימום 6 תווים";
    integrityWarning.style.display = "block";
    return;
  }
  window.location.href = "html-pile/checkers.html";
};

butLogin.addEventListener("click", login);
