<?php
	
	
	echo $_SERVER['SERVER_NAME'] . '<br/>';
	
	$agent = strtolower($_SERVER['HTTP_USER_AGENT']);
	
	echo strpos( $agent,'windows nt' )  ? true : false ;
	
	
	
	
	
	
