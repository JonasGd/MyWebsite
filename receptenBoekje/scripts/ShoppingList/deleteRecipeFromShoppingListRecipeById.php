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

$shoppinglistId = $_GET['shoppinglistId'];
$recipeId = $_GET['recipeId'];

$query = "
DELETE FROM `ShoppinglistRecipe`
WHERE ShoppinglistId = $shoppinglistId
AND RecipeId = $recipeId;
";
mysqli_set_charset($conn, "utf8" );
$result = mysqli_query($conn, $query) or die(mysqli_error($conn));
?>