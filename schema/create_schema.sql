CREATE TABLE IF NOT EXISTS "User" (
    id SERIAL PRIMARY KEY,
    fname VARCHAR(100) NOT NULL,
    lname VARCHAR(100) NOT NULL,
    birthdate DATE NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    gender VARCHAR(10) NOT NULL
);

CREATE TABLE IF NOT EXISTS Journal_Entry (
    id SERIAL PRIMARY KEY,
    u_id INTEGER NOT NULL,
    date_time TIMESTAMP NOT NULL,
    mood INTEGER CHECK (mood >= 1 AND mood <= 5),
    log_entry TEXT NOT NULL,
    contributing_factore TEXT,
    sleep_quality TEXT,
    FOREIGN KEY (u_id) REFERENCES "User"(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS Response (
    id SERIAL PRIMARY KEY,
    je_id INTEGER NOT NULL,
    sentiment TEXT NOT NULL,
    suggestion TEXT[],
    FOREIGN KEY (je_id) REFERENCES Journal_Entry(id) ON DELETE CASCADE
);
