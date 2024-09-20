import {Router} from 'express';
const router = Router();

import {createUser, findAll, updateUser} from '../controllers/user.controller.js';
import {validId, validUser} from "../middlewares/global.middlewares.js"

router.post("/", createUser);
router.get("/", findAll);
router.patch("/:id",validId, validUser, updateUser);

export default router;