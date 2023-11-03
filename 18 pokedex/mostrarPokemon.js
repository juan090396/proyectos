const listaPokemon = document.querySelector("#listaPokemon");
const datosPokemon = document.querySelector("#datos");
const botonesHeader = document.querySelectorAll(".btn-header");
const selectRegion = document.querySelector("#region")
let URL = "https://pokeapi.co/api/v2/pokemon/";

function buscar() {
  // Obtiene el valor del campo de búsqueda
  const busqueda = document.getElementById('search').value.toLowerCase();

  // Obtiene todos los elementos de la clase "pokemon" en la página
  const elements = document.querySelectorAll('.pokemon');

  // Itera sobre los elementos y muestra/oculta según la búsqueda
  elements.forEach(function (elements) {
    let pokemonId = elements.querySelector('.pokemon-id').innerText.toLowerCase();
    let nombre = elements.querySelector('.pokemon-nombre').innerText.toLowerCase();

    // Compara tanto con pokeId como con el nombre del Pokémon
      if (pokemonId.includes(busqueda) || nombre.includes(busqueda)) {
      elements.classList.remove('hidden');
      } else {
      elements.classList.add('hidden');
      }
  });
}

/* fetch con un for, envia la info pero el orden depende de en que orden cargue la data

for (let i = 1; i <= 151; i++) {
    fetch(URL + i)
        .then((response) => response.json())
        .then(data => mostrarPokemon(data))
}*/


const fetchData = async () => {
  for (let i = 1; i <= 809; i++) {
    try {
      const response = await fetch(URL + i);
      const data = await response.json();
      mostrarPokemon(data);
      
    } catch (error) {
      console.error(`Error fetching data for Pokemon ${i}:`, error);
    }
  }
};
fetchData();

