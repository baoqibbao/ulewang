<?php
header("Content-Type:text/html;charset=UTF-8"); //html文件类型,UTF-8类型
$db = mysqli_connect("127.0.0.1", "root", "ab123", "ule");
if (!$db) {
    die('连接错误: ' . mysqli_error($db));
};
// mysqli_query($db,"SET NAMES utf8");
mysqli_query($db, 'SET NAMES utf8');
$num = $_REQUEST["num"];
$goodid = $_REQUEST["good_id"];
$username = $_REQUEST["username"];
$Specifications = $_REQUEST["Specifications"];
// echo '连接成功<br />';
$sql = "UPDATE cart_info
        SET num = $num 
        WHERE good_id=$goodid and username='$username' and Specifications='$Specifications'";
$result = mysqli_query($db, $sql);
if (!$result) {
    die('无法插入数据: ' . mysqli_error($db));
}else {
    $sql1 = "SELECT details_info.good_id,details_info.shopName,details_info.title,details_info.price,details_info.minImgSrc,cart_info.username,cart_info.Specifications,cart_info.num FROM cart_info,details_info where cart_info.good_id = details_info.good_id and username='$username'";
    $result1 = mysqli_query($db, $sql1);
    if (!$result1) {
        die('无法读取数据: ' . mysqli_error($db));
    }
    $data1 = mysqli_fetch_all($result1, MYSQLI_ASSOC);
    echo '{"status":"success","msg":' . json_encode($data1, true) . '}';
}

mysqli_close($db);
