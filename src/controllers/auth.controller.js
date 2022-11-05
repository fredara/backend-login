const Users = require("../models/Users");
const Role = require("../models/Role");
const UserLog = require("../models/UserLog");
const jwt = require("jsonwebtoken");
const config = require("../config");


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
       // const saveUser = await newUser.save();

       const saveUser = await newUser.save((err, user) => {
            if (err) {
              res.status(500).send({ message: err });
              return;
            }

            if (req.body.roles) {
                Role.find(
                {
                    name: { $in: req.body.roles },
                },
                (err, roles) => {
                    if (err) {
                    res.status(500).send({ message: err });
                    return;
                    }
        
                    user.roles = roles.map((role) => role._id);
                    user.save((err) => {
                    if (err) {
                        res.status(500).send({ message: err });
                        return;
                    }
        
                    res.status(200).json({ Respuesta: 'Guardado Correctamente', id: user._id });
                    });
                }
                );
            } else {
                Role.findOne({ name: "user" }, (err, role) => {
                    if (err) {
                    res.status(500).send({ message: err });
                    return;
                    }
            
                    Users.roles = [role._id];
                    Users.save((err) => {
                    if (err) {
                        res.status(500).send({ message: err });
                        return;
                    }
            
                    res.status(200).json({ Respuesta: 'Guardado Correctamente', id: saveUser._id });
                    });
                });
            }
        })
        
    } catch (e) {
        //console.error(e);
        res.status(500).send({ message: err });
        return;
    }
  
};

const signIn = async (req, res, next) => {
    try {
        const {email, password} = req.body;
        const userFound = await Users.findOne({ email: email });

        if (userFound==null) {
            return res.status(200).json({ message: 'Correo No Registrado' });
        }else{
            const userFoundLog = await UserLog.findOne({ id_user: userFound._id });

            if(userFoundLog==null){
                const matchPasswordC = await Users.comparePassword (password, userFound.password)
                if(!matchPasswordC) return res.status(200).json({token:null, message:'Contraseña Invalida'})
                
                const tokenSignInC = jwt.sign({id: Users._id}, config.SECRET, {
                    expiresIn:86400
                })

                req.session.token = tokenSignInC;
                const {
                    id_user,
                    token_user,
                } = {id_user:userFound._id, token_user:tokenSignInC};
        
                const userlog = new UserLog({
                    id_user,
                    token_user,
                });

                const guardalog = await userlog.save();

                return res.status(200).json({tokenSignInC, message:'EntraDone', id: Users._id});
            }else{
                return res.status(200).json({ message: 'Correo ya se encuentra Logeado' });
            }
        }

    } catch (e) {
        res.status(500).send(`Error al intentar Ingresar:  ${e}`);
    }
  
};

const signOut = async (req, res, next) => {
    try {
        const userLog = await UserLog.findOne({ token_user: req.session.token });
        if(userLog==null){
            req.session = null;
            return res.status(200).send({ message: "has Salido del Sistema!" });
        }else{
            const deleteLote = await UserLog.findByIdAndDelete(userLog._id);
            req.session = null;
            return res.status(200).send({ message: "has Salido del Sistema!" });
        }
        
    } catch (err) {
      next(err);
    }
};

const getUserLog = async (req, res, next) => {
    try {
        const userLog = await UserLog.findOne({ token_user: req.session.token });
        if(userLog==null){
            return  res.status(200).send("No Existe Usuario Logeado. Permisos Denegados");
        }else{
            const usuarioLogueado = await Users.findOne({ _id: {$eq:userLog.id_user }},
                {
                  name:1,
                  lastName:1,
                  identification:1,
                  email:1,
                  roles:1
                });
            return res.status(200).send({ message: "Usuario encontrado!", dataUser:usuarioLogueado});
        }
        
    } catch (err) {
        next(err);
    }
}

const getAllUser = async (req, res, next) => {
    const { page = 1, limit = 10 } = req.query;
    try {
        const allUser = await Users.find({},{
            name:1,
            lastName:1,
            identification:1,
            email:1,
            roles:1
        })
            .limit(limit * 1)
            .skip((page - 1) * limit)
            .exec();
        const count = await Users.countDocuments();
        return res.status(200).send({ 
            message: "Consulta Completa!", 
            AllUsers: allUser,  
            totalPages: Math.ceil(count / limit),
            currentPage: page,
            totalItems: count
        });
        
    } catch (err) {
        next(err);
    }
}


module.exports = {
  signUp,
  signIn,
  signOut,
  getUserLog,
  getAllUser
};
