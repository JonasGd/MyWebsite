<?php
session_start();

if(isset($_SESSION["loggedin"]) && $_SESSION["loggedin"] === true){
    echo $_SESSION["id"];
} else {
    echo 0;
}
?>