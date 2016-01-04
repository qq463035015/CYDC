#
# 周杰_阿里云_发布脚本.ps1
#

# 列出并使用.NET版本
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

# 
# 最后一步，不知道怎么写。