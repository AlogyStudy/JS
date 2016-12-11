<?php

//	header("Content-type: application/json");

	$content = $_GET['content'];
	$mess_id = $_GET['mess_id'];
	
	$conn = mysql_connect('127.0.0.1','root','');
	
	mysql_select_db('message',$conn);
	
	mysql_query('set names utf8');
	
//	$sql = "insert into mes_message (name,time,qqhao,content) values('{$name}','{$shijian}',{$qqhao},'{$content}')";
//	$sql = "delete from mes_message where mess_id={$mess_id}";
	$sql = "update mes_message set content='{$content}' where mess_id={$mess_id}";
		
	$result = mysql_query($sql);
	
	//返回数据
	if ( $result == 1 ){
		echo 'ok';
	} else {
		echo 'wrong';
	}
	
	mysql_close($conn);

?>
