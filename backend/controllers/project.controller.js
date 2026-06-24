const projectService = require('../services/project.service');

exports.getProjectsByYear = async (req, res) => {
    try {
        const { year } = req.query;
        const projects = await projectService.getProjectsByYear(year);
        return res.status(200).json(projects);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

exports.createProject = async (req, res) => {
    try {
        const project = await projectService.createProject(req.body);
        return res.status(201).json(project);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

exports.updateProject = async (req, res) => {
    try {
        const project = await projectService.updateProject(req.params.id, req.body);
        return res.status(200).json(project);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};