<?php
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Credentials: true");

include 'db.php';

try {
    $query = "SELECT * FROM todos ORDER BY id DESC";
    $stmt = $pdo->query($query);

    $todos = $stmt->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode($todos);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['success' => false, 'error' => $e->getMessage()]);
}
?>
