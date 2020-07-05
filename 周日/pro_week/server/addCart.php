<?php
header("Content-Type:text/html;charset=UTF-8"); //html文件类型,UTF-8类型
$db = mysqli_connect("127.0.0.1", "root", "ab123", "ule");
if (!$db) {
    die('连接错误: ' . mysqli_error($db));
};
// mysqli_query($db,"SET NAMES utf8");
mysqli_query($db, 'SET NAMES utf8');
$goodid = $_REQUEST["good_id"];
$username = $_REQUEST["username"];
$Specifications = $_REQUEST["Specifications"];
$num = $_REQUEST["num"];
// echo '连接成功<br />';
$sql = "SELECT num FROM cart_info where good_id = $goodid and username='$username' and Specifications = '$Specifications'";
$result = mysqli_query($db, $sql);
if (!$result) {
    die('无法读取数据: ' . mysqli_error($db));
}
$data = mysqli_fetch_all($result, MYSQLI_ASSOC);
$num1 = mysqli_num_rows($result);


// echo json_encode($data1,true);
if ($num1 == 1) {
    $num2 =  (int) $data[0]["num"];
    // echo '{"status":"error","msg":"该用户已经存在，请确认手机号码!!"}';
    $sql = "UPDATE cart_info
    SET num=$num2+$num
    WHERE good_id = $goodid and username='$username' and Specifications = '$Specifications'";
    $retval = mysqli_query($db, $sql);
    if (!$retval) {
        die('无法更新数据: ' . mysqli_error($conn));
    } else {
        $sql1 = "SELECT * FROM cart_info where  username='$username'";
        $result1 = mysqli_query($db, $sql1);
        if (!$result1) {
            die('无法读取数据: ' . mysqli_error($db));
        }
        $data1 = mysqli_fetch_all($result1, MYSQLI_ASSOC);
        echo '{"status":"success","msg":' . json_encode($data1, true) . '}';
    }
} else {
    $sql = "INSERT INTO cart_info " .
        "(good_id,username, Specifications,num) " .
        "VALUES " .
        "($goodid,'$username','$Specifications',$num)";
    $retval = mysqli_query($db, $sql);
    if (!$retval) {
        die('无法插入数据: ' . mysqli_error($conn));
    } else {
        $sql1 = "SELECT * FROM cart_info where  username='$username'";
        $result1 = mysqli_query($db, $sql1);
        if (!$result1) {
            die('无法读取数据: ' . mysqli_error($db));
        }
        $data1 = mysqli_fetch_all($result1, MYSQLI_ASSOC);
        echo '{"status":"success","msg":' . json_encode($data1, true) . '}';
    }
}
mysqli_close($db);
