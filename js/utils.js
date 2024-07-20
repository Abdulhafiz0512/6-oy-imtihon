function checkToken(){
    const hasToken = localStorage.getItem("token")
    return Boolean(hasToken)

}

function redirect(path){
   window.location=path
}

function checkAndRedirect(path1,path2){
   const hasToken=checkToken()
   if(hasToken){
    redirect(path1)
   }
   else{
    redirect(path2)
   }
}

function saveToken(token){
    localStorage.setItem("token",token)

} 

export {checkAndRedirect, redirect, checkToken, saveToken}