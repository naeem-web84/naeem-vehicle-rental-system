import { Pool } from "pg";
import config from ".";
import { Request, Response } from "express";

export const pool = new Pool({
    connectionString: `${config.connection_string}`,
    ssl: { rejectUnauthorized: false }
});

export const initDB = async () => {
    try {
        await pool.connect();


        await pool.query(`
            CREATE TABLE IF NOT EXISTS users (
                id SERIAL PRIMARY KEY,
                name VARCHAR(100) NOT NULL,
                email VARCHAR(100) UNIQUE NOT NULL,
                password VARCHAR(255) NOT NULL,
                phone VARCHAR(20) NOT NULL,
                role VARCHAR(20) NOT NULL CHECK (role IN ('admin','customer')),
                created_at TIMESTAMP DEFAULT NOW()
            );
        `);


        await pool.query(`
            CREATE TABLE IF NOT EXISTS vehicles (
                id SERIAL PRIMARY KEY,
                vehicle_name VARCHAR(100) NOT NULL,
                type VARCHAR(20) NOT NULL CHECK (type IN ('car','bike','van','SUV')),
                registration_number VARCHAR(50) UNIQUE NOT NULL,
                daily_rent_price NUMERIC(10,2) NOT NULL CHECK (daily_rent_price > 0),
                availability_status VARCHAR(20) NOT NULL CHECK (availability_status IN ('available','booked')),
                created_at TIMESTAMP DEFAULT NOW()
            );
        `);


        await pool.query(`
            CREATE TABLE IF NOT EXISTS bookings (
                id SERIAL PRIMARY KEY,
                customer_id INT REFERENCES users(id) ON DELETE CASCADE,
                vehicle_id INT REFERENCES vehicles(id) ON DELETE CASCADE,
                rent_start_date DATE NOT NULL,
                rent_end_date DATE NOT NULL,
                total_price NUMERIC(10,2) NOT NULL CHECK (total_price > 0),
                status VARCHAR(20) NOT NULL CHECK (status IN ('active','cancelled','returned')),
                created_at TIMESTAMP DEFAULT NOW()
            );
        `);
 
    } catch (error: any) {
        throw new Error("DB init failed: " + error.message);
    }
};
