<?php

if(isset($_POST["CapturedUserName"])){

    $CapturedUserName = $_POST["CapturedUserName"];

}

if(isset($_POST["CapturedPassword"])){

    $CapturedPassword = $_POST["CapturedPassword"];

}


    require '../Config/com.config.php';

    $Query = "SELECT UserName, Password FROM Users WHERE UserName = '$CapturedUserName' AND Password = '$CapturedPassword'";
    $DoQuery = $Connection -> query($Query);

    if($DoQuery -> num_rows > 0){

        echo "success";

    }else{

        echo "error";

    }

$Connection -> close()

?>