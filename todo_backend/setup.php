<?php
$host = 'localhost';
$username = 'root';
$password = '';
$dbname = 'todo_app';

try {
    $pdo = new PDO("mysql:host=$host", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    $pdo->exec("CREATE DATABASE IF NOT EXISTS $dbname");
    echo "Database created successfully or already exists.<br>";

    $pdo->exec("USE $dbname");

    $createTableQuery = "
        CREATE TABLE IF NOT EXISTS todos (
            id INT AUTO_INCREMENT PRIMARY KEY,
            title VARCHAR(255) NOT NULL,
            date DATE NOT NULL,
            time TIME NOT NULL,
            completed_on DATETIME NULL
        )
    ";
    $pdo->exec($createTableQuery);
    echo "Table 'todos' created successfully or already exists.<br>";
} catch (PDOException $e) {
    die("Error: " . $e->getMessage());
}
?>
