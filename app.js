require("colors");
const { guardarDb, leerDb } = require("./helpers/guardarArchivo");
const {
  inquirerMenu,
  pausa,
  leerInput,
  listadoTareasBorrar,
} = require("./helpers/inquirer");
const Tareas = require("./models/tareas");

const main = async () => {
  let opt = "";

  const tareas = new Tareas();
  const tareasDb = leerDb();

  if (tareasDb) {
    tareas.cargarTareaFromArray(tareasDb);
  }

  do {
    opt = await inquirerMenu();

    switch (opt) {
      case "1":
        const desc = await leerInput("descripcion:");
        tareas.crearTarea(desc);
        break;

      case "2":
        tareas.listadoCompleto();
        break;
      case "3":
        tareas.listarCompletadas();
        break;
      case "4":
        tareas.listarCompletadas(false);
        break;
      case "5":
        tareas.listarCompletadas(false);
        break;
      case "6":
        const id = await listadoTareasBorrar(tareas.listadoArr);
        console.log({ id });

        break;
    }

    guardarDb(tareas.listadoArr);

    console.log("\n");
    await pausa();
  } while (opt !== "0");
};

main();
