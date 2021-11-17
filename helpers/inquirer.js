const inquirer = require("inquirer");
require("colors");

const menuOpt = [
  {
    type: "list",
    name: "opcion",
    message: "¿Qué desea hacer?",
    choices: [
      {
        value: "1",
        name: `${"1.".yellow} Crear tarea`,
      },
      {
        value: "2",
        name: `${"2.".yellow} Listar tareas`,
      },
      {
        value: "3",
        name: `${"3.".yellow} Listar tareas completadas`,
      },
      {
        value: "4",
        name: `${"4.".yellow} Listar tareas pendientes`,
      },
      {
        value: "5",
        name: `${"5.".yellow} Completar tarea(s)`,
      },
      {
        value: "6",
        name: `${"6.".yellow} Borrar tarea`,
      },
      {
        value: "0",
        name: `${"0.".yellow} Salir`,
      },
    ],
  },
];

const inquirerMenu = async () => {
  console.clear();
  console.log("==========================".green);
  console.log("  Seleccione una opción".white);
  console.log("==========================\n".green);

  const { opcion } = await inquirer.prompt(menuOpt);

  return opcion;
};

const pausa = async () => {
  const question = [
    {
      type: "input",
      name: "enter",
      message: `Presione ${"Enter".green} para salir`,
    },
  ];
  await inquirer.prompt(question);
};

const leerInput = async (message) => {
  const question = [
    {
      type: "input",
      name: "desc",
      message,
      validate(value) {
        if (value.length === 0) {
          return "por favor ingrese una valor";
        }
        return true;
      },
    },
  ];
  const { desc } = await inquirer.prompt(question);
  return desc;
};

const listadoTareasBorrar = async (tareas = []) => {
  const choices = tareas.map((tarea, i) => {
    const idx = `${i + 1}.`.green;
    return {
      value: tarea.id,
      name: `${idx} ${tarea.desc}`,
    };
  });

  const preguntas = [
    {
      type: "list",
      name: "id",
      message: "Borrar",
      choices,
    },
  ];

  const { id } = await inquirer.prompt(preguntas);
  return id;
};

module.exports = {
  inquirerMenu,
  pausa,
  leerInput,
  listadoTareasBorrar,
};
