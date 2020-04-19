const path = require('path')
const express = require('express')
const xss = require('xss')
const AnimalsService = require('./animals-service')
const notesRouter = express.Router()
const jsonParser = express.json()
const logger = require('../logger')

const serializeAnimals = animal => ({
  id: animal.id,
  name: xss(animal.name),
  sex: animal.sex,
  age: animal.age,
  arrived: animal.arrived,
  adopted: animal.adopted,
  adoptiondate: animal.adoptiondate,
  typeid: animal.typeid
})

animalsRouter
  .route('/')
  .get((req, res, next) => {
    const knexInstance = req.app.get('db')
    AnimalsService.getAllAnimals(knexInstance)
      .then(animals => {
        res.json(animals.map(animal => serializeAnimals(animal)))
      })
      .catch(next)
  })
  .post(jsonParser, (req, res, next) => {
    const { name, sex, age, arrived, typedid } = req.body
    const newAnimal = { name, sex, age, arrived }

    for (const [key, value] of Object.entries(newAnimal)) {
      if (value == null) {
        return res.status(400).json({
          error: { message: `Missing '${key}' in request body.` }
        })
      }
    }
    newAnimal.name = name;
    newAnimal.sex = sex;
    newAnimal.age = age;
    newAnimal.arrived = arrived;
    newAnimal.typedid = typeid;
    console.log(newAnimal);
