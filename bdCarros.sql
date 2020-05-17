/*create database stand;*/
use stand;
/*drop table carros;*/

create table carros(
id_carro int primary key auto_increment,
Marca varchar(20),
Modelo varchar(20),
tipocombs varchar(20),
nportas int,
cc int,
descricao varchar(100),
preco float,
foto varchar(255)
);

