const Users = require("../models/Users");
/*const jwt = require("jsonwebtoken");
const config = require("../config");*/


const signUp = async (req, res, next) => {
    try {
        //console.log(req.body);
        const {
            name,
            lastName,
            identification,
            email,
            password
        } = req.body;

        const newUser = new Users({
            name,
            lastName,
            identification,
            email,
            password: await Users.encryptPassword(password)
        });

        //save User
        const saveUser = await newUser.save();
        

        //console.log(saveUser)
        
        res.status(200).json({ Respuesta: 'Guardado Correctamente', id: saveUser._id });

    } catch (e) {
        //console.error(e);
        //res.status(400).json({ "error": e });
        res.status(500).send(`Error al intentar Guardar:  ${e}`);
    }
  
};


module.exports = {
  signUp
};
