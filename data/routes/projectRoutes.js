const express = require('express');
const router = express.Router();
const projectsModel = require('../helpers/projectModel');

//PROJECT ROUTES

router.get('/', (req, res) => {
	projectsModel
		.get()
		.then((projects) => {
			res.status(200).json(projects);
		})
		.catch((err) => {
			res.status(500).json({ message: 'Could not retrieve data from database' });
		});
});

router.get('/:id', (req, res) => {
	const { id } = req.params;
	projectsModel
		.get(id)
		.then((projects) => {
			res.json(projects);
		})
		.catch(() => {
			res.status(500).json({ message: 'Error retrieving project from database.' });
		});
});

router.post('/', (req, res) => {
	const { name, description } = req.body;
	if (name && description) {
		projectsModel.insert({ name, description, completed: false }).then(({ name, description, completed }) => {
			res.status(200).json({ name, description, completed });
		});
	} else {
		res.status(500).json({ error: 'Error adding project to database.' });
	}
});

router.put('/:id', (req, res) => {
	const { id } = req.params;
	const { name, description } = req.body;
	if ((name, description)) {
		projectsModel.update(id, req.body).then(() => {
			res.status(200).json({ message: 'Project successfully updated.' });
		});
	} else {
		res.catch(() => {
			res.status(500).json({ message: 'Unable to update project.' });
		});
	}
});

router.delete('/:id', (req, res) => {
	const { id } = req.params;
	projectsModel
		.remove(id)
		.then((projects) => {
			res.json(projects);
		})
		.catch(() => {
			res.status(500).json({ message: 'Error removing project from database.' });
		});
});

module.exports = router;
