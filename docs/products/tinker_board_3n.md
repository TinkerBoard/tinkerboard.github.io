# Tinker Board 3N
# 1. Linux Development

## 1.1 Build image

### 1.1.1 Kernel 5.10  
  
   1. **Install Docker environment**   
      
      * Uninstall old versions         
      
      ````
      $ sudo apt-get remove docker docker-engine docker.io containerd runc
      ````

      * Install Docker Engine – Community
      
      ````
      $ sudo apt-get update
      $ sudo apt-get install apt-transport-https ca-certificates curl gnupg-agent software-properties-common
      $ curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -
      $ sudo apt-key fingerprint 0EBFCD88
      $ sudo add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable"
      $ sudo apt-get update
      $ sudo apt-get install docker-ce docker-ce-cli containerd.io
      $ sudo docker run hello-world
      ````
      
       **Reference: https://docs.docker.com/engine/install/ubuntu/**

      * Manage Docker as a non-root user
      
      ````
      $ sudo groupadd docker
      $ sudo usermod -aG docker $USER
      $ newgrp docker
      $ docker run hello-world
      ````
       
       **Reference: https://docs.docker.com/engine/install/linux-postinstall/**

   &nbsp;

   2. **Download the source code:**

   ````
   $ repo init -u https://github.com/TinkerBoard/rockchip-linux-manifest.git -b linux5.10-rk356x
   ````

   &nbsp;

   3. **Code compiling**  

      * Go to the directory where you have downloaded the code base and execute the script. This will take a while to install the necessary packages on the host and build the Docker image.
      ````
      $ ./docker_builder/docker-builder-run.sh
      ````
      Once the above is done, you are in the shell of the newly started Docker container as the following. You can start to issue commands as usual.
     
      ````
      Options to run docker: --privileged --rm -it --volume /mnt/2T-disk/linux5.10-rk356x_0620:/source
      your_usernmae@292c696527f6:/source$
      ````

      * You can issue the following command to build all the images for **Debian**. All the images will be saved in the directory rockdev.
      
      ````
      $ ./build.sh rockchip_rk3568_tinker_board_3n_debain_defconfig
      $ ./build.sh
      ````    
      It will generate a file which named sdcard_full.img and located at [source tree]/rockdev/sdcard_full.img

      &nbsp;

      * You can issue the following command to build all the images for **Yocto**. All the images will be saved in the directory rockdev.

      ````
      $ ./build.sh rockchip_rk3568_tinker_board_3n_yocto_defconfig
      $ ./build.sh
      ```` 
      It will generate a file which named sdcard_full.img and located at [source tree]/rockdev/sdcard_full.img

   &nbsp;
   
   4. **Compiling u-boot/Kernel/Debian separately**  

      * u-boot
      ````
      $ ./build.sh uboot
      ````
      It will generate a file which named uboot.img and located at [source tree]/u-boot/uboot.img

      * Kernel
      ````
      $ ./build.sh kernel
      ````
      It will generate a file which named boot.img and located at [source tree]/kernel/boot.img

      * Debian
      ````
      $ ./build.sh debian
      ````
      It will generate a file which named linaro-rootfs.img and located at [source tree]/debian/linaro-rootfs.img

      &nbsp;

      * Yocto
      ````
      $ ./build.sh yocto
      ````
      It will generate a file which named linaro-rootfs.img and located at [source tree]/ yocto/build/latest/rootfs.img

&nbsp;

## 1.2 Flash image

### 1.2.1 Booting from external Micro SD card

* **Requirement:**   
• 1 x Micro SD card with at least 8GB capacity   
• 1 x 12~19V, DC 5.5/2.5 power supply   
• 1 x Monitor with HDMI™ cable or USB Type-C® (DP) cable   
• 1 x Keyboard and Mouse set

* **Setting Up:**  

1. Insert the micro SD card into a Windows® PC.

