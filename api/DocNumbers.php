<?php
ini_set('display_errors',true);
error_reporting(E_ALL);

$path = "stego_dataset";
$files = scandir($path);
$string=array();

for($i=2;$i<sizeof($files);$i++){
	$filenumbers = rtrim($files[$i],".txt");
	array_push($string, $filenumbers);	
}
echo json_encode($string);
?>
