<?php
ini_set('display_errors',true);
error_reporting(E_ALL);

$path = "stego_dataset";
$files = scandir($path);
$string="";
$retDocs = array();
$keyword = $_GET["keyword"];

for($i=0;$i<sizeof($files);$i++){
		
	$string= file_get_contents($path."/".$files[$i]);
	if(substr_count($string,$keyword)>=1){
		array_push($retDocs,$files[$i]);
	}
	
}
echo json_encode($retDocs);
?>
