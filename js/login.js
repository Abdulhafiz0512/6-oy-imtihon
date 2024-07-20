import { redirect, checkToken, saveToken } from "./utils.js";

const form = document.forms[0]
const usernameInput = document.getElementById("username");
const passwordInput = document.getElementById("password");


(function() {
  const hasToken = checkToken();
  if (hasToken) {
    redirect("/index.html");
  }
})();

form.onsubmit = async function(event) {
  event.preventDefault(); 

  try {
    const token = await login();
    saveToken(token);
    redirect("/index.html");
  } catch (error) {
    console.log(error);
  }
};

async function login() {
  try {
    const response = await fetch("https://api.escuelajs.co/api/v1/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email: usernameInput.value,
        password: passwordInput.value
      })
    });

    if (!response.ok) {
      throw new Error("Failed to login");
    }

    const result = await response.json();
    return result.access_token;
  } catch (error) {
    console.error("Login error:", error);
    throw error; 
  }
}