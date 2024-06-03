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

$ingredientCategory = $decodedData['ingredientCategory'];
$ingredientName = $decodedData['ingredientName'];

$query = "
INSERT INTO `Ingredient`
    (`Id`,
    `Name`,
    `Category`)  
VALUES
    (0,
    '$ingredientName',
    $ingredientCategory
    );
";
mysqli_set_charset($conn, "utf8" );
$result = mysqli_query($conn, $query) or die(mysqli_error($conn));
if($result) {
    $getQuery = "
    SELECT
        i.Id,
        i.Name,
        i.Category
    FROM 
        `Ingredient` i
    WHERE
        i.Name = '$ingredientName';
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