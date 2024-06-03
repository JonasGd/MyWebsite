<?php
session_start();

if(isset($_SESSION["create"]) && $_SESSION["create"] === true){
    echo 1;
} else {
    echo 0;
}
?>