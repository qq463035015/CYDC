#
# 周杰_阿里云_发布脚本.ps1
#

# 如果没安装dnvm，就安装dnvm
&{
	$Branch='dev';
	$wc=New-Object System.Net.WebClient;
	$wc.Proxy=[System.Net.WebRequest]::DefaultWebProxy;
	$wc.Proxy.Credentials=[System.Net.CredentialCache]::DefaultNetworkCredentials;
	Invoke-Expression ($wc.DownloadString('https://raw.githubusercontent.com/aspnet/Home/dev/dnvminstall.ps1'))
}

# 列出并使用.NET版本
dnvm install 1.0.0-rc1-update1
dnvm list
dnvm use 1.0.0-rc1-update1

# 更新库程序包
ls
dnu restore

# 发布至根目录的o文件夹
cd cydc/src/cydc
dnu publish -o ../../../o

# 列出o文件夹的内容
cd ../../../o
ls

# 强制关闭当前正在运行的dnx.exe，通过进程名、IIS应用程序池的身份来识别
taskkill /f /fi "imagename eq dnx.exe" /fi "username eq cydc"

# 部署项目
&"C:\Program Files (x86)\IIS\Microsoft Web Deploy V3\msdeploy.exe" -verb:sync -source:contentPath="." -dest:contentPath="C:\state\web\cydc-demo"