<?php

	$name =  $_POST['name'];
	$qqhao = $_POST['qqhao'];
	$content = $_POST['content'];
	
	date_default_timezone_set('Asia/Shanghai'); 
	$shijian = date('y-m-d H:i:s',time());


	$conn = mysql_connect('127.0.0.1','root','');
	
	mysql_select_db('message',$conn);
	
	mysql_query('set names utf8');
	
	$sql = "insert into mes_message (name,time,qqhao,content) values('{$name}','{$shijian}',{$qqhao},'{$content}')";
		
	$result = mysql_query($sql);
	
	//返回数据
	if ( $result == 1 ){
		echo 'ok';
	} else {
		echo 'wroing';
	}
	
	mysql_close($conn);

?>