const Router = require ('express')
const router = Router()
const authController = require('../controllers/auth.controller')
const { verifySignUp } = require("../middlewares");
const { authJwt } = require("../middlewares");
router.post(
    '/signup',
    [
        verifySignUp.checkDuplicateEmail,
        verifySignUp.checkRolesExisted
    ],
    authController.signUp
)

router.post('/signin', authController.signIn)
router.post('/signout', authController.signOut)
router.get(
    "/getUserLogin", 
    [authJwt.verifyToken],
    authController.getUserLog
);//Permisos de usuario

router.get("/getalluser", authController.getAllUser);


//router.get('/verificacorreoregistrado/:email', authController.verificaCorreoRegistrado)
/*router.post('/getdatauserlogin/:userId', authController.getDataUserLogin)
router.put('/updateimguser/:userId', authController.updateImgUser)*/

module.exports= router