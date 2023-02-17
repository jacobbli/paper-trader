CREATE TABLE public_securities (
	security_id SERIAL NOT NULL UNIQUE,
	security_symbol TEXT NOT NULL,
	security_name TEXT NOT NULL,
	security_value NUMERIC,
	exchange_name TEXT NOT NULL,
	PRIMARY KEY (security_symbol, exchange_name)
)

SELECT * FROM public_securities

CREATE TABLE owned_securities (
	transaction_id SERIAL NOT NULL UNIQUE,
	user_id INTEGER NOT NULL,
	security_symbol TEXT NOT NULL,
	exchange_name TEXT NOT NULL,	
	price NUMERIC NOT NULL,
	quantity INTEGER NOT NULL,
	PRIMARY KEY (transaction_id),
	FOREIGN KEY (security_symbol, exchange_name) REFERENCES public_securities(security_symbol, exchange_name),
	FOREIGN KEY (user_id) REFERENCES users(user_id)
)

CREATE TABLE owned_securities (
	transaction_id SERIAL NOT NULL UNIQUE,
	user_id INTEGER NOT NULL,
	security_symbol TEXT NOT NULL,
	exchange_name TEXT NOT NULL,	
	price NUMERIC NOT NULL,
	quantity INTEGER NOT NULL,
	PRIMARY KEY (transaction_id),
	FOREIGN KEY (security_symbol, exchange_name) REFERENCES public_securities(security_symbol, exchange_name),
	FOREIGN KEY (user_id) REFERENCES users(user_id)
)

SELECT * FROM owned_securities
SELECT * FROM users

INSERT INTO owned_securities (user_id, security_symbol, exchange_name, price, quantity)
VALUES (3, 'AMZN', 'NASDAQ', '56', '50')



INSERT INTO users (user_name, first_name, last_name, email, password)
VALUES ('jlee93115', 'Jacob', 'Lee', 'jlee93115@gmail.com', 'password')