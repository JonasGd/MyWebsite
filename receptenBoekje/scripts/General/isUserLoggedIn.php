<?php
// Initialize the session
session_start();

if(isset($_SESSION["loggedin"]) && $_SESSION["loggedin"] === true){
    echo htmlspecialchars($_SESSION["username"]);
} else {
    echo '';
}





?>