const Router = require ('express')
const router = Router()
const authController = require('../controllers/auth.controller')

//router.get('/verificacorreoregistrado/:email', authController.verificaCorreoRegistrado)

router.post('/signup', authController.signUp)

/*router.post('/signin', authController.signIn)
router.post('/getdatauserlogin/:userId', authController.getDataUserLogin)
router.put('/updateimguser/:userId', authController.updateImgUser)*/

module.exports= router