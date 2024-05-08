import express from 'express'
import { verifyToken } from '../utils/verifyToken.js'
import { deleteUser, signOut, updateUser } from '../controllers/user.controller.js'

const router = express.Router()

router.put('/update/:userId',verifyToken, updateUser)
router.delete('/delete/:userId',verifyToken, deleteUser)
router.post('/signout/:userId', signOut)

export default router