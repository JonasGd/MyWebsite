<?php
if($_POST['message']) {
    $to = "jonas.gedeshi@gmail.com";
    $from = $_POST['email'];
    $name = $_POST['name'];
    $subject = $_POST['subject'] . ": Form submission - Order Music Scores from " . $name;
    $title = "";
    if($_POST['title']){
        $title = "Regarding following compositions: " . $_POST['title'] . "\n\n";
    }
    $purpose = "";
    if($_POST['purpose']){
        $purpose = "Purpose: " . $_POST['purpose'] . "\n\n";
    }
    $message = $name. " had the following message: " . $_POST['message'];
 


    $message = $name . " would like to ". $_POST['subject'] .": \n\n" . 
    . $title . $purpose . $message;
    $headers = "From: info@jonasgedeshi.be \r\n";
    $headers .= "Reply-To: $from \r\n";


    mail($to,$subject,$message,$headers)   
}

header("Location: https://www.jonasgedeshi.be/contact");
exit();
?>