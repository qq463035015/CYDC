REM �ܽ�_������_�����ű�.bat

REM �г���ʹ��.NET�汾
SET PATH=%PATH%;C:\Users\Administrator\.dnx\runtimes\dnx-clr-win-x64.1.0.0-rc1-update1\bin
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
dir