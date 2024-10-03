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

// Define variables and initialize with empty values
$username = $password = "";

$receivedData = $_POST['json'];
$decodedData = json_decode($receivedData, true);
$username = $decodedData['username'];
$password = $decodedData['password'];
 
// Processing form data when form is submitted
if($_SERVER["REQUEST_METHOD"] == "POST"){
 
    // Prepare a select statement
    $sql = "SELECT id, username, password FROM users WHERE username = ?";
    
    if($stmt = mysqli_prepare($conn, $sql)){
        // Bind variables to the prepared statement as parameters
        mysqli_stmt_bind_param($stmt, "s", $param_username);
        
        // Set parameters
        $param_username = $username;
        
        // Attempt to execute the prepared statement
        if(mysqli_stmt_execute($stmt)){
            // Store result
            mysqli_stmt_store_result($stmt);
            
            // Check if username exists, if yes then verify password
            if(mysqli_stmt_num_rows($stmt) == 1){                    
                // Bind result variables
                mysqli_stmt_bind_result($stmt, $id, $username, $hashed_password);
                if(mysqli_stmt_fetch($stmt)){
                    if(password_verify($password, $hashed_password)){
                        // Password is correct, so start a new session
                        session_start();
                        
                        // Store data in session variables
                        $_SESSION["loggedin"] = true;
                        $_SESSION["id"] = $id;
                        $_SESSION["username"] = $username;                            
                        
                        $sql2 = "SELECT id FROM userPermissions WHERE userId = ? AND permissionsId = 1";

                        if ($stmt2 = mysqli_prepare($conn, $sql2)){
                            mysqli_stmt_bind_param($stmt2, 's', $param_userid);
                            $param_userid = $id;
                            if(mysqli_stmt_execute($stmt2)) {
                                mysqli_stmt_store_result($stmt2);

                                if(mysqli_stmt_num_rows($stmt2) > 0) {
                                    $_SESSION["admin"] = true;
                                } else {
                                    $_SESSION["admin"] = false;
                                }
                            } 
                        }

                        mysqli_stmt_close($stmt2);

                        $sql3 = "SELECT id FROM userPermissions WHERE userId = ? AND permissionsId = 3";

                        if ($stmt3 = mysqli_prepare($conn, $sql3)){
                            mysqli_stmt_bind_param($stmt3, 's', $param_userid);
                            $param_userid = $id;
                            if(mysqli_stmt_execute($stmt3)) {
                                mysqli_stmt_store_result($stmt3);

                                if(mysqli_stmt_num_rows($stmt3) > 0) {
                                    $_SESSION["create"] = true;
                                } else {
                                    $_SESSION["create"] = false;
                                }
                            } 
                        }

                        mysqli_stmt_close($stmt3);

                        $sql4 = "SELECT id FROM userPermissions WHERE userId = ? AND permissionsId = 4";

                        if ($stmt4 = mysqli_prepare($conn, $sql4)){
                            mysqli_stmt_bind_param($stmt4, 's', $param_userid);
                            $param_userid = $id;
                            if(mysqli_stmt_execute($stmt4)) {
                                mysqli_stmt_store_result($stmt4);

                                if(mysqli_stmt_num_rows($stmt4) > 0) {
                                    $_SESSION["delete"] = true;
                                } else {
                                    $_SESSION["delete"] = false;
                                }
                            } 
                        }

                        mysqli_stmt_close($stmt4);

                        $sql5 = "SELECT id FROM userPermissions WHERE userId = ? AND permissionsId = 2";

                        if ($stmt5 = mysqli_prepare($conn, $sql5)){
                            mysqli_stmt_bind_param($stmt5, 's', $param_userid);
                            $param_userid = $id;
                            if(mysqli_stmt_execute($stmt5)) {
                                mysqli_stmt_store_result($stmt5);

                                if(mysqli_stmt_num_rows($stmt5) > 0) {
                                    $_SESSION["update"] = true;
                                } else {
                                    $_SESSION["update"] = false;
                                }
                            } 
                        }

                        mysqli_stmt_close($stmt5);

                        // Redirect user to welcome page
                        echo 1;
                    } else{
                        // Password is not valid, display a generic error message
                        echo 0;
                    }
                }
            } else{
                // Username doesn't exist, display a generic error message
                echo 0;
            }
        } else{
            echo -1;
        }

        // Close statement
        mysqli_stmt_close($stmt);
    }
    
    
    // Close connection
    mysqli_close($conn);
}
?>