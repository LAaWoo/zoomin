// script.js

const canvas = document.getElementById('zoomCanvas');
const ctx = canvas.getContext('2d');

// Set canvas size
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Images for infinite zoom
const images = [
    'assets/coco1.jpeg',
    'assets/coco2.jpeg',
    'assets/coco3.jpeg'
];

let currentImageIndex = 0;
let zoomLevel = 1;
let image = new Image();
image.src = images[currentImageIndex];

image.onload = () => {
    requestAnimationFrame(zoom);
};

// Handle image switching
function loadNextImage() {
    currentImageIndex = (currentImageIndex + 1) % images.length;
    image.src = images[currentImageIndex];
}

// Infinite zoom function
function zoom() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.save();
    
    // Center and scale
    ctx.translate(canvas.width / 2, canvas.height / 2);
    ctx.scale(zoomLevel, zoomLevel);
    ctx.translate(-canvas.width / 2, -canvas.height / 2);
    
    ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
    ctx.restore();
    
    // Zoom in
    zoomLevel *= 1.02; // Zoom speed (adjust for smoothness)
    
    if (zoomLevel > 10) {
        zoomLevel = 1; // Reset zoom
        loadNextImage();
    }

    requestAnimationFrame(zoom);
}

// Handle window resizing
window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});
