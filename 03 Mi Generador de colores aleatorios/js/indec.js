const button = document.getElementById("boton");
const body = document.querySelector("body");
const colorNum = document.querySelector(".numero-color");
const colorCard = document.querySelector(".carta-color");

const generarColorAleatorio = () => {
    const r = Math.floor(Math.random()*256);
    const g = Math.floor(Math.random()*256);
    const b = Math.floor(Math.random()*256);
    
    const rgbColor = `rgb(${r},${g},${b})`;

    return rgbColor;
};

const cambiarBg = () => {
    const nuevoColor = generarColorAleatorio();
    
    colorNum.innerHTML = nuevoColor

    body.style.backgroundColor = nuevoColor
};

button.addEventListener("click",cambiarBg);