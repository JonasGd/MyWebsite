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
$peopleFed = $_GET['peopleFed'];

$query = "
SELECT 
   i.Id,
   i.Name IngredientName,
   i.Category,
   pf.id,
   pf.Label,
   pf.Order,
   pf.Is_Active,
   r.Id,
   r.Name,
   r.PeopleFedId,
   r.PreparationMinutes,
   r.CookingMinutes,
   r.FoodCategoryId,
   r.SubCategoryMainId,
   r.SubCategoryLunchId,
   r.SubCategoryDessertId,
   r.SubCategoryStarterId,
   r.PictureURL,
   r.IsFavourite,
   r.IsComfortFood,
   r.LastDateChosen,
   r.LastDateProposed,
   ri.Id,
   ri.RecipeId,
   ri.IngredientId,
   ri.Quantity,
   ri.Unit,
   ri.Order,
   ( ri.Quantity * (CAST($peopleFed AS DECIMAL(37,8))) / (CAST((pf.Label * 1) AS DECIMAL(37,8)))) CalculatedQuantity  
FROM 
    `RecipeIngredient` ri
INNER JOIN `Recipe` r
    ON ri.RecipeId = r.Id
INNER JOIN `Ingredient` i
    ON ri.IngredientId = i.Id
INNER JOIN `PeopleFed` pf
    ON r.PeopleFedId = pf.Id
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