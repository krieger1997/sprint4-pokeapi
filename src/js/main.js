import { pokemonColors } from "./pokemonColors";
let OFFSET = 0;
let DATAGLOBAL;
const inputDOMContent = document.querySelector("#inputDOMContent"),
  btnCargaMas = document.querySelector("#buscarMas"),
  btnLimpia = document.querySelector("#limpiar"),
  inpBusca = document.querySelector("#inpBusca");


const obtieneDataGlobal = async () => {
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon`);
  const data = await response.json();
  return data;
}



const obtienePokemonLista = async (offset = 0, limit = 20) => {
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`);
  const data = await response.json();
  return data;
};

// const obtienePokemonId = async (id) => {
//   const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
//   const data = await response.json();
//   return data;
// };



const obtienePokemonId = (id) => {
  // const response =  fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
  // const data =  response.json();
  return new Promise((resolve, reject) => {
    fetch(`https://pokeapi.co/api/v2/pokemon/${id}`).then(response => {
      response.json().then(res => {
        resolve(res);

      });

    }).catch(error => {
      alert("ERROR AL OBTENER DATOS POR ID." + error.status)
      reject(error)
    })


  })

  // return data;
};

const obtieneDetalle = async (res) => {
  for (const elem of res) {
    const response = await fetch(elem.url);
    const data = await response.json();
    const { name, types, sprites, id } = data;
    let contenido = '';


    contenido += `
      <div class="col-lg-3 col-md-4 col-xs-2 col-sm-6 col-12 mb-3">
        <div class="card pokemon-card"  >
          <img src="${sprites.other['official-artwork'].front_default}" class="card-img-top" alt="IMAGEN ${name}">
          <div class="card-body">
            <h5 class="card-title text-capitalize fw-bold">${name}</h5>
            <p class="card-text text-secondary">Id #${id.toString().padStart(4, '0')}</p>
            <div class="d-flex justify-content-evenly">`;

    types.forEach(tipo => {
      let objColor = pokemonColors.find(obj => obj.type == tipo.type.name)
      contenido += `<span class="badge" style="background-color:${objColor.colors[0]};color:white;">${tipo.type.name}</span>`;

    })
    contenido += `</div>
          </div>
        </div>
      </div>`;

    inputDOMContent.innerHTML += contenido;
  }
}


const carga20 = () => {
  obtienePokemonLista(OFFSET, 20).then(res => {
    obtieneDetalle(res.results).then(res => {
      OFFSET += 20;
    });
  })
}

const limpia = () => {
  OFFSET = 0;
  inputDOMContent.innerHTML = '';
  carga20();
}

btnCargaMas.addEventListener("click", carga20)
btnLimpia.addEventListener("click", limpia)

    

obtieneDataGlobal().then(async res => {
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon?offset=0&limit=${res.count}`);
  const data = await response.json();
  DATAGLOBAL = data.results;
  console.log("DATAGLOBAL", DATAGLOBAL)
});

inpBusca.addEventListener("keyup",(event)=>{
  if(event.target.value.toLowerCase() != ''){
    console.log(event.target.value.toLowerCase())
    console.log(DATAGLOBAL)
    const res = DATAGLOBAL.filter((pokemon) => {
      return pokemon.name.startsWith(event.target.value.toLowerCase());
    });
    console.log("RESULTADOOOOOOOOOSSSSSSSSS",res)

  }else{
    limpia();
  }
})

carga20();

