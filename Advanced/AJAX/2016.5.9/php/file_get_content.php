<?php

	header('Content-type: text/html;charset=utf8');
	
	// Create a stream
	$opts = array(
	  'http'=>array(
	    'method'=>"GET",
	    'header'=>"Accept-language: en\r\n" .
	              "Cookie: foo=bar\r\n"
	  )
	);
	
	$context = stream_context_create($opts);
	
	// Open the file using the HTTP headers set above
//	$file = file_get_contents('http://baidu.com/');
		$file = file_get_contents('http://www.iqianduan.cn');
	
	
	print_r($file);
	
	
	
	
	