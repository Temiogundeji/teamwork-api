export const commentCheckQuery = `SELECT * FROM gif WHERE title =  $1`;
export const commentInsertQuery = `INSERT INTO 
 gifcomment (title, employeeid, gifid, commentbody, created_on)
VALUES ($1, $2, $3, $4, $5)
returning *`;