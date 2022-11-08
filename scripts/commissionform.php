<?php
if($_POST['message']) {
    $to = "jonas.gedeshi@gmail.com";
    $from = $_POST['email'];
    $name = $_POST['name'];
    $subject = $_POST['subject'] . ": Form submission - Commission a Composition from " . $name;
    $instrumentation = "";
    if($_POST['instrumentation']){
        $instrumentation = "Instrumentation: " . $_POST['instrumentation'] . "\n\n";
    }
    $message = "";
    if($_POST['message']){
        $message = $name. " had the following message: " . $_POST['message'];
    }


    $message = $name . " would like to ". $_POST['subject'] .": \n\n" . 
    "Details about the commission/enquiry: " . $_POST['details']. "\n\n" . 
    $instrumentation . $message;
    $headers = "From: info@jonasgedeshi.be \r\n";
    $headers .= "Reply-To: $from \r\n";


    mail($to,$subject,$message,$headers)   
}

header("Location: https://www.jonasgedeshi.be/contact");
exit();
?>