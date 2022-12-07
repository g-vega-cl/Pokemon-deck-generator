CREATE TABLE `Pokemon-Smalldoor`.NewTable (
	Id varchar(100) NOT NULL,
	Name varchar(100) NOT NULL,
    Type varchar(100) NOT NULL,
    Image varchar(100) NOT NULL,
    Cards json NOT NULL,
)
ENGINE=InnoDB
DEFAULT CHARSET=utf8mb4
COLLATE=utf8mb4_0900_ai_ci;