REM �ܽ�_������_�����ű�.bat

REM Install DNVM
@powershell -NoProfile -ExecutionPolicy unrestricted -Command "&{$Branch='dev';$wc=New-Object System.Net.WebClient;$wc.Proxy=[System.Net.WebRequest]::DefaultWebProxy;$wc.Proxy.Credentials=[System.Net.CredentialCache]::DefaultNetworkCredentials;Invoke-Expression ($wc.DownloadString('https://raw.githubusercontent.com/aspnet/Home/dev/dnvminstall.ps1'))}"

REM �г���ʹ��.NET�汾
dnvm install 1.0.0-rc1-update1
dnvm list
dnvm use 1.0.0-rc1-update1

REM ���¿�����
cd cydc/src/cydc
dnu restore

REM ǿ�ƹرյ�ǰ�������е�dnx.exe��ͨ����������IISӦ�ó���ص������ʶ��
taskkill /f /fi "imagename eq dnx.exe" /fi "username eq cydc"

REM ��������Ŀ¼��o�ļ���
dnu publish -o C:\state\web\cydc-demo

REM �г�o�ļ��е�����
cd C:\state\web\cydc-demo
ls