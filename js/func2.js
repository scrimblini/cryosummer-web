//gallery
document.addEventListener("DOMContentLoaded", function() {
        const mainImage = document.getElementById("mainImage");
        const thumbnails = document.querySelectorAll(".thumb");
        const prevButton = document.getElementById("prevImage");
        const nextButton = document.getElementById("nextImage");
        const fullscreenOverlay = document.getElementById("fullscreenOverlay");
        const fullscreenImage = document.getElementById("fullscreenImage");
        const closeOverlay = document.getElementById("closeOverlay");

        let currentIndex = 0;
        const images = Array.from(thumbnails).map(thumb => thumb.getAttribute("data-full"));

        // Function to update main image
        function updateMainImage(index) {
            mainImage.src = images[index];
            thumbnails.forEach(t => t.classList.remove("active"));
            thumbnails[index].classList.add("active");
            currentIndex = index;
        }

        // Change main image when clicking a thumbnail
        thumbnails.forEach((thumb, index) => {
            thumb.addEventListener("click", function() {
                updateMainImage(index);
            });
        });

        // Navigation arrows functionality
        prevButton.addEventListener("click", function() {
            let newIndex = (currentIndex - 1 + images.length) % images.length;
            updateMainImage(newIndex);
        });

        nextButton.addEventListener("click", function() {
            let newIndex = (currentIndex + 1) % images.length;
            updateMainImage(newIndex);
        });

        // Open fullscreen overlay
        mainImage.addEventListener("click", function() {
            fullscreenImage.src = this.src;
            fullscreenOverlay.style.display = "flex";
        });

        // Close overlay
        closeOverlay.addEventListener("click", function() {
            fullscreenOverlay.style.display = "none";
        });

        // Close overlay when clicking anywhere outside the image
        fullscreenOverlay.addEventListener("click", function(event) {
            if (event.target === fullscreenOverlay) {
                fullscreenOverlay.style.display = "none";
            }
        });

        fullscreenImage.addEventListener("click", function() {
            if (fullscreenImage.classList.contains("zoomed")) {
                fullscreenImage.classList.remove("zoomed");
            } else {
                fullscreenImage.classList.add("zoomed");
            }
        });
    });