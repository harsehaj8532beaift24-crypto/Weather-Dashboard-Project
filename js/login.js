const loginForm = document.getElementById("loginForm");

loginForm.addEventListener("submit", async function (e) {

    e.preventDefault();

    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();

    const error = document.getElementById("error");

    try {

        const response = await fetch("data/users.json");

        const users = await response.json();

        const validUser = users.find(user =>
            user.username === username &&
            user.password === password
        );

        if (validUser) {

            localStorage.setItem("loggedInUser", username);

            window.location.href = "dashboard.html";

        } else {

            error.textContent = "Invalid Username or Password";

        }

    } catch (err) {

        error.textContent = "Unable to load users.json";

        console.log(err);

    }

});