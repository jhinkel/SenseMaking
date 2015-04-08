<?php
ini_set('display_errors',true);
error_reporting(E_ALL);
require_once("src/AYLIEN/TextAPI.php");

$path = "stego_dataset";
$files = scandir($path);
$string="";
$keyword="";
$text="";
for($i=0;$i<sizeof($files);$i++){
	
	if($_GET["filename"] == $files[$i]){
		$keyword= $_GET["keyword"];
		$text = file_get_contents($path."/".$files[$i]);
		$string= substr_count($text,$keyword);
	}
}
echo $string;
?>
