<?php
session_start();

if(isset($_SESSION["admin"]) && $_SESSION["admin"] === true){
    echo 1;
} else {
    echo 0;
}
?>