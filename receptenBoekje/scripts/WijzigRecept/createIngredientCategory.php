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

$ingredientCategoryName =  $decodedData['ingredientCategoryName'];
$order =  $decodedData['order'];
$ingredientMainCategoryId =  $decodedData['ingredientMainCategoryId'];

$query = "
INSERT INTO `IngredientCategory`
    (`Id`,
    `Label`,
    `Order`,
    `Is_Active`,
    `IngredientMainCategoryId`,
    `Is_Selected`)  
VALUES
    (0,
    '$ingredientCategoryName',
    $order,
    1,
    '$ingredientMainCategoryId',
    0);
";
mysqli_set_charset($conn, "utf8" );
$result = mysqli_query($conn, $query) or die(mysqli_error($conn));
if($result) {
    $getQuery = "
    SELECT
        ic.Id,
        ic.Label,
        ic.Order,
        ic.Is_Active,
        ic.IngredientMainCategoryId,
        ic.Is_Selected
    FROM 
        `IngredientCategory` ic
    WHERE
        ic.Label = '$ingredientCategoryName';
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