export const articleCheckQuery = `SELECT * FROM article WHERE title =  $1`;
export const articleInsertQuery = `INSERT INTO 
 article (title, slug, article_body, featured_image, category_id, created_on, modified_on)
VALUES ($1, $2, $3, $4, $5, $6, $7)
returning *`;

export const findOneArticleQuery = `SELECT * FROM article WHERE id=$1`;
export const updateOneArticleQuery = `UPDATE article SET title = $1, article_body= $2, slug= $3, modified_on = $4 WHERE id = $5 returning *`;
export const deleteOneArticleQuery = `DELETE FROM article WHERE id = $1 returning *`;
export const getOneArticleCommentsQuery = ` SELECT id, commentbody, employeeid FROM articlecomment WHERE articleid = $1 `;