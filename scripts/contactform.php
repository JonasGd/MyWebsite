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
    $message = $name . " wrote the following: \n\n" . $_POST['message'];
    $headers = "From: info@jonasgedeshi.be \r\n";
    $headers .= "Reply-To: $from \r\n";


    mail($to,$subject,$message,$headers)   

    if () {
        echo '<div class="alert alert-success alert-dismissable" id="flash-msg">
        <button aria-hidden="true" data-dismiss="alert" class="close" type="button">×</button>
        <h4><i class="icon fa fa-check"></i>Thank You! I will be in touch</h4>
        </div>';
    }else{
        echo '<div class="alert alert-danger alert-dismissable" id="flash-msg">
    <button aria-hidden="true" data-dismiss="alert" class="close" type="button">×</button>
    <h4><i class="icon fa fa-check"></i>Sorry, something went wrong sending your message. Please try again later</h4>
    </div>';
    }

}
header("Location: https://www.jonasgedeshi.be/contact");
exit();
?>