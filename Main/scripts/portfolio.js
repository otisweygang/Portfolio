const eye = document.querySelectorAll(".eye");
const irises = document.querySelectorAll(".iris");

document.addEventListener("mousemove", (event) => {
  irises.forEach((iris) => {
    // Get the center point of the iris element
    const irisRect = iris.getBoundingClientRect();
    const irisCenterX = irisRect.left + irisRect.width / 2;
    const irisCenterY = irisRect.top + irisRect.height / 2;

    // Calculate the distance between the mouse pointer and the iris center
    const distanceX = event.clientX - irisCenterX;
    const distanceY = event.clientY - irisCenterY;
    const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);

    // Calculate the maximum distance the iris can move in any direction
    //const maxDistance = Math.min(40, distance / 4 + (distance / 200));
    const maxDistance = Math.min(13, distance / 4);

    // Calculate the movement distance for the iris based on the mouse position
    const movementX = (maxDistance * distanceX) / distance;
    const movementY = (maxDistance * distanceY) / distance;

    // Apply the movement to the iris position
    iris.style.transform = `translate(${movementX}px, ${movementY}px)`;
  });
});
// JavaScript to handle image click and overlay display
document.addEventListener("DOMContentLoaded", function () {
  const imageLinks = document.querySelectorAll(".image-link");
  const overlay = document.createElement("div");
  overlay.classList.add("overlay");

  imageLinks.forEach(function (link) {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      const imageSrc = this.getAttribute("href");

      const image = document.createElement("img");
      image.setAttribute("src", imageSrc);

      const closeButton = document.createElement("span");
      closeButton.classList.add("close-button");
      closeButton.innerHTML = "&times;";

      closeButton.addEventListener("click", function () {
        overlay.style.display = "none";
      });

      overlay.innerHTML = "";
      overlay.appendChild(image);
      overlay.appendChild(closeButton);
      document.body.appendChild(overlay);
      overlay.style.display = "flex";
    });
  });
});
