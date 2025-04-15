CREATE USER 'gigranger_user'@'%' IDENTIFIED WITH mysql_native_password BY 'gigranger_user_pass';
GRANT ALL PRIVILEGES ON employment_db.* TO 'gigranger_user'@'%';
FLUSH PRIVILEGES;