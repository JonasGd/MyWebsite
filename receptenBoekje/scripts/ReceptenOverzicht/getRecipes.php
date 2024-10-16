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

$filterListIds = $_GET['filterListIds'];
$filterListLength = $_GET['filterListLength'];
$foodCategoryId = $_GET['foodCategoryId'];
$searchKeyWord = $_GET['searchKeyWord'];
$tableSort = $_GET['tableSort'];
$order = $_GET['order'];

$query = "
SELECT
    r.CookingMinutes,
    r.FoodCategoryId,
    r.Id,
    r.isComfortFood,
    r.isFavourite,
    r.lastDateChosen,
    r.lastDateProposed,
    r.Name,
    r.PeopleFedId,
    r.PictureUrl,
    r.PreparationMinutes,
    r.SubCategoryDessertId,
    r.SubCategoryLunchId,
    r.SubCategoryMainId,
    (
        CASE WHEN(r.FoodCategoryId = 2) THEN(r.SubCategoryLunchId) ELSE(
            CASE WHEN(r.FoodCategoryId = 4) THEN(r.SubCategoryMainId) ELSE(
                CASE WHEN(r.FoodCategoryId = 5) THEN(r.SubCategoryDessertId) ELSE(
                    CASE WHEN(r.FoodCategoryId = 3) THEN(r.SubCategoryStarterId) ELSE 0
                    END
                )
            END
        )
    END
)
END
) SubCategoryId,
(
    IFNULL(r.PreparationMinutes, 0) + IFNULL(r.CookingMinutes, 0)
) TotalTime,
( CASE WHEN ($filterListLength = 0) THEN 1 ELSE (
    CASE WHEN (
        (SELECT COUNT(DISTINCT(ic.Id)) FROM `IngredientCategory` ic
	        LEFT JOIN `Ingredient` i ON
    	        i.Category = ic.Id
            LEFT JOIN `RecipeIngredient` ri ON
    	        ri.IngredientId = i.Id
            WHERE ri.RecipeId = r.Id 
                AND ic.Id in $filterListIds
    ) = CAST($filterListLength AS UNSIGNED INTEGER)
) THEN 1 ELSE 0
END
)
END
) GroupFilter
FROM
    `Recipe` r
LEFT JOIN `RecipeIngredient` ri ON
    r.Id = ri.RecipeId
LEFT JOIN `Ingredient` i ON
    ri.IngredientId = i.Id
LEFT JOIN `IngredientCategory` ic ON
    i.Category = ic.Id
WHERE
    (
        CASE WHEN($foodCategoryId=0) THEN 1 ELSE(
            (r.FoodCategoryId = $foodCategoryId) #FoodCategoryId, if not nullidentifier()
            AND(r.FoodCategoryId IS NOT NULL))
        END
    ) 
    AND (r.Name LIKE CONCAT(N'%', '$searchKeyWord', N'%')) #searchKeyWord
GROUP BY
    r.SubCategoryMainId,
    r.FoodCategoryId,
    r.lastDateChosen,
    r.isComfortFood,
    r.lastDateProposed,
    r.SubCategoryLunchId,
    SubCategoryId,
    TotalTime,
    r.Id,
    r.isFavourite,
    r.SubCategoryDessertId,
    r.PictureUrl,
    r.CookingMinutes,
    r.PeopleFedId,
    r.PreparationMinutes,
    r.Name
HAVING
    GroupFilter = 1
ORDER BY $tableSort $order
    ; #TableSort
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