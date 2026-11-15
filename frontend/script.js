const menuToggle = document.getElementById("menuToggle");
const navMenu = document.getElementById("navMenu");

menuToggle.addEventListener("click", () => {
    const isOpen = navMenu.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.textContent = isOpen ? "✕" : "☰";
});

document.querySelectorAll("#navMenu a").forEach(link => {
    link.addEventListener("click", () => {
        navMenu.classList.remove("open");
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.textContent = "☰";
    });
});

document.getElementById("year").textContent = new Date().getFullYear();

const dateInput = document.getElementById("eventDate");
const today = new Date();

const localToday = new Date(
    today.getTime() - today.getTimezoneOffset() * 60000
).toISOString().split("T")[0];

dateInput.min = localToday;


// Booking Form
document.getElementById("bookingForm").addEventListener("submit", async function(event) {

    event.preventDefault();

    const name = document.getElementById("customerName").value.trim();
    const phone = document.getElementById("customerPhone").value.trim();
    const type = document.getElementById("eventType").value;
    const date = document.getElementById("eventDate").value;
    const location = document.getElementById("eventLocation").value.trim();
    const details = document.getElementById("eventDetails").value.trim();

    if (!/^[0-9+\-\s()]{8,16}$/.test(phone)) {
        alert("Please enter a valid phone number.");
        return;
    }

    // Open blank tab now to avoid popup blocking
    const whatsappWindow = window.open("about:blank", "_blank");

    const bookingData = {
        customerName: name,
        customerPhone: phone,
        eventType: type,
        eventDate: date || null,
        eventLocation: location,
        eventDetails: details
    };

    const submitButton = this.querySelector(".submit-btn");
    submitButton.disabled = true;
    submitButton.textContent = "Saving Booking...";

    try {

        const response = await fetch("https://eventnest-0r0x.onrender.com/api/bookings", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(bookingData)
        });

        if (!response.ok) {
            throw new Error("Booking could not be saved.");
        }

        const savedBooking = await response.json();

        const message =
            `Namaste Maa Aaranya Tent & Decorations!\n\n` +
            `Booking Enquiry\n` +
            `Booking ID: ${savedBooking.id}\n` +
            `Name: ${name}\n` +
            `Phone: ${phone}\n` +
            `Event: ${type}\n` +
            `Date: ${date || "Not decided"}\n` +
            `Location: ${location || "Not provided"}\n` +
            `Requirements: ${details || "Not provided"}`;

        const whatsappURL =
            `https://wa.me/918678845451?text=${encodeURIComponent(message)}`;

        alert("Booking saved successfully!");

        if (whatsappWindow) {
            whatsappWindow.location.href = whatsappURL;
        } else {
            window.open(whatsappURL, "_blank");
        }

        this.reset();
        dateInput.min = localToday;

    } catch (error) {

        if (whatsappWindow) {
            whatsappWindow.close();
        }

        console.error("Booking Error:", error);
        alert("Booking save nahi hui. Please check whether the backend is running.");

    } finally {

        submitButton.disabled = false;
        submitButton.textContent = "Send Enquiry on WhatsApp ↗";

    }

});