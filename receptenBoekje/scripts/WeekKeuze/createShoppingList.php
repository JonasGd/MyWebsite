<?php
session_start();
if(isset($_SESSION["loggedin"]) && $_SESSION["loggedin"] === true){
    $currentUser = htmlspecialchars($_SESSION["username"]);


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

    $getQuery = "
    SELECT
        u.id
    FROM 
        `users` u
    WHERE
        username = '$currentUser';
    ";
    $getResult = mysqli_query($conn, $getQuery) or die(mysqli_error($conn));
    $userId = 0;
    if($getResult->num_rows > 0) {
        while($row = $getResult->fetch_array())
        {
            $userId = $row["id"];
        }
    }

    $receivedData = $_POST['json'];
    $decodedData = json_decode($receivedData, true);

    $shoppinglistName = $decodedData['name'];
    $shoppinglistDate = $decodedData['date'];
    $isShopping = $decodedData['isShopping'];

    $query = "
    INSERT INTO `Shoppinglist`
        (`Id`,
        `Name`,
        `Date`,
        `UserId`,
        `isShopping`)  
    VALUES
        (0,
        '$shoppinglistName',
        '$shoppinglistDate',
        $userId,
        $isShopping
        );
    ";
    mysqli_set_charset($conn, "utf8" );
    $result = mysqli_query($conn, $query) or die(mysqli_error($conn));
    if($result) {
        $getQuery = "
        SELECT
            s.Id,
            s.Name,
            s.Date,
            s.UserId,
            s.isShopping
        FROM 
            `Shoppinglist` s
        WHERE
            s.Name = '$shoppinglistName' 
        AND
            s.UserId = $userId;
        ";
        $getResult = mysqli_query($conn, $getQuery) or die(mysqli_error($conn));
        if($getResult->num_rows > 0) {
            while($row = $getResult->fetch_array())
            {
                echo json_encode($row, JSON_UNESCAPED_UNICODE);
            }
        }
    }
}
?>