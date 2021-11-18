require("colors");
const { guardarDb, leerDb } = require("./helpers/guardarArchivo");
const {
  inquirerMenu,
  pausa,
  leerInput,
  listadoTareasBorrar,
  confirmar,
  listadoMostrarChecklist,
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
      case "1": // crear tarea para agregar al listado
        const desc = await leerInput("descripcion:");
        tareas.crearTarea(desc);
        break;

      case "2": // listado de todos las tareas
        tareas.listadoCompleto();
        break;
      case "3": // listado tareas completas
        tareas.listarCompletadas();
        break;
      case "4": // listado tareas pendientes
        tareas.listarCompletadas(false);
        break;
      case "5": // mostrar listado pendientes || completar
        const ids = await listadoMostrarChecklist(tareas.listadoArr);
        tareas.toggleComplete(ids);
        break;
      case "6": // listado de tareas a borrar
        const id = await listadoTareasBorrar(tareas.listadoArr);
        if (id !== 0) {
          const confir = await confirmar("Estas seguro?");

          if (confir) {
            tareas.borrarTarea(id);
          }
        }

        break;
    }

    guardarDb(tareas.listadoArr);

    console.log("\n");
    await pausa();
  } while (opt !== "0");
};

main();
