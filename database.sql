CREATE SCHEMA Youtube;
USE Youtube;
CREATE TABLE users(
    id INT NOT NULL AUTO_INCREMENT,
    email VARCHAR(100) NOT NULL,
    name VARCHAR(20) NOT NULL,
    password VARCHAR(128) NOT NULL,
    contact VARCHAR(16),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP(),
    UNIQUE INDEX email_UNIQUE (email ASC) VISIBLE,
    PRIMARY KEY (id)
);

CREATE TABLE channels(
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(100) NOT NULL,
    subscribers BIGINT UNSIGNED DEFAULT 0,
    videos BIGINT UNSIGNED DEFAULT 0,
    user_id INT NOT NULL,
    FOREIGN KEY (user_id)
        REFERENCES users(id)
            ON DELETE CASCADE
);

INSERT INTO users (email, name, password, contact)
    VALUES ("asdf@naver.com", "www", "ddd", "01022223333");

INSERT INTO users (email, name, password, contact)
    VALUES ("gg@gmail.com", "aaaaa", "ddd", "0102759382");

INSERT INTO users (email, name, password, contact)
    VALUES ("hahahaha@kakao.com", "hh", "ddd", "01099999999");

INSERT INTO channels (title, subscribers, videos, user_id)
    VALUES ("asdf's channel1", "20", "3", "1");

INSERT INTO channels (title, subscribers, videos, user_id)
    VALUES ("asdf's channel2", "3", "1", "1");

INSERT INTO channels (title, subscribers, videos, user_id)
    VALUES ("gg's channel1", "502", "19", "2");

INSERT INTO channels (title, subscribers, videos, user_id)
    VALUES ("hahahaha's channel1", "11", "5", "3");