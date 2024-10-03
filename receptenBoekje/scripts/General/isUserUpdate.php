<?php
session_start();

if(isset($_SESSION["update"]) && $_SESSION["update"] === true){
    echo 1;
} else {
    echo 0;
}
?>