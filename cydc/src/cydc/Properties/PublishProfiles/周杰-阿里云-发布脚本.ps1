# �ܽ�_������_�����ű�.bat

# Install DNVM
&{
	$Branch='dev';
	$wc=New-Object System.Net.WebClient;
	$wc.Proxy=[System.Net.WebRequest]::DefaultWebProxy;
	$wc.Proxy.Credentials=[System.Net.CredentialCache]::DefaultNetworkCredentials;
	Invoke-Expression ($wc.DownloadString('https://raw.githubusercontent.com/aspnet/Home/dev/dnvminstall.ps1'))
}

# �г���ʹ��.NET�汾
dnvm install 1.0.0-rc1-update1 -arch x64
dnvm list
dnvm use 1.0.0-rc1-update1 -arch x64

# ���¿�����
cd cydc/src/cydc
dnu restore

# ǿ�ƹرյ�ǰ�������е�dnx.exe��ͨ����������IISӦ�ó���ص������ʶ��
taskkill /f /fi "imagename eq dnx.exe" /fi "username eq cydc"

# ��������Ŀ¼��o�ļ���
dnu publish --runtime active -o C:\state\web\cydc-demo

# �г�o�ļ��е�����
cd C:\state\web\cydc-demo
ls