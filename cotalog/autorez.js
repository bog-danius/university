document.getElementById("loginForm").addEventListener("submit", async function (e) {
    e.preventDefault();

    const username = document.getElementById("loginUsername").value.trim();
    const password = document.getElementById("loginPassword").value.trim();

    if (!username || !password) {
        alert("Please fill in both fields");
        return;
    }

    try {
        const res = await fetch(`http://localhost:3000/users?nickname=${encodeURIComponent(username)}&password=${encodeURIComponent(password)}`)
        const users = await res.json();

        if (users.length > 0) {
            localStorage.setItem("loggedInUser", JSON.stringify(users[0]));
            window.location.href = "../cotalog.html";
        } else {
            alert("Invalid login or password");
        }
    } catch (err) {
        console.error("Login error:", err);
        alert("Error connecting to server");
    }
});