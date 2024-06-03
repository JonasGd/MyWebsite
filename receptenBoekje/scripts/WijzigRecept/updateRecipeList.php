<?php
$servername = "localhost";
$username = "jonashg4_admin";
$password = "fudyNfTT22";
$dbname = "jonashg4_ReceptenBoekje";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);
// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn-> connect_error);
}

$receivedData = $_POST['json'];
$decodedData = json_decode($receivedData, true);

$recipeId = $decodedData['recipeId'];
$firstStep = $decodedData['firstStep'];
$secondStep = ($decodedData['secondStep']!== '' )? ("'".$decodedData['secondStep']."'") : "NULL";
$thirdStep = ($decodedData['thirdStep']!== '' )? ("'".$decodedData['thirdStep']."'") : "NULL";
$fourthStep = ($decodedData['fourthStep']!== '' )? ("'".$decodedData['fourthStep']."'") : "NULL";
$fifthStep = ($decodedData['fifthStep']!== '' )? ("'".$decodedData['fifthStep']."'") : "NULL";
$sixthStep = ($decodedData['sixthStep']!== '' )? ("'".$decodedData['sixthStep']."'") : "NULL";
$seventhStep = ($decodedData['seventhStep']!== '' )? ("'".$decodedData['seventhStep']."'") : "NULL";
$eighthStep = ($decodedData['eighthStep']!== '' )? ("'".$decodedData['eighthStep']."'") : "NULL";
$ninthStep = ($decodedData['ninthStep']!== '' )? ("'".$decodedData['ninthStep']."'") : "NULL";
$tenthStep = ($decodedData['tenthStep']!== '' )? ("'".$decodedData['tenthStep']."'") : "NULL";
$eleventhStep = ($decodedData['eleventhStep']!== '' )? ("'".$decodedData['eleventhStep']."'") : "NULL";
$twelfthStep = ($decodedData['twelfthStep']!== '' )? ("'".$decodedData['twelfthStep']."'") : "NULL";
$thirteenthStep = ($decodedData['thirteenthStep']!== '' )? ("'".$decodedData['thirteenthStep']."'") : "NULL";
$fourteenthStep = ($decodedData['fourteenthStep']!== '' )? ("'".$decodedData['fourteenthStep']."'") : "NULL";
$fifteenthStep = ($decodedData['fifteenthStep']!== '' )? ("'".$decodedData['fifteenthStep']."'") : "NULL";

$query = "
UPDATE `RecipeList` l
SET l.Id = $recipeId,
    l.FirstStep = '$firstStep',
    l.SecondStep = $secondStep,
    l.ThirdStep = $thirdStep,
    l.FourthStep = $fourthStep,
    l.FifthStep = $fifthStep,
    l.SixthStep = $sixthStep,
    l.SeventhStep = $seventhStep,
    l.EighthStep = $eighthStep,
    l.NinthStep = $ninthStep,
    l.TenthStep = $tenthStep,
    l.EleventhStep = $eleventhStep,
    l.TwelfthStep = $twelfthStep,
    l.ThirteenthStep = $thirteenthStep,
    l.FourteenthStep = $fourteenthStep,
    l.FifteenthStep = $fifteenthStep
WHERE 
    l.Id = $recipeId;
";
mysqli_set_charset($conn, "utf8" );
echo mysqli_query($conn, $query) or die(mysqli_error($conn));


?>