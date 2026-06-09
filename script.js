const dateElement = document.getElementById("currentDate");

if (dateElement) {
    const today = new Date();

    dateElement.textContent =
        today.toLocaleDateString("de-DE");
}