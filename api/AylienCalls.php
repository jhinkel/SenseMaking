<?php
# To use the SDK either use Composer's autoload
#require __DIR__ . "/vendor/autoload.php";

# Or manually
ini_set('display_errors', true);

error_reporting(E_ALL);
require_once("src/AYLIEN/TextAPI.php");

$text = "John is a very good football player!";

$textapi = new AYLIEN\TextAPI("b47f9237", "aea8e51bf28c8eb50f01c151590d9d69");
$sentiment = $textapi->Sentiment(array("text" => $text));
$language = $textapi->Language(array("text" => $text));

echo json_encode($sentiment);
echo json_encode($language);
?>
