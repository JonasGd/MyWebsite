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
$recipeName = $decodedData['recipeName'];
$peopleFedId = $decodedData['peopleFedId'];
$preparationMinutes = $decodedData['preparationMinutes'];
$cookingMinutes = $decodedData['cookingMinutes'];
$foodCategoryId = $decodedData['foodCategoryId'];
$subCategoryMainId = $decodedData['subCategoryMainId'];
$subCategoryLunchId = $decodedData['subCategoryLunchId'];
$subCategoryDessertId = $decodedData['subCategoryDessertId'];
$subCategoryStarterId = $decodedData['subCategoryStarterId'];
$pictureURL = $decodedData['pictureURL'];
$isFavourite = $decodedData['isFavourite'];
$isComfortFood = $decodedData['isComfortFood'];

$query = "
UPDATE `Recipe` r
SET 
    r.Name = '$recipeName',
    r.PeopleFedId = $peopleFedId,
    r.PreparationMinutes = $preparationMinutes,
    r.CookingMinutes = $cookingMinutes,
    r.FoodCategoryId = $foodCategoryId,
    r.SubCategoryMainId = $subCategoryMainId,
    r.SubCategoryLunchId = $subCategoryLunchId,
    r.SubCategoryDessertId = $subCategoryDessertId,
    r.SubCategoryStarterId = $subCategoryStarterId,
    r.PictureURL = $pictureURL,
    r.IsFavourite = $isFavourite,
    r.IsComfortFood = $isComfortFood
WHERE 
    r.Id = $recipeId;
";
mysqli_set_charset($conn, "utf8" );
echo mysqli_query($conn, $query) or die(mysqli_error($conn));
?>