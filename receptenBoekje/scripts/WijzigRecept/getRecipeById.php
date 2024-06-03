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

$query = "
SELECT 
    c.Id,
    c.Label,
    c.Order,
    c.Is_Active,
    pf.Id,
    pf.Label PeopleFed,
    pf.Order,
    pf.Is_Active,
    r.Id,
    r.Name RecipeName,
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
    scd.Id,
    scd.Label,
    scd.Order,
    scd.Is_Active,
    scl.Id,
    scl.Label,
    scl.Order,
    scl.Is_Active,
    scm.Id,
    scm.Label,
    scm.Order,
    scm.Is_Active 
FROM 
    `Recipe` r
LEFT JOIN `PeopleFed` pf
    ON r.PeopleFedId = pf.Id
LEFT JOIN `FoodCategory` c
    ON r.FoodCategoryId = c.Id
LEFT JOIN `SubCategoryMain` scm
    ON r.SubCategoryMainId = scm.Id
LEFT JOIN `SubCategoryLunch` scl
    ON r.SubCategoryLunchId=scl.Id
LEFT JOIN `SubCategoryDessert` scd
    ON r.SubCategoryDessertId = scd.Id
WHERE r.Id = $recipeId AND r.Id IS NOT NULL;
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