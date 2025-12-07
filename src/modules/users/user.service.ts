import { pool } from "../../config/db";

 
export const getAllUsers = async () => {
  const result = await pool.query(
    "SELECT id, name, email, phone, role, created_at FROM users ORDER BY id ASC"
  );
  return result.rows;
};

 
export const updateUser = async (userId: string, data: any, requester: any) => {
  const targetId = parseInt(userId);

   
  if (requester.role !== "admin" && requester.id !== targetId) return null;

  const fields: string[] = [];
  const values: any[] = [];
  let index = 1;

   
  const allowedFields = ["name", "email", "phone"];
  if (requester.role === "admin") allowedFields.push("role");

  for (const key of allowedFields) {
    if (data[key] !== undefined) {
      fields.push(`${key} = $${index}`);
      values.push(data[key]);
      index++;
    }
  }

  if (fields.length === 0) return null;  

  values.push(targetId);  
  const query = `UPDATE users SET ${fields.join(", ")} WHERE id = $${index} RETURNING id, name, email, phone, role, created_at`;

  const result = await pool.query(query, values);
  return result.rows[0];
};

 
export const deleteUser = async (id: string) => {
  try {
    const result = await pool.query("DELETE FROM users WHERE id = $1", [id]);
    return (result.rowCount ?? 0) > 0;  
  } catch (error) {
    console.error("Error deleting user:", error);
    return false;
  }
};
