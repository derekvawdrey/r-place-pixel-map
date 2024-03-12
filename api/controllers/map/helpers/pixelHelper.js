/**
 * Helper function to validate pixel data
 * 
 * @param {number} x - X coordinate
 * @param {number} y - Y coordinate
 * @param {number} r - Red component
 * @param {number} g - Green component
 * @param {number} b - Blue component
 * @returns {boolean} - True if the pixel data is valid, false otherwise
 */
const isValidPixelData = (x, y, r, g, b) => {
    if (!Number.isInteger(x) || !Number.isInteger(y) || x < 0 || y < 0) {
        return false;
    }
    if (!Number.isInteger(r) || !Number.isInteger(g) || !Number.isInteger(b) ||
        r < 0 || g < 0 || b < 0 || r > 255 || g > 255 || b > 255) {
        return false;
    }
    return true;
}

module.exports = { isValidPixelData };