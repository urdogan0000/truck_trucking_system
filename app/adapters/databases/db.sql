
-- Creating database and tables with sql command just run this codes in psql terminal don't forget semicolumn =)
CREATE DATABASE tracking_database;

CREATE TABLE devices(
    id SERIAL PRIMARY KEY NOT NULL,
    vehicle_id INT REFERENCES vehicles(id)  ON DELETE CASCADE,
    device_type_id INT REFERENCES devices_type (id)  ON DELETE CASCADE,
    device_name VARCHAR(75),
    is_online BOOLEAN DEFAULT true,
    is_active BOOLEAN DEFAULT true
);
--sample innsert for devices
--insert into devices(device_type_id,,vehicle_id,device_name,is_online,is_active) values (1,1,'GPS',true,true);

CREATE TABLE devices_type(
    id SERIAL PRIMARY KEY NOT NULL ,
    device_name VARCHAR(75) NOT NULL ,
    device_description VARCHAR(75),
    is_active BOOLEAN DEFAULT true
);
--sample innsert for devices type
--insert into devices_type(device_name,device_description,is_active) values ('GPS','TRACK TRUCKS',true);


--create vehicles
CREATE TABLE vehicles(
    id SERIAL PRIMARY KEY NOT NULL ,
    vehicle_plate VARCHAR(20) UNIQUE NOT NULL,
    current_status INT DEFAULT 0,
    is_active BOOLEAN DEFAULT true
);

CREATE TABLE log_temperature(
    id SERIAL PRIMARY KEY NOT NULL ,
    vehicle_id INT REFERENCES vehicles(id)  ON DELETE CASCADE ,
    device_id INT REFERENCES devices(id)  ON DELETE CASCADE ,
    read_data VARCHAR(50),
    created_at timestamp WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);


CREATE TABLE log_location(
    id SERIAL PRIMARY KEY NOT NULL ,
    vehicle_id INT REFERENCES vehicles(id)  ON DELETE CASCADE ,
    device_id INT REFERENCES devices(id)  ON DELETE CASCADE ,
    latitude VARCHAR(50),
    longtitude VARCHAR(50),
    created_at timestamp  WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
    

    