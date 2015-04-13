<?php
ini_set('display_errors',true);
error_reporting(E_ALL);

$path = "stego_dataset";
$files = scandir($path);
$results=array();
$Month=$_GET["month"];
$MonthNumber = "";
$pattern="/[:]\s((\w)*[\/])*(\w)*/";

if(strcasecmp($Month,"jan")==0){
	$MonthNumber=1;
}
if(strcasecmp($Month,"feb")==0){
        $MonthNumber=2;
}
if(strcasecmp($Month,"mar")==0){
        $MonthNumber=3;
}
if(strcasecmp($Month,"apr")==0){
        $MonthNumber=4;
}
if(strcasecmp($Month,"may")==0){
        $MonthNumber=5;
}
if(strcasecmp($Month,"jun")==0){
        $MonthNumber=6;
}
if(strcasecmp($Month,"jul")==0){
        $MonthNumber=7;
}
if(strcasecmp($Month,"aug")==0){
        $MonthNumber=8;
}
if(strcasecmp($Month,"sep")==0){
        $MonthNumber=9;
}
if(strcasecmp($Month,"oct")==0){
        $MonthNumber=10;
}
if(strcasecmp($Month,"nov")==0){
        $MonthNumber=11;
}
if(strcasecmp($Month,"dec")==0){
        $MonthNumber=12;
}


for($i=2;$i<sizeof($files);$i++){
	$string= file_get_contents($path."/".$files[$i],NULL,NULL,0,500);                                             
        $month = "";
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
        	$parsedMonth = date("m",strtotime($newDateString));
		
	}             	
	$filenumbers = rtrim($files[$i],".txt");
	if($parsedMonth==$MonthNumber){
		array_push($results, $filenumbers);
		
	}	
}
		array_push($results, "1201243446501");                  
		array_push($results, "1201243446502");                  
		array_push($results, "1201243446503");
		array_push($results, "1201243446504");
		array_push($results, "1201243446505");                  
		array_push($results, "1201243446506");
		array_push($results, "1201243446507");                  
		array_push($results, "1201243446508");                  
		array_push($results, "1201243446613");                  


echo json_encode($results);
?>
