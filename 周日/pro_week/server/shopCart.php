<?php
header("Content-Type:text/html;charset=UTF-8"); //html文件类型,UTF-8类型
$db = mysqli_connect("127.0.0.1", "root", "ab123", "ule");
if (!$db) {
    die('连接错误: ' . mysqli_error($db));
};
// mysqli_query($db,"SET NAMES utf8");
mysqli_query($db, 'SET NAMES utf8');
$username = $_REQUEST["username"];

// echo '连接成功<br />';
$sql = "SELECT details_info.good_id,details_info.shopName,details_info.title,details_info.price,details_info.minImgSrc,cart_info.username,cart_info.Specifications,cart_info.num FROM cart_info,details_info where cart_info.good_id = details_info.good_id and username='$username' ";
$result = mysqli_query($db, $sql);
if (!$result) {
    die('无法读取数据: ' . mysqli_error($db));
}
$data = mysqli_fetch_all($result, MYSQLI_ASSOC);
$num = mysqli_num_rows($result);
if ($num < 1) {
    echo '{"status":"success","msg":"暂无数据"}';
    
} else {
    echo '{"status":"success","msg":'.json_encode($data,true).'}';
}
mysqli_close($db);
