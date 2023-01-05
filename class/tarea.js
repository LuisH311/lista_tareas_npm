const {v4 : uuidv4} = require('uuid');
require('colors');
const moment = require('moment');
const { saveData, showData, deleteDataDB } = require('../helpers/DB');

class tarea {
    constructor(desc = ''){
    this.id = uuidv4(),
    this.descripcion = desc,
    this.fecha = moment().format('dddd Do MMMM') 
    }

}

class tareas {
    constructor(){
        this.listadoTareas = {};
    }

nuevaTarea(desc){
    const item = new tarea(desc);

    const {id,...all} = item; 

    this.listadoTareas[id] = item;
    saveData(this.listadoTareas[id]);
}

mostrarTareas(){
     const dataObj = showData(); 
     let cont = 1;
     let lastfecha = '';
     for (const property in dataObj) {
         const {descripcion,fecha} = dataObj[property];

        (lastfecha != fecha )
        ?console.log(`${'------------------------------------------------------'.magenta}`) 
        : false;

        console.log(`${cont.toString().blue}${')'.blue}  ${descripcion} ${'hecho'.green} el : ${fecha}`);
        cont++; 
        lastfecha = fecha;
    } 
      
}

traerDataFromDB(){ 

    const dataObj = showData(); 
    let array = []; 

     for (const property in dataObj) {
        
         array[property] = dataObj[property];
        
    } 
    return array;

}
delteData(id){
    deleteDataDB(id);
}
}

module.exports = tareas;