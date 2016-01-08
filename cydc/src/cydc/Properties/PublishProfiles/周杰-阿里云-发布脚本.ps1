#
# 周杰_阿里云_发布脚本.ps1
#

# 列出并使用.NET版本
dnvm install 1.0.0-rc1-update1
dnvm list
dnvm use 1.0.0-rc1-update1

# 更新库程序包
cd cydc/src/cydc
dnu restore

# 发布至根目录的o文件夹
dnu publish -o C:\state\web\cydc-demo

# 列出o文件夹的内容
cd C:\state\web\cydc-demo
ls

# 强制关闭当前正在运行的dnx.exe，通过进程名、IIS应用程序池的身份来识别
taskkill /f /fi "imagename eq dnx.exe" /fi "username eq cydc"