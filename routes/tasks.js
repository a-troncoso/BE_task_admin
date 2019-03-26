const express = require('express');
const router = express.Router();

const Task = require('../models/index').Task;

// Get all
router.get('/', async (req, res, next) => {

  try {
    const tasks = await Task.findAll({
      attributes: ['id', 'title', 'isFinished', 'isActive', 'createdAt'],
      where: { isActive: true, isFinished: false },
      order: [ ['createdAt', 'DESC'] ]
    });
    res.json({
      result: 'OK',
      data: tasks,
      length: tasks.length,
      message: 'Tareas obtenidas correctamente'
    });
  } catch (error) {
    res.json({
      result: 'ERROR',
      data: [],
      length: 0,
      message: `Error al obtener las tareas. Error: ${error}`
    });
  }
});

// Get one
router.get('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const task = await Task.findByPk(+id);

    if (task) {
      res.json({
        result: 'OK',
        data: task,
        message: 'Tarea obtenida correctamente'
      });
    } else {
      res.json({
        result: 'ERROR',
        data: {},
        message: 'Tarea no encontrada'
      });
    }
  } catch (error) {
    res.json({
      result: 'ERROR',
      data: {},
      message: `Error al obtener la tarea. Error: ${error}`
    });
  }
});

// Insert
router.post('/', async (req, res) => {
  const { title } = req.body;

  try {
    const newTask = await Task.create(
      {
        title,
        isFinished: false,
        isActive: true,
        // createdAt: new Date().toDateString()
      },
      {
        fields: ['title', 'isFinished', 'isActive']
      }
    );

    if (newTask) {
      res.json({
        result: 'OK',
        data: newTask,
        message: 'Tarea ingresada correctamente'
      });
    } else {
      res.json({
        result: 'ERROR',
        data: {},
        message: 'Error al ingresar tarea'
      });
    }
  } catch (error) {
    res.json({
      result: 'ERROR',
      data: {},
      message: `Error al ingresar tarea. Error: ${error}`
    });
  }
});

// Update
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { title, isFinished, isActive } = req.body;

  try {
    const task = await Task.findByPk(+id);

    if (task) {
      await task.update({
        title: title ? title : task.title,
        isFinished: isFinished ? isFinished : task.isFinished,
        isActive: isActive ? isActive : task.isActive
      });
      res.json({
        result: 'OK',
        data: task,
        message: 'Tarea actualizada correctamente'
      });
    } else {
      res.json({
        result: 'ERROR',
        data: {},
        message: 'Tarea no encontrada'
      });
    }
  } catch (error) {
    res.json({
      result: 'ERROR',
      data: {},
      message: `Error al actualizar tarea. Error: ${error}`
    });
  }
});

// Delete
router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const task = await Task.findByPk(+id);

    if (task) {
      // Realmente no se elimina la tarea, sólo se cambia es estado activo a false
      await task.update({ isActive: false });
      res.json({
        result: 'OK',
        data: task,
        message: 'Tarea eliminada correctamente'
      });
    } else {
      res.json({
        result: 'ERROR',
        data: {},
        message: 'Tarea no encontrada'
      });
    }
  } catch (error) {
    res.json({
      result: 'ERROR',
      data: {},
      message: `Error al eliminar tarea. Error: ${error}`
    });
  }
});

module.exports = router;
