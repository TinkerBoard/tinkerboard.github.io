# Tinker V

# 1. Build image

1. Build environment:   

   | Linux Host PC | Used as build/debug environment, 100GB free space on HDD is necessary |
   |--- | --- | 
   | **OS** | **Ubuntu 18.04 LTS or 20.04 LTS, 64 bit OS must be used** |

2. Download the source code:

   ````
   $ repo init -u https://github.com/TinkerBoard/renesas-manifest.git -b linux5.10-rzfive
   $ repo sync
   ````

3. Install and set up Docker enviornment   
   ````
   $ sudo apt-get update
   $ sudo apt-get install apt-transport-https ca-certificates curl gnupg-agent softwareproperties--common
   $ curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -
   $ sudo apt-key fingerprint 0EBFCD88
   $ sudo add-apt-repository "deb [arch=amd64] 
   https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable"
   $ sudo apt-get update
   $ sudo apt-get install docker-ce docker-ce-cli containerd.io
   $ sudo docker run hello-world
   ````
Reference: https://docs.docker.com/engine/install/ubuntu/

4. Manage Docker as a non-root user
   ````
   $ sudo groupadd docker
   $ sudo usermod -aG docker $USER
   $ newgrp docker
   $ docker run hello-world
   ````

5. Before starting the build, run the commands below on the Linux Host PC to install packages used for building the BSP.

   ````
   $ sudo apt-get update
   $ sudo apt-get install -y gawk wget git-core diffstat unzip texinfo gcc-multilib \
   build-essential chrpath socat cpio python python3 python3-pip python3-pexpect \
   xz-utils debianutils iputils-ping libsdl1.2-dev xterm p7zip-full sudo \
   libyaml-dev libssl-dev
   ````
6. Go to the directory where you have downloaded the code base and execute the script.
This will take a while to install the necessary packages on the host and build the Docker image.
   
   `$ ./docker_builder/docker-builder-run.sh`

7. Run the commands below to start a build.   
`$ ./build.sh`

