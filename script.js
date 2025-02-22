document.addEventListener("DOMContentLoaded", () => {
    const companyDataDiv = document.getElementById('companyData');

    async function fetchCompanyData() {
        try {
            const response = await fetch('https://jsonplaceholder.typicode.com/users');
            const data = await response.json();
            const companydata = data[0];

            companyDataDiv.innerHTML = `
                <p><strong>Company:</strong> ${companydata.company.name}</p>
                <p><strong>Email:</strong> ${companydata.email}</p>
                <p><strong>Phone:</strong> ${companydata.phone}</p>
                <p><strong>Address:</strong> ${companydata.address.city}, ${companydata.address.zipcode}</p>
            `;
        } catch (error) {
            companyDataDiv.innerHTML = '<p class="text-red-500">Failed to fetch company data.</p>';
        }
    }

    window.fetchCompanyData = fetchCompanyData;

    // Form validation email format and password strength.
    document.getElementById("registrationForm").addEventListener("submit", async (event) => {
        event.preventDefault();

        const companyName = document.getElementById("companyName").value.trim();
        const registrationNumber = document.getElementById("registrationNumber").value.trim();
        const email = document.getElementById("email").value.trim();
        const phone = document.getElementById("phone").value.trim();
        const password = document.getElementById("password").value;
        const confirmPassword = document.getElementById("confirmPassword").value;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/;

        // error messages
        document.querySelectorAll(".text-red-500").forEach(el => el.classList.add("hidden"));

        let hasError = false;

        if (!companyName) {
            document.getElementById("companyNameError").classList.remove("hidden");
            hasError = true;
        }
        if (!registrationNumber) {
            document.getElementById("registrationNumberError").classList.remove("hidden");
            hasError = true;
        }
        if (!emailRegex.test(email)) {
            document.getElementById("emailError").classList.remove("hidden");
            hasError = true;
        }
        if (!phone) {
            document.getElementById("phoneError").classList.remove("hidden");
            hasError = true;
        }
        if (!passwordRegex.test(password)) {
            document.getElementById("passwordError").classList.remove("hidden");
            hasError = true;
        }
        if (password !== confirmPassword) {
            document.getElementById("confirmPasswordError").classList.remove("hidden");
            hasError = true;
        }

        if (hasError) return;

        try {
            const response = await fetch("https://jsonplaceholder.typicode.com/posts", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ companyName, registrationNumber, email, phone, password })
            });

            if (response.ok) {
                alert("Registration successful!");
            } else {
                alert("Registration failed!");
            }
        } catch (error) {
            alert("An error occurred. Please try again.");
        }
    });
});
