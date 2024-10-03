<?php

if(isset($_SESSION["loggedin"]) && $_SESSION["loggedin"] === true){
    $currentUser =  htmlspecialchars($_SESSION["username"]);

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
        s.Id,
        s.Name,
        s.Date,
        s.isShopping,
        u.username
    FROM 
        `Shoppinglist` s
    INNER JOIN
        `users` u
    ON
        u.id = s.UserId
    WHERE 
        s.UserId IN (SELECT c.ConnectedUser FROM userConnections c INNER JOIN users u ON c.ActiveUser = u.id WHERE u.username = '$currentUser')
    OR 
        s.UserId = '$currentUser'
    OR 
        '1' IN (SELECT p.permissionsId FROM userPermissions p INNER JOIN users ON p.userId = u.id WHERE u.username = '$currentUser')
    ORDER BY s.Date DESC, s.Name ASC;
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

} 
?>