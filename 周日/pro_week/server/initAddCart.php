<?php
header("Content-Type:text/html;charset=UTF-8"); //html文件类型,UTF-8类型
$db = mysqli_connect("127.0.0.1", "root", "ab123", "ule");
if (!$db) {
    die('连接错误: ' . mysqli_error($db));
};
mysqli_query($db, 'SET NAMES utf8');
$username = $_REQUEST["username"];
$sql = "SELECT * FROM cart_info where  username='$username'";
$result = mysqli_query($db, $sql);
if (!$result) {
    die('无法读取数据: ' . mysqli_error($db));
}
$data = mysqli_fetch_all($result, MYSQLI_ASSOC);
// $num = mysqli_num_rows($result);
// echo json_encode($data1,true);
echo '{"status":"success","msg":' . json_encode($data, true) . '}';

// var_dump('{"status":"success","msg":' . json_encode($data, true) . '}') ;
mysqli_close($db);
