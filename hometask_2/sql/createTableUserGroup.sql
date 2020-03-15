CREATE TABLE user_group (
    user_id integer REFERENCES users,
    group_id integer REFERENCES groups
 );

 INSERT INTO user_group ( user_id, group_id)
    VALUES 
    (1, 3);
