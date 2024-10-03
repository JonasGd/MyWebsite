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
    r.RandomChoice,
    (CASE WHEN (
        (
            DATEDIFF(
                r.lastDateChosen,
                DATE_ADD(
                    CURRENT_DATE(),
                    INTERVAL 
                    ( 
                        7 - WEEKDAY(CURRENT_DATE())
                    ) DAY
                )
            ) = 0
        ) OR (
            DATEDIFF(
                r.lastDateProposed,
                DATE_ADD(
                    CURRENT_DATE(),
                    INTERVAL 
                    ( 
                        7 - WEEKDAY(CURRENT_DATE())
                    ) DAY
                )
            ) = 0
        )
    ) THEN (
        MOD(3257 * r.RandomChoice + 3253, 4567)
    ) ELSE (
        CASE WHEN (
            (
                DATEDIFF(
                    r.lastDateChosen,
                    DATE_ADD(
                        DATE_ADD(
                            CURRENT_DATE(),
                            INTERVAL 
                            ( 
                                7 - WEEKDAY(CURRENT_DATE())
                            ) DAY
                        ),
                        INTERVAL (-3) WEEK
                    )
                ) < 0
            ) AND (
                DATEDIFF(
                    r.lastDateProposed,
                    DATE_ADD(
                        DATE_ADD(
                            CURRENT_DATE(),
                            INTERVAL 
                            ( 
                                7 - WEEKDAY(CURRENT_DATE())
                            ) DAY
                        ),
                        INTERVAL (-2) WEEK
                    )
                ) < 0
            )
        ) THEN (
            MOD(3257 * r.RandomChoice + 3253, 4567)
        ) ELSE (
            1 / (MOD(3257 * r.RandomChoice + 3253, 4567))
        ) END
    ) END
) RandomOrder
FROM ( SELECT    
    *, 
    (MOD(
        2351 * (
            YEAR(
                DATE_ADD(
                    CURRENT_DATE(),
                    INTERVAL 
                    ( 
                        7 - WEEKDAY(CURRENT_DATE())
                    ) DAY
                )
            ) + 
            MONTH(
                DATE_ADD(
                    CURRENT_DATE(),
                    INTERVAL 
                    ( 
                        7 - WEEKDAY(CURRENT_DATE())
                    ) DAY
                )
            ) + 
            DAY(
                DATE_ADD(
                    CURRENT_DATE(),
                    INTERVAL 
                    ( 
                        7 - WEEKDAY(CURRENT_DATE())
                    ) DAY
                )
            ) + rr.Id 
        ) + 2347
    ,2861)) RandomChoice
    FROM  `Recipe` rr) r
WHERE
    r.FoodCategoryId = 4 
ORDER BY `RandomOrder` DESC 
LIMIT 9;
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