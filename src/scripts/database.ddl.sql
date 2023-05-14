
CREATE TABLE users(
	user_id SERIAL PRIMARY KEY,
	name VARCHAR(20) NOT NULL,
	gender BOOLEAN,
	date_of_birth DATE,
	avatar TEXT,
	email TEXT NOT NULL,
	password TEXT,
	created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)

CREATE TABLE walet(
	walet_id SERIAL PRIMARY KEY,
	user_id INT NOT NULL,
	name TEXT NOT NULL,
	currency_unit VARCHAR(10) DEFAULT 'VND',
	money INT,
	created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	CONSTRAINT fk_walet_users FOREIGN KEY(user_id) REFERENCES users(user_id)
)


CREATE TABLE balance(
	walet_id INT PRIMARY KEY,
	month_of_year DATE NOT NULL UNIQUE,
	money_for_month INT,
	created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	CONSTRAINT fk_balance_walet FOREIGN KEY(walet_id) REFERENCES walet(walet_id)
)


CREATE TABLE group_type(
	group_type_id SERIAL PRIMARY KEY,
	type VARCHAR(10) NOT NULL DEFAULT 'spend',
	group_name TEXT NOT NULL,	
	created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)


CREATE TABLE type(
	type_id SERIAL PRIMARY KEY,
	group_type_id INT NOT NULL,
	name VARCHAR(40) NOT NULL,
	image TEXT,
	created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)


CREATE TABLE spend(
	spend_id SERIAL PRIMARY KEY,
	walet_id INT NOT NULL,
	money_spend INT NOT NULL,
	time_spend DATE NOT NULL,
	type_id INT NOT NULL,
	note TEXT,
	location TEXT,
	image TEXT,
	created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	CONSTRAINT fk_spend_walet FOREIGN KEY(walet_id) REFERENCES walet(walet_id),
	CONSTRAINT fk_spend_type FOREIGN KEY(type_id) REFERENCES type(type_id)
)


CREATE TABLE friend(
	friend_id SERIAL PRIMARY KEY,
	user_id INT NOT NULL,
	name TEXT NOT NULL,
	image TEXT,
	created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	CONSTRAINT fk_friend_user FOREIGN KEY(user_id) REFERENCES users(user_id)
)


CREATE TABLE spend_friend(
	friend_id INT NOT NULL,
	spend_id INT NOT NULL,
	created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	PRIMARY KEY (friend_id, spend_id),
	CONSTRAINT fk_spfr_spend FOREIGN KEY(spend_id) REFERENCES spend(spend_id),
	CONSTRAINT fk_spfr_friend FOREIGN KEY(friend_id) REFERENCES friend(friend_id)
)

