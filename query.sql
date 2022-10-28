CREATE TABLE
    category(
        id SERIAL PRIMARY KEY,
        name VARCHAR NOT NULL
    );

CREATE TABLE
    products (
        id SERIAL PRIMARY KEY,
        name VARCHAR NOT NULL,
        stock INT NOT NULL,
        price INT NOT NULL,
        category_id INT REFERENCES category(id)
    );

CREATE TABLE
    transactions(
        id SERIAL PRIMARY KEY,
        email VARCHAR NOT NULL,
        products_id INT REFERENCES products(id),
        amount INT NOT NULL,
        total INT NOT NULL,
        status INT REFERENCES payment_status(id)
    );

CREATE TABLE
    payment_status(
        id SERIAL PRIMARY KEY,
        name VARCHAR NOT NULL
    );

INSERT INTO category(id,name) VALUES(1,'nasi'),(2,'roti');

INSERT INTO
    products(name, stock, price, category_id)
VALUES ('nasi kebuli', 12, 19000, 1);

INSERT INTO payment_status(id,name) VALUES(1,'unpaid');

INSERT INTO payment_status(id,name) VALUES(2,'paid');

INSERT INTO
    transactions(
        id,
        email,
        products_id,
        amount,
        total,
        status
    )
VALUES (1, 'wow@pijar.id', 1, 2, 30000, 1);

SELECT
    products.name,
    products.stock,
    products.price,
    category.name as category
FROM products
    INNER JOIN category ON products.category_id = category.id;

SELECT
    transactions.email,
    products.name as products_name,
    transactions.amount,
    products.price,
    transactions.total,
    payment_status.name as status
FROM transactions
    JOIN products ON transactions.products_id = products.id
    JOIN payment_status ON transactions.status = payment_status.id;

UPDATE transactions SET status=2 WHERE id=1;

ALTER TABLE transactions ADD username VARCHAR(255) AFTER id;

DELETE TABLE products;

-- many to many --

CREATE TABLE
    tag (
        id SERIAL PRIMARY KEY,
        tag_value TEXT
    )
CREATE TABLE
    products_tag (
        products_id INT tag_id INT PRIMARY KEY (products_id, tag_id) CONSTRAINT fk_products FOREIGN KEY(products_id) REFERENCES products(id) CONSTRAINT fk_tag FOREIGN KEY(tag_id) REFERENCES tag(id)
    )
SELECT
    products.name,
    products.stock,
    products.price,
    category.name as category
FROM products
    INNER JOIN category ON products.category_id = category.id
WHERE id = 1 


DROP TABLE product CASCADE;

CREATE Table users(
    id VARCHAR PRIMARY KEY,
    email VARCHAR NOT NULL,
    password VARCHAR NOT NULL,
    fullname VARCHAR,
    role VARCHAR
);


INSERT INTO users(id,email,password,fullname,role) VALUES('1','ean@ean.id','123456','ean ean','admin');

SELECT * FROM users where email='ean@ean.id';

ALTER TABLE products ADD photo VARCHAR(255);
