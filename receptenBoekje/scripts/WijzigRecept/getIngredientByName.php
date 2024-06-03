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

$ingredientName = $_GET['ingredientName'];

$query = "
SELECT 
   i.Id,
   i.Name,
   i.Category  
FROM 
    `Ingredient` i
WHERE i.Name = '$ingredientName';
";
mysqli_set_charset($conn, "utf8" );
$result = mysqli_query($conn, $query) or die(mysqli_error($conn));

$temparray = array();

$prefix = '';
//echo '[';
if($result->num_rows > 0) {
    while($row = $result->fetch_array())
    {
        //echo $prefix, json_encode($row, JSON_UNESCAPED_UNICODE);
        //$prefix = ',';
        array_push($temparray, $row);
    }
    echo json_encode($temparray[0]);
} else echo '{}';
//echo ']';
?>