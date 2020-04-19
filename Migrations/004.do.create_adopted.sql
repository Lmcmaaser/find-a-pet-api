CREATE TYPE adopted_category AS ENUM ('yes', 'no');

ALTER TABLE animals
  ADD COLUMN
    adopted adopted_category;
