<?php
ini_set('display_errors',true);
error_reporting(E_ALL);

$path = "stego_dataset";
$files = scandir($path);
$string="";

for($i=0;$i<sizeof($files);$i++){
	
	if($_GET["filename"] == "\"".$files[$i]."\""){
		$string= file_get_contents($path."/".$files[$i]);
	}
}
echo $string;
?>
