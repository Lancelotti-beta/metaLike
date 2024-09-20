<?php
include 'config.php';  // Configurações de conexão ao banco de dados

// Recebe os dados enviados pelo frontend
$postData = json_decode(file_get_contents('php://input'), true);
$videoId = $postData['id'];

// Chave da API armazenada com segurança no backend
$key = 'SUA_CHAVE_API_SECRETA';

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
