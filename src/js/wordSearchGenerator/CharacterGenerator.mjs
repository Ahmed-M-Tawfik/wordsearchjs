export function generateRandomCharacter() {
    let charCode = Math.round(65 + Math.random() * 25);
    return String.fromCharCode(charCode);
}