const openEyes = document.querySelectorAll("img[src='../images/open_eye.svg']");
const irises = document.querySelectorAll("a img[src^='../images/iris']");
const iris5 = document.querySelector("a img[src='../images/iris5.svg']");
const iris7 = document.querySelectorAll("a img[src='../images/iris7.svg']");
const iris8 = document.querySelectorAll("a img[src='../images/iris8.svg']");
const iris9 = document.querySelectorAll("a img[src='../images/iris9.svg']");

//Contact Function
let isIris5Clicked = false; // track if iris 5 has been clicked
// Event listener for iris 5 click
iris5.addEventListener("click", () => {
  // change the source of the bottom three iris images
  iris7.forEach((element) => {
    element.src = "../images/name.svg";
    element.style.transform = "";
    element.parentNode.removeAttribute("href");
  });
  iris8.forEach((element) => {
    element.src = "../images/email.svg";  
    element.style.transform = "";
    element.parentNode.removeAttribute("href");
  });
  iris9.forEach((element) => {
    element.src = "../images/exit.svg";
    element.style.transform = "";
    element.parentNode.setAttribute("href", "index.html");
  });
  isIris5Clicked = true; // set iris 5 click flag
  clearInterval(intervalId);
});


//Blink and swap function
let intervalId = setInterval(() => {
  // Select two random eyes that are not iris5
  const selectedEyes = [...openEyes]
    .filter(
      (eye) =>
        !eye.previousElementSibling.querySelector(
          "img[src='../images/iris5.svg']"
        )
    )
    .sort(() => 0.5 - Math.random())
    .slice(0, 2);
  if (selectedEyes.length !== 2) {
    return;
  }
  const firstEye = selectedEyes[0];
  const secondEye = selectedEyes[1];

  // Swap iris images for blinking eyes
  const firstEyeIris = firstEye.previousElementSibling.querySelector("img");
  const secondEyeIris = secondEye.previousElementSibling.querySelector("img");
  const firstEyeIrisSrc = firstEyeIris.getAttribute("src");
  const secondEyeIrisSrc = secondEyeIris.getAttribute("src");
  const firstEyeHref = firstEyeIris.parentElement.getAttribute("href");
  const secondEyeHref = secondEyeIris.parentElement.getAttribute("href");

  // Update iris and href for each eye
  firstEyeIris.setAttribute("src", secondEyeIrisSrc);
  firstEyeIris.parentElement.setAttribute("href", secondEyeHref);
  secondEyeIris.setAttribute("src", firstEyeIrisSrc);
  secondEyeIris.parentElement.setAttribute("href", firstEyeHref);

  // Blink eyes
  const openEyeSrc = "../images/open_eye.svg";
  const closedEyeSrc = "../images/closed_eye.svg";
  firstEye.setAttribute("src", closedEyeSrc);
  secondEye.setAttribute("src", closedEyeSrc);

  // Hide iris images when eyes are closed
  firstEyeIris.style.display = "none";
  secondEyeIris.style.display = "none";

  setTimeout(() => {
    firstEye.setAttribute("src", openEyeSrc);
    secondEye.setAttribute("src", openEyeSrc);

    // Show iris images when eyes are open
    firstEyeIris.style.display = "block";
    secondEyeIris.style.display = "block";
  }, Math.floor(Math.random() * 5 + 1) * 100);
}, 3000);

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
    const maxDistance = Math.min(60, distance / 4);

    // Calculate the movement distance for the iris based on the mouse position
    const movementX = (maxDistance * distanceX) / distance;
    const movementY = (maxDistance * distanceY) / distance;

    // Apply the movement to the iris position, but only if iris 5 has not been clicked or the current iris is not one of the bottom three irises
    if (
      !isIris5Clicked ||
      (iris !== iris7[0] && iris !== iris8[0])
    ) {
      iris.style.transform = `translate(${movementX}px, ${movementY}px)`;
    }
  });
});
