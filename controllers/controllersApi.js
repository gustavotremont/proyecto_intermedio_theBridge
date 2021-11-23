//Funcion que pinta nuestros datos en home
const home = (req,res) =>{
    res.json()
}

//funcion para crear oferta
const creaOferta =  (req,res) => {
    const dataOferta = {
        "Puesto": "Programador", //aqui tiene que ir la llamada a los datos del pug req.body.title por ej
        "Nombre_empresa": " CES",
        "Localizacion": "Madrid",
        "Requisitos": "Css / javascript",
        "Descripcion": "L a V 9 A 15h pm",
        "Mensaje": `Se ha guardado la oferta correctamente`,
    }
    return res.status(201).json(dataOferta) //devuelven los datos del json
}

//funcion para borrar 




const trabajo ={
    home,
    creaOferta
}

module.exports = trabajo;