2. Download the TinkerOS image from the Tinker Board website (https://tinker-board.asus.com/download.html) and burn it into the micro SD card using a third-party ISO software, such as Etcher.

3. Insert the bootable micro SD card into your Tinker Board 3N, then connect the power supply, keyboard, mouse, and monitor to boot up.


&nbsp;

### 1.2.2 Booting from onboard eMMC

* **Requirement:**   
• 1 x USB Type-C® cable with data transfer function   
• 1 x 12~19V, DC 5.5/2.5 power supply   
• 1 x Monitor with HDMI™ cable or USB Type-C® (DP) cable   
• 1 x Keyboard and Mouse set   

* **Setting Up:**  

   **1. Flash emmc by emmc UMS mode**
   
   1. Keep MASK2 jumper and MASK1 **(Left)** -> connect type c usb to pc -> Power on the device
   
   ![3Nflash](https://github.com/TinkerBoard/TinkerBoard/assets/97945168/9dd6aabe-1a21-40f2-93ab-7cab37675965)

   2. Connect the Tinker Board 3N to a PC using a USB Type-C® cable.
   
   3. Connect the power adapter to the Tinker Board 3N.

   4. Download the TinkerOS image from the Tinker Board website (https://tinker-board.asus.com/download.html) and burn it into the Tinker Board 3N using a third-party ISO software, such as Etcher.

   5. After the TinkerOS image is successfully burned, disconnect all cables from the Tinker Board 3N.

   6. Connect the power supply, keyboard, mouse, and monitor to your Tinker Board 3N to boot up.



   **2. Flash emmc by SPINOR flash UMS mode**

   1. **Remove** MASK2 jumper and MASK1 **(Left)** -> connect type c usb to pc -> Power on the device

   2. Connect the Tinker Board 3N to a PC using a USB Type-C® cable.

   3. Connect the power adapter to the Tinker Board 3N.

   4. Download the TinkerOS image from the Tinker Board website (https://tinker-board.asus.com/download.html) and burn it into the Tinker Board 3N using a third-party ISO software, such as Etcher.

   5. After the TinkerOS image is successfully burned, disconnect all cables from the Tinker Board 3N.

   6. Insert the MASK2 jumper and MASK1 **(Left)**
   
   ![3Nflash](https://github.com/TinkerBoard/TinkerBoard/assets/97945168/c837b8f3-d2a3-40e0-ba3d-99c274cb40d3)

   7. Connect the power supply, keyboard, mouse, and monitor to your Tinker Board 3N to boot up.


   **3. Flash emmc by SD card UMS mode**

   1. Insert the micro SD card into a Windows® PC.

   2. Download the TinkerOS image from the Tinker Board website (https://tinker-board.asus.com/download.html) and burn it into the micro SD card using a third-party ISO software, such as Etcher.

   3. Insert the SD card to Tinker Board 3 -> Keep MASK2 jumper and MASK1 **(Left)**.

    ![3Nflash](https://github.com/TinkerBoard/TinkerBoard/assets/97945168/276d532c-5f99-4381-9b1c-c5820a976754)

   4. Connect the Tinker Board 3N to a PC using a USB Type-C® cable.
 
   5. Connect the power adapter to the Tinker Board 3N.

   6. Download the TinkerOS image from the Tinker Board website (https://tinker-board.asus.com/download.html) and burn it into the Tinker Board 3N using a third-party ISO software, such as Etcher.

   7. After the TinkerOS image is successfully burned, disconnect all cables and remove the sd card from the Tinker Board 3N

   8. Connect the power supply, keyboard, mouse, and monitor to your Tinker Board 3N to boot up.

&nbsp; 

## 1.3 How to Check Image Version

You can issue the following command to get the version of the image.

````
$ cat /etc/version
````
&nbsp;

## 1.4 How to Get the PPID

**Note:** PPID (unique ID for Tinker board)

1. Copy the tinker_3N_read_sn.zip file to device.

   [tinker_3N_read_sn.zip](https://github.com/TinkerBoard/TinkerBoard/files/12159516/tinker_3N_read_sn.zip)

2. Unzip tinker_3N_read_sn.zip.

3. You can issue the following command to get the serial number.

````
$ sudo bash tinker_3N_read_sn.sh
````

&nbsp;

## 1.5 Resize image/partition

**Purpose:**

 * This section demonstrates how create a minimized image from an existing storage.
The image can be restored back to the storage (either eMMC or SD card) of the next board.  

**Note:** This instruction is for Tinker Board/Tinker Board S/Tinker Board R2.0/Tinker Board S R2.0/Tinker Board 2/Tinker Board 2S/Tinker Board 3N

**Environment:**

 * Board: Tinker Board S

 * OS: Tinker_Board-Debian-Stretch-V2.1.11-20200310.img

 * microSD card: With another Debian installed  
   **Note:** It could be flashed an image thru Etcher or Win32DiskImager under Windows environment or dd under Linux.

**Instruction:**

 1. Hardware setting:
Insert microSD card to the Tinker Board S and setting the jumper as Maskrom Mode (It will disable eMMC booting priority and force boot from the microSD card); as shown below:

    ![Tinker_maskrom_mode](https://user-images.githubusercontent.com/89904531/154900689-e52d2583-cae5-400e-9286-42562eff6274.png)

 2. Power on the Tinker Board S and it would boot from microSD card

 3. Install gparted by the following command: (Ensure the Ethernet/WIFI is workable)  
    ````
    $ sudo apt-get install gparted
    ````
 4. There’re 3 methods to run Gparted app:  
  
    a. Execute it with following command on Terminal:  
    ````
    $ sudo gparted-pkexec
    ````
    b. Execute it from “Run” app and key-in “**Gparted- pkexec**” on the popped-up window:

     ![Tinker_gparted-pkexec](https://user-images.githubusercontent.com/89904531/154901692-ccde08a6-742d-4ec2-ae4d-aec91c4fcfc1.png)

    c. Execute it from Gparted icon as shown below:

    ![Tinker_gparted](https://user-images.githubusercontent.com/89904531/154902250-018064b3-3b2b-4665-aa34-f40fd053107e.png)

 5. It would pop-up a window to request the permission as below: (the password is **linaro**)

    ![Tinker_auth_linaro](https://user-images.githubusercontent.com/89904531/154902431-c90942a9-d27a-4155-a59a-3ed073ef441e.png)

 6. Following steps to resize eMMC thru GParted:  

    a. Select a partition from mmcblk0 to mmcblk1 (the live partition cannot be resized)

    ![Tinker_eMMCtogparted_a](https://user-images.githubusercontent.com/89904531/154902616-3a8cff0c-f56d-46e3-96a5-b4f906786a96.png)

    b. Click the green arrow  
    
    ![image](https://github.com/TinkerBoard/TinkerBoard/assets/97945168/6a097722-76d3-43d4-ae9b-81099c216866)

    c. Pop-up a resize window. You can set the size from either one of the ovals. If you set the new size as the minimum size, it might not work. It needs some space to process resizing.  

    ![image](https://github.com/TinkerBoard/TinkerBoard/assets/97945168/7510bf80-ebd5-4581-bf6e-c09403c4c4b9)

    d. After setting resize, it would be like below shown, then click “Resize/Move” to confirm the size. After setting the size, click “Resize/Move” (This step just confirms the size, resizing's not been executed yet).  

    ![image](https://github.com/TinkerBoard/TinkerBoard/assets/97945168/2b743d2d-8b5f-43c0-88e1-964023c54b2e)

    e. Click the green arrow again

    ![Tinker_eMMCtogparted_e](https://user-images.githubusercontent.com/89904531/154904756-35ebcc63-f345-40c4-bbfe-f782b7a20b14.png)

    f. A warning window will pop up; click “Apply” to execute resize

    g. Click “Close” to finish the procedure once resizing is done

    ![Tinker_eMMCtogparted_g](https://user-images.githubusercontent.com/89904531/154905075-812dc992-24b6-43db-8cd2-f92efe766d02.png)

    The result shows that the the eMMC capacity was resized from 14.61GB to 4.88GB

    ![Tinker_eMMCtogparted_h](https://user-images.githubusercontent.com/89904531/154905357-c80b407d-5d9a-4513-8155-3a2ecb98b62d.png)

 7. Run the following command before creating image:

    ````
    $ sudo systemctl enable resize-helper
    ````
    **NOTE:** This step provides recovering whole capacity when restoring the created image back to the storage.

 8. Now, this eMMC is ready to be created as an image by **dd**.

 9. Then the created image could be restored back to the whole storage of the next board, without resizing the capacity again.

&nbsp;

## 1.6 How to change LOGO

* **For Debian OS**

* **Method 1:**

1. Convert the logo file to 24 bit BMP file. It is recommended to use Window Paint for conversion.

    **Note:** After converting to 24 bit BMP file, the BMP file MUST less than 700K bytes.

2. Rename the BMP file to logo.bmp

3. Copy logo.bmp and rename it to logo_kernel.bmp

4. Replace logo.bmp and logo_kernel.bmp with logo.bmp and logo_kernel.bmp under sourcecode/kernel.

5. Build kernel image and flash kernel image.


* **Method 2:**

1. Convert the logo file to 24 bit BMP file. It is recommended to use Window Paint for conversion

    **Note:** After converting to 24 bit BMP file, the BMP file MUST less than 700K bytes.

2. Rename the BMP file to logo.bmp

3. Copy logo.bmp to sourcecode/kernel/scripts/

4. Execute the following command on the ubuntu server:

    `./bmpconvert logo.bmp`

5. You will see the following message after the command is successful
  
   <img width="415" alt="圖片1" src="https://github.com/TinkerBoard/TinkerBoard/assets/97945168/36878f13-714a-42e1-be39-7ace0e9c43cd"/>

6. Powering on device, and open terminal. 

    Enter `reboot-bootloader` in terminal to enter fastboot mode

7. Execute command to flash logo.bmp into splash partition

    `fastboot flash splash logo.bmp`

8. Reboot device

&nbsp;

## 1.7 How to create Swapfile

In this example, we will create and activate 1G of swap. To create a bigger swap, replace 1G with the size of the desired swap space.
The steps below show how to add swap space on Debian 10.

1. First create a file which will be used for swap:

   ````
   $ sudo fallocate -l 1G /swapfile
   ````
2. Only the root user should be able to read and write to the swap file. Issue the command below to set the correct permissions :

   ````
   $ sudo chmod 600 /swapfile
   ````
3. Use the mkswap tool to set up a Linux swap area on the file:
   
   ````
   $ sudo mkswap /swapfile
   ````
4. Activate the swap file:

   ````
   $ sudo swapon /swapfile
   ````

   to make the change permanent open the /etc/fstab file:
 
   ````
   $ sudo vim /etc/fstab
   ````
   and paste the following line:

   ````
   /swapfile swap swap defaults 0 0
   ````
5. Verify whether the swap is active using either the swapon or free command as shown below:

   ````
   $ sudo swapon --show
   ````

   ````
   Output
   NAME      TYPE  SIZE   USED PRIO
   /swapfile file 1024M 507.4M   -1
   ````

   ````
   $ sudo free -h
   ````

   ````
   Output
                  total        used        free      shared  buff/cache   available
   Mem:           488M        158M         83M        2.3M        246M        217M
   Swap:          1.0G        506M        517M

   ````

**Reference link: https://linuxize.com/post/how-to-add-swap-space-on-debian-10/**

&nbsp;

## 1.8 Power management tool

1. Open a terminal in full screen mode and run the following command:
 
   ````
   $ tinker-power-management
   ````

2. Adjust CPU or GPU Governor:

   a. Press 'C' or 'G' to open the menu. 'C' is for CPU Governor and 'G' is for GPU Governor. 
      There are 4 options to select: "auto", "manual", "powersave", and "performance".

   b. Use the left or right arrow key to select. Option selected is shown in bold.
      Press the space bar to confirm, or press 'q' to cancel. 


3.  Adjust CPU frequency:

      a. Follow Step 2 above to adjust CPU or GPU Governor to "manual"

      b. Take CPU as example:

      ````
      When CPU Governor = manual, options for CPU frequency adjustment will be highlighted.
      There are 2 options: "min.freq for A55" and "max.freq for A55".
      Use the arrow keys to select. Option selected is shown in bold.
      Press the space bar to confirm and open the selected CPU frequency menu.
      # Follow step 2. to adjust CPU or GPU Governor.
      ````
      c. Once the frequency menu is shown

      ````
      Use the left or right arrow key to select. Option selected is shown in bold.
      Press the space bar to confirm, or press 'Q' to cancel. 
      # Frequency menu needs to be confirmed or closed before adjusting CPU or GPU Governor again.
      ````
4. Press "Ctrl" + "C" to exit Tinker Power Management anytime. 

&nbsp;

## 1.9 How to use power manager APP

* **CPU(A55)** Governor setting is in /sys/devices/system/cpu/cpufreq/policy0/scaling_governor, use 'echo' to change.

   EX: echo ondemand > /sys/devices/system/cpu/cpufreq/policy0/scaling_governor

   CPU(A55) minimum frequency: /sys/devices/system/cpu/cpu0/cpufreq/scaling_min_freq

   CPU(A55) maximum frequency: /sys/devices/system/cpu/cpu0/cpufreq/scaling_max_freq

**Note: Check available parameter for CPU(A55) in /sys/devices/system/cpu/cpu0/cpufreq before setting.**

* **GPU(G52)** Governor setting: /sys/class/devfreq/fde60000.gpu/governor

   GPU minimum frequency: /sys/class/devfreq/fde60000.gpu/min_freq

   GPU maximum frequency: /sys/class/devfreq/fde60000.gpu/max_freq

**Note: Check available parameter for GPU(G52) in /sys/class/devfreq/fde60000.gpu before setting.**

&nbsp;

## 1.10 How to Install OpenCV

1. Install the required packages

   ````
   $ sudo apt-get update
   $ sudo apt-get -y upgrade
   $ sudo apt-get -y install aptitude
   $ sudo apt-get aptitude libavcodec-dev
   $ sudo apt-get -y install build-essential cmake git pkg-config libgtk-3-dev \
       libavcodec-dev libavformat-dev libswscale-dev libv4l-dev \
       libxvidcore-dev libx264-dev libjpeg-dev libpng-dev libtiff-dev \
       gfortran openexr libatlas-base-dev python3-dev python3-numpy \
       libtbb2 libtbb-dev libdc1394-22-dev
   ````

2. Clone the OpenCV’s and OpenCV contrib repositories with the following commands:

   ````
   $ mkdir ~/opencv_build && cd ~/opencv_build
   $ git clone https://github.com/opencv/opencv.git
   $ git clone https://github.com/opencv/opencv_contrib.git
   ````

3. Set up the build

   ````
   $ cd ~/opencv_build/opencv
   $ mkdir build && cd build
   $ cmake -D CMAKE_BUILD_TYPE=RELEASE \
       -D CMAKE_INSTALL_PREFIX=/usr/local \
       -D INSTALL_C_EXAMPLES=ON \
       -D INSTALL_PYTHON_EXAMPLES=ON \
       -D OPENCV_GENERATE_PKGCONFIG=ON \
       -D OPENCV_EXTRA_MODULES_PATH=~/opencv_build/opencv_contrib/modules \
       -D BUILD_EXAMPLES=ON ..
   ````

4. Build & install OpenCV

   ````
   $ make -j4
   $ sudo make install
   ````

**Reference link: https://linuxize.com/post/how-to-install-opencv-on-debian-10/**

&nbsp;

## 1.11 How to control the reserved LED

**Use the terminal to enter commands**

* Bright on the reserved led   
   echo 1 > /sys/devices/platform/gpio-leds/leds/rsv-led/brightness

* Bright off the reserved led   
   echo 0 > /sys/devices/platform/gpio-leds/leds/rsv-led/brightness

&nbsp;

## 1.12 How to set WIFI as a Hotspot

1. Install dnsmasq & hostapd package

   ````
   sudo apt install dnsmasq hostapd 
   ````

2. Unzip SoftAP.zip 

   [SoftAP_debian10_20220127.zip](https://github.com/TinkerBoard/TinkerBoard/files/12417090/SoftAP_debian10_20220127.zip)

3. Open terminal and go to SoftAP folder, then

   ````
   chmod 755 Enable_SoftAP.sh Disable_SoftAP.sh 
   ````

4. Enable SoftAP mode：

   ````
   ./Enable_SoftAP.sh 
   default SSID = TinkerSoftAP 
   default Password = 87654321 
   ````

5. Disable SoftAP mode：

   ````
    ./Disable_SoftAP.sh 
   ````

6. You can modify /etc/hostapd/hostapd.conf for your own softap settings. 

   Ex.    
   ssid=TinkerSoftAP    
   wpa_passphrase=87654321   
   channel=6    

   ````
   # For MAC address access-list 
   # 0 = accept unless in deny list, deny_mac_file is used to specify deny list. 
   # 1 = deny unless in accept list, accept_mac_file is used to specify accept list. 
   macaddr_acl=1
   ````

   ````
   # Accept/deny lists are read from separate files (containing list of # MAC addresses, one per line). 
   accept_mac_file=/etc/hostapd/hostapd.accept 
   deny_mac_file=/etc/hostapd/hostapd.deny 
   ````

   After modify hostapd.conf, you need to disable / re-enable softap again.

&nbsp;

## 1.13 How to run the application at startup

Applications can be automatically started in a couple of ways:

1. Via GUI

   a. Click Applications Menu > Settings > Settings Manager and then choose the Session and Startup option

   ![圖片1](https://github.com/TinkerBoard/TinkerBoard/assets/97945168/49935eff-b54b-4161-b06c-34a82af13a4f)

   b. Click “Apllication Autostart”

   ![圖片2](https://github.com/TinkerBoard/TinkerBoard/assets/97945168/9176bd02-013b-4a42-8212-010e62ae7e79)

   c. Add application name by the following item

   ![圖片3](https://github.com/TinkerBoard/TinkerBoard/assets/97945168/e34e818f-5184-4e01-90d5-4b9209129d25)

   d. Click “OK” button to get the following item.

   ![圖片4](https://github.com/TinkerBoard/TinkerBoard/assets/97945168/2b40c2c9-7242-4f23-89f8-198ab3a2fe6d)

2. Via config file

   a. Edit autostart file

   ````
   $ vim ~/.config/autostart/termianl-xfce4.desktop
   ````

   b. Add application contents

      For example: Execute the xfce4-terminal autostart

   ![圖片5](https://github.com/TinkerBoard/TinkerBoard/assets/97945168/99b48f32-c88b-4d08-9dc5-8a59b5caf2b1)


**Reference link: https://wiki.archlinux.org/title/xfce**

&nbsp;

## 1.14 How to set a script from startup

* **For Debian OS**

**Sample setting for starting up the applications when into Debian**  
This is a sample for the RTC clock, to set the applications will automatically run when into the Debian system.  

1. Create rtc_clock_init.sh or copy rtc_clock_init.sh file into `/usr/local/bin/` folder   
  ![image](https://user-images.githubusercontent.com/51226852/164404490-b7dfffa4-41a1-4b46-84bc-87802a56d17b.png)  
  Add above green parts in rtc_clock_init.sh file  

2. Setting the permission  
  ![image](https://user-images.githubusercontent.com/51226852/164405524-7475207c-b1f3-4a7f-aa74-f66078aaa4b4.png)

3. Create rtc-ds3231.service or copy rtc-ds3231.service into `/lib/systemd/system/` folder  
   ![image](https://user-images.githubusercontent.com/51226852/164405577-faff6072-68e2-46fa-9517-f92335f6f3bb.png)  
  Add above green parts in rtc_clock_init.sh file.  

4. Execute below command to enable RTC  
  ![image](https://user-images.githubusercontent.com/51226852/164406103-a85aaf7c-cce7-4711-833d-20ee2a134e17.png)  

5. Reboot the Debian system  

&nbsp;

## 1.15 How to collect log

* **For Debian OS**

1. Open Terminal and text the following command:

   ````
   $ sudo tar -cvf /home/linaro/Desktop/$(date +'%Y%m%d_%H%M')_log.tar /var/log
   ````

2. Generate the file name like the following example

   ````
   $ ls ~/Desktop/

   20230908_0313_log.tar
   ````

3. Uncompress the tar

   ````
   tar -xvf 20230908_0313_log.tar
   ````

&nbsp;

# 2. Android Development

## 2.1 Build image

**1. Establish a build environment**   
   Please refer to [Install Docker Engine](https://docs.docker.com/engine/install/) to install Docker engine.

**2. Download the Android source**   
   Please refer to [Installing Repo](https://source.android.com/setup/develop#installing-repo) to install the Repo Launcher and [Downloading the Source](https://source.android.com/setup/build/downloading) to understand how to download the Android source.

**3. Initiale a Repo client**

   Run repo init to get the latest version of Repo with its most recent bug fixes. You must specify a URL for the manifest, which specifies where the various repositories included in the Android source are placed within your working directory. For different projects, you must also specify the manifest branch or revision with option "-b REVISION".

   ````
  repo init -u https://github.com/TinkerBoard-Android/rockchip-android-manifest.git -b REVISION
   ````

   Optionally, you can also specify the initial manifest file with the option "-m NAME.xml" for the specific release for that project.
   ````
   repo init -u https://github.com/TinkerBoard-Android/rockchip-android-manifest.git -b REVISION -m NAME.xml
   ````

   * **Android 12**
   ````
   repo init -u https://github.com/TinkerBoard-Android/rockchip-android-manifest.git -b android12-rockchip
   ````

**4. Download the Android source tree**

   To download the Android source tree to your working directory from the repositories as specified in the default manifest, run:
   ````
   repo sync
   ````

**5. Build Android**

   Go to to the directory where you have downloaded the Android source and execute the script as the following. This will take a while to install the necessary packages on the host, build the Docker image, and start the container:
   
   ````
   ./docker_builder/docker-builder-run.sh
   ````
   Once it is done. You are in the shell of this newly started Docker container and you are ready to build Android.

   * **Android 12**
   ````
   source build/envsetup.sh
   lunch Tinker_Board_3N-userdebug
   ./build.sh -UCKAu
   ````

   The image which is able to be flashed to the board via UMS mode will be stored as the following in the directory where you have downloaded the source.

   ````
   ./rockdev/ Image-Tinker_Board_3N/ Tinker_Board_3N-raw.img
   ````

&nbsp; 

## 2.2 Flash image

### 2.2.1 Booting from external Micro SD card

* **Requirement:**   
• 1 x Micro SD card with at least 8GB capacity   
• 1 x 12~19V, DC 5.5/2.5 power supply   
• 1 x Monitor with HDMI™ cable or USB Type-C® (DP) cable   
• 1 x Keyboard and Mouse set

* **Setting Up:**  

1. Insert the micro SD card into a Windows® PC.

2. Download the TinkerOS image from the Tinker Board website (https://tinker-board.asus.com/download.html) and burn it into the micro SD card using a third-party ISO software, such as Etcher.

3. Insert the bootable micro SD card into your Tinker Board 3N, then connect the power supply, keyboard, mouse, and monitor to boot up.


&nbsp;

### 2.2.2 Booting from onboard eMMC

* **Requirement:**   
• 1 x USB Type-C® cable with data transfer function   
• 1 x 12~19V, DC 5.5/2.5 power supply   
• 1 x Monitor with HDMI™ cable or USB Type-C® (DP) cable   
• 1 x Keyboard and Mouse set   

* **Setting Up:**  

   **1. Flash emmc by emmc UMS mode**
   
   1. Keep MASK2 jumper and MASK1 **(Left)** -> connect type c usb to pc -> Power on the device

   ![3Nflash](https://github.com/TinkerBoard/TinkerBoard/assets/97945168/6694089d-26c7-4c3f-8179-4a0fc4848df2)
   
   2. Connect the Tinker Board 3N to a PC using a USB Type-C® cable.
   
   3. Connect the power adapter to the Tinker Board 3N.

   4. Download the TinkerOS image from the Tinker Board website (https://tinker-board.asus.com/download.html) and burn it into the Tinker Board 3N using a third-party ISO software, such as Etcher.

   5. After the TinkerOS image is successfully burned, disconnect all cables from the Tinker Board 3N.

   6. Connect the power supply, keyboard, mouse, and monitor to your Tinker Board 3N to boot up.


   **2. Flash emmc by SPINOR flash UMS mode**

   1. **Remove** MASK2 jumper and MASK1 **(Left)** -> connect type c usb to pc -> Power on the device
   
   2. Connect the Tinker Board 3N to a PC using a USB Type-C® cable.

   3. Connect the power adapter to the Tinker Board 3N.

   4. Download the TinkerOS image from the Tinker Board website (https://tinker-board.asus.com/download.html) and burn it into the Tinker Board 3N using a third-party ISO software, such as Etcher.

   5. After the TinkerOS image is successfully burned, disconnect all cables from the Tinker Board 3N.

   6. Insert the MASK2 jumper and MASK1 **(Left)**
   
   ![3Nflash](https://github.com/TinkerBoard/TinkerBoard/assets/97945168/40637eac-54a2-439c-a3c7-12d5096703ff)

   7. Connect the power supply, keyboard, mouse, and monitor to your Tinker Board 3N to boot up.


   **3. Flash emmc by SD card UMS mode**

   1. Insert the micro SD card into a Windows® PC.

   2. Download the TinkerOS image from the Tinker Board website (https://tinker-board.asus.com/download.html) and burn it into the micro SD card using a third-party ISO software, such as Etcher.

   3. Insert the SD card to Tinker Board 3 -> Keep MASK2 jumper and MASK1 **(Left)**.

   ![3Nflash](https://github.com/TinkerBoard/TinkerBoard/assets/97945168/1e5e2420-e795-454b-88ec-820ee04e6797)

   4. Connect the Tinker Board 3N to a PC using a USB Type-C® cable.
 
   5. Connect the power adapter to the Tinker Board 3N.

   6. Download the TinkerOS image from the Tinker Board website (https://tinker-board.asus.com/download.html) and burn it into the Tinker Board 3N using a third-party ISO software, such as Etcher.

   7. After the TinkerOS image is successfully burned, disconnect all cables and remove the sd card from the Tinker Board 3N

   8. Connect the power supply, keyboard, mouse, and monitor to your Tinker Board 3N to boot up.

&nbsp; 

## 2.3 Get log file through adb

* For Logcat:

   ````
   $ adb logcat > logcat.txt
   ````
   Logcat will save as logcat.txt

* For Kernel:

   ````
   $ adb shell dmesg > kernel.txt
   ````
   Logcat will save as kernel.txt

**Reference:**   

https://developer.android.com/studio/command-line/adb  
   
https://developer.android.com/studio/command-line/logcat

&nbsp;

## 2.4 How to use ASUS debugger

**This file describes behaviors with the new version - AsusdeDugger v3.11**

1. Start AsusDebugger

   You **CAN’T** find AsusDebugger icon in Launcher, now. Please get into it from **"Setting"** Application

   1. In Launcher, You can find Setting APK. Click to start Setting.
   
   2. Click “About tablet” on the bottom of the list of the preference

   <img width="539" alt="1" src="https://github.com/TinkerBoard/TinkerBoard/assets/97945168/f43f2b87-6bb3-4186-95a9-67d8d1958f5a"/>

   3. Click “Android Version” preference.

   <img width="556" alt="2" src="https://github.com/TinkerBoard/TinkerBoard/assets/97945168/803a5edb-4cc9-4de0-8839-6bf96fb6e200"/>

   4. Continuously click “Build number“ preference 10 times and will start open the AsusDebugger. 

   <img width="494" alt="3" src="https://github.com/TinkerBoard/TinkerBoard/assets/97945168/1494e854-e9ae-4e7c-bf9b-bb8a3b9109f1"/>

   **NOTE:** There is a quick way. Please see Section 6

2. Set the configuration of logs

   1. The path of capturing logs is shown at **"Log file location"**, it is default set to **"/sdcard/Logs"**

   2. **"Logcat/kernel/tcpdump rotate number"** is used to decide the number of log rotation. It affects logcat, kernel, and tcpdump. 

   3. **"Logcat/kernel file size"** is used to decide the size of log files. It affects logcat, and kernel. 

   ![4](https://github.com/TinkerBoard/TinkerBoard/assets/97945168/6e61ac01-f3c1-45b9-a7e5-d4deb99a80e2)

3. Start to catch logs

   1. In Debugger, the logcat logs and kernel logs have been separated, if you need **"Enable capture logcat"** and **"Enable capture kernel"**, make sure those toggles are checked.

   ![5](https://github.com/TinkerBoard/TinkerBoard/assets/97945168/3960657b-cb5f-4ddd-b670-3e05113d6cda)

   2. To enable tcpdump log for debugging internet related issue, make sure **"Enable tcpdump"** toggle is checked.

   ![6](https://github.com/TinkerBoard/TinkerBoard/assets/97945168/43598bc3-324f-41d7-b884-2a7faaa46002)

4. Collecting Logs

   1. When a bug is found, please press **"COLLECT LOGS"** button in AsusDebugger. You can describe your findings with short log or simply leave it blank.

   ![7](https://github.com/TinkerBoard/TinkerBoard/assets/97945168/d12173b0-2bd1-431b-af92-ace2846ac471)

   2. AsusDebugger runs dumpstate automatically when you request collecting logs and it will take some time (1~2 minutes) to generate current system state and information.

   ![8](https://github.com/TinkerBoard/TinkerBoard/assets/97945168/3400865f-f6eb-4451-8f67-0cbd3defd402)

   Moreover, AsusDebugger collect logs you captured. Once collecting procedure is done, a dialog will be prompted to inform you of the path of the collected logs as follow. 

   ![9](https://github.com/TinkerBoard/TinkerBoard/assets/97945168/1d8564b7-6b97-4f23-a07b-8b0a4ff0ff49)

5. Output Debugger files

   1. After connecting device to computer, drag the status bar and press **"USB connected"**. Then select **"File transfers"**

   ![10](https://github.com/TinkerBoard/TinkerBoard/assets/97945168/d364fd1a-02c8-4862-a251-e08267c2b229)

   ![11](https://github.com/TinkerBoard/TinkerBoard/assets/97945168/5ad825a0-a71d-4833-8eb7-91232cc88214)

   2. Log files in **/sdcard/logs** are logs for current capture session.

   3. All collected logs go to **/sdcard/Logs_collected/** directory

6. Quickly enter AsusDebugger

   In **Section 3 - "Start to catch logs"**, if any log toggles are enabled, you can see a notification shown the Logging mode is Debugger. You can quickly get into AsusDebugger activity by clicking.

   ![12](https://github.com/TinkerBoard/TinkerBoard/assets/97945168/265cd28e-6d6c-4bd1-84d3-197c53f0d70f)

7. Other function

   1. **Detect reboot**

      If you want to detect whether the device is rebooted, make sure **"Detect reboot"** toggle is checked.

      ![12](https://github.com/TinkerBoard/TinkerBoard/assets/97945168/fda0ee68-4921-4aed-8e1e-a30d59286bfd)

      If detect the device is rebooted, there is a full-screen floating window shown and display timestamp. Remove window by clicking it.

      ![13](https://github.com/TinkerBoard/TinkerBoard/assets/97945168/94f78782-987b-41bd-95a7-1f495dd4637d)

   2. **Display usage** 

      If you want to know the device’s usage, includes the information of CPU, Memory, and Battery, make sure **"Display CPU/GPU/MEM usage and battery level"** toggle is checked. A floating window displays information at right-bottom corner. 

      ![14](https://github.com/TinkerBoard/TinkerBoard/assets/97945168/cb9bf67b-1c82-4391-a612-c0996f7c69a8)

      ![15](https://github.com/TinkerBoard/TinkerBoard/assets/97945168/05dcde03-0609-4892-919c-4a044ebdbf22)

   3. **Ping test**

      If you want to test the network connection, can use **"Run PING test command"** to run ping test

      ![16](https://github.com/TinkerBoard/TinkerBoard/assets/97945168/af56654b-2c41-4fc2-9496-6e452b107f56)

      ![17](https://github.com/TinkerBoard/TinkerBoard/assets/97945168/487272b0-205e-435b-9752-949a81433212)

&nbsp;

## 2.5 Changing the boot logo

### 2.5.1 Changing the boot logo

1. Download and Install Tinker Config App

    Download the apk file [Tinker Config App](https://github.com/TinkerBoard/TinkerBoard/files/8110293/TinkerConfig_1.0.2_20220210.apk.zip) and use the following command to install app
    ```
    $ adb install TinkerConfig_1.0.2_20220210.apk
    ```
2. Launch Tinker Config App

    ![Tinker Board 2_ChangeBootLogo_1](https://user-images.githubusercontent.com/89904531/154982475-6bb758fc-57af-4eb1-a409-d296f376ab5f.png)

3. Press “Boot Logo” button.

    ![Tinker Board 2_ChangeBootLogo_2](https://user-images.githubusercontent.com/89904531/154982497-1f22acd3-f013-4b44-92d6-76179bf8dae9.png)

4. Press “Change Image” button.

    ![Tinker Board 2_ChangeBootLogo_3](https://user-images.githubusercontent.com/89904531/154982505-2f8a8abc-d01c-48ee-8752-c110386917b1.png)

5. Select the image you want to set, and press “Apply” button.

    ![Tinker Board 2_ChangeBootLogo_4](https://user-images.githubusercontent.com/89904531/154982511-9e8227f8-8fbf-4e8a-bcc3-d3d2e816b20f.png)

6. Reboot the device, and you can get your own boot logo.  

&nbsp;

### 2.5.2 Changing the boot animation

1. Requirements   
   a. Type-C USB cable

   b. bootanimation.zip file

   * You can create a bootanimation.zip by yourself or download it from the Internet.

2. Connect Tinker Board 3N to PC with Type-C USB cable.

3. Push bootanimation.zip to Tinker Board 3N

   ```
   $ adb root
   $ adb remount
   $ adb push bootanimation.zip /system/media/bootanimation.zip
   $ adb reboot
   ```

4. After reboot, you can get your own Android boot animation.

&nbsp;

## 2.6 Tinker config application

**Introduction**

Tinker Config is an Android-based application that offers flexibility and an easy way to configure I/O interfaces on 14pin header, LVDS/EDP connectors as well as Linux kernel Devicetree overlays while using Tinker Board 3N. 

![12](https://github.com/TinkerBoard/TinkerBoard/assets/97945168/7835d49e-0810-4c3b-8729-4ae00f3512ef)

**Prerequisites**

Tinker Board 3N with Android OS v.1.0.0 (or later) installed. For image installation, please visit Tinker Board’s [wiki page](https://github.com/TinkerBoard/TinkerBoard/wiki/User-Guide#flash-image) on Github.

Optional: hardware accessories such as LED modules, monitors … etc. 

Tinker Config is built-in and can be found in the app list.

![13](https://github.com/TinkerBoard/TinkerBoard/assets/97945168/ea310ffc-9202-4d13-8255-ef0deaa656f9)

**Features**

* ***Interfaces:** allows users to configure functions for 14 pin GPIO header. The complete GPIO config table can be found on [Github wiki](https://github.com/TinkerBoard/TinkerBoard/wiki/User-Guide#gpio-config-table-for-tinker-board-2-series). Below are the supported functions:*

   >UART Settings: UART4, UART9

   >I2C Settings: I2C5

   >AUDIO Settings: I2S3_2CH, SPDIF_8CH

   >SPI Settings: SPI3

   >PWM Settings: PWM12, PWM13, PWM14, PWM15

   ![14](https://github.com/TinkerBoard/TinkerBoard/assets/97945168/a86a3cfe-e882-4da1-89c2-84da9d81a08f)

   Reset the all functions to default setting icon:

   ![15](https://github.com/TinkerBoard/TinkerBoard/assets/97945168/6b7ca21c-782e-41ef-85b5-4cffdb2f454c)

   *Note: Changes will not take effect immediately, please reboot the board each time after changes are made.*


* ***Linux Kernel Devicetree Overlays:** For LVDS and EDP panel support to change configuration.*

   Device tree blob (DTB) supported include: edp_G156HAB02, mipi2lvds2_G156BGE-L01, mipi2lvds2_G215HAN01, mipi2lvds2_LM215WF3-SLN1, 
mipi2lvds2_AM1280800P2TZQW, mipi2lvds2_G185XW01, mipi2lvds2_G240HVT01

   ![16](https://github.com/TinkerBoard/TinkerBoard/assets/97945168/bf5a931c-0132-4d80-91f5-feea7e870fe7)

   *Note: Changes will not take effect immediately, please reboot the board each time after changes are made.*

* ***Application Whitelisting:** allows users to prevent running applications being terminated when out of memory (OOM) occurred. Applications ticked in the Whitelist will be allowed running when OOM.*

   ![圖片6](https://github.com/TinkerBoard/TinkerBoard/assets/97945168/c7217541-5c1c-4ad1-bfb2-99b540dd0524)

   *Note: Changes will not take effect immediately, please reboot the board each time after changes are made.*

* ***Power Management:** users can scale the CPU and GPU frequency in order to either save power or enhance improvement. Below are the supported options of power policies:*

   CPU: 

	Governor: conservative, ondemand, userspace, powersave, interactive, performance, schedutil
	Core Frequency: 408000, 600000, 816000, 1104000, 1416000, 1608000, 1800000,1992000
   
   GPU:

	Governor: rknpu_ondemand, dmc_ondemand, vdec2_ondemand, venc_ondemand, userspace,  powersave, performance, simple_ondemand

   ![圖片7](https://github.com/TinkerBoard/TinkerBoard/assets/97945168/a409acec-2de2-4188-bb82-d08aa0ed7c64)

   ![圖片8](https://github.com/TinkerBoard/TinkerBoard/assets/97945168/2573bd03-4f14-4aad-b826-29c55d34493f)

   *Note: Changes will not take effect immediately, please reboot the board each time after changes are made.*


* ***Boot Logo:** This feature allows user to change the image shown when the board is booting.*

   Select an image (size limit: 233k pixels / 700KB), click “Change image“, and click “Apply”.

   ![22](https://github.com/TinkerBoard/TinkerBoard/assets/97945168/27722fc3-5000-4693-9533-986b7f27eb46)

   ![33](https://github.com/TinkerBoard/TinkerBoard/assets/97945168/c0d313aa-ce50-4f95-8d96-30101dc881ae)

   Reboot to make the change take effect.

   ![34](https://github.com/TinkerBoard/TinkerBoard/assets/97945168/cf16eb2a-8b3b-492b-99ae-100d693b8628)

   The boot image change stays even when the board is reset to factory settings. Please wipe and re-flash the OS image to change boot logo back to default settings.

&nbsp;

# 3. Hardware Guide

## 3.1 How to set a serial port console log

**Hardware:**

* **Tinker Board 3N**

   ![圖片1](https://github.com/TinkerBoard/TinkerBoard/assets/97945168/82ac60bb-38fb-4f3b-bc7e-34adcf0a816a)

* **Usb serial cable**

   ![圖片2](https://github.com/TinkerBoard/TinkerBoard/assets/97945168/fbf939a2-aff4-4f0d-8dbd-c4d2091bb0ae)

1. Using a cable (pitch 2.0mm (female) to pitch 2.54mm (male)) and a USB serial cable to connect Tinker Board 3N and PC.

2. On PC, open Putty and select Serial. 

3. The Serial line can be checked from Windows >Device Manager >Ports (COM & LPT). The speed is 1500000 baud.  

   ![圖片3](https://github.com/TinkerBoard/TinkerBoard/assets/97945168/354d70f9-dbec-4144-9386-443961e2aae0)

4. Click the Open button on Putty and power the board, and some boot logs will be printed on Putty from PC:

   ![圖片4](https://github.com/TinkerBoard/TinkerBoard/assets/97945168/059ccea0-29ce-472a-9f91-5b07d80f435f)

&nbsp;

## 3.2 How to use CAN bus

**The Linux CAN is depending on the SocketCAN:** 

https://en.wikipedia.org/wiki/SocketCAN

&nbsp;

1. Run the CAN testing script (CAN loopback mode) and reboot device after running script: 

   Please use the bellowing command with **root privilege by “sudo su” command in Debian and “adb root” in Android**

   **NOTE:** The testing files: can_loopback.sh, can_tx.sh, can_rx.sh

   [CAN_test_scripts.zip](https://github.com/TinkerBoard/TinkerBoard/files/12416188/CAN_test_scripts.zip)

   ```
   ~/code/CAN/CAN_test$ sudo ./can_loopback.sh
   [sudo] password for asus:
   Start can tx/rx loop with iface can0 !
   candump: no process found
   20:21:51.967: can0 send 001#0011223344556677
     can0  001   [8]  00 11 22 33 44 55 66 77
     can0  001   [8]  00 11 22 33 44 55 66 77
   20:21:51.975: can0 receive can packet
   ….
   ~/code/CAN/CAN_test$ sudo reboot  
   ```

2. Use two devices A (Sender) and B (Receiver)
   
   In B device (Receiver): refer can_rx.sh

   ```
   # ip link set can0 down
   # ip link set can0 up type can bitrate 125000
   # candump can0
   ```

   In A device (Sender): refer can_tx.sh

   ```
   # ip link set can0 down
   # ip link set can0 up type can bitrate 125000
   # cansend can0 001#0011223344556677
   ```

3. Then we can see the dump message in B device

   ```
   can0  001   [8]  00 11 22 33 44 55 66 77
   can0  001   [8]  00 11 22 33 44 55 66 77
   ```

&nbsp;

## 3.3 How to use COM

**stty loopback: https://gist.github.com/midnight-wonderer/781facfe2fb6ee108a0e**

**NOTE:**

[switch_com3_protocol.zip](https://github.com/TinkerBoard/TinkerBoard/files/12416368/switch_com3_protocol.zip)

[test.zip](https://github.com/TinkerBoard/TinkerBoard/files/12416508/test.zip)

1. Test for COM1

   Set baudrate to 115200

   ```
   stty -F /dev/ttyS0 115200
   ```

   Transfer data to pc putty (String which input from device will display on putty.)

   ```
   echo "test" > /dev/ttyS0
   ```

   Receive pc putty data (String which input from putty will display on device.)

   ```
   cat /dev/ttyS0
   ```

2. Test for COM2

   Set baudrate to 115200

   ```
   stty -F /dev/ttyS8 115200
   ```

   Transfer data to pc putty (String which input from device will display on putty.)

   ```
   echo "test" > /dev/ttyS8
   ```

   Receive pc putty data (String which input from putty will display on device.)

   ```
   cat /dev/ttyS8
   ```

3. Test for COM3

   Push switch_uart3_protocol.sh into device by adb tool or copy the switch_uart3_protocol.sh to Desktop by usb flash

   ```
   #Debian
   adb push switch_com3_protocol.sh /home/linaro/Desktop

   #Android
   adb push switch_com3_protocol.sh sdcard
   ```

   Change mode of switch_uart3_protocol.sh before using it

   ```
   #Debian
   chmod a+x /home/linaro/Desktop/switch_com3_protocol.sh

   #Android
   chmod a+x sdcard/switch_com3_protocol.sh
   ```

   Switch protocol to rs232/rs422/rs485

   ```
   #Debian
   ./home/linaro/Desktop/switch_com3_protocol.sh 232
   ./home/linaro/Desktop/switch_com3_protocol.sh 422
   ./home/linaro/Desktop/switch_com3_protocol.sh 485

   #Android
   su
   sh sdcard/switch_com3_protocol.sh 232
   sh sdcard/switch_com3_protocol.sh 422
   sh sdcard/switch_com3_protocol.sh 485
   ```

   Set baudrate to 115200

   ```
   stty -F /dev/ttyS3 115200
   ```

   Transfer data to pc putty (String which input from device will display on putty.)

   ```
   echo "test" > /dev/ttyS3
   ```

   Receive pc putty data (String which input from putty will display on device.)

   ```
   cat /dev/ttyS3
   ```

4. Test with com_port_test.sh

   
   ```
   chmod 777 com_port_test_tinker3.sh
   chmod 777 com_port_test   
   chmod 777 switch_com3_protocol.sh
   ```
   
   ```
   com_port_test.sh [COM1] [COM2] [PROTOCOL] [FLOW_CONTROL]
   com_port_test.sh [COM1] [FLOW_CONTROL]

   example: #COM1<=>COM2 without flow control
            sudo ./com_port_test_tinker3.sh /dev/ttyS0 /dev/ttyS8 0 0
            #COM1<=>COM2 with flow control
            sudo ./com_port_test_tinker3.sh /dev/ttyS0 /dev/ttyS8 0 1
            #COM1<=>COM3(232) with flow control
            sudo ./com_port_test_tinker3.sh /dev/ttyS0 /dev/ttyS3 232 1
            #COM1 self test with flow control
            sudo ./com_port_test_tinker3.sh /dev/ttyS0 1
   ```      

* COM3 RS232 to usb converter

   ![com3_232](https://github.com/TinkerBoard/TinkerBoard/assets/97945168/fb32fde8-15e9-4471-81ec-0684f5749634)

* COM3 RS422 to RS232 converter

   ![com3_422](https://github.com/TinkerBoard/TinkerBoard/assets/97945168/a3f21e83-f6d2-438b-bfc9-57ac4c92b48f)

* COM3 RS485 to RS232 converter

   ![com3_485](https://github.com/TinkerBoard/TinkerBoard/assets/97945168/fd3795b9-f49c-4e0a-b5b4-c9494ffaf48d)


&nbsp;


## 3.4 How to use GPIO

### 3.4.1 GPIO config table

* Hardware mapping

![MicrosoftTeams-image (38)](https://github.com/TinkerBoard/TinkerBoard/assets/97945168/2d8f3fb9-89ce-41bf-84c2-9f11607ae45f)

* Functions mapping
   
| PIN# | ALT Fun 1 | ALT Fun 0 | PIN | PIN| ALT Fun 0 | ALT Fun 1 | ALT Fun 2 | ALT Fun 3 | ALT Fun 4 | PIN# | 
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| --- | --- | VCC_5V0 | 1 | 2 | VCC_3V3 | --- | --- | --- | --- | --- |
| --- | --- | GND | 3 | 4 | GPIO4_C2_d /sys/class/gpio/gpio146 | I2S3_MCLK_M1 | SPI3_CLK_M1 /dev/spidev3 | PWM14_M1 /sys/class/pwm/pwmchip5 | --- | 146 |
| 105 | UART4_RX_M1 /dev/ttyS4 | GPIO3_B1_d /sys/class/gpio/gpio105 | 5 | 6 | GPIO4_C3_d /sys/class/gpio/gpio147 | I2S3_SCLK_M1 | SPI3_MOSI_M1 /dev/spidev3 | PWM15_IR_M1 /sys/class/pwm/pwmchip6 | --- | 147 |
| 106 | UART4_TX_M1 /dev/ttyS4 | GPIO3_B2_d /sys/class/gpio/gpio106 | 7 | 8 | GPIO4_C4_d /sys/class/gpio/gpio148 | I2S3_LRCK_M1 | SPDIF_TX_M2 | SPI3_CS1 (NOT rk official) /dev/spidev3.1 | --- | 148 |
| 107 | I2C5_SCL_M0 /dev/i2c-5 | GPIO3_B3_d /sys/class/gpio/gpio107 | 9 | 10 | GPIO4_C5_d /sys/class/gpio/gpio149 | I2S3_SDO_M1 | SPI3_MISO_M1 /dev/spidev3 | PWM12_M1 /sys/class/pwm/pwmchip3 | UART9_TX_M1 /dev/ttyS9 | 149 |
| 108 | I2C5_SDA_M0 /dev/i2c-5 | GPIO3_B4_d /sys/class/gpio/gpio108 | 11 | 12 | GPIO4_C6_d /sys/class/gpio/gpio150 | I2S3_SDI_M1 | SPI3_CS0_M1 /dev/spidev3.0 | PWM13_M1 /sys/class/pwm/pwmchip4 | UART9_RX_M1 /dev/ttyS9 | 150 |
| --- | --- | SARADC_VIN6 | 13 | 14 | SARADC_VIN7 | --- | --- | --- | --- | --- |

### 3.4.2 Program with python-periphery

   ```
   python3 -m pip install python-periphery
   ```

* GPIO

   - Input control example

   ```
   from periphery import GPIO

   # Open GPIO /dev/gpiochip0 line 10 with input direction
   gpio_in = GPIO("/dev/gpiochip0", 10, "in")
   # Open GPIO /dev/gpiochip0 line 12 with output direction
   gpio_out = GPIO("/dev/gpiochip0", 12, "out")

   value = gpio_in.read()
   gpio_out.write(not value)

   gpio_in.close()
   gpio_out.close()
   ```

* PWM

   - Enable PWMs function by modify /boot/config.txt. Then, reboot the device.
      - “#intf:pwm12=off” → “intf:pwm12=on”      
      - “#intf:pwm13=off” → “intf:pwm13=on”   
      - “#intf:pwm14=off” → “intf:pwm14=on”   
      - “#intf:pwm15=off” → “intf:pwm15=on”   

   - Example

   ```
   from periphery import PWM

   # Open PWM chip 0, channel 10
   pwm = PWM(0, 10)

   # Set frequency to 1 kHz
   pwm.frequency = 1e3
   # Set duty cycle to 75%
   pwm.duty_cycle = 0.75

   pwm.enable()

   # Change duty cycle to 50%
   pwm.duty_cycle = 0.50

   pwm.close()
   ```

* UART

   -  Enable UARTs function by modify /boot/config.txt. Then, reboot the device.
      - “#intf:uart4=off” → “intf:uart4=on”   
      - “#intf:uart9=off” → “intf:uart9=on”   

   - Example

   ```
   from periphery import Serial

   # Open /dev/ttyUSB0 with baudrate 115200, and defaults of 8N1, no flow control
   serial = Serial("/dev/ttyUSB0", 115200)

   serial.write(b"Hello World!")

   # Read up to 128 bytes with 500ms timeout
   buf = serial.read(128, 0.5)
   print("read {:d} bytes: _{:s}_".format(len(buf), buf))

   serial.close()
   ```

* I2C

   - Enable I2C function by modify /boot/config.txt. Then, reboot the device.   
      - “#intf:i2c5=off” → “intf:i2c5=on”

   - Example

   ```
   from periphery import I2C

   # Open i2c-0 controller
   i2c = I2C("/dev/i2c-0")

   # Read byte at address 0x100 of EEPROM at 0x50
   msgs = [I2C.Message([0x01, 0x00]), I2C.Message([0x00], read=True)]
   i2c.transfer(0x50, msgs)
   print("0x100: 0x{:02x}".format(msgs[1].data[0]))

   i2c.close()
   ```

* SPI

   - Enable SPI function by modify /boot/config.txt. Then, reboot the device.   
      - “#intf:spi3=off” → “intf:spi3=on”
   
   - Example

   ```
   from periphery import SPI

   # Open spidev1.0 with mode 0 and max speed 1MHz
   spi = SPI("/dev/spidev1.0", 0, 1000000)

   data_out = [0xaa, 0xbb, 0xcc, 0xdd]
   data_in = spi.transfer(data_out)

   print("shifted out [0x{:02x}, 0x{:02x}, 0x{:02x}, 0x{:02x}]".format(*data_out))
   print("shifted in  [0x{:02x}, 0x{:02x}, 0x{:02x}, 0x{:02x}]".format(*data_in))

   spi.close()
   ```

* ADC

   - Formula: Vin = Vraw * 1800 / 1023

   - Read RAW: cat /sys/bus/iio/devices/iio\:device0/in_voltage[NUMBER]_raw   
     Ex. cat /sys/bus/iio/devices/iio\:device0/in_voltage6_raw 

&nbsp;

### 3.4.3 MRAA library for Android

* Android Archive file for the IO interface of 14 pins on ASUS Tinker Board 3N

   [mraa-2.2.0.zip](https://github.com/TinkerBoard/TinkerBoard/files/12451412/mraa-2.2.0.zip)

* The apk of Mraa API for Tinker Board 3N

   [Tinker3N_MRAA_Sample.zip](https://github.com/TinkerBoard/TinkerBoard/files/12451420/Tinker3N_MRAA_Sample.zip)

* Class

| class | constructor | class | constructor |
| --- | --- | --- | --- |
| Gpio | Gpio(int pin_index) | Pwm | Pwm (int pin_index) |
| I2c | I2c (int i2c_index) | Uart | Uart(int uart_index) | 
| Spi | Spi (int spi_index) | Aio | Aio(int adc_index) | 


* **Index Class**

-- GPIO

| Tinker Board | Field | Index Value |
|--- | --- | --- |
| Tinker Board | TINKERBOARD_PIN4	 | 4 |
| Tinker Board | TINKERBOARD_PIN5	 | 5 |
| Tinker Board | TINKERBOARD_PIN6	 | 6 |
| Tinker Board | TINKERBOARD_PIN7	 | 7 |
| Tinker Board | TINKERBOARD_PIN8	 | 8 |
| Tinker Board | TINKERBOARD_PIN9	 | 9 |
| Tinker Board | TINKERBOARD_PIN10	 | 10 |
| Tinker Board | TINKERBOARD_PIN11	 | 11 |
| Tinker Board | TINKERBOARD_PIN12	 | 12 |

-- I2C

| TinkerBoard3NI2C | Field | Index Value | The Uart Interface |
|--- | --- | --- | --- |
| TinkerBoard3NI2C | TINKERBOARD_3N_I2C5 | 0 | I2c5 |

-- SPI

| TinkerBoard3NSPI | Field | Index Value | The Uart Interface |
|--- | --- | --- | --- |
| TinkerBoard3NSPI | TINKERBOARD_3N_SPI3 | 0 | Spi3 |

-- Uart

| TinkerBoard3NUART | Field | Index Value | The Uart Interface |
|--- | --- | --- | --- |
| TinkerBoard3NUART | TINKERBOARD_3N_UART4 | 0 | Uart4 |
| TinkerBoard3NUART | TINKERBOARD_3N_UART9 | 1 | Uart9 |

-- ADC

| TinkerBoard3NADC | Field | Index Value | The Uart Interface |
|--- | --- | --- | --- |
| TinkerBoard3NADC | TINKERBOARD_3N_ADC6 | 0 | Adc6 |
| TinkerBoard3NADC | TINKERBOARD_3N_ADC7 | 1 | Adc7 |

* **The mraa API Class for Android**

-- GPIO

| Methods | Parameter| Description | Return |
|--- | --- | --- | --- |
| dir(Dir dir) | Dir | Set input/output | Result |
| readDir() | void | Read input/output dir | Dir |
| read() | void | Set input and read gpio value | 0/1 |
| write(int v) | 0/1 | Set output value | Result |

-- I2C

| Methods | Parameter| Description | Return |
|--- | --- | --- | --- |
| address(short a) | 0x00-0xFF | Set i2c address | Result |
| readByte() | void | Read a byte data form i2c | short |
| writeByte(short b) | Mode | Write a byte data to i2c | Result |
| read(byte[] buf) | byte[] | Read a byte[] data form i2c | read size |
| write(byte[] buf) | byte[] | Write a byte[] data to i2c | Result |
| readReg(short a) | 0x00-0xFF | Read a byte data form i2c addr | short |
| writeReg(short a, short d) | 0x00-0xFF, 0x00-0xFF | Write a byte data to i2c addr | Result |
| readWordReg(short a) | 0x00-0xFF | Read a byte[2] data form i2c addr | int |
| writeWordReg(short a, int d) | 0x00-0xFF, 0x0000-0xFFFF | Write a byte[2] data to i2c addr | Result |
| readBytesReg(short a, byte[] b) | 0x00-0xFF, byte[] | Read a byte[] data form i2c addr | int |

-- PWM

| Methods | Parameter| Description | Return |
|--- | --- | --- | --- |
| period(float s) | 0.0001 - 2.147483 | Set pwm period | Result |
| period_ms(int m) | 1 - 2147 | Set pwm period | Result |
| period_us(int u) | 1 - 2147483 | Set pwm period | Result |
| pulsewidth(float s) | 0.0001 - 2.147483 | Set pwm duty | Result |
| pulsewidth_ms(int m) | 1 - 2147 | Set pwm duty | Result |
| pulsewidth_us(int u) | 1 - 2147483 | Set pwm duty | Result |
| max_period() | void | Get pwm max period | int(us) |
| min_period() | void | Get pwm min period | int(us) |
| read() | void | Get pwm period/duty | 0.0 - 1.0 |
| write(float p) | 0.0 - 1.0 | Set pwm period/duty percentage | Result |
| enable(boolean e) | true/false | dis/enable pwm | Result |

-- SPI

| Methods | Parameter| Description | Return |
|--- | --- | --- | --- |
| defaultConfig() | void | Set mraa default config (mode0,lsb=0,bits=8) | Result |
| mode(Spi_Mode m) | void  | Set spi mode | Result |
| frequency(int f) | int | Set spi frequency max=48000000 | Result |
| lsbmode(boolean l) | true/false | Set spi lsmode | Result |
| bitPerWord(long b) | 8/16 | Set spi bit_pre_word | Result |
| writeByte(short a) | 0x00-0xFF | Write a byte data to spi | int(recv data) |
| writeWord(int a) | 0x0000-0xFFFF | Write a byte[2] data to spi | int(recv data) |
| write(byte[] b) | byte[] | Write a byte[] data to spi | byte[](recv data) |

-- UART

| Methods | Parameter| Description | Return |
|--- | --- | --- | --- |
| defaultConfig() | void | Set mraa default config (9600 8N1, no echo or special character) | Result |
| setBaudRate(long b) | long  | Set uart baudrate max=150000000 | Result |
| setMode(int bytesize, UartParity parity, int stopbits) | int | Set the transfer mode | Result |
| setFlowcontrol(boolean xonxoff, boolean rtscts) | true/false | Set the flowcontrol | Result |
| setTimeout(int read, int write, int interchar) | -1 - int_max | Set the timeout for read and write operations | Result |
| setNonBlocking(boolean b) | true/false | Set the blocking state for write operations | Result |
| sendBreak(int b) | 0 - max_int | Send a break to the device | Result |
| flush() | void | Flush the outbound data | Result |
| dataAvailable() | void | Check to see if data is available on the device for reading, return immediately | boolean |
| dataAvailable(long timeout) | 1 - int_max  | Check to see if data is available on the device for reading and time out | boolean |
| readStr(int length) | 1 - int_max | Read bytes from the device into a String object | String |
| writeStr(String s) | String | rite bytes in String object to a device | int |
| read(byte[] data) | byte[] | Check to see if data is available on the device for reading and time out | int(read size) |
| wrtie(byte[] data) | byte[] | Check to see if data is available on the device for reading and time out | int(write size) |

-- AIO

| Methods | Parameter| Description | Return |
|--- | --- | --- | --- |
| getBit() | int | Gets the bit value mraa is shifting the analog read to | int |
| read() | void  | Read a value from the AIO pin | long |
| readFloat() | void | Read a value from the AIO pin and return it as a normalized float | float |
| setBit(int bits) | int | Set the bit value which mraa will shift the raw reading from the ADC to | Result |

* **Example for 14 pin hardware interface**

-- GPIO

   ```
   import mraa.*;
   
   // Test GPIO 5 hardware interface
   Gpio gpio5 = new Gpio(TinkerBoard.TINKERBOARD_PIN5.swigValue());
   gpio5.dir(Dir.DIR_OUT);
   gpio5.write(1);
   ```

-- I2C

Enable I2C function by modify /dtoverlay/config.txt. Then, reboot the device.   
   - “#intf:i2c5=off” → “intf:i2c5=on”

   ```
   import mraa.*;
   
   // Test I2c5 interface
   I2c i2c = new I2c(TinkerBoard3NI2C.TINKERBOARD_3N_I2C5.swigValue());
   // Test by ADXL345 accelerometer I2c device
   i2c.address((short) 0x53);
   i2c.writeReg((short)0x01, (short) 0x57);
   try {
       Thread.sleep(1000);
   } catch (InterruptedException e) {
       e.printStackTrace();
   }
   i2c.address((short) 0x50);
   Log.d(TAG, "i2c5 read: 0x" + Integer.toHexString(i2c.readReg((short)0x01)));
   ```

-- PWM

Enable PWMs function by modify /dtoverlay/config.txt. Then, reboot the device.

   - “#intf:pwm12=off” → “intf:pwm12=on”
   - “#intf:pwm13=off” → “intf:pwm13=on”
   - “#intf:pwm14=off” → “intf:pwm14=on”
   - “#intf:pwm15=off” → “intf:pwm15=on”

   ```
   import mraa.*;

   //enable the pwm15 signal
   Pwm pwm = new Pwm(TinkerBoard.TINKERBOARD_PIN6.swigValue());
   pwm.period_us(20000);
   pwm.write((float) 0.5);
   pwm.enable(true);

   // release the pwm signal
   pwm.enable(false);
   pwm.unexport();
   ```

-- SPI

Enable SPI function by modify /dtoverlay/config.txt. Then, reboot the device.
   - “#intf:spi3=off” → “intf:spi3=on”

   ```
   import mraa.*;
   
   // Test Spi3 interface
   Spi spi = new Spi(TinkerBoard3NSPI.TINKERBOARD_3N_SPI3.swigValue());
   byte[] recv = spi.write(new byte[]{0x41, 0x61});
   Log.d(TAG, String.format("onCreate: recv[0]=0x%x, recv[1]=0x%x", recv[0], recv[1]));
   ```

-- UART

Enable UARTs function by modify /dtoverlay/config.txt. Then, reboot the device.
   - “#intf:uart4=off” → “intf:uart4=on”
   - “#intf:uart9=off” → “intf:uart9=on”

   ```
   import mraa.*;
   
   // Test Uart4 interface
   Uart uart = new Uart(TinkerBoard3NUART.TINKERBOARD_3N_UART4.swigValue());
   uart.defaultConfig();
   uart.setBaudRate(115200);
   uart.writeStr("ASUS Tinker Board 3N");
   String read = uart.readStr(6);
   Log.d(TAG, "uart4 read: " + read);
   ```

-- ADC

   ```
   import mraa.*;

   Aio aio6 = new Aio(TinkerBoard3NADC.TINKERBOARD_3N_ADC6.swigValue());
   float vin_6 = aio6.readFloat();
   Log.d(TAG, "adc6 read: " + String.valueOf(vin_6));
   ```

&nbsp;