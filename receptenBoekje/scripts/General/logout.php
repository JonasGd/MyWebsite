<?php
// Initialize the session
session_start();
 
// Unset all of the session variables
$_SESSION = array();
 
// Destroy the session.
session_destroy();

//return
header('Location: ' . $_SERVER["HTTP_REFERER"] );
exit;
?>