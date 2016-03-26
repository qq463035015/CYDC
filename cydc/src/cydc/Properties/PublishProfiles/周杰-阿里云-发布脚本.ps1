# 周杰_阿里云_发布脚本.bat

# Install DNVM
#&{
#	$Branch='dev';
#	$wc=New-Object System.Net.WebClient;
#	$wc.Proxy=[System.Net.WebRequest]::DefaultWebProxy;
#	$wc.Proxy.Credentials=[System.Net.CredentialCache]::DefaultNetworkCredentials;
#	Invoke-Expression ($wc.DownloadString('https://raw.githubusercontent.com/aspnet/Home/dev/dnvminstall.ps1'))
#}

# 显示系统Path
$env:Path += ";C:\Users\Administrator\.dnx\runtimes\dnx-coreclr-win-x64.1.0.0-rc1-update1\bin";
$env:Path += ";C:\Users\Administrator\.dnx\bin";
$env:Path += ";C:\Windows\System32\inetsrv";
($env:Path).Replace(';', "`n")

# 列出并使用.NET版本
# dnvm install 1.0.0-rc1-update1 -arch x64
# dnvm list
# dnvm use 1.0.0-rc1-update1 -arch x64

# 更新库程序包
cd cydc/src/cydc
dnu restore

# 关闭IIS应用程序池
&"appcmd" stop apppool /apppool.name:cydc

# 发布至根目录的o文件夹
dnu publish --runtime active -o C:\state\web\cydc-demo

# 重新打开应用程序池
&"appcmd" start apppool /apppool.name:cydc

# 列出o文件夹的内容
cd C:\state\web\cydc-demo
ls