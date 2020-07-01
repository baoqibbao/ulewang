<?php
header("Content-Type:text/html;charset=UTF-8");//html文件类型,UTF-8类型
$db = mysqli_connect("127.0.0.1", "root", "ab123","ule");
if (!$db) {
  die('连接错误: ' . mysqli_error($db));
};
// mysqli_query($db,"SET NAMES utf8");
mysqli_query($db,'SET NAMES utf8');
$goodid=$_REQUEST["good_id"];
$username = $_REQUEST["username"];
$Specifications = $_REQUEST["Specifications"];
$num = $_REQUEST["num"];
// echo '连接成功<br />';
$sql = "SELECT num FROM cart_info where good_id = $goodid and username='$username' and Specifications = '$Specifications'";
$result = mysqli_query( $db, $sql );
if(!$result)
{
    die('无法读取数据: ' . mysqli_error($db));
}
$data = mysqli_fetch_all($result,MYSQLI_ASSOC);
$num1 = mysqli_num_rows($result);

if($num1==1){ 
    $num2 =  (int)$data[0]["num"];
    // echo '{"status":"error","msg":"该用户已经存在，请确认手机号码!!"}';
    $sql = "UPDATE cart_info
    SET num=$num2+$num
    WHERE good_id = $goodid and username='$username' and Specifications = '$Specifications'";
    $retval = mysqli_query( $db, $sql );
    if (!$retval) {
        die('无法插入数据: ' . mysqli_error($conn));
       }else{
        echo '{"status":"success","msg":"(已有数据)成功加入购物车"}'; 
       }
       

}else{
    $sql = "INSERT INTO cart_info ".
        "(good_id,username, Specifications,num) ".
        "VALUES ".
        "($goodid,'$username','$Specifications',$num)";
        $retval = mysqli_query( $db, $sql );
    if (!$retval) {
        die('无法插入数据: ' . mysqli_error($conn));
       }else{
        echo '{"status":"success","msg":"成功加入购物车"}'; 
         }
      }
mysqli_close($db);
