CREATE TABLE Groups (
    id SERIAL PRIMARY KEY,
    name VARCHAR(20),
    permission text[]
 );

 INSERT INTO Groups ( name, permission)
    VALUES 
    ('write', ['WRITE']);
