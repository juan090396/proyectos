let estadoLicuadora = ("apagado");
let licuadora = document.getElementById("licuadora");
let sonidoLicuadora = document.getElementById("sonido-licuadora");
let botonLicuadora = document.getElementById("sonido-boton-licuadora");

function encenderLicuadora (){
    if (estadoLicuadora == "apagado"){
        estadoLicuadora = "encendido";
        hacerRuido()
        licuadora.classList.add ("activo")
        
    } else {
        estadoLicuadora ="apagado";
        hacerRuido()
        licuadora.classList.remove ("activo")
       
    }
}

function hacerRuido () {
    if (sonidoLicuadora.paused){
        botonLicuadora.play(),
        sonidoLicuadora.play();
    } else {
        botonLicuadora.play();
        sonidoLicuadora.pause();
        sonidoLicuadora.currentTime = 0 ;
    }
}