<?php
$servername = "localhost";
$username = "jonashg4_admin";
$password = "fudyNfTT22";
$dbname = "jonashg4_ReceptenBoekje";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);
// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn-> connect_error);
}

$receivedData = $_POST['json'];
$decodedData = json_decode($receivedData, true);

$recipeId = $decodedData['recipeId'];
$lastDateChosen = $decodedData['lastDateChosen'];
$lastDateProposed = $decodedData['lastDateProposed'];

$query = "
UPDATE `Recipe` r
SET 
    r.lastDateChosen = $lastDateChosen,
    r.lastDateProposed = $lastDateProposed
WHERE 
    r.Id = $recipeId;
";
mysqli_set_charset($conn, "utf8" );
echo mysqli_query($conn, $query) or die(mysqli_error($conn));
?>