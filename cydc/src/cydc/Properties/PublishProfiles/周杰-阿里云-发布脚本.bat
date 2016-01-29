REM 周杰_阿里云_发布脚本.bat

REM Install DNVM
@powershell -NoProfile -ExecutionPolicy unrestricted -Command "&{$Branch='dev';$wc=New-Object System.Net.WebClient;$wc.Proxy=[System.Net.WebRequest]::DefaultWebProxy;$wc.Proxy.Credentials=[System.Net.CredentialCache]::DefaultNetworkCredentials;Invoke-Expression ($wc.DownloadString('https://raw.githubusercontent.com/aspnet/Home/dev/dnvminstall.ps1'))}"

REM 列出并使用.NET版本
dnvm install 1.0.0-rc1-update1 -arch x64
dnvm list
dnvm use 1.0.0-rc1-update1 -arch x64
path

REM 更新库程序包
cd cydc/src/cydc
dnu restore

REM 关闭IIS应用程序池
"C:\Windows\System32\inetsrv\appcmd.exe" stop apppool /apppool.name:cydc

REM 发布至根目录的o文件夹
dnu publish --runtime active -o C:\state\web\cydc-demo

REM 重新打开应用程序池
"C:\Windows\System32\inetsrv\appcmd.exe" start apppool /apppool.name:cydc

REM 列出o文件夹的内容
cd C:\state\web\cydc-demo
tree