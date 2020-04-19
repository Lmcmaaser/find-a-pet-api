CREATE TYPE sex_category AS ENUM ('male', 'female');

ALTER TABLE animals
  ADD COLUMN
    sex sex_category;
