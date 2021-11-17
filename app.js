require("colors");
const { inquirerMenu, pausa, leerInput } = require("./helpers/inquirer");
const Tareas = require("./models/tareas");

const main = async () => {
  let opt = "";

  const tareas = new Tareas();

  do {
    opt = await inquirerMenu();

    switch (opt) {
      case "1":
        const desc = await leerInput("descripcion:");
        tareas.crearTarea(desc)
        break;

      case "2":
        console.log(tareas._listado);
        break;
    }

    console.log("\n");
    await pausa();
  } while (opt !== "0");
};

main();
