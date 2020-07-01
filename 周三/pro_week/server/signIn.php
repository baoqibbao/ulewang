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
if($num==0){ 
    echo '{"status":"error","msg":"该用户不存在，请确认手机号码!!"}';
}else{
    $sql = "SELECT * FROM user where username='$username' and password='$pwd'";
    $retval = mysqli_query($db, $sql);
    $num = mysqli_num_rows($retval);
    if ($num==0) {
        echo '{"status":"error","msg":"密码错误，请重新输入!!"}';
     }else{
        echo '{"status":"success","msg":"登录成功，进入主页","info":'.$username.'}'; 
     }
    //  echo json_encode($data,true);
}
mysqli_close($db);
?>
