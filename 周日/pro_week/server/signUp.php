<?php
header("Content-Type:text/html;charset=UTF-8");//html文件类型,UTF-8类型
$db = mysqli_connect("127.0.0.1", "root", "ab123","ule");
if (!$db) {
  die('连接错误: ' . mysqli_error($db));
};
// mysqli_query($db,"SET NAMES utf8");
mysqli_query($db,'SET NAMES utf8');
$username = $_REQUEST["username"];
$pwd = $_REQUEST["pwd"];
// echo '连接成功<br />';
$sql = "SELECT * FROM user where username='$username'";
$result = mysqli_query( $db, $sql );
if(!$result)
{
    die('无法读取数据: ' . mysqli_error($db));
}
$data = mysqli_fetch_all($result,MYSQLI_ASSOC);
$num = mysqli_num_rows($result);
if($num==1){ 
    echo '{"status":"error","msg":"该用户已经存在，请确认手机号码!!"}';
}else{
    $sql = "INSERT INTO user " .
    "(username,password)" .
    "VALUES " .
    "('$username','$pwd')";
    $retval = mysqli_query($db, $sql);
    if (!$retval) {
      die('无法插入数据: ' . mysqli_error($conn));
     }
    echo '{"status":"success","msg":""}'; 
    //  echo json_encode($data,true);
}
mysqli_close($db);
?>
