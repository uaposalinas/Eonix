const FormControl = document.querySelector('.FormControl');
const PageOne = document.querySelector('.PageOne');
const AccountSummaryToLog = document.querySelector('.AccountSummaryToLog');


const ProfilePhoto = document.querySelector('.ProfilePhoto');
const AccountName = document.querySelector('.AccountName');
const UserName = document.querySelector('.UserName');
const StoreLogo = document.querySelector('.StoreLogo');
const StoreName = document.querySelector('.StoreName');
const StoreID = document.querySelector('.StoreID');

FormControl.addEventListener('submit', GetDataToAuth);

function GetDataToAuth(Auth){

    Auth.preventDefault();

    const CapturedUserName = document.querySelector('.CapturedUserName').value;
    const CapturedPassword = document.querySelector('.CapturedPassword').value;


    fetch('../Controllers/com.login.controller.php', {

        method: "POST",
        headers: {

            "Content-Type": "Application/x-www-form-urlencoded",

        },
        body: `CapturedUserName=${encodeURIComponent(CapturedUserName)}&CapturedPassword=${encodeURIComponent(CapturedPassword)}`,

    })
    .then(response => response.json())
    .then(Data => {

       if(Data.access == "true"){

        WriteLoginData(Data)

       }else if(Data.access == "false"){

        const ErrorCode = Data.ErrorCode;

        alert(ErrorCode)

       }

    })
    .catch(error => {

        console.warn("Ocurrió un error al procesar la solicitud ErrDescripter: "+error)

    })

}


function WriteLoginData(AccountObject){

    PageOne.classList.add('HidePage');
    AccountSummaryToLog.classList.add('ShowPageD');

    ProfilePhoto.style.backgroundImage = `url(${AccountObject.UserInfo.ProfilePhoto})`;
    AccountName.innerHTML = AccountObject.UserInfo.AccountName;
    UserName.innerHTML = AccountObject.UserInfo.UserName;

    StoreLogo.style.backgroundImage = `url(${AccountObject.StoreInfo.StoreLogo})`;
    StoreName.innerHTML = AccountObject.StoreInfo.StoreName;
    StoreID.innerHTML = RestructureStoreID(AccountObject.UserInfo.StoreID);

}

function RestructureStoreID(StoreID){

    const ID = StoreID;
    const Region = ID.substr(0,4);
    const Date = ID.substr(4,8);
    const PublicKey = ID.substr(12, 16);

    const IDKey = `${Region}-${Date}-${PublicKey}`;

    return IDKey;

}
