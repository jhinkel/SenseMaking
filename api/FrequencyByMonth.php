<?php
ini_set('display_errors',true);
error_reporting(E_ALL);

$path = "stego_dataset";
$files = scandir($path);
$results=array();
$pattern="/[:]\s((\w)*[\/])*(\w)*/";
$frequencyCountMonth=0;
$keyword= $_GET["keyword"];
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
for($MonthNumber=1;$MonthNumber<=12;$MonthNumber++){
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
			$parsedMonth = date("n",strtotime($newDateString));

		}             	
		$filenumbers = rtrim($files[$i],".txt");
		if($parsedMonth==$MonthNumber){
			//GET FREQUENCY COUNTS HERE!
			$text = file_get_contents($path."/".$files[$i]);
			$freqCount= substr_count($text,$keyword);
			if(!in_array($filenumbers,$factsheets)){
				$frequencyCountMonth += $freqCount;
			}
		}	
	}
	array_push($results, $frequencyCountMonth);
        $frequencyCountMonth = 0;
	$freqCount = 0;
}
echo json_encode($results);
?>
