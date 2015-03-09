<?php
ini_set('display_errors', true);

error_reporting(E_ALL);

$path = "stego_dataset";
$files = scandir($path);
$pattern="/[:]\s((\w)*[\/])*(\w)*/";
$matches="";
//echo $date;
$result=array();
for($i=0;$i<sizeof($files);$i++) {
	$string= file_get_contents($path."/".$files[$i],NULL,NULL,0,500);

	preg_match_all($pattern,$string,$matches);
	$date = "";
	if(sizeof($matches[0]) != 0){
		if(strpos($matches[0][0],"/") != FALSE){
			$date = substr($matches[0][0],2);
		}
		else{
			if(sizeof($matches[0])>1){
				if(strpos($matches[0][1],"/") != FALSE){
					$date = substr($matches[0][1],2);
				}
				else{
					
				}   
			}
		}
	}
	if($date != ""){
		$myDateTime = new DateTime($date);
		$newDateString = $myDateTime->format('Y-m-d');
		$result[$files[$i]] = $newDateString;
	}
// echo file_get_contents($path."/".$value,null,null,1);
}
echo json_encode($result);
?>
