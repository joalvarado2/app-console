require("colors");

const mostrarMenu = () => {
  return new Promise((resolve) => {
    console.clear();
    console.log("==============================".blue);
    console.log("      Selecione una opcion    ".blue);
    console.log("==============================\n".blue);

    console.log(`${"1.".blue} Crear Tarea`);
    console.log(`${"2.".blue} Listar Tareaa`);
    console.log(`${"3.".blue} Listar Tareas Completas`);
    console.log(`${"4.".blue} Listar Tareas Pendientes`);
    console.log(`${"5.".blue} Completar Tarea(s)`);
    console.log(`${"6.".blue} Borrar Tarea(s)`);
    console.log(`${"7.".blue} Salir \n`);

    const readLine = require("readline").createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    readLine.question("Seleccione una opcion:", (opt) => {
      readLine.close();
      resolve(opt);
    });
  });
};

const pausa = () => {
  return new Promise((resolve) => {
    const readLine = require("readline").createInterface({        // => Interfaz para usar redline
      input: process.stdin,
      output: process.stdout,             
    });

    readLine.question(
      `\nSeleccione ${"ENTER".blue} para continuar:\n`,
      (opt) => {
        console.log(opt);
        readLine.close();
        resolve(opt);
      }
    );
  });
};

module.exports = {
  mostrarMenu,
  pausa,
};
