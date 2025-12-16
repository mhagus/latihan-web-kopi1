document.addEventListener("DOMContentLoaded", () => {
    const checkbox = document.getElementById("langganan");

    checkbox.addEventListener("change", () => {
        if (checkbox.checked) {
            alert("Terima kasih telah berlangganan newsletter kami!");
        } else {
            alert("Langanan dibatalkan.");
        }
    });
});