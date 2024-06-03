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


$recipeIngredientId = $decodedData['recipeIngredientId'];
$recipeId = $decodedData['recipeId'];
$ingredientId = $decodedData['ingredientId'];
$quantity = $decodedData['quantity'];
$unit = $decodedData['unit'];
$order = $decodedData['order'];

$query = "
UPDATE `RecipeIngredient` ri
SET
    ri.RecipeId = $recipeId,
    ri.IngredientId = $ingredientId,
    ri.Quantity = $quantity,
    ri.Unit = '$unit',
    ri.Order = $order
WHERE
    ri.Id = $recipeIngredientId;
";
mysqli_set_charset($conn, "utf8" );
echo mysqli_query($conn, $query) or die(mysqli_error($conn));
?>