<?php

	if( isset($_GET['paixu']) ){
		$paixu = $_GET['paixu'];
	} else {
		$paixu = 1;
	}

	$conn = mysql_connect('127.0.0.1','root','');
	
	mysql_select_db('message',$conn);
	
	mysql_query('set names utf8');
	
	if ( $paixu == 1 ){
		$sql = "select * from mes_message";
	} elseif ( $paixu == 0 ){
		$sql = "select * from mes_meseage order by id desc";
	}
	
	
	$result = mysql_query($sql);
	
	$arr = array("jieguo" => array());
	
	while($row = mysql_fetch_array($result)){
		array_push($arr["jieguo"], json_encode($row));
	}
	
	echo json_encode($arr);
	
	mysql_close($conn);
	
//	print_r($json);
//	var_dump( $arr );

?>