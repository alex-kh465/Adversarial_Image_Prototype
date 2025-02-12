document.getElementById("imageUpload").addEventListener("change", function (event) {
    let file = event.target.files[0];
    if (file) {
        let reader = new FileReader();
        reader.onload = function (e) {
            let img = new Image();
            img.src = e.target.result;
            img.onload = function () {
                document.getElementById("original").src = e.target.result;
                document.getElementById("adversarial").src = ""; // Hide adversarial image until simulation
            };
        };
        reader.readAsDataURL(file);
    }
});

function simulateAttack() {
    let intensity = parseFloat(document.getElementById("intensity").value);

    // Randomize before attack accuracy slightly around 95%
    let beforeAccuracy = (94 + Math.random() * 3).toFixed(2); // Random value between 94 and 97
    let randomFactor = Math.random() * 5; // Random noise to affect after accuracy

    let afterAccuracy = beforeAccuracy - (intensity * 50) - randomFactor;

    document.getElementById("before").innerText = beforeAccuracy + "%";
    document.getElementById("after").innerText = afterAccuracy.toFixed(2) + "%";

    let img = document.getElementById("original");
    if (img.src && img.src.startsWith("data:image")) {
        generateAdversarialImage(img, intensity);
    }
}

function generateAdversarialImage(img, intensity) {
    let quality = Math.max(0.1, 1 - intensity - (Math.random() * 0.1)); // Add slight randomness

    let canvas = document.createElement("canvas");
    let ctx = canvas.getContext("2d");

    canvas.width = img.naturalWidth;
    canvas.height = img.naturalHeight;

    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

    let adversarialSrc = canvas.toDataURL("image/jpeg", quality);
    document.getElementById("adversarial").src = adversarialSrc;
}
