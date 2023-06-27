
CREATE TABLE users(
	user_id SERIAL PRIMARY KEY,
	name VARCHAR(20) NOT NULL,
	gender BOOLEAN,
	date_of_birth DATE,
	avatar TEXT DEFAULT 'https://res.cloudinary.com/dwskvqnkc/image/upload/v1685377490/avt_cfzkte.jpg',
	email TEXT NOT NULL,
	password TEXT NOT NULL,
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
	CONSTRAINT fk_walet_users FOREIGN KEY(user_id) REFERENCES users(user_id) ON DELETE CASCADE
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
	type INT DEFAULT 0,
	created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	CONSTRAINT fk_type_grouptype FOREIGN KEY(group_type_id) REFERENCES group_type(group_type_id) ON DELETE CASCADE
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
	CONSTRAINT fk_spend_walet FOREIGN KEY(walet_id) REFERENCES walet(walet_id) ON DELETE CASCADE,
	CONSTRAINT fk_spend_type FOREIGN KEY(type_id) REFERENCES type(type_id) ON DELETE CASCADE
)


CREATE TABLE friend(
	friend_id SERIAL PRIMARY KEY,
	user_id INT NOT NULL,
	name TEXT NOT NULL,
	image TEXT,
	created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	CONSTRAINT fk_friend_user FOREIGN KEY(user_id) REFERENCES users(user_id) ON DELETE CASCADE
)


CREATE TABLE spend_friend(
	friend_id INT NOT NULL,
	spend_id INT NOT NULL,
	created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	PRIMARY KEY (friend_id, spend_id),
	CONSTRAINT fk_spfr_spend FOREIGN KEY(spend_id) REFERENCES spend(spend_id) ON DELETE CASCADE,
	CONSTRAINT fk_spfr_friend FOREIGN KEY(friend_id) REFERENCES friend(friend_id) ON DELETE CASCADE
)

