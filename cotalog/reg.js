document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("registrationForm");

    form.addEventListener("submit", async (e) => {
        e.preventDefault();

        const firstName = form.querySelector('input[placeholder="First Name*"]').value.trim();
        const lastName = form.querySelector('input[placeholder="Last Name*"]').value.trim();
        const middleName = form.querySelector('input[placeholder="Middle name"]').value.trim();
        const phone = form.querySelector('input[type="tel"]').value.trim();
        const email = form.querySelector('input[type="email"]').value.trim();
        const dob = form.querySelector('input[type="date"]').value;
        const password = document.getElementById("password").value;
        const nickname = document.getElementById("nickname_gen").value;

        if (!firstName || !lastName || !email || !password || !nickname) {
            alert("Please fill in all required fields.");
            return;
        }

        const newUser = {
            firstName,
            lastName,
            middleName,
            phone,
            email,
            dob,
            password,
            nickname
        };

        try {
            const response = await fetch(USERS_URL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(newUser)
            });

            if (!response.ok) throw new Error("Network error");

            alert("User successfully registered!");
            form.reset();
            window.location.href = "index.html"; // ← переход на главную
        } catch (err) {
            console.error("Registration failed:", err);
            alert("Failed to register user.");
        }
    });
});


