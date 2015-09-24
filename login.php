<?php 
header("Access-Control-Allow-Origin:*");
//error_reporting(0);
define('ACC',true);
echo '当前版本:v2.3;您的zid为：'.$_GET['zid'].'<br />';
$zid = $_GET['zid'];

// $conn = mysql_connect('localhost','root','1');
// $sql = 'use aya';

$conn = mysql_connect('qdm114844588.my3w.com','qdm114844588','jj4856951frd2');
$sql = 'use qdm114844588_db';

// $conn = mysql_connect(SAE_MYSQL_HOST_M.':'.SAE_MYSQL_PORT,SAE_MYSQL_USER,SAE_MYSQL_PASS);
// $sql = 'use '.SAE_MYSQL_DB;

mysql_query($sql,$conn);

$sql = 'set names utf8';
mysql_query($sql,$conn);

$sql = 'select * from user where zid='.$zid;
$rs = mysql_query($sql,$conn);
$rs = mysql_fetch_assoc($rs);
mysql_close($conn);

if ($rs) {

	if (time()-$rs['act_time']>$rs['span']) {
		echo "账号到期时间:".date("Y-m-d H:i:s",($rs['act_time']+$rs['span'])).'<br />';
		echo "您的账号已过期:(,请使用普通功能";

		include './view/undenglu.html';
	}else{
		echo "账号到期时间:".date("Y-m-d H:i:s",($rs['act_time']+$rs['span'])).'<br />';

		include './view/denglu.html';
	}
}else{
	echo "试用或购买请先联系我哦:)<br />";
	echo "221功能永久免费<br />";
	echo "插件(aya蓝鳍金枪鱼)群qq号:59127790<br />";
	echo "或我的qq:352253603";
	include './view/undenglu.html';
}



?>