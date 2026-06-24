const Project = require('../models/Project');

exports.getProjectsByYear = async (year) => {
    return Project.findAll({
        where: year ? { academicYear: year } : {}
    });
};

exports.createProject = async (projectData) => {
    return Project.create(projectData);
};

exports.updateProject = async (id, updateData) => {
    const project = await Project.findByPk(id);
    if (!project) throw new Error('Project not found');
    await project.update(updateData);
    return project;
};