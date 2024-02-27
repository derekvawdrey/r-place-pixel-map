class Pixel{
    x;
    y;
    r;
    g;
    b;
    hex;

    constructor(x,y,r,g,b){
        this.x = x;
        this.y = y;
        this.r = r;
        this.g = g;
        this.b = b;
        this.hex = PIXI.utils.rgb2hex([r / 255, g / 255, b / 255])
    }

}