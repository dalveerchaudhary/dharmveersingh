document.addEventListener("DOMContentLoaded", () => {
    const dropzone = document.getElementById("dropzone");
    const imageInput = document.getElementById("imageInput");
    const previewContainer = document.getElementById("preview");

    // Open file input on click
    dropzone.addEventListener("click", () => {
        imageInput.click();
    });

    // Handle file selection
    imageInput.addEventListener("change", handleFiles);

    // Drag and drop functionality
    dropzone.addEventListener("dragover", (event) => {
        event.preventDefault();
        dropzone.classList.add("bg-light");
    });

    dropzone.addEventListener("dragleave", () => {
        dropzone.classList.remove("bg-light");
    });

    dropzone.addEventListener("drop", (event) => {
        event.preventDefault();
        dropzone.classList.remove("bg-light");
        const files = event.dataTransfer.files;
        handleFiles({ target: { files } });
    });

    function handleFiles(event) {
        const files = event.target.files;

        Array.from(files).forEach(file => {
            if (file.type.startsWith("image/")) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    const imageContainer = document.createElement("div");
                    imageContainer.classList.add("image-container");

                    const img = document.createElement("img");
                    img.src = e.target.result;
                    img.alt = file.name;

                    const deleteButton = document.createElement("button");
                    deleteButton.innerText = "×";
                    deleteButton.classList.add("delete-btn");
                    deleteButton.addEventListener("click", () => {
                        imageContainer.remove();
                    });

                    imageContainer.appendChild(img);
                    imageContainer.appendChild(deleteButton);
                    previewContainer.appendChild(imageContainer);
                };
                reader.readAsDataURL(file);
            }
        });

        // Reset input to allow re-upload of the same file
        imageInput.value = "";
    }
});