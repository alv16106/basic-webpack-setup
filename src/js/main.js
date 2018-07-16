const estado = {
  turno: 0,
  completado: 0,
  alto: 3,
  largo: 3,
  tablero: []
}

const setup = lSetup => {
  for (let i = 0; i < lSetup.alto; i++) {
    lSetup.tablero[i] = [];
    for (let j = 0; j < lSetup.largo; j++) {
      lSetup.tablero[i][j] = 0;
    }
  }
}