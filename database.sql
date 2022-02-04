-- USER is a reserved keyword with Postgres
-- You must use double quotes in every query that user is in:
-- ex. SELECT * FROM "user";
-- Otherwise you will have errors!
CREATE TABLE "user" (
    "id" SERIAL PRIMARY KEY,
    "username" VARCHAR (80) UNIQUE NOT NULL,
    "password" VARCHAR (1000) NOT NULL
);
--Table for projects. All projects are linked via foreign keys to a specific user.
CREATE TABLE "projects" (
  "id" SERIAL PRIMARY KEY,
  "project_name" VARCHAR(120) NOT NULL,
  "is_current" BOOLEAN,
  "user_id" INT REFERENCES "user" ON DELETE CASCADE
);
--Table for layers. All layers are linked to a specific user and specific project of that user.
CREATE TABLE "layers" (
  "id" SERIAL PRIMARY KEY,
  "layer_name" VARCHAR(120) NOT NULL,
  "project_id"  INT REFERENCES "projects" ON DELETE CASCADE,
  "user_id"  INT REFERENCES "user" ON DELETE CASCADE
);
--Table for attributes. All attributes are linked to a specific user, specific project of that user, and specific layer of that project.
CREATE TABLE "attributes" (
  "id" SERIAL PRIMARY KEY,
  "attribute_name" VARCHAR(120) NOT NULL,
  "rarity_value" INT NOT NULL,
  "layer_id"  INT REFERENCES "layers" ON DELETE CASCADE,
  "user_id"  INT REFERENCES "user" ON DELETE CASCADE,
  "project_id" INT REFERENCES "projects" ON DELETE CASCADE
);
