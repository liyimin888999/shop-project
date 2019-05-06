<?php
include("./config.php");

$name = $_GET["name"];
$price = $_GET['price'];
$num = $_GET['num'];

$sql = "insert into shop (name,price,num) values ('$name',$price,$num)";

$res = mysql_query($sql);
if($res){
  echo json_encode(array(
    "res_code" => 1,
    "res_message" => "添加成功"
  ));
}else{  
  echo json_encode(array(
    "res_code" => 0,
    "res_message" => "添加失败"
  ));
};
?>