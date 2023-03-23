create database cool_data_base;
use cool_data_base;

CREATE USER 'user'@'localhost' IDENTIFIED BY 'password';
GRANT ALL PRIVILEGES ON cool_data_base.* TO 'user'@'localhost'; 

FLUSH PRIVILEGES;

create table users(
user_id int(11) not null auto_increment,
username VARCHAR(50) NOT NULL,
password VARCHAR(255) NOT NULL,
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
PRIMARY KEY (user_id)
);

select * from users;


delete from users where user_id = 1;

