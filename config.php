<?php
// Configurações do banco de dados
$host = 'localhost';
$dbname = 'nome_do_banco';
$username = 'usuario';
$password = 'senha';

// Conectando ao banco de dados
try {
    $conn = new PDO("mysql:host=$host;dbname=$dbname", $username, $password);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    echo 'Erro: ' . $e->getMessage();
}
?>
