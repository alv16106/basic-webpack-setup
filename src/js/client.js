const estado = {
  turno: 1,
  completado: 0,
  tamano: 3,
  tablero: []
}

const imagenes = ['img/Equis.png', 'img/Circulo.png', 'img/Pepe.png']

const setup = lSetup => {
  //Inicia el array del juego
  for (let i = 0; i < lSetup.tamano; i++) {
    lSetup.tablero[i] = [];
    for (let j = 0; j < lSetup.tamano; j++) {
      lSetup.tablero[i][j] = 2;
    }
  }
}

const render = lRender => {
  if (root.hasChildNodes()) {
    root.innerHTML = null;
  }

  const title = document.createElement('h1');
  title.innerHTML = 'Totito';

  const retryBtn = document.createElement('button');
  retryBtn.className = 'retryBtn';
  retryBtn.innerHTML = 'Volver a intentar';
  retryBtn.onclick = () => {
    lRender.turno = 1;
    lRender.completado = 0;
    setup(lRender);
    render(lRender);
  }

  root.appendChild(title);

  //Div principal, contiene la rejilla
  const padre = document.createElement('div');
  padre.className = 'padre'
  root.appendChild(padre);
  lRender.tablero.forEach(function(fila, numero){
    const row = document.createElement('div');
    row.className = 'fila'
    padre.appendChild(row);
    
    fila.forEach(function (celda, index){
      const espacio = document.createElement('div');
      espacio.className = `casilla`;
      espacio.innerHTML = `<img src= ${imagenes[celda%3]}>`;
      
      row.appendChild(espacio);
      espacio.onclick = () => {
        if (lRender.tablero[numero][index] == 2) {
          lRender.tablero[numero][index] = lRender.turno%2;
          lRender.turno = lRender.turno + 1
          gano(lRender, numero, index);
          render(lRender);
        }
    };
    })
  });
  root.appendChild(retryBtn);
}

const gano = (estado, x, y) => {
  //Check columna
  for(let i = 0; i < estado.tamano; i++){
    if(estado.tablero[i][y] == estado.turno%2 || estado.tablero[i][y] == 2){
      break;
    }
    if(i == estado.tamano-1){
        console.log(`Gano el jugador ${estado.turno%2 + 1}`); 
    }
  }

  //Check row
  for(let i = 0; i < estado.tamano; i++){
    if(estado.tablero[x][i] == estado.turno%2 || estado.tablero[x][i] == 2){
      break;
    }
    if(i == estado.tamano-1){
        console.log(`Gano el jugador ${estado.turno%2 + 1}`); 
    }
  }

  //check diagonal
  if (x==y){
    for(let i = 0; i < estado.tamano; i++){
      if(estado.tablero[i][i] == estado.turno%2 || estado.tablero[i][i] == 2){
        break;
      }
      if(i == estado.tamano-1){
          console.log(`Gano el jugador ${estado.turno%2 + 1}`);
      }
    }
  }

  if (x == estado.tamano -1 - y) {
    for(let i = estado.tamano - 1; i > -1; i--){
      if(estado.tablero[estado.tamano - 1 - i][i] == estado.turno%2 || estado.tablero[estado.tamano - 1 - i][i] == 2){
        break;
      }
      if(i == 0){
          console.log(`Gano el jugador ${estado.turno%2 + 1}`); 
      }
    }
    
  }

  if (estado.turno == (estado.tamano * estado.tamano) + 1) {
    console.log("empate");
  }
  
}

setup(estado);
render(estado);