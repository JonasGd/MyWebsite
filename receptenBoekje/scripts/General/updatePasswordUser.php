<?php

session_start();

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

// Define variables and initialize with empty values
$username = $password = "";

$receivedData = $_POST['json'];
$decodedData = json_decode($receivedData, true);
$password = $decodedData['password'];
 
// Processing form data when form is submitted
if($_SERVER["REQUEST_METHOD"] == "POST"){
 
    // Prepare an insert statement
    $sql = "UPDATE users SET password = ? WHERE id = ?";
        
    if($stmt = mysqli_prepare($conn, $sql)){
        // Bind variables to the prepared statement as parameters
        mysqli_stmt_bind_param($stmt, "si", $param_password, $param_id);
        
        // Set parameters
        $param_password = password_hash($password, PASSWORD_DEFAULT); // Creates a password hash
        $param_id = $_SESSION["id"];

        // Attempt to execute the prepared statement
        if(mysqli_stmt_execute($stmt)){
            // Redirect to login page
            session_destroy();
            echo 1;
        } else{
            echo -1;
        }

        // Close statement
        mysqli_stmt_close($stmt);
    }
    }
    
    // Close connection
    mysqli_close($conn);

?>