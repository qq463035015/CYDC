REM �ܽ�_������_�����ű�.bat

REM Install DNVM
@powershell -NoProfile -ExecutionPolicy unrestricted -Command "&{$Branch='dev';$wc=New-Object System.Net.WebClient;$wc.Proxy=[System.Net.WebRequest]::DefaultWebProxy;$wc.Proxy.Credentials=[System.Net.CredentialCache]::DefaultNetworkCredentials;Invoke-Expression ($wc.DownloadString('https://raw.githubusercontent.com/aspnet/Home/dev/dnvminstall.ps1'))}"

REM �г���ʹ��.NET�汾
dnvm install 1.0.0-rc1-update1 -arch x64
dnvm list
dnvm use 1.0.0-rc1-update1 -arch x64
path

REM ���¿�����
cd cydc/src/cydc
dnu restore

REM �ر�IISӦ�ó����
"C:\Windows\System32\inetsrv\appcmd.exe" stop apppool /apppool.name:cydc

REM ��������Ŀ¼��o�ļ���
dnu publish --runtime active -o C:\state\web\cydc-demo

REM ���´�Ӧ�ó����
"C:\Windows\System32\inetsrv\appcmd.exe" start apppool /apppool.name:cydc

REM �г�o�ļ��е�����
cd C:\state\web\cydc-demo
tree