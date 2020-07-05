<?php
// header("Content-Type:text/html;charset=UTF-8");//html文件类型,UTF-8类型
// header("Content-Type:application/json;charset=UTF-8");

$db = mysqli_connect("127.0.0.1", "root", "ab123","ule");

if (!$db) {
  die('连接错误: ' . mysqli_error($db));
};

// mysqli_query($db,"SET NAMES utf8");
mysqli_query($db,'SET NAMES utf8');

// echo '连接成功<br />';

$sql = 'SELECT * FROM good_info where good_id<11';

$result = mysqli_query( $db, $sql );
if(!$result)
{
    die('无法读取数据: ' . mysqli_error($db));
}
$data = mysqli_fetch_all($result,MYSQLI_ASSOC);
echo json_encode($data,true);
mysqli_close($db);
?>
