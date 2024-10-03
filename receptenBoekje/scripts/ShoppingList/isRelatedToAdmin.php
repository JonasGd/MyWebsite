<?php
// Initialize the session
session_start();

if(isset($_SESSION["loggedin"]) && $_SESSION["loggedin"] === true){
    $user =  htmlspecialchars($_SESSION["username"]);
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
        uc.ActiveUser,
        uc.ConnectedUser,
        u.username,
        up.permissionsId
    FROM 
        `userConnections` uc
    INNER JOIN
        `users` u
        ON
        uc.ActiveUser = u.id
    INNER JOIN
        `userPermissions` up
        ON
        uc.ConnectedUser = up.userId
    WHERE
        u.username = '$user'
        AND
        up.permissionsId = 1;
    ";

    mysqli_set_charset($conn, "utf8" );
    $result = mysqli_query($conn, $query) or die(mysqli_error($conn));

    $temparray = array();

    $prefix = '';
    if($result->num_rows > 0) {
        echo '1';
    } else {
        echo '0';
    }

} else {
    echo '0';
}
?>