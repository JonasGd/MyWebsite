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

$ingredientMainCategoryId = $_GET['ingredientMainCategoryId'];

$query = "
SELECT 
    ic.Id,
    ic.Label,
    ic.Order,
    ic.Is_Active, 
    ic.IngredientMainCategoryId,
    ic.Is_Selected,
    imc.Id MainId,
    imc.Label MainLabel,
    imc.Order MainOrder, 
    imc.Is_Active MainActive
FROM 
    `IngredientCategory` ic
LEFT JOIN `IngredientMainCategory` imc ON
    ic.IngredientMainCategoryId = imc.Id
WHERE ic.IngredientMainCategoryId = $ingredientMainCategoryId;
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