CREATE TABLE Users (
    id SERIAL PRIMARY KEY,
    login VARCHAR(20),
    password VARCHAR(30),
    age INTEGER,
    "isDelete" BOOLEAN DEFAULT false
 );

 INSERT INTO Users ( login, password, age )
    VALUES 
    ('Alex', 'qwe', 23),
    ('Apple', 'cdfds', 25),
    ('Roma', 'k[l[pl', 18);