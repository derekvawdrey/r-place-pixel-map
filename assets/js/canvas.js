document.addEventListener('DOMContentLoaded', function () {
    const canvas = document.getElementById('pixelCanvas');
    const ctx = canvas.getContext('2d');
    const pixelSize = 10;

    canvas.addEventListener('mousedown', function (event) {
        const x = Math.floor(event.offsetX / pixelSize) * pixelSize;
        const y = Math.floor(event.offsetY / pixelSize) * pixelSize;

        ctx.fillStyle = 'black';
        ctx.fillRect(x, y, pixelSize, pixelSize);
    });
});