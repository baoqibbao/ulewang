<?php
// header("Content-Type:text/html;charset=UTF-8");//html文件类型,UTF-8类型
$db = mysqli_connect("127.0.0.1", "root", "ab123","ule");

if (!$db) {
  die('连接错误: ' . mysqli_error($db));
};

mysqli_query($db,'SET NAMES utf8');
$sort=$_REQUEST["sort"];
$pageNum=$_REQUEST["pageNum"];
// echo '连接成功<br />';
$limit = $pageNum * 20;


if($sort == "default"){
    $sql = "SELECT * FROM frehfruit Order BY good_id LIMIT $limit,20";
  }elseif($sort == "price_asc"){
    $sql = "SELECT * FROM frehfruit Order BY price ASC LIMIT $limit ,20";
  } elseif ($sort == "price_desc") {
    $sql = "SELECT * FROM frehfruit Order BY price DESC LIMIT $limit,20";
  }
$result = mysqli_query( $db, $sql );
if(!$result)
{
    die('无法读取数据: ' . mysqli_error($db));
}
$data = mysqli_fetch_all($result,MYSQLI_ASSOC);
echo json_encode($data,true);
mysqli_close($db);
?>