8. After the build is successfully completed, it will show a similar output, and the command prompt will return.
![圖片1](https://github.com/TinkerBoard/TinkerBoard/assets/97945168/37dbe793-a7ee-41d3-8d4a-78098e846e1f)

9. The image generated will be located in the _build/tmp/deploy/images_ directory.   
**Image files for Tinker V**

   | Item | File Name |
   |--- | --- | 
   | Linux Kernel | Image-rzfive-tinker-v.bin |
   | Device tree file | Image-r9a07g043f01-tinker-v.dtb |
   | root file system | core-image-bsp-rzfive-tinker-v.tar.bz2 |
   | Bootloader | spl-rzfive-tinker-v.srec, fit-rzfive-tinker-v.srec |
   | Flash Writer | Flash_Writer_SCIF_TINKER_V.mot |   

&nbsp;

# 2. Flash image
## 2.1 Flash bootloader

1. Booting Flash Writer   
   1. Please set the SW1 dipswitches to ‘on-on-on-on’.  

      | SW1 Dip Switch | Status |
      |--- | --- | 
      | SW1-1 | ON |
      | SW1-2 | ON |
      | SW1-3 | ON |
      | SW1-4 | ON |

      ![圖片11](https://github.com/TinkerBoard/TinkerBoard/assets/97945168/43d70fc6-c881-4091-bb1e-b8144523dd9d)

   2. Connect the power adapter to the Tinker V, and it’ll print the message of ‘ Load Program to System RAM’ on Tera Term terminal.
      
      ![2-1-2](https://github.com/TinkerBoard/TinkerBoard/assets/97945168/8eebbdbf-b398-41c7-9152-cf86c901ddf4)

   3. Below is an example using [Tera Term](https://ttssh2.osdn.jp/index.html.en). Open a “Send file” dialog by selecting “File” → “Send file” menu.

      ![圖片3](https://github.com/TinkerBoard/TinkerBoard/assets/97945168/e4ac7ffb-eec3-44ed-be66-3a4576b6b578)

      Then, select the image Flash_Writer_SCIF_TINKER_V.mot and click “Open”.

      ![圖片4](https://github.com/TinkerBoard/TinkerBoard/assets/97945168/eb4bca07-46aa-4052-843e-59689e07e076)

      After binary download is completed, Flash Writer starts automatically and shows a message of Flash writer version on the terminal.
      
      ![圖片5](https://github.com/TinkerBoard/TinkerBoard/assets/97945168/929dc030-383d-4133-a872-16afae2654c5)

2. Writing Bootloader   
   1. Use “XLS2” command of Flash Writer to write boot loader binary files. This command is used for receiving binary data from the serial port and writing the data to a specified address of Flash ROM with information such as where the data should be loaded on the address of the main memory.

      ![圖片6](https://github.com/TinkerBoard/TinkerBoard/assets/97945168/c7e03f17-f22d-482d-bba9-74aabf311ea7)

      Send the data of “spl-rzfive-tinker-v.srec” from terminal software after the message “please send !” is shown.

      The terminal will print the message of ‘Qspi Save Information’ once the binary is downloaded successfully.

      ![圖片7](https://github.com/TinkerBoard/TinkerBoard/assets/97945168/39128f3d-b94a-4e67-b9f3-6e11660875dc)

      ````
      SPI Data Clear(H'FF) Check : H'00000000-0000FFFF,Clear OK?(y/n)
      ````
      Please press “y” when a message prompt asks to clear SPI data.

   2. Next, write another loader file by using XLS2 command again.

      ![圖片8](https://github.com/TinkerBoard/TinkerBoard/assets/97945168/6a37c041-56d8-45c2-bc94-688b2ededcf1)

      Send the data of “fit-rzfive-tinker-v.srec” from terminal software after the message “please send !” is shown.

      The terminal will print the message of ‘Qspi Save Information’ once the binary is downloaded successfully.

      ![圖片9](https://github.com/TinkerBoard/TinkerBoard/assets/97945168/9a8e3145-b0d5-4329-bbc7-c5d85ae9e888)

      ````
      SPI Data Clear(H'FF) Check : H'00000000-0000FFFF,Clear OK?(y/n)
      ````
      Please press “y” when a message prompt asks to clear SPI data. 

   3. After writing two loader files, turn off the power and set the SW1 dipswitches to ‘off-off-on-on’.

      | SW1 Dip Switch | Status |
      |--- | --- | 
      | SW1-1 | OFF |
      | SW1-2 | OFF |
      | SW1-3 | ON |
      | SW1-4 | ON |

      ![圖片10](https://github.com/TinkerBoard/TinkerBoard/assets/97945168/023c967a-23d9-4da8-8949-b9a132eb949f)

&nbsp;

## 2.2 Create microSD card image
1. Create a microSD card to boot Linux

   It is necessary to have a microSD card with over 4GB size to create a bootable SD card. You can use a Linux machine as Host PC to expand the kernel and the rootfs, using equipment such as USB card reader. Please format the SD card with the following steps first:

   1. When the microSD card is not connected to Linux Host PC:

      `$ lsblk`

      ![圖片2](https://github.com/TinkerBoard/TinkerBoard/assets/97945168/fd543b6e-c67b-4024-9cb9-0fa7c0e86732)

   2. When the microSD card is connected to Linux Host PC with USB adapter

   3. Check the device name that is associated with the microSD card:
      
      `$ lsblk`

      ![圖片3](https://github.com/TinkerBoard/TinkerBoard/assets/97945168/99b25fe8-eb1a-4916-8d97-9cf68140f00d)

      The message above shows the MicroSD card associated with the /dev/sdd. Please be careful not to use the other device names in the following steps.

   4. Change the partition table   
      
      microSD card needs two partitions as listed below:    

      | Type/Number | Size | File system | Contents |
      |--- | --- | --- | --- |
      | Primary#1 | 500MB (minimum 128MB) | FAT32 | Linux Kernel, Device Tree |
      | Primary#2 | All remaining | Ext4 | root filesystem |

      According to microSD block device, set the partition table using the `fdisk` command:    
      
      In the example below, the microSD block device is /dev/sdd   

      ![圖片4](https://github.com/TinkerBoard/TinkerBoard/assets/97945168/bec0b3e5-cf01-4139-88f1-4cba46ce35ac)   

      Then, check the partition table with the commands `partprobe` and `fdisk -l /dev/sdd` below:
      
      ![圖片5](https://github.com/TinkerBoard/TinkerBoard/assets/97945168/6d1b0318-c0a8-4e73-88a9-d7f457852221)

   5. Format partitions with command `mkfs`.(with device format, in this case it’s mkfs.vfat and mkfs ext4) 

      ![圖片6](https://github.com/TinkerBoard/TinkerBoard/assets/97945168/d7e29931-3baa-4417-8b5a-5e83285eb871)

   6. Write kernel and device tree

      ````
      $ mkdir tmp
      $ sudo mount /dev/sdd1 tmp
      $ sudo cp Image-rzfive-tinker-v.bin tmp/
      $ sudo cp Image-r9a07g043f01-tinker-v.dtb tmp/
      $ sudo umount /dev/sdd1
      ````

   7. Write root filesystem

      ````
      $ sudo mount /dev/sdd2 tmp
      $ sudo tar xf core-image-bsp-rzfive-tinker-v.tar.bz2 -C tmp/
      $ sudo umount /dev/sdd2
      $ rm -rf tmp
      ````

2. Setting U-boot boot from microSD card

   Insert the micro SD card to Tinker V, and then plug the power supply. Press any key on the keyboard to stop autoboot from the serial console. If U-Boot is stopped, it displays a command line console.
   
   ![圖片7](https://github.com/TinkerBoard/TinkerBoard/assets/97945168/7fae709c-7119-476f-9c53-b370b0e47b4b)

   Please set these values and save them to the Flash ROM.

   ````
   => env default -a
   => saveenv
   => setenv bootargs 'root=/dev/mmcblk1p2 rootwait'
   => setenv bootcmd 'mmc dev 1;fatload mmc 1:1 0x48080000 Image-rzfive-tinker-v.bin;fatload mmc 1:1 0x48000000 Image-r9a07g043f01-tinker-v.dtb;booti 0x48080000 - 0x48000000'
   => saveenv
   ````
   ![圖片8](https://github.com/TinkerBoard/TinkerBoard/assets/97945168/fbec53e7-f9e7-49fd-a77b-592bb48b7c77)

&nbsp;

## 2.3 Flash image to eMMC
1. Create a microSD card to boot linux for eMMC boot.

   Please refer to chapter **2.2. Create microSD card image** for creating microSD image.

2. After creating the microSD card image, copy a kernel image, a device tree file and rootfs to the second partition of the microSD card.

   e.g. microSD block device is /dev/sdd

   ````
   $ mkdir tmp
   $ sudo mount /dev/sdd2 tmp
   $ sudo cp Image-rzfive-tinker-v.bin tmp/home/root/
   $ sudo cp Image-r9a07g043f01-tinker-v.dtb tmp/home/root/
   $ sudo cp core-image-bsp-rzfive-tinker-v.tar.bz2 tmp/home/root/
   $ sudo umount /dev/sdd2
   $ rm -rf tmp
   ````

3. Set Boot from microSD.

   Insert microSD card to Tinker V, then power on Tinker V. Press any key to stop autoboot from the serial console. If U-Boot is stopped, the terminal will stop show a command line console.

   ![圖片9](https://github.com/TinkerBoard/TinkerBoard/assets/97945168/4b9a0bbd-5970-4982-8f63-1e0cb4816a8c)

   Please set these values and save them to the Flash ROM.

   ````
   => env default -a
   => saveenv
   => setenv bootargs 'root=/dev/mmcblk1p2 rootwait'
   => setenv bootcmd 'mmc dev 1;fatload mmc 1:1 0x48080000 Image-rzfive-tinker-v.bin;fatload mmc 1:1 0x48000000 Image-r9a07g043f01-tinker-v.dtb;booti 0x48080000 - 0x48000000'
   => saveenv

   ````

4. Power off Tinker V then Power on.

5. After booting Linux, please login as root and create partitions on eMMC.

   ![圖片1](https://github.com/TinkerBoard/TinkerBoard/assets/97945168/df06e383-aaec-4706-895b-c6724841a466)

   ![圖片11](https://github.com/TinkerBoard/TinkerBoard/assets/97945168/a0abd70b-04fc-4a72-81c3-8e7045ad1d3e)

   Format eMMC.

   ````
   $ mkfs.ext4 /dev/mmcblk0p1
   $ mkfs.ext4 /dev/mmcblk0p2
   ````

   Write the kernel, the device tree.

   ````
   $ mount /dev/mmcblk0p1 /mnt/
   $ cp /home/root/Image-rzfive-tinker-v.bin /mnt/
   $ cp /home/root/Image-r9a07g043f01-tinker-v.dtb /mnt/
   $ umount /dev/mmcblk0p1
   ````

   Write the root filesystem.

   ````
   $ mount /dev/mmcblk0p2 /mnt/
   $ tar xf /home/root/core-image-bsp-rzfive-tinker-v.tar.bz2 -C /mnt/
   $ umount /dev/mmcblk0p2
   ````

6. Setting U-boot for eMMC boot.

   Insert microSD card to Tinker V, then power on Tinker V. Press any key to stop autoboot from the serial console. If U-Boot is stopped, the terminal will stop show a command line console.

   ![圖片12](https://github.com/TinkerBoard/TinkerBoard/assets/97945168/e6dbff13-7631-4f63-a985-66f2d3ebc8d6)

   Please set these values and save them to the Flash ROM.

   ````
   => env default -a
   => saveenv
   => setenv bootargs 'root=/dev/mmcblk0p2 rootwait'
   => setenv bootcmd 'mmc dev 1;ext4load mmc 0:1 0x48080000 Image-rzfive-tinker-v.bin;ext4load mmc 0:1 0x48000000 Image-r9a07g043f01-tinker-v.dtb;booti 0x48080000 - 0x48000000'
   => saveenv
   ````

   ![圖片13](https://github.com/TinkerBoard/TinkerBoard/assets/97945168/f50c7088-2bf3-424f-abcd-987a6c8866ab)

&nbsp;