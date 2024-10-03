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

$shoppinglistId = $decodedData['shoppinglistId'];
$recipeId = $decodedData['recipeId'];
$peopleFedId = $decodedData['peopleFedId'];

$query = "
INSERT INTO `ShoppinglistRecipe`
    (`Id`,
    `ShoppinglistId`,
    `RecipeId`,
    `PeopleFedId`)  
VALUES
    (0,
    '$shoppinglistId',
    $recipeId,
    $peopleFedId
    );
";
mysqli_set_charset($conn, "utf8" );
$result = mysqli_query($conn, $query) or die(mysqli_error($conn));
if($result) {
    $getQuery = "
    SELECT
        sr.Id,
        sr.ShoppinglistId,
        sr.RecipeId,
        sr.PeopleFedId
    FROM 
        `ShoppinglistRecipe` sr
    WHERE
        sr.ShoppinglistId = $shoppinglistId
        AND sr.RecipeId = $recipeId;
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