// Get the DOM elements
const imageContainer = document.getElementById('image-container');
const image1 = document.getElementById('image1-display');
const image2 = document.getElementById('image2-display');
const fillSwitch = document.getElementById('fill-switch');
const modeSwitch = document.getElementById('mode-switch');
const input1 = document.getElementById('input1');
const input2 = document.getElementById('input2');
const imageLabel = document.getElementById('image-label');

let isImage1OnTop = true;

// Function to update the images based on user input
function updateImages() {
	const url1 = URL.createObjectURL(input1.files[0]);
	const url2 = URL.createObjectURL(input2.files[0]);

	if (url1 && url2) {
		image1.src = url1;
		image2.src = url2;

		if (fillSwitch.checked) {
			if (image1.width / image1.height > image2.width / image2.height) {
				image1.style.width = '100%';
				image2.style.width = '100%';
				image1.style.height = 'auto';
				image2.style.height = 'auto';
			} else {
				image1.style.width = 'auto';
				image2.style.width = 'auto';
				image1.style.height = '100%';
				image2.style.height = '100%';
			}
		} else {
			image1.style.width = 'auto';
			image2.style.width = 'auto';
			image1.style.height = 'auto';
			image2.style.height = 'auto';
		}

		if (modeSwitch.checked) {
			image1.style.opacity = isImage1OnTop ? 1 : 0;
			image2.style.opacity = isImage1OnTop ? 0 : 1;
			imageLabel.innerText = isImage1OnTop ? 'Image 1 on top' : 'Image 2 on top';
		} else {
			image1.style.opacity = 1;
			image2.style.opacity = 1;
			imageLabel.innerText = '';
		}
	}
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
fillSwitch.addEventListener('change', updateImages);
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
