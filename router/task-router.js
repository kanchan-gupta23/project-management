const express = require ("express")
const router = express.Router()
const authmiddleware = require ("../middelware/authmiddleware")

const taskController = require ("../controllers/task-controller")

router.route("/createTask").post(authmiddleware, taskController.createTask)
router.route("/delete/:id").delete(authmiddleware, taskController.deleteTask)
router.route("/update/:id").put(authmiddleware, taskController.updateTask)
router.route("/getTask/:id").get(authmiddleware, taskController.getMyTask)
router.route("/getSingleTask/:id").get(authmiddleware, taskController.getSingleTask)
router.route("/toggelStatus/:id").put(authmiddleware, taskController.toggelStatus)
router.route("/getFilteredTask").get(authmiddleware, taskController.getFilteredTask)

module.exports = router