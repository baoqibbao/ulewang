<?php
// header("Content-Type:text/html;charset=UTF-8");//html文件类型,UTF-8类型
$db = mysqli_connect("127.0.0.1", "root", "ab123","ule");

if (!$db) {
  die('连接错误: ' . mysqli_error($db));
};

mysqli_query($db,'SET NAMES utf8');
$size = 20;
$sql = "SELECT * FROM frehfruit";
$result = mysqli_query($db,$sql);
$total = mysqli_num_rows($result);
$num = ceil($total / $size);
echo json_encode($num,true);
mysqli_close($db);
?>


