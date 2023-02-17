ALTER TABLE owned_securities
ADD CHECK (quantity>=0)

CREATE TRIGGER update_quantity
AFTER INSERT
ON transactions
FOR EACH ROW
EXECUTE PROCEDURE update_quantity();

CREATE OR REPLACE FUNCTION update_quantity() 
RETURNs trigger
AS $update_quantity$
BEGIN
	IF 
		EXISTS(
		SELECT * 
		FROM owned_securities 
		WHERE owned_securities.security_symbol = NEW.security_symbol AND owned_securities.exchange_name = NEW.exchange_name AND owned_securities.username = NEW.username
		) THEN
		UPDATE owned_securities
		SET quantity = quantity + NEW.quantity
		WHERE security_symbol = NEW.security_symbol AND exchange_name = NEW.exchange_name AND username = NEW.username;
	ELSE
		INSERT INTO owned_securities (username, security_symbol, exchange_name, price, quantity)
		VALUES (NEW.username, NEW.security_symbol, NEW.exchange_name, NEW.price, NEW.quantity);
	END IF;
	RETURn NEW;
END;
$update_quantity$ LANGUAGE plpgsql;

CREATE TRIGGER update_funds
AFTER INSERT
ON transactions
FOR EACH ROW
EXECUTE PROCEDURE update_funds();

CREATE OR REPLACE FUNCTION update_funds() 
RETURNs trigger
AS $update_funds$
BEGIN
	UPDATE users
	SET current_funds = current_funds - (NEW.price * NEW.quantity)
	WHERE username = NEW.username;
	RETURN NEW;
END;
$update_funds$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION update_owned_securities() 
RETURNs trigger
AS $update_owned_securities$
BEGIN
	IF NEW.transaction_type LIKE 'buy' THEN
	INSERT INTO owned_securities(transaction_id, username, security_symbol, exchange_name, price, quantity, transaction_time, transaction_type)
	VALUES (NEW.transaction_id, NEW.username, NEW.security_symbol, NEW.exchange_name, NEW.price, NEW.quantity, NEW.transaction_time, NEW.transaction_type);
	END IF;
	RETURN NEW;
	
END;
$update_owned_securities$ LANGUAGE plpgsql;

SELECT * FROM owned_securities
SELECT * FROM transactions

INSERT INTO transactions(username, security_symbol, exchange_name, price, quantity)
VALUES ('jlee93115', 'AAPL', 'NASDAQ', 10.99, 150)
INSERT INTO transactions(username, security_symbol, exchange_name, price, quantity)
VALUES ('jlee93115', 'TWTR', 'NASDAQ', 10.99, 149);
SELECT * FROM owned_securities

DROP PROCEDURE buy_security()

        SELECT quantity
		FROM owned_securities
        WHERE
            owned_securities.username = 'jlee93115' AND
            owned_securities.security_symbol = 'AAPL' AND
            owned_securities.exchange_name = 'NASDAQ'


