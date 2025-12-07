import { pool } from "../../config/db";

export interface Vehicle {
  id?: number;
  vehicle_name: string;
  type: "car" | "bike" | "van" | "SUV";
  registration_number: string;
  daily_rent_price: number;
  availability_status: "available" | "booked";
  created_at?: Date;
}

 
export const addVehicle = async (data: Vehicle): Promise<Vehicle> => {
  const result = await pool.query(
    `INSERT INTO vehicles (vehicle_name, type, registration_number, daily_rent_price, availability_status)
     VALUES ($1, $2, $3, $4, $5)
     RETURNING id, vehicle_name, type, registration_number, daily_rent_price, availability_status, created_at`,
    [data.vehicle_name, data.type, data.registration_number, data.daily_rent_price, data.availability_status]
  );
  return result.rows[0];
};

 
export const getAllVehicles = async (): Promise<Vehicle[]> => {
  const result = await pool.query(
    "SELECT id, vehicle_name, type, registration_number, daily_rent_price, availability_status, created_at FROM vehicles ORDER BY id ASC"
  );
  return result.rows;
};

 
export const getVehicleById = async (id: string): Promise<Vehicle | null> => {
  const result = await pool.query(
    "SELECT id, vehicle_name, type, registration_number, daily_rent_price, availability_status, created_at FROM vehicles WHERE id = $1",
    [id]
  );
  return result.rows[0] || null;
};


export const updateVehicle = async (id: string, data: Partial<Vehicle>): Promise<Vehicle | null> => {
  const fields: string[] = [];
  const values: any[] = [];
  let index = 1;

  const allowedFields = ["vehicle_name", "type", "registration_number", "daily_rent_price", "availability_status"];
  for (const key of allowedFields) {
    if (data[key as keyof Vehicle] !== undefined) {
      fields.push(`${key} = $${index}`);
      values.push(data[key as keyof Vehicle]);
      index++;
    }
  }

  if (fields.length === 0) return null;

  values.push(id);
  const query = `UPDATE vehicles SET ${fields.join(", ")} WHERE id = $${index} RETURNING id, vehicle_name, type, registration_number, daily_rent_price, availability_status, created_at`;
  const result = await pool.query(query, values);
  return result.rows[0] || null;
};

 
export const deleteVehicle = async (id: string): Promise<boolean> => {
  try {
    const result = await pool.query("DELETE FROM vehicles WHERE id = $1", [id]);
    return (result.rowCount ?? 0) > 0;
  } catch (err) {
    console.error("Error deleting vehicle:", err);
    return false;
  }
};
