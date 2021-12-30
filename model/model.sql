CREATE DATABASE c_system;


-- developers table
CREATE TABLE developers(
    id serial not null primary key,
    developer_name text not null,
    link text not null
);

INSERT INTO developers(developer_name, link) VALUES('Golden House', 'https://gh.uz/');
INSERT INTO developers(developer_name, link) VALUES('Murad Buildings', 'https://www.mbc.uz/');
INSERT INTO developers(developer_name, link) VALUES('Bizning Uylar Development', 'http://bizninguylar.uz');


-- complexes table
CREATE TABLE complexes(
    id serial not null primary key,
    complex_name text not null,
    room smallint not null,
    price int not null,
    img text not null,
    dev_id int not null,
    CONSTRAINT fk_dev_id
        FOREIGN KEY(dev_id) 
            REFERENCES developers(id)
            ON DELETE CASCADE
);

INSERT INTO complexes(complex_name, room, price, img, dev_id) VALUES('Greenwich', 2, 600000000, 'greenwich', 1);
INSERT INTO complexes(complex_name, room, price, img, dev_id) VALUES('Greenwich', 3, 900000000, 'greenwich', 1);

INSERT INTO complexes(complex_name, room, price, img, dev_id) VALUES('Sohil', 1, 200000000, 'sohil', 1);
INSERT INTO complexes(complex_name, room, price, img, dev_id) VALUES('Sohil', 2, 400000000, 'sohil', 1);
INSERT INTO complexes(complex_name, room, price, img, dev_id) VALUES('Sohil', 3, 600000000, 'sohil', 1);
INSERT INTO complexes(complex_name, room, price, img, dev_id) VALUES('Sohil', 4, 800000000, 'sohil', 1);

INSERT INTO complexes(complex_name, room, price, img, dev_id) VALUES('Nest One', 1, 500000000, 'nestone', 2);
INSERT INTO complexes(complex_name, room, price, img, dev_id) VALUES('Nest One', 2, 900000000, 'nestone', 2);

INSERT INTO complexes(complex_name, room, price, img, dev_id) VALUES('Cambridge', 4, 950000000, 'cambridge', 2);

INSERT INTO complexes(complex_name, room, price, img, dev_id) VALUES('Choshtepa', 3, 300000000, 'choshtepa', 3);
INSERT INTO complexes(complex_name, room, price, img, dev_id) VALUES('Choshtepa', 4, 450000000, 'choshtepa', 3);

INSERT INTO complexes(complex_name, room, price, img, dev_id) VALUES('Olmazor', 1, 200000000, 'olmazor', 3);
INSERT INTO complexes(complex_name, room, price, img, dev_id) VALUES('Olmazor', 2, 400000000, 'olmazor', 3);
INSERT INTO complexes(complex_name, room, price, img, dev_id) VALUES('Olmazor', 3, 600000000, 'olmazor', 3);


-- banks table
CREATE TABLE banks(
    id serial not null primary key,
    bank_name text not null,
    money_limit int not null,
    time int not null
);

INSERT INTO banks(bank_name, money_limit, time) VALUES('NBU', 1000000000, 20);
INSERT INTO banks(bank_name, money_limit, time) VALUES('Sanoatqurilishbank', 750000000, 25);
INSERT INTO banks(bank_name, money_limit, time) VALUES('Kapitalbank', 500000000, 15);
INSERT INTO banks(bank_name, money_limit, time) VALUES('Ipoteka bank', 250000000, 10);


-- orders table
CREATE TABLE orders(
    id serial not null primary key,
    developer_name text not null,
    complex_name text not null,
    room smallint not null,
    price int not null,
    bank_name text not null,
    email text not null
);