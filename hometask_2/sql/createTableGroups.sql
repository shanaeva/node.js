CREATE TABLE groups (
    id SERIAL PRIMARY KEY,
    name VARCHAR(20),
    permission text[]
 );

 INSERT INTO groups ( name, permission)
    VALUES 
    ('write', ARRAY['WRITE']);
