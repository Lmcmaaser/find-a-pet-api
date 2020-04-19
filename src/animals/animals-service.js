const AnimalsService = {
  getAllAnimals(knex) {
    return knex.select('*').from('animals')
  },
}

module.exports = AnimalsService;
