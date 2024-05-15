After Modify the volume you need these two command to increase the size

sudo growpart /dev/xvda 1
sudo resize2fs /dev/xvda1
