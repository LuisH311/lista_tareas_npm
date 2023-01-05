require("colors");

const { menu , getNewTask, pausa, menuBorrar, confirmar} = require("./helpers/menuinquire");
const listTareas = require("./class/tarea");

const principal = async () => {
  try {
    let resmenu;
    do {
        
    resmenu = await menu();
   const lista = new listTareas();

    switch (resmenu) {
      case "1": 
      const {description} = await getNewTask();
      
      lista.nuevaTarea(description);
      await pausa(`Se ha agregado ${'CORRECTAMENTE'.green}`);
      break;

      case "2":
      console.clear();
      lista.mostrarTareas();
      await pausa(`Presione ${'Enter'.green} para Continuar `);
      
      break;
      case "3":
       const array = lista.traerDataFromDB();
       const deleteID = await menuBorrar(array);
       const ok = await confirmar(`'¿ Desea ${ 'borrar'.red } la ${'tarea'.green }? '`);
       (ok) ? lista.delteData(deleteID) : false
       await pausa(`Presione ${'Enter'.green} para Continuar `);

      break;
    }

  } while (resmenu != 0);

  } catch (error) {
    console.log(error);
  }
};

principal();