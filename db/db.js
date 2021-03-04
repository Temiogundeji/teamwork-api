const {pool} = require('../dev/pool');

pool.on('connect', () => {
  console.log('connected to the db');
});

const createEmployeeTable = () => {
    const createEmployeeQuery = `CREATE TABLE IF NOT EXISTS employee 
    (
        id SERIAL PRIMARY KEY,
        first_name VARCHAR(100),
        last_name VARCHAR(100),
        email VARCHAR(100) UNIQUE NOT NULL,
        password VARCHAR(100) NOT NULL,
        image VARCHAR(200) NOT NULL,
        department_id integer NOT NULL REFERENCES department(id) ON DELETE CASCADE,
        role_id integer DEFAULT 1 references roles (id) ON DELETE CASCADE,
        address VARCHAR(200) NOT NULL,
        created_on timestamp,
        modified_on timestamp
    );
    `;
    pool.query(createEmployeeQuery)
        .then((res) => {
            console.log(res);
            pool.end();
        })
        .catch(err => {
            console.log(err);
            pool.end();
        })
}

const createRolesTable = () => {
    const createRolesQuery = `CREATE TABLE IF NOT EXISTS roles 
    (
        id SERIAL PRIMARY KEY,
        role_title VARCHAR(200) NOT NULL,
        created_on timestamp,
        modified_on timestamp
    );
    `;
    pool.query(createRolesQuery)
        .then((res) => {
            console.log(res);
            pool.end();
        })
        .catch(err => {
            console.log(err);
            pool.end();
        })
}

const createDepartmentTable = () => {
    const createDepartmentQuery = `CREATE TABLE IF NOT EXISTS department 
    (
        id SERIAL PRIMARY KEY,
        department_name VARCHAR(200) UNIQUE NOT NULL,
        department_details VARCHAR(200) NOT NULL,
        created_on timestamp,
        modified_on timestamp
    );
    `;
    pool.query(createDepartmentQuery)
        .then((res) => {
            console.log(res);
            pool.end();
        })
        .catch(err => {
            console.log(err);
            pool.end();
        })
}


const createGifTable = () => {
    const createGifQuery = `CREATE TABLE IF NOT EXISTS gif (
        id SERIAL PRIMARY KEY,
        title VARCHAR(200) UNIQUE NOT NULL,
        about_gif VARCHAR(250) UNIQUE NOT NULL,
        imageUrl VARCHAR(250) NOT NULL,
        created_on timestamp,
        modified_on timestamp
        );
    `;
    pool.query(createGifQuery)
        .then((res) => {
            console.log(res);
            pool.end();
        })
        .catch(err => {
            console.log(err);
            pool.end();
    })
}

const createArticleTable = () => {
    const createArticleQuery = `CREATE TABLE IF NOT EXISTS article
    (
        id SERIAL PRIMARY KEY,
        title VARCHAR(200) UNIQUE NOT NULL,
        slug VARCHAR(200) UNIQUE NOT NULL,
        article_body VARCHAR(200) NOT NULL,
        featured_image VARCHAR(200) NOT NULL,
        category_id INTEGER REFERENCES categories(id) ON DELETE CASCADE,
        created_on timestamp,
        modified_on timestamp
    )
    `;
    pool.query(createArticleQuery)
        .then((res) => {
            console.log(res);
            pool.end();
        })
        .catch(err => {
            console.log(err);
            pool.end();
    });
}

const articleCategories = () => {
    const articleCategoryQuery = `CREATE TABLE IF NOT EXISTS categories (
        id SERIAL PRIMARY KEY,
        title VARCHAR(200) UNIQUE NOT NULL,
        about_category VARCHAR(200) NOT NULL
    );
    `;
    pool.query(articleCategoryQuery)
        .then((res) => {
            console.log(res);
            pool.end();
        })
        .catch(err => {
            console.log(err);
            pool.end();
    })
}

const createArticleCommentTable = () => {
    const articleCommentQuery = `CREATE TABLE IF NOT EXISTS articlecomment (
        id SERIAL PRIMARY KEY,
        employeeId INTEGER REFERENCES employee(id) ON DELETE CASCADE,
        articleId INTEGER REFERENCES article(id) ON DELETE CASCADE,
        commentBody VARCHAR(250) NOT NULL,
        created_on timestamp
        );`;
    pool.query(articleCommentQuery)
        .then((res) => {
            console.log(res);
            pool.end();
        })
        .catch(err => {
            console.log(err);
            pool.end();
    })

}

const createGifCommentTable = () => {
    const gifCommentQuery = `CREATE TABLE IF NOT EXISTS gifcomment (
        id SERIAL PRIMARY KEY,
        title VARCHAR(150),
        employeeId INTEGER REFERENCES employee(id) ON DELETE CASCADE,
        gifId INTEGER REFERENCES gif(id) ON DELETE CASCADE,
        commentBody VARCHAR(250) NOT NULL,
        created_on timestamp NOT NULL
    )`;
    pool.query(gifCommentQuery)
        .then((res) => {
            console.log(res);
            pool.end();
        })
        .catch(err => {
            console.log(err);
            pool.end();
    })
}

/** Dropping Tables **/

const dropEmployeeTable = () => {
    const employeeDropQuery = `DROP TABLE IF EXISTS employee`;
    pool.query(employeeDropQuery)
        .then((res) => {
            console.log(res);
            pool.end();
        })
        .catch(err => {
            console.log(err);
            pool.end();
    })
}

const dropGifTable = () => {
    const gifDropQuery = `DROP TABLE IF EXISTS gif`;
    pool.query(gifDropQuery)
        .then((res) => {
            console.log(res);
            pool.end();
        })
        .catch(err => {
            console.log(err);
            pool.end();
    })
}

const dropGifCommentTable = () => {
    const gifCommentTableDropQuery = `DROP TABLE IF EXISTS gifcomment`;
    pool.query(gifCommentTableDropQuery)
        .then((res) => {
            console.log(res);
            pool.end();
        })
        .catch(err => {
            console.log(err);
            pool.end();
    })
}

const dropArticleCommentTable = () => {
    const articleCommentTableDropQuery = `DROP TABLE IF EXISTS articlecomment`;
    pool.query(articleCommentTableDropQuery)
        .then((res) => {
            console.log(res);
            pool.end();
        })
        .catch(err => {
            console.log(err);
            pool.end();
    })
}

const dropArticleTable = () => {
    const articleTableDropQuery = `DROP TABLE IF EXISTS article`;
    pool.query(articleTableDropQuery)
        .then((res) => {
            console.log(res);
            pool.end();
        })
        .catch(err => {
            console.log(err);
            pool.end();
    })
}

/**
 *  Create All Tables
 **/

const createAllTables = () => {
    createArticleCommentTable();
    createArticleTable();
    createEmployeeTable();
    createGifCommentTable();
    createGifTable();
    articleCategories();
    createDepartmentTable();
    createRolesTable();
}

/** 
 * Drop All Table
**/

const dropAllTables = () => {
    dropEmployeeTable();
    dropGifCommentTable();
    dropArticleCommentTable();
    dropGifTable();
    dropArticleTable();
}

pool.on('remove', () => {
    console.log('client removed');
    process.exit(0);
});

export {
    createAllTables,
    dropAllTables
};

require('make-runnable');