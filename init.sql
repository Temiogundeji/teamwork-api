CREATE TABLE IF NOT EXISTS roles 
    (
        id SERIAL PRIMARY KEY,
        role_title VARCHAR(200) NOT NULL,
        created_on timestamp,
        modified_on timestamp
    );