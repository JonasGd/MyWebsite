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
    s.Id,
    s.Name,
    s.Date,
    s.isShopping
FROM 
    `Shoppinglist` s
WHERE s.Id = $shoppinglistId AND s.Id IS NOT NULL;
";
mysqli_set_charset($conn, "utf8" );
$result = mysqli_query($conn, $query) or die(mysqli_error($conn));

$temparray = array();

$prefix = '';
//echo '[';
if($result->num_rows > 0) {
    while($row = $result->fetch_array())
    {
        echo $prefix, json_encode($row, JSON_UNESCAPED_UNICODE);
        //$prefix = ',';
        //array_push($temparray, $row);
    }
} else echo '{}';
//echo ']';
//echo json_encode($temparray);
?>