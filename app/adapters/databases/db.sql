
-- Creating database and tables with sql command just run this codes in psql terminal don't forget semicolumn =)
CREATE DATABASE tracking_database;

CREATE TABLE devices(
    id SERIAL PRIMARY KEY NOT NULL,
    device_type_id INT REFERENCES devices_type (id),
    device_name VARCHAR(75),
    is_online BOOLEAN,
    is_active BOOLEAN
);
--sample innsert for devices
--insert into devices(device_type_id, device_name,is_online,is_active) values (1,'GPS',true,true);

CREATE TABLE devices_type(
    id SERIAL PRIMARY KEY NOT NULL,
    device_name VARCHAR(75),
    device_description VARCHAR(75),
    is_active BOOLEAN
);
--sample innsert for devices type
--insert into devices_type(device_name,device_description,is_active) values ('GPS','TRACK TRUCKS',true);


--create vehicles
CREATE TABLE vehicles(
    id SERIAL PRIMARY KEY NOT NULL,
    vehicle_plate VARCHAR(20),
    current_status INT,
    is_active BOOLEAN
);
    

    