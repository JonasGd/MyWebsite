<?php
session_start();

if(isset($_SESSION["delete"]) && $_SESSION["delete"] === true){
    echo 1;
} else {
    echo 0;
}
?>