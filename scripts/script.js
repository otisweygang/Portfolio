const openEyes = document.querySelectorAll("img[src='../images/open_eye.svg']");
const irises = document.querySelectorAll("a img[src^='../images/iris']");
const iris5 = document.querySelector("a img[src='../images/iris5.svg']");
const iris8 = document.querySelector("a img[src='../images/iris8.svg']");
const eye5 = document.querySelector("img.eye5");
const eye8 = document.querySelector("img.eye8");

//blink and change email iris
iris5.addEventListener("click", () => {
  const blinkDuration = 100;
  const openEyeSrc = "../images/open_eye.svg";
  const closedEyeSrc = "../images/closed_eye.svg";

  const eye5 = document.querySelector("img.eye5");
  eye5.setAttribute("src", closedEyeSrc);
  setTimeout(() => {
    eye5.setAttribute("src", openEyeSrc);
    // Swap the iris image
    if (iris5.src.endsWith("iris5.svg")) {
      iris5.src = "../images/email.svg";
      // Copy the email address to the user's clipboard
      const email = "olgweygang@gmail.com";
      navigator.clipboard.writeText(email);
    } else {
      iris5.src = "../images/iris5.svg";
    }
  }, blinkDuration);
});

//blink and change email iris
iris8.addEventListener("click", () => {
  const blinkDuration = 100;
  const openEyeSrc = "../images/open_eye.svg";
  const closedEyeSrc = "../images/closed_eye.svg";

  const eye8 = document.querySelector("img.eye8");
  eye8.setAttribute("src", closedEyeSrc);
  setTimeout(() => {
    eye8.setAttribute("src", openEyeSrc);
    // Swap the iris image
    if (iris8.src.endsWith("iris8.svg")) {
      iris8.src = "../images/downloaded.svg";
      // Download the CV file
      const downloadLink = document.createElement("a");
      downloadLink.href = "../images/cv.pdf";
      downloadLink.download = "cv.pdf";
      downloadLink.click();
    } else {
      iris8.src = "../images/iris8.svg";
    }
  }, blinkDuration);
});


// Get all the eye elements
const eyes = document.querySelectorAll("img.eye");
// Attach the click event listener to each eye
eyes.forEach((eye) => {
  eye.addEventListener("click", () => {
    // Blink the eye by changing the image to closed_eye.svg for 100ms
    const blinkDuration = 100;
    const openEyeSrc = "../images/open_eye.svg";
    const closedEyeSrc = "../images/closed_eye.svg";

    // Select the clicked eye element
    const clickedEye = eye;

    // Set the closed eye image
    clickedEye.setAttribute("src", closedEyeSrc);

    // Delay and set the open eye image
    setTimeout(() => {
      clickedEye.setAttribute("src", openEyeSrc);

      // Swap the iris image
      const iris = clickedEye.previousElementSibling.querySelector("img");
      if (iris.src.endsWith("iris.svg")) {
        iris.src = "../images/email.svg";
        // Copy the email address to the user's clipboard
        const email = "olgweygang@gmail.com";
        navigator.clipboard.writeText(email);
      } else {
        iris.src = "../images/iris.svg";
      }
    }, blinkDuration);
  });
});

//Blink and swap function
setInterval(() => {
  // Select two random eyes that are not iris5
  const selectedEyes = [...openEyes]
    .filter(
      (eye) =>
        !eye.previousElementSibling.querySelector(
          "img[src='../images/iris5.svg'], img[src='../images/email.svg'], img[src='../images/iris8.svg'], img[src='../images/downloaded.svg']"
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

    iris.style.transform = `translate(${movementX}px, ${movementY}px)`;
  });
});
