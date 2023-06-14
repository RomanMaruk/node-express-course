const getAllTasks = (req, res) => {
	res.send('Get all task')
}

const createTask = (req, res) => {
	res.json(req.body);
	// res.send('Create task')
}
const getTask = (req, res) => {
	res.json({
		id: req.params.id
	})
}
const updateTask = (req, res) => {
	res.send('update task')
}
const deleteTask = (req, res) => {
	res.send('delete task')
}

module.exports = {
	getAllTasks,
	getTask,
	createTask,
	updateTask,
	deleteTask
}