function mostrarPokemon(data) {

  let tipos = data.types.map((type) => `<p class="${type.type.name} tipo">${type.type.name}</p>`);
  tipos = tipos.join('');

  let pokeId = data.id.toString();
    if (pokeId.length === 1) {
      pokeId = "00" + pokeId;
    } else if (pokeId.length === 2) {
      pokeId = "0" + pokeId;
    }

  let habilidades = data.abilities.map((ability) => {
    const habilidad = ability.ability.name;
    const esOculta = ability.is_hidden;
    return{habilidad,esOculta}
})

let estadisticas = data.stats.map((stat)=>{
    return{nombre:stat.stat.name, valor:stat.base_stat}
})

//solucion para sumar todas las estadisticas con reduce

/*let totalStats= estadisticas.reduce((total,stat)=>
    total + stat.valor,0)*/

    // solucion con un
    let totalStats = 0
    
    for (let index = 0; index < estadisticas.length; index++) {
        totalStats += estadisticas[index].valor;
        
    }

  let multiplicador = 10; 
  let altura = data.height/multiplicador
  let peso = data.weight /multiplicador

  const div = document.createElement("div");
  div.classList.add("pokemon");
  div.innerHTML = `
    <p class="pokemon-id-back">#${pokeId}</p>
    
    <div class="pokemon-imagen">
    <img src="${data.sprites.other["official-artwork"].front_default}" alt="${data.name}">
    </div>
  
    <div class="pokemon-info">
    <div class="nombre-contenedor">
    <p class="pokemon-id">#${pokeId}</p>
    <h2 class="pokemon-nombre">${data.name}</h2>
    </div>
    
    <div class="pokemon-tipos">
    ${tipos}
    </div>
          
    <div class="pokemon-med">
    <p class="stat">${altura}m</p>
    <p class="stat">${peso}kg</p>
    </div>

    </div>`;

  div.addEventListener("click", () => {
  div.style.animation = "flip 0.8s linear";
  div.addEventListener("animationend", () => {
    div.style.animation = ""; // Restablecer la animación después de un breve intervalo
    div.classList.add("hidden");
    divcard.classList.remove("hidden");
  }, { once: true });
  });

  const divcard = document.createElement("div");
  divcard.classList.add("pokemon-card","hidden");
  divcard.innerHTML = `
    <div class="nombre-contenedor">
    <h2 class="pokemon-nombre">${data.name}</h2>
    </div>

    <div class="pokemon-abilities">
    ${habilidades.map((habilidad, index) => `<h4>${index + 1}: ${habilidad.habilidad} (${habilidad.esOculta ? 'oculta' : 'normal'})</h4>`).join('')}
    </div>
          
    <div class="total" >
    <h4>Total Stats: ${totalStats} </h4>
    </div>
          
    <div class="pokemon-stats">
    <div class="stats-1">
    ${estadisticas.map((stat) => `<p>${stat.nombre}: ${stat.valor}</p>`).slice(0, 3).join('')}
    </div>
  
    <div class="stats-2">
    ${estadisticas.map((stat) => `<p>${stat.nombre}: ${stat.valor}</p>`).slice(3).join('')}
    </div>    
  
    </div>`;
          
  divcard.addEventListener("click", () => {
  divcard.style.animation = "flipReverse 0.8s linear reverse both";
  
  divcard.addEventListener("animationend", () => {
    divcard.classList.add("hidden");
    div.classList.remove("hidden");
    divcard.style.animation = ""; // Restablecer la animación después de un breve intervalo
}, { once: true });
});

listaPokemon.append(div);
listaPokemon.append(divcard);
}
          
         
//filtro por tipo
          
  botonesHeader.forEach(boton => boton.addEventListener("click", (event) => {
  const botonId = event.currentTarget.id;
  listaPokemon.innerHTML = "";
    
  for (let i = 1; i <= 809; i++) {
    fetch(URL + i)
      .then((response) => response.json())
      .then(data => {

        if(botonId === "ver-todos") {
          mostrarPokemon(data);
        } else {
          const tipos = data.types.map(type => type.type.name);
          
          if (tipos.some(tipo => tipo.includes(botonId))) {
            mostrarPokemon(data);
          }
        }
        
      })
    }
  })) 
  
  //filtro por region
  
  selectRegion.addEventListener("change", () => {
  const regionSelected = selectRegion.value.toLowerCase();
  listaPokemon.innerHTML = "";
        
    switch (regionSelected) {
      
      case "all":
        fetchData();
      break;

      case "kanto 001-151":
        const dataKanto = async () => {
          
          for (let i = 1; i <= 151; i++) {
            
            try {
              const response = await fetch(URL + i);
              const data = await response.json();
              mostrarPokemon(data);
            } 
            catch (error) {
              console.error(`Error fetching data for Pokemon ${i}:`, error);
            }
          }
        };
        dataKanto();
      break;
    
      case "johto 152-251":

        const dataJohto = async () => {
          for (let i = 152; i <= 251; i++) {
            try {
              const response = await fetch(URL + i);
              const data = await response.json();
              mostrarPokemon(data);
            } catch (error) {
              console.error(`Error fetching data for Pokemon ${i}:`, error);
            }
          }
        };
        dataJohto();
      break;
      
      case "hoenn 252-386":
                
        const dataHoenn = async () => {
          for (let i = 252; i <= 386; i++) {
            try {
              const response = await fetch(URL + i);
              const data = await response.json();
              mostrarPokemon(data);
            } catch (error) {
              console.error(`Error fetching data for Pokemon ${i}:`, error);
            }
          }
        };
          dataHoenn();
      break;

      case "sinnoh 387-493":
                    
                    const datasinnoh = async () => {
                        for (let i = 387; i <= 493; i++) {
                          try {
                            const response = await fetch(URL + i);
                            const data = await response.json();
                            mostrarPokemon(data);
                          } catch (error) {
                            console.error(`Error fetching data for Pokemon ${i}:`, error);
                          }
                        }
                      };
                     datasinnoh();

          break;

          case "unova o teselia 494-649":
            
            const dataUnova = async () => {
              for (let i = 494; i <= 649; i++) {
                try {
                  const response = await fetch(URL + i);
                  const data = await response.json();
                  mostrarPokemon(data);
                } catch (error) {
                  console.error(`Error fetching data for Pokemon ${i}:`, error);
                }
              }
            };
              dataUnova();
          break;
          
          case "kalos 650-721":
                    
            const dataKalos = async () => {
              for (let i = 650; i <= 721; i++) {
                try {
                  const response = await fetch(URL + i);
                  const data = await response.json();
                  mostrarPokemon(data);
                } catch (error) {
                  console.error(`Error fetching data for Pokemon ${i}:`, error);
                }
              }
            };
              dataKalos();
          break;

          case "alola 722-809":
            for (let i = 722; i <= 809; i++) {
              fetch(URL + i)
                .then((response) => response.json())
                .then(data => mostrarPokemon(data))
             }

          break;
    }
  })


    