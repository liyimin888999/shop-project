<?php
include("./config.php");

$username = $_POST['username'];
$password = $_POST['password'];
$sql = "insert into user (username,password) values ('$username','$password')";
$res = mysql_query($sql);

if($res) {
  echo json_encode(array(
    "res_code" => 1,
    "res_message" => "注册成功"
  ));
}else{
  echo json_encode(array(
    "res_code" => 0,
    "res_message" => "网络错误，注册失败，请重试"
  ));
}

?>