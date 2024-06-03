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

$recipeId = $_GET['recipeId'];

$query = "
SELECT 
   i.Id,
   i.Name IngredientName,
   i.Category,
   ri.Id RecipeIngredientId,
   ri.RecipeId,
   ri.IngredientId,
   ri.Quantity,
   ri.Unit,
   ri.Order  
FROM 
    `RecipeIngredient` ri
INNER JOIN `Ingredient` i
    ON ri.IngredientId = i.Id
WHERE ri.RecipeId = $recipeId AND ri.RecipeId IS NOT NULL
ORDER BY ri.Order ASC;
";
mysqli_set_charset($conn, "utf8" );
$result = mysqli_query($conn, $query) or die(mysqli_error($conn));

$temparray = array();

$prefix = '';
echo '[';
if($result->num_rows > 0) {
    while($row = $result->fetch_array())
    {
        echo $prefix, json_encode($row, JSON_UNESCAPED_UNICODE);
        $prefix = ',';
        //array_push($temparray, $row);
    }
}
echo ']';
//echo json_encode($temparray);
?>