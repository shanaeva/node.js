CREATE TABLE user_group (
    user_id integer REFERENCES users,
    group_id integer REFERENCES groups
 );


