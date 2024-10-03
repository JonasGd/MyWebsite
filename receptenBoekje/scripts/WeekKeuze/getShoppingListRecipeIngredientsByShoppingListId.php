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

$query = "
SELECT 
    CONCAT(ri.Unit,N' - ',ri.Id) IngredientUnit,
    i.Name,
    ri.Unit,
    SUM(ri.Quantity * (CAST((pf.Label * 1) AS DECIMAL(37,8))) / (CAST((pf2.Label * 1) AS DECIMAL(37,8)))) QuantitySum,
    i.Name IngredientName,
    ic.IngredientMainCategoryId
FROM 
    `ShoppinglistRecipe` sr
INNER JOIN `PeopleFed` pf 
	on sr.PeopleFedId = pf.Id
INNER JOIN `Recipe` r 
	ON sr.RecipeId = r.Id
INNER JOIN `RecipeIngredient` ri 
    ON r.Id = ri.RecipeId 
INNER JOIN `Ingredient` i
    ON ri.IngredientId = i.Id
INNER JOIN `PeopleFed` pf2 
    ON r.PeopleFedId = pf2.Id
INNER JOIN `IngredientCategory` ic
    ON i.Category = ic.Id
WHERE sr.ShoppinglistId = $shoppinglistId AND sr.ShoppinglistId IS NOT NULL
GROUP BY CONCAT(ri.Unit,N' - ',ri.Id), i.Name, ri.Unit
ORDER BY i.Name ASC;
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