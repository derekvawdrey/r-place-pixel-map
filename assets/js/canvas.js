document.addEventListener('DOMContentLoaded', function () {
    const canvas = document.getElementById('pixelCanvas');
    const ctx = canvas.getContext("2d");




    const gridSize = 10;

    for(let i = 0; i < canvas.width; i += gridSize) {
        for(let j = 0; j < canvas.height; j += gridSize) {
            ctx.strokeRect(i, j, gridSize, gridSize);
        }
    }

    canvas.addEventListener('click', function(event) {
        const rect = canvas.getBoundingClientRect();
        const x = Math.floor((event.clientX - rect.left) / gridSize) * gridSize;
        const y = Math.floor((event.clientY - rect.top) / gridSize) * gridSize;
        ctx.fillRect(x, y, gridSize, gridSize);
    });
});
