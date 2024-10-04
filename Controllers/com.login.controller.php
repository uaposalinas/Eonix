    <?php

    if(isset($_POST["CapturedUserName"])){

        $CapturedUserName = $_POST["CapturedUserName"];

    }else{

        header("Location: ../Auth");

    }

    if(isset($_POST["CapturedPassword"])){

        $CapturedPassword = $_POST["CapturedPassword"];

    }


        require '../Config/com.config.php';
        $Connection -> set_charset("utf8");
        
        $UserQuery = "SELECT * FROM Users WHERE UserName = '$CapturedUserName'";
        $DoUserQuery = $Connection -> query($UserQuery);

        if($DoUserQuery -> num_rows > 0){

            $Row = $DoUserQuery -> fetch_assoc();

            $DatabasePass =  $Row["Password"];


            if($DatabasePass === $CapturedPassword){

                $AccountName = $Row["AccountName"];
                $UserName = $Row["UserName"];
                $ProfilePhoto = $Row["ProfilePhoto"];
                $StoreID = $Row["StoreID"];
                $Role = $Row["Role"];
                $Status = $Row["Status"];

                $StoreQuery = "SELECT StoreName, StoreAddress, PhoneNumber, Logo, Status FROM Stores WHERE StoreID = '$StoreID'";
                $DoStoreQuery = $Connection -> query($StoreQuery);

                if($DoStoreQuery -> num_rows > 0){

                    $StoreRow = $DoStoreQuery -> fetch_assoc();

                    $StoreName = $StoreRow["StoreName"];
                    $StoreAddress = $StoreRow["StoreAddress"];
                    $PhoneNumber = $StoreRow["PhoneNumber"];
                    $StoreLogo = $StoreRow["Logo"];
                    $StoreStatus = $StoreRow["Status"];


                    $Return = [

                        "Access" => "true",
                        
                        "UserInfo" => [
        
                            "AccountName" => $AccountName,
                            "UserName" => $UserName,
                            "ProfilePhoto" => $ProfilePhoto,
                            "StoreID" => $StoreID,
                            "Role" => $Role,
                            "Status" => $Status
        
                        ],

                        "StoreInfo" => [

                            "StoreName" => $StoreName,
                            "StoreAddress" => $StoreAddress,
                            "PhoneNumber" => $PhoneNumber,
                            "StoreLogo" => $StoreLogo,
                            "StoreStatus" => $StoreStatus

                        ],
        
        
        
                    ];     


                }else{

                    $Return = ["Access" => "false", "ErrorCode" => "4042"];

                }


            }else{

                $Return = ["Access" => "false", "ErrorCode" => "4031"];


            }

        }else{

            $Return = ["Access" => "false", "ErrorCode" => "4041"];

        }

        header("Content-Type: application/json");

        echo json_encode($Return);

    $Connection -> close();

    ?>