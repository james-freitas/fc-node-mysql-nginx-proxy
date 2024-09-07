create database if not exists nodedb;
use nodedb;
create table if not exists people(id int not null auto_increment, name varchar(255), primary key(id));