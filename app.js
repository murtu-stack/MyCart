// app.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const Student = require('./Models/Student.js')
require('dotenv').config();


const app = express();
app.use(express.json());

const port = process.env.PORT || 5000;

const dbConnectionString = process.env.DB_CONNECTION_STRING;

mongoose.connect(dbConnectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});



app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// CRUD API routes
app.post('/students', async (req, res) => {
    const { name, age, grade } = req.body;
    console.log(name)
  try {
    const student = await Student.create({
      name: name,
      age: age,
      grade: grade
    });
      console.log(student)
    res.json(student);
  } catch (e) {
    res.status(422).json(e);
  }
});

app.get('/students', async (req, res) => {
  try {
    const students = await Student.find();
    res.json(students);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch students' });
  }
});

app.get('/students/:id', async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    if (!student) {
      res.status(404).json({ error: 'Student not found' });
    } else {
      res.json(student);
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch student' });
  }
});

app.put('/students/:id', async (req, res) => {
  try {
    const student = await Student.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!student) {
      res.status(404).json({ error: 'Student not found' });
    } else {
      res.json(student);
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to update student' });
  }
});

app.delete('/students/:id', async (req, res) => {
  try {
    const student = await Student.findByIdAndRemove(req.params.id);
    if (!student) {
      res.status(404).json({ error: 'Student not found' });
    } else {
      res.json({ message: 'Student deleted successfully' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete student' });
  }
});


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
