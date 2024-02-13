var selectedColor = '#000';

document.addEventListener('DOMContentLoaded', function () {
    const canvas = document.getElementById('pixelCanvas');
    const ctx = canvas.getContext("2d");

    const ratio = window.devicePixelRatio;
    canvas.width = window.innerWidth * ratio;
    canvas.height = window.innerHeight * ratio;
    ctx.scale(ratio, ratio);

    const gridSize = 20;

    ctx.strokeStyle = '#ccc';
    for (let i = 0; i < canvas.width; i += gridSize) {
        for (let j = 0; j < canvas.height; j += gridSize) {
            
            ctx.strokeRect(i, j, gridSize, gridSize);
        }
    }

    window.addEventListener('resize', function () {
        const ratio = window.devicePixelRatio;
        canvas.width = window.innerWidth * ratio;
        canvas.height = window.innerHeight * ratio;
        ctx.scale(ratio, ratio);
        redrawGrid();
    });
    
    function redrawGrid() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    
        const gridSize = 20;
    
        ctx.strokeStyle = '#ccc';
        for (let i = 0; i < canvas.width; i += gridSize) {
            for (let j = 0; j < canvas.height; j += gridSize) {
                ctx.strokeRect(i, j, gridSize, gridSize);
            }
        }
    }

    canvas.addEventListener('click', function (event) {
        ctx.fillStyle = selectedColor;
        const rect = canvas.getBoundingClientRect();
        const x = Math.floor((event.clientX - rect.left) / (gridSize * ratio)) * gridSize;
        const y = Math.floor((event.clientY - rect.top) / (gridSize * ratio)) * gridSize;
        ctx.fillRect(x, y, gridSize, gridSize);
    });
    

    
    const colorDivs = document.querySelectorAll('.color');
    colorDivs.forEach(colorDiv => {
        colorDiv.addEventListener('click', function() {
            const hexCode = this.classList[1].split('-')[1];
            selectedColor = `#${hexCode}`;
            console.log('Selected Color:', selectedColor);
        });
    });

});
