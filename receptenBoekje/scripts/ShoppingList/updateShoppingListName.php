<?php
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
        u.username = '$currentUser';
    ";
    $getResult = mysqli_query($conn, $getQuery) or die(mysqli_error($conn));
    $userId = 0;
    if($getResult->num_rows > 0) {
        while($row = $getResult->fetch_array())
        {
            $userId = $row;
        }
    }

    $receivedData = $_POST['json'];
    $decodedData = json_decode($receivedData, true);

    $shoppinglistId = $decodedData['shoppinglistId'];
    $shoppinglistName = $decodedData['shoppinglistName'];


    $getQuery2 = "
    SELECT
        s.Name
    FROM 
        `Shoppinglist` s
    WHERE
        s.Id = $shoppinglistId
    AND
        s.UserId = $userId
    ";
    $getResult2 = mysqli_query($conn, $getQuery2) or die(mysqli_error($conn));
    $userId = 0;
    if($getResult2->num_rows > 0) {
        $query = "
        UPDATE `Shoppinglist` s
        SET 
            s.Name = '$shoppinglistName'
        WHERE 
            s.Id = $shoppinglistId;
        ";
        mysqli_set_charset($conn, "utf8" );
        echo mysqli_query($conn, $query) or die(mysqli_error($conn));
    } else echo '';
}
?>