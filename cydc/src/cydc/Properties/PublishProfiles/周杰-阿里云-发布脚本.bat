REM �ܽ�_������_�����ű�.bat

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