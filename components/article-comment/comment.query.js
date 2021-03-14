export const commentCheckQuery = `SELECT * FROM article WHERE id =  $1`;
export const commentInsertQuery = `INSERT INTO 
 articlecomment (employeeid, articleid, commentbody, created_on)
VALUES ($1, $2, $3, $4)
returning *`;