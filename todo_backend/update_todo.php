<?php
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Credentials: true");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

include 'db.php';

$data = json_decode(file_get_contents('php://input'), true);

if (isset($data['id'], $data['title'], $data['description'], $data['date'], $data['time'])) {
    $id = $data['id'];
    $title = $data['title'];
    $date = $data['date'];
    $time = $data['time'];

    try {
        $sql = "UPDATE todos SET title = :title, date = :date, time = :time WHERE id = :id";
        $stmt = $pdo->prepare($sql);
        $stmt->execute([
            'id' => $id,
            'title' => $title,
            'date' => $date,
            'time' => $time
        ]);
        echo json_encode(['success' => true, 'message' => 'Todo updated successfully']);
    } catch (PDOException $e) {
        echo json_encode(['success' => false, 'error' => $e->getMessage()]);
    }
} else {
    echo json_encode(['success' => false, 'error' => 'Missing required fields']);
}
?>
