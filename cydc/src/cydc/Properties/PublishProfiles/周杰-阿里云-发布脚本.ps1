# �ܽ�_������_�����ű�.bat

# Install DNVM
#&{
#	$Branch='dev';
#	$wc=New-Object System.Net.WebClient;
#	$wc.Proxy=[System.Net.WebRequest]::DefaultWebProxy;
#	$wc.Proxy.Credentials=[System.Net.CredentialCache]::DefaultNetworkCredentials;
#	Invoke-Expression ($wc.DownloadString('https://raw.githubusercontent.com/aspnet/Home/dev/dnvminstall.ps1'))
#}

# ��ʾϵͳPath
$env:Path += ";C:\Users\Administrator\.dnx\runtimes\dnx-coreclr-win-x64.1.0.0-rc1-update1\bin";
$env:Path += ";C:\Users\Administrator\.dnx\bin";
$env:Path += ";C:\Windows\System32\inetsrv";
($env:Path).Replace(';', "`n")

# �г���ʹ��.NET�汾
# dnvm install 1.0.0-rc1-update1 -arch x64
# dnvm list
# dnvm use 1.0.0-rc1-update1 -arch x64

# ���¿�����
cd cydc/src/cydc
dnu restore

# �ر�IISӦ�ó����
&"appcmd" stop apppool /apppool.name:cydc

# ��������Ŀ¼��o�ļ���
dnu publish --runtime active -o C:\state\web\cydc-demo

# ���´�Ӧ�ó����
&"appcmd" start apppool /apppool.name:cydc

# �г�o�ļ��е�����
cd C:\state\web\cydc-demo
ls