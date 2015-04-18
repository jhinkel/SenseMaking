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

//$textapi = new AYLIEN\TextAPI("167f5a76", "957b2f06322369b0dab29ec24e7184bf");
//$textapi = new AYLIEN\TextAPI("6e729a1f", "c7d5f4f699da779a974474f75cd1b6bc");
//$textapi = new AYLIEN\TextAPI("b47f9237", "66ae7ac999bb8463dc301a30f8ffc22c");
$textapi = new AYLIEN\TextAPI("657e731d", "129d501fcd40005b5a499e8e36f041ca");
//$textapi = new AYLIEN\TextAPI("12d14de4", "1e3dd12990f903ae1d1c571fd75d6a29");
//$textapi = new AYLIEN\TextAPI("bc51990f", "053344ad8ca5804414b199b60f3bb060");
//$textapi = new AYLIEN\TextAPI("16501c11", "d0c22052c5bce006a221413353341285");

$sentiment = $textapi->Sentiment(array("text" => $text));
$entities = $textapi->Entities(array("text" => $text));
$results=array();
$results["polarity"] = $sentiment->polarity;
$results["polarityConfidence"] = $sentiment->polarity_confidence;
$results["subjectivityConfidence"] = $sentiment->subjectivity_confidence;
array_push($results, $entities->entities);
echo json_encode($results);

?>

