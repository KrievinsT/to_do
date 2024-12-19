<?php
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Credentials: true");

include 'db.php';

$data = json_decode(file_get_contents('php://input'), true);

if (isset($data['title'], $data['description'], $data['date'], $data['time'])) {
    $title = $data['title'];
    $date = $data['date'];
    $time = $data['time'];

    try {
        $query = "INSERT INTO todos (title, date, time) VALUES (:title, :date, :time)";
        $stmt = $pdo->prepare($query);
        $stmt->execute([
            'title' => $title,
            'date' => $date,
            'time' => $time
        ]);
        echo json_encode(['success' => true, 'message' => 'Todo added successfully']);
    } catch (PDOException $e) {
        echo json_encode(['success' => false, 'error' => $e->getMessage()]);
    }
} else {
    echo json_encode(['success' => false, 'error' => 'Missing required fields']);
}
?>
