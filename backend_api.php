<?php
include 'config.php';  // Configurações de conexão ao banco de dados

// Recebe os dados enviados pelo frontend
$postData = json_decode(file_get_contents('php://input'), true);
$videoId = $postData['id'];

// Chave da API armazenada com segurança no backend
$key = 'AIzaSyCQUQy4iX-X78byn8ApDIB6s5wCVcfD4mA';

// URL para fazer a requisição à API do YouTube
$apiUrl = "https://www.googleapis.com/youtube/v3/videos?id=$videoId&part=statistics&key=$key";

// Faz a requisição
$response = file_get_contents($apiUrl);
$data = json_decode($response, true);

// Envia os dados da contagem de likes de volta ao frontend
if (isset($data['items'][0]['statistics']['likeCount'])) {
    echo json_encode([
        'likeCount' => $data['items'][0]['statistics']['likeCount']
    ]);
} else {
    echo json_encode([
        'error' => 'Erro ao buscar dados do vídeo.'
    ]);
}
?>

<?php
// Configurações do banco
require 'config.php';

// Função para sanitizar entradas
function sanitize_input($data) {
    return htmlspecialchars(strip_tags(trim($data)));
}

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Validando parâmetros
    $param1 = isset($_POST['param1']) ? sanitize_input($_POST['param1']) : null;
    $param2 = isset($_POST['param2']) ? sanitize_input($_POST['param2']) : null;

    if (!$param1 || !$param2) {
        echo json_encode(['status' => 'error', 'message' => 'Parâmetros inválidos']);
        exit;
    }

    // Exemplo de operação no banco
    try {
        $stmt = $conn->prepare("INSERT INTO tabela (coluna1, coluna2) VALUES (?, ?)");
        $stmt->execute([$param1, $param2]);
        echo json_encode(['status' => 'success']);
    } catch (PDOException $e) {
        echo json_encode(['status' => 'error', 'message' => $e->getMessage()]);
    }
} else {
    echo json_encode(['status' => 'error', 'message' => 'Método inválido']);
}
?>

