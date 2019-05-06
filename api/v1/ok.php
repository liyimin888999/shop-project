<?php
include("./config.php");

$id = $_GET["id"];
$price = $_GET["price"];
$num = $_GET["num"];

$sql = "update shop set price=$price,num=$num where id=$id";
$res = mysql_query($sql);

if($res) {
  echo json_encode(array(
    "res_code" => 1,
    "res_message" => "更新成功"
  ));
}else{
  echo json_encode(array(
    "res_code" => 0,
    "res_message" => "网络错误，更新失败，请重试"
  ));
}
?>