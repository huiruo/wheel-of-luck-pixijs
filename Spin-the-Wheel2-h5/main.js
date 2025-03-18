import './style.css';
import * as PIXI from 'pixi.js';
import { TweenMax, Power1 } from 'gsap';

document.addEventListener('DOMContentLoaded', function () {
  const modalContainer = document.querySelector('.modal-container');
  const modal = document.querySelector('.modal');
  const wheel = document.querySelector('.wheel');
  const startButton = document.querySelector('.button');
  const display = document.querySelector('.display');
  let deg = 0,
      spinSound = new Audio('Spin.mp3');
  let isMuted = false;
  const muteIcon = document.getElementById('muteIcon');
  const unmuteIcon = document.getElementById('unmuteIcon');

  let zoneSize = 90; // Position of wheel (360 / 4) = 90 i.e 4 Sides of wheel

  const targetDeg = zoneSize / 2; // Set the target degree to position 2

  // Function to toggle audio mute/unmute
  function toggleAudio() {
      if (isMuted) {
          spinSound.volume = 1; // Unmute
          muteIcon.style.display = 'none';
          unmuteIcon.style.display = 'block';
      } else {
          spinSound.volume = 0; // Mute
          muteIcon.style.display = 'block';
          unmuteIcon.style.display = 'none';
      }
      isMuted = !isMuted; // Toggle mute state
  }

  // Event listener for volume icon click to toggle audio
  document.querySelector('.volume-icon').addEventListener('click', function () {
      toggleAudio(); // Mute/unmute audio
  });

  // Event listener for button click to spin the wheel
  startButton.addEventListener('click', function () {
      spinWheel();
  });

  function spinWheel() {
      // Play spinning sound if not muted
      if (!isMuted) {
          spinSound.play();
      }
      // Simulate spinning wheel animation
      // Disable button during spin
      startButton.disabled = true;
      startButton.style.pointerEvents = 'none';
      // Fetch the position from the endpoint
      fetch('spinresults.json')
          .then(response => response.json())
          .then(data => {
              // Get the position from the JSON data
              const targetPosition = data.POSITION;
              // Calculate the degree needed to land on target position (Yellow Monster)
              const targetDegree = (360 * 10) + targetDeg - (targetPosition - 1) * zoneSize + Math.floor(Math.random() * zoneSize); // 10 rotations added to ensure randomness
              // Set the transition on the wheel
              wheel.style.transition = 'all 10s ease-out';
              // Rotate the wheel to target degree
              wheel.style.transform = `rotate(${targetDegree}deg)`;
            startButton.disabled = true;
      startButton.style.pointerEvents = 'auto';

              // Apply the blur effect on wheel
              wheel.classList.add('blur');
              // Setting a timeout and then displaying a You won modal
              setTimeout(() => {
                  displayModal(targetPosition); // Display modal for the fetched position
              }, 11000); // timeout For Modal animation duration
          })
          .catch(error => console.error('Error fetching data:', error));
  }

  wheel.addEventListener('transitionend', () => {
      // Remove blur
      wheel.classList.remove('blur');
      // Enable button when spin is over
      startButton.disabled = false;
      // Enable button when spin is over
      startButton.style.pointerEvents = 'auto';
      // Need to set transition to none as we want to rotate instantly
      wheel.style.transition = 'none';
      // Calculate degree on a 360 degree basis to get the "natural" real rotation
      // Important because we want to start the next spin from that one
      // Use modulus to get the rest value from 360
      const actualDeg = deg % 360;
      // Set the real rotation instantly without animation
      wheel.style.transform = `rotate(${targetDeg}deg)`;
  });

  function displayModal(position) {
      // Show the modal
      modalContainer.style.display = 'block';

      // Close the modal when the close button is clicked
      const closeBtn = document.querySelector('.close');
      closeBtn.addEventListener('click', function () {
          modalContainer.style.display = 'none';
      });

      // Check if the position matches the winning position (2 in this case)
      if (position === 2) {
          modal.querySelector('p').textContent = 'You won!';
      } else {
          modal.querySelector('p').textContent = 'Better luck next time!';
      }
  }

const canvas = document.getElementById('myCanvas');

// Create PixiJS application targeting the container element
const app = new PIXI.Application({
    view: canvas, // Pass the canvas element here
    background: 0x1B174C,
    resizeTo: window,
});

// Create the first image
const image1 = PIXI.Sprite.from('showdown/showdown-off.png');
image1.anchor.set(0.5);
image1.scale.set(0.5); // Reduce the size by 50%
image1.x = app.screen.width / 2;
image1.y = app.screen.height / 2;
app.stage.addChild(image1);

// Function to create and position the images
const createImages = (paths, xPos) => {
    const images = [];
    const totalWidth = paths.length * 215; // Total width of all images with spacing
    const startX = (app.screen.width - totalWidth) / 2; // Starting x position to center-align the images

    for (let i = 0; i < paths.length; i++) {
        const image = PIXI.Sprite.from(paths[i]);
        image.anchor.set(0.5);
        
        // Adjust the scale to fit inside the canvas
        const scaleFactor = Math.min(app.screen.width / 800, app.screen.height / 200);
        image.scale.set(scaleFactor * 0.40); // Reduce the size by 50%

        // Position the image
        image.x = startX + (i * 215); // Position based on index and spacing
        image.y = app.screen.height / 5;

        app.stage.addChild(image);
        images.push(image);

        if (i === 1) {
            let isVisible = true;
            setInterval(() => {
                isVisible = !isVisible;
                image.visible = isVisible;
            }, 1000); // Toggle visibility every 1 seconds
        }

        // Animate the images using GSAP with delay
        TweenMax.from(image, 1, { alpha: 0, y: "-=50", ease: Power1.easeInOut, delay: (i + 1) * 1 });
    }
    return images;
};

// Function to create and add images to spell "Showdown"
const addShowdownImages = () => {
    const paths = ['s.png', 'h.png', 'o.png', 'w.png', 'd.png', 'o-2.png', 'w-2.png', 'n.png'];
    const images = [];

    const totalWidth = paths.length * 100; // Total width of all images with spacing
    const startX = (app.screen.width - totalWidth) / 2; // Starting x position to center-align the images
    const startY = app.screen.height / 2 + 20; // Starting y position for the "Showdown" images

    for (let i = 0; i < paths.length; i++) {
        const image = PIXI.Sprite.from(`showdown/${paths[i]}`);
        image.anchor.set(0.5);

        // Adjust the scale to fit inside the canvas
        const scaleFactor = Math.min(app.screen.width / 800, app.screen.height / 200);
        image.scale.set(scaleFactor * 0.30); // Reduce the size by 50%

        // Position the image
        image.x = startX + (i * 100); // Position based on index and spacing
        image.y = startY;

        app.stage.addChild(image);
        images.push(image);

      
        // Animate the images using GSAP with delay
        TweenMax.from(image, 1, { alpha: 0, y: "-=50", ease: Power1.easeInOut, delay: (i + 1) * 1 });
    }

    return images;
};

// Function to add the "must_drop" image with flickering fade-in and fade-out effect
const addMustDropImage = () => {
    const mustDropImage = PIXI.Sprite.from('showdown/must_drop.png');
    mustDropImage.anchor.set(0.5);

    // Adjust the scale to fit inside the canvas
    const scaleFactor = Math.min(app.screen.width / 800, app.screen.height / 200);
    mustDropImage.scale.set(scaleFactor * 0.5); // Reduce the size by 50%

    // Position the image at the bottom center
    mustDropImage.x = app.screen.width / 2;
    mustDropImage.y = app.screen.height - 100;

    app.stage.addChild(mustDropImage);

    // Apply flickering fade-in and fade-out effect with delay
    setTimeout(() => {
        flickerFadeInOut(mustDropImage, 2000); // 2 seconds duration
    }, 4000); // Start after 3 seconds
};

// Function to apply flickering fade-in and fade-out effect to a sprite
function flickerFadeInOut(sprite, duration) {
    let alphaValue = 0; // Initial alpha value
    let fadeInterval = setInterval(() => {
        alphaValue = alphaValue === 0 ? 1 : 0; // Toggle between 0 and 1
        sprite.alpha = alphaValue;
    }, 100); // Change alpha every 100ms

    setTimeout(() => {
        clearInterval(fadeInterval); // Stop the fade effect after the specified duration
        sprite.alpha = 1; // Ensure the sprite is fully visible after the effect
    }, duration);
}

// Call the function to add "Showdown" images
const showdownImages = addShowdownImages();

// Remove the first image after 1 second
setTimeout(() => {
    app.stage.removeChild(image1);

    // Create and position the remaining images in a single line
    const paths = ['showdown/vegas.png', 'showdown/bolt-on.png', 'showdown/slots.png'];
    const images = createImages(paths, app.screen.width / 2);

    // Add the "must_drop" image after the showdown images are loaded
    addMustDropImage();
}, 1000); // Remove the first image after 1 second



});

