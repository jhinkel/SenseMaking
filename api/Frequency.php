<?php
ini_set('display_errors',true);
error_reporting(E_ALL);
require_once("src/AYLIEN/TextAPI.php");

$path = "stego_dataset";
$files = scandir($path);
$string="";
$keyword="";
$text="";
$factsheets = array();
		array_push($factsheets, "1201243446501");                  
		array_push($factsheets, "1201243446502");                  
		array_push($factsheets, "1201243446503");
		array_push($factsheets, "1201243446504");
		array_push($factsheets, "1201243446505");                  
		array_push($factsheets, "1201243446506");
		array_push($factsheets, "1201243446507");                  
		array_push($factsheets, "1201243446508");                  
		array_push($factsheets, "1201243446613");       
for($i=0;$i<sizeof($files);$i++){
	
	if($_GET["filename"].".txt" == $files[$i] && !in_array($_GET["filename"], $factsheets)){
		$keyword= $_GET["keyword"];
		$text = file_get_contents($path."/".$files[$i]);
		$string= substr_count($text,$keyword);
	}
}


echo $string;
?>
