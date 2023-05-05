// code to run when page is loaded
document.addEventListener('DOMContentLoaded', function() {
	updateImages();
	scaleImage();
	controlBar.style.maxWidth = viewportWidth + 'px';
 }, false);



// get viewport height and width
var viewportHeight = window.innerHeight;
var viewportWidth = window.innerWidth;


var zoomScale = 1.0;
const scaleOffset = 0.2;


// Get the DOM elements
const controlBar = document.getElementById('control-bar');
const imageContainer = document.getElementById('image-container');
const image1 = document.getElementById('image1-display');
const image2 = document.getElementById('image2-display');
const fitButton = document.getElementById('fit-button');
const zoombutton1 = document.getElementById('zoom-in-button')
const zoombutton2 = document.getElementById('zoom-out-button')
const modeSwitch = document.getElementById('mode-switch');
const input1 = document.getElementById('input1');
const input2 = document.getElementById('input2');
const imageLabel = document.getElementById('image-label');

let isImage1OnTop = true;

// Function to update the images based on user input
function updateImages() {
	// console.log("test");

	// get image file names
	var image1Name = image1.src.split("/").pop();
	var image2Name = image2.src.split("/").pop();

	// get image file urls
	if (input1.files.length != 0 && input2.files.length != 0) {
		var url1 = URL.createObjectURL(input1.files[0]);
		var url2 = URL.createObjectURL(input2.files[0]);
	} else {
		var url1 = image1.src;
		var url2 = image2.src;
	}

	image1.src = url1;
	image2.src = url2;

	// toggle the image order
	if (isImage1OnTop) {
		isImage1OnTop = false;
	} else {
		isImage1OnTop = true;
	}

	
	if (!modeSwitch.checked) {
		image1.style.opacity = isImage1OnTop ? 1 : 0;
		image2.style.opacity = isImage1OnTop ? 0 : 1;
		imageLabel.innerText = isImage1OnTop ? image1Name : image2Name;
	} else {
		image1.style.opacity = 1;
		image2.style.opacity = 1;
		imageLabel.innerText = '';
	}
}


// function to scale the image to the screen
function scaleImage() {
	var isPortrait = image1.width < image1.height ? true : false;

	var imageWidth = image1.width > image2.width ? image1.width : image2.width;
	var imageHeight = image1.height > image2.height ? image1.height : image2.height;


	// scale the image based on the viewport width
	var scale = viewportWidth / imageWidth;
	syncImageSize(imageWidth * scale, imageHeight * scale)

}

// sets the image container and both images to the same size
function syncImageSize(w, h) {

	const width = w * zoomScale
	const height = h * zoomScale

	imageContainer.style.width = width + 'px';
	imageContainer.style.height = height + 'px';

	image1.style.width = width + 'px';
	// image1.style.height = height + 'px';
	image2.style.width = width + 'px';
	// image2.style.height = height + 'px';
}




// Function to handle file input changes
function handleFileInputChange(event) {
	const file = event.target.files[0];
	if (file) {
		const reader = new FileReader();
		reader.readAsDataURL(file);
		reader.onload = () => {
			event.target.previousElementSibling.src = reader.result;
			updateImages();
		};
	}
}

// Add event listeners to the switches
// fitButton.addEventListener('change', scaleImage);
modeSwitch.addEventListener('change', updateImages);

// Add event listener to the image container for mode switch
imageContainer.addEventListener('click', () => {
	if (modeSwitch.checked) {
		isImage1OnTop = !isImage1OnTop;
		updateImages();
	}
});

// Add event listeners to the file input fields
input1.addEventListener('change', handleFileInputChange);
input2.addEventListener('change', handleFileInputChange);

// imageContainer.addEventListener('click', updateImages);
image1.addEventListener('click', updateImages);
image2.addEventListener('click', updateImages);

zoombutton1.addEventListener('click', () => {
	zoomScale += scaleOffset;
	scaleImage();
})
zoombutton2.addEventListener('click', () => {

	if (zoomScale <= 0.25) {
	} else {
		zoomScale -= scaleOffset;
		scaleImage();
	}
})

fitButton.addEventListener('click', () => {
	zoomScale = 1.0;
	scaleImage();
	})


// update width and height if window size changes
window.addEventListener('resize', function() {
	viewportHeight = window.innerHeight;
	viewportWidth = window.innerWidth;
	controlBar.style.maxWidth = viewportWidth + 'px';
	scaleImage();
	}
)

