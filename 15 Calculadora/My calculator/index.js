// Variables
const displayValorAnterior = document.getElementById('before_value');
const displayValorActual = document.getElementById('actual_value');
const botonesNumeros = document.querySelectorAll('.number');
const botonesOperadores = document.querySelectorAll('.operator');


botonesNumeros.forEach(boton => {
    boton.addEventListener('click', () => display.agregarNumero(boton.innerHTML));
});

botonesOperadores.forEach(boton => {
    boton.addEventListener('click', () => display.computar(boton.value))
});

// Clases
class Display {
    constructor(displayValorAnterior, displayValorActual) {
        this.displayValorActual = displayValorActual;
        this.displayValorAnterior = displayValorAnterior;
        this.calculador = new Calculadora();
        this.tipoOperacion = undefined;
        this.valorActual = '';
        this.valorAnterior = '';
        this.signos = {
            sumar: '+',
            dividir: '%',
            multiplicar: 'x',
            restar: '-', 
            igual: '='
        }
    }

    borrar() {
        this.valorActual = this.valorActual.toString().slice(0,-1);
        this.imprimirValores();
    }

    borrarTodo() {
        this.valorActual = '';
        this.valorAnterior = '';
        this.tipoOperacion = undefined;
        this.imprimirValores();
    }

    computar(tipo) {
        this.tipoOperacion !== 'igual' && this.calcular();
        this.tipoOperacion = tipo;
        this.valorAnterior = this.valorActual || this.valorAnterior;
        this.valorActual = '';
        this.imprimirValores();
    }

    agregarNumero(numero) {
        if(numero === '.' && this.valorActual.includes('.')) return
        this.valorActual = this.valorActual.toString() + numero.toString();
        this.imprimirValores();
    }

    imprimirValores() {
        this.displayValorActual.textContent = this.valorActual;
        this.displayValorAnterior.textContent = `${this.valorAnterior} ${this.signos[this.tipoOperacion] || ''}`;
    }

    calcular() {
        const valorAnterior = parseFloat(this.valorAnterior);
        const valorActual = parseFloat(this.valorActual);

        if( isNaN(valorActual)  || isNaN(valorAnterior) ) return
        this.valorActual = this.calculador[this.tipoOperacion](valorAnterior, valorActual);
    }

}

class Calculadora {
    sumar(num1, num2) {
        return num1 + num2;
    }

    restar(num1, num2) {
        return num1 - num2;
    }

    dividir(num1, num2) {
        return num1 / num2;
    }

    multiplicar(num1, num2) {
        return num1 * num2;
    }
} 

const display = new Display(displayValorAnterior, displayValorActual);


const backgColorPicker = document.getElementById('backgcolor');
const calculatorColorPicker = document.getElementById('Calculator-color');
const calculatorElements = document.querySelectorAll('.calculator');

backgColorPicker.addEventListener('input', function() {
    const selectedColor = backgColorPicker.value;
    document.body.style.backgroundColor = selectedColor;
   
    // Si el color de fondo y el color de los elementos son iguales, cambia el color de los elementos
    if (selectedColor === calculatorColorPicker.value) {
        const newColor = invertColor(selectedColor); // Aquí puedes usar alguna función para invertir el color
        calculatorColorPicker.value = newColor;
        changeCalculatorColor(newColor);
    }
});

calculatorColorPicker.addEventListener('input', function() {
    const selectedColor2 = calculatorColorPicker.value;
    
    // Cambia el color de los elementos con la clase "calculator"
    changeCalculatorColor(selectedColor2);

    // Si el color de fondo y el color de los elementos son iguales, cambia el color de fondo
    if (selectedColor2 === backgColorPicker.value) {
        const newColor = invertColor(selectedColor2); // Aquí puedes usar alguna función para invertir el color
        backgColorPicker.value = newColor;
        document.body.style.backgroundColor = newColor;
    }
});

function changeCalculatorColor(color) {
    calculatorElements.forEach(element => {
        element.style.backgroundColor = color;
    });
}

function invertColor(color) {
    // Aquí puedes implementar lógica para invertir un color
    // Por ejemplo, cambiar #RRGGBB a #FFFFFF - color
    return "#" + (0xFFFFFF ^ parseInt(color.substring(1), 16)).toString(16).padStart(6, '0');
}


//añadir numeros y operadores por teclado


/*document.addEventListener("keydown", function(event) {
    const key = event.key;

    if (/^[0-9]$/.test(key) || key === "." || key === "Enter" || key in display.signos) {
        const boton = document.querySelector(`.number[data-value="${key}"], .operator[data-value="${key}"]`);
        if (boton) {
            boton.click();

        }
    } else if (key === "Backspace") {
        const borrarBoton = document.querySelector('button[onclick="display.borrar()"]');
        if (borrarBoton) {
            borrarBoton.click();
        }
    }
});*/

document.addEventListener("keydown", function(event) {
    const key = event.key;

    const botonNumerico = document.querySelector(`.number[data-value="${key}"]`);
    const botonOperador = document.querySelector(`.operator[data-value="${key}"]`);
    const botonBorrar = document.querySelector('button[onclick="display.borrar()"]');

    if (botonNumerico || botonOperador) {
        if (botonNumerico) {
            botonNumerico.click();
            
        } else {
            botonOperador.click();
        }
    } else if (key === "Backspace" && botonBorrar) {
        botonBorrar.click();
    }
});

