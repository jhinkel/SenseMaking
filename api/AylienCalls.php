<?php
# To use the SDK either use Composer's autoload
#require __DIR__ . "/vendor/autoload.php";

# Or manually
ini_set('display_errors', true);

error_reporting(E_ALL);
require_once("src/AYLIEN/TextAPI.php");
$path = "stego_dataset";
$files = scandir($path);
$text = "";
for($i=0;$i<sizeof($files);$i++){
	if($_GET["filename"] == $files[$i]){
		$text = file_get_contents($path."/".$files[$i]);
	}
}

$textapi = new AYLIEN\TextAPI("b47f9237", "aea8e51bf28c8eb50f01c151590d9d69");
$sentiment = $textapi->Sentiment(array("text" => $text));
$entities = $textapi->Entities(array("text" => $text));
echo json_encode($sentiment->polarity.", ".$sentiment->polarity_confidence.", ".$sentiment->subjectivity_confidence);
echo "<br>";
echo json_encode($entities->entities);
?>

