<?php
if($_POST['message']) {
    $to = "jonas.gedeshi@gmail.com";
    $from = $_POST['email'];
    $name = $_POST['name'];
    if($_POST['subject']) {
        $subject = $_POST['subject'] . ": Form submission - Contact Page from " . $name;
    }
    else{
        $subject = "Form submission - Contact Page from " . $name;
    }
    $message = $name . " wrote the following:" "\n\n" . $_POST['message'];
    $headers = "From: $to \r\n";
    $headers .= "Reply-To: $from \r\n";


    mail($to,$subject,$message,$headers);


}