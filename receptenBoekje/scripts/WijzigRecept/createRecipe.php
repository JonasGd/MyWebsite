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
INSERT INTO `Recipe`
    (`Id`,
    `Name`,
    `PeopleFedId`,
    `PreparationMinutes`,
    `CookingMinutes`,
    `FoodCategoryId`,
    `SubCategoryMainId`,
    `SubCategoryLunchId`,
    `SubCategoryDessertId`,
    `SubCategoryStarterId`,
    `PictureURL`,
    `IsFavourite`,
    `IsComfortFood`)
VALUES 
    (0,
    '$recipeName',
    $peopleFedId,
    $preparationMinutes,
    $cookingMinutes,
    $foodCategoryId,
    $subCategoryMainId,
    $subCategoryLunchId,
    $subCategoryDessertId,
    $subCategoryStarterId,
    $pictureURL,
    $isFavourite,
    $isComfortFood    
    );
";
mysqli_set_charset($conn, "utf8" );
$result = mysqli_query($conn, $query) or die(mysqli_error($conn));

if($result) {
    $getQuery = "
    SELECT
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
        r.IsComfortFood
    FROM 
        `Recipe` r
    WHERE
        r.Name = '$recipeName';
    ";
    $getResult = mysqli_query($conn, $getQuery) or die(mysqli_error($conn));
    if($getResult->num_rows > 0) {
        while($row = $getResult->fetch_array())
        {
            echo json_encode($row, JSON_UNESCAPED_UNICODE);
        }
    }
}
?>