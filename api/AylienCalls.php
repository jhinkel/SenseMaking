<?php
# To use the SDK either use Composer's autoload
#require __DIR__ . "/vendor/autoload.php";

# Or manually
ini_set('display_errors', true);

error_reporting(E_ALL);

//header("HTTP/1.0 403 Forbidden");

require_once("src/AYLIEN/TextAPI.php");
$path = "stego_dataset";
$files = scandir($path);
$text = "";
for($i=0;$i<sizeof($files);$i++){
	if($_GET["filename"].".txt" == $files[$i]){
		$text = file_get_contents($path."/".$files[$i]);
	}
}

$textapi = new AYLIEN\TextAPI("6e729a1f", "c7d5f4f699da779a974474f75cd1b6bc");
$sentiment = $textapi->Sentiment(array("text" => $text));
$entities = $textapi->Entities(array("text" => $text));
$results=array();
$results["polarity"] = $sentiment->polarity;
$results["polarityConfidence"] = $sentiment->polarity_confidence;
$results["subjectivityConfidence"] = $sentiment->subjectivity_confidence;
array_push($results, $entities->entities);
echo json_encode($results);

?>

