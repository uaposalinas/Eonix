const FormControl = document.querySelector('.FormControl');
const PageOne = document.querySelector('.PageOne');
const AccountSummaryToLog = document.querySelector('.AccountSummaryToLog');


const ProfilePhoto = document.querySelector('.ProfilePhoto');
const AccountName = document.querySelector('.AccountName');
const UserName = document.querySelector('.UserName');
const StoreLogo = document.querySelector('.StoreLogo');
const StoreName = document.querySelector('.StoreName');
const StoreID = document.querySelector('.StoreID');
const ContainerButton = document.querySelector('.ContainerButton');

const AccountInformation = document.querySelector('.AccountInformation');
const StoreInformation = document.querySelector('.StoreInformation');
const InitServiceScreen = document.querySelector('.InitServiceScreen');

const NotificationBody = document.querySelector('.NotificationBody');
const NotificationKey = document.querySelector('.NotificationBody .Content');

FormControl.addEventListener('submit', GetDataToAuth);

function GetDataToAuth(Auth){

    Auth.preventDefault();

    const CapturedUserName = document.querySelector('.CapturedUserName').value;
    const CapturedPassword = document.querySelector('.CapturedPassword').value;

    if(CapturedUserName.trim() === '' && CapturedPassword.trim() === ''){

        alert('valores vacios')

    }else{

        fetch('../Controllers/com.login.controller.php', {

            method: "POST",
            headers: {
    
                "Content-Type": "Application/x-www-form-urlencoded",
    
            },
            body: `CapturedUserName=${encodeURIComponent(CapturedUserName)}&CapturedPassword=${encodeURIComponent(CapturedPassword)}`,
    
        })
        .then(response => response.json())
        .then(Data => {

        sessionStorage.setItem('PublicSessionKey', JSON.stringify(Data))
    
           if(Data.access == "true"){
    
            WriteLoginData(Data)
    
           }else if(Data.access == "false"){
    
            const ErrorCode = Data.ErrorCode;
    
           if(ErrorCode == "4041"){

                ShowNotification("No se encontró una cuenta asociada a este usuario")

           }else if(ErrorCode == "4031"){

            ShowNotification("La contraseña especificada no es correcta, inténtalo de nuevo.");

           }
    
           }
    
        })
        .catch(error => {
    
            console.warn("Ocurrió un error al procesar la solicitud ErrDescripter: "+error);
            ShowNotification("Ocurrió un error al procesar la solicitud ErrDescripter: "+error)

    
        })

    }



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


let FormPosition = 0;

ContainerButton.addEventListener('click', GetCurrentPosition);

function GetCurrentPosition(){

    if(FormPosition == 0){

        AccountInformation.classList.add('HidePage');
        StoreInformation.classList.add('ShowPageD');
        ContainerButton.classList.add("BounceIt");
        ContainerButton.innerHTML = "Iniciar Sesión";
        FormPosition++

    }else if(FormPosition == 1){

        StoreInformation.classList.add('HidePage');
        InitServiceScreen.style.display = "flex";
        ContainerButton.style.display = "none";
        
        FormPosition = 0;

        BootService();

    }

}




function BootService(){

    setTimeout(() => {

        document.querySelector('.BootAudio').play();

        const GetLoginInformation = JSON.parse(sessionStorage.getItem("PublicSessionKey"));

        document.querySelector('.ApplicationTitle').innerHTML = `${GetLoginInformation.StoreInfo.StoreName} • Eonix`

        document.querySelector('.limiter').classList.add('HideLogin');

        setTimeout(() => {
            
            document.querySelector('.limiter').classList.add('HidePage');


        }, 300);

    },3000)

}


function ShowNotification(Message){

    NotificationKey.innerHTML = Message;
    NotificationBody.style.display = "flex";

    setTimeout(() => {
        
        NotificationBody.classList.add('HideNotification');

        setTimeout(() => {
            
            NotificationBody.style.display = "none";
            NotificationBody.classList.remove('HideNotification');

        }, 300);

    }, 5000);

}