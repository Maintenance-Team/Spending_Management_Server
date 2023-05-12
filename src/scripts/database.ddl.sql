
CREATE TABLE users(
	user_id SERIAL PRIMARY KEY,
	email TEXT NOT NULL,
	password TEXT,
	name VARCHAR(20) NOT NULL,
	gender BOOLEAN,
	date_of_birth DATE,
	current_money INT,
	avatar TEXT,
	refresh_token TEXT DEFAULT '',
	created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)

CREATE TABLE walet(
	user_id INT NOT NULL,
	month_of_year DATE NOT NULL,
	money INT,
	PRIMARY KEY(user_id, month_of_year),
	CONSTRAINT fk_walet_users FOREIGN KEY(user_id) REFERENCES users(user_id),
	created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)


CREATE TABLE type_spend(
	type_spend_id SERIAL PRIMARY KEY,
	name VARCHAR(40) NOT NULL,
	created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)


CREATE TABLE spend(
	spend_id SERIAL PRIMARY KEY,
	user_id INT NOT NULL,
	money_spend INT NOT NULL,
	time_spend DATE NOT NULL,
	type INT,
	note TEXT,
	location TEXT,
	image TEXT,
	created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	CONSTRAINT fk_spend_users FOREIGN KEY(user_id) REFERENCES users(user_id),
	CONSTRAINT fk_spend_typespend FOREIGN KEY(type) REFERENCES type_spend(type_spend_id)
)


CREATE TABLE friend(
	friend_id SERIAL PRIMARY KEY,
	spend_id INT NOT NULL,
	name VARCHAR(20) NOT NULL,
	created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	CONSTRAINT fk_friend_spend FOREIGN KEY(spend_id) REFERENCES spend(spend_id)
)


CREATE TABLE history(
	history_id SERIAL PRIMARY KEY,
	user_id	INT NOT NULL,
	history TEXT NOT NULL,
	created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	CONSTRAINT fk_history_users FOREIGN KEY(user_id) REFERENCES users(user_id)
)

