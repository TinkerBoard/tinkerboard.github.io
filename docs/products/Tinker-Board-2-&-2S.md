# Tinker Board 2/2S
# 1. Linux Development

## 1.1 Build image

**Build OS, Kernel & Uboot instruction**

* **Debian build instruction**

* Source code:    
   https://github.com/TinkerBoard2/kernel (Debian)

### 1.1.1 Kernel 4.4  
  1. **Installing the build tools**  
      ````
      $ sudo apt-get install git-core gitk git-gui gcc-arm-linux-gnueabihf device-tree-compiler gcc-aarch64-linux-gnu mtools parted libssl-dev
      ````
  2. **Build Kernel**
      ````
      $ cd [source code]
      $ make ARCH=arm64 tinker2_defconfig
      $ make ARCH=arm64 rk3399-tinker_board_2.img CROSS_COMPILE=aarch64-linux-gnu- -j8
      ````
      You will get boot.img in the directory of kernel after build success.

  3. **Install Kernel**  
      Copy the boot.img to Tinker Board 2.  
      Use the command to install boot.img.
      ````
      $ sudo dd if=boot.img of=/dev/mmcblk1p4 status=progress && sync
      $ sudo reboot
      ````
      Ex:  
      ![image](https://user-images.githubusercontent.com/99971511/166880458-8562d8d1-6b27-46ba-898d-68d9b0cda1e2.png)

      **Note:**  
      * Image in eMMC
        ```
        sudo dd if=boot.img of=/dev/mmcblk1p4 status=progress && sync
        ```
      * Image in SD Card
        ```
        sudo dd if=boot.img of=/dev/mmcblk0p4 status=progress && sync
        ```
&nbsp;  

### 1.1.2 Kernel 4.19  
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
      Reference: https://docs.docker.com/engine/install/ubuntu/
  
    * Manage Docker as a non-root user
      ````
      $ sudo groupadd docker
      $ sudo usermod -aG docker $USER
      $ newgrp docker
      $ docker run hello-world
      ````
      Reference: https://docs.docker.com/engine/install/linux-postinstall/

  2. **Code compiling**  
      * Go to the directory where you have downloaded the code base and execute the script. This will take a while to install the necessary packages on the host and build the Docker image.
        ````
        $ ./docker_builder/docker-builder-run.sh
        ````
        Once the above is done, you are in the shell of the newly started Docker container as the following.  
        You can start to issue commands as usual.
        ````
        Successfully built 702bff5a9b3f
        Successfully tagged asus/tinker_2-linux-builder:latest
        Options to run docker: --privileged --rm -it --volume /DIRECTORY_PATH_TO_SOURCE:/source
        your_usernmae@292c696527f6:/source$
        ````
      * You can issue the following command to build all the images for Debian. All the images will be saved in the directory rockdev.
        ````
        $ ./build.sh
        ````
        It will generate a file which named sdboot.img and located at [source tree]/rockdev/sdboot.img  

  3. **Compiling u-boot/Kernel/Debian separately**  
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

## 1.2 Flash image

### 1.2.1 Boot mode

**UMS mode**

The USB mass storage class is a USB function which can be used to export and share the storage. When the board is booted into the UMS mode, it shares the internal storage (eMMC) to the connected PC just like a hard drive connected to the PC. Then, the users can use the software such as [balenaEtcher](https://www.balena.io/etcher/) to flash the image into the internal storage (eMMC).

The UMS function is implemented in u-boot. During the u-boot boot-up stage, it will check whether the board is connected to a PC or not. If connected to a PC, the board will enter UMS mode automatically. If not, the board will follow the boot priority to continue the boot process.

**1. Boot the board into the UMS mode from the internal storage (eMMC)**

If the u-boot in the internal storage (eMMC) is still workable with the UMS function, then follow the below steps.
1. Make sure there is no SD card installed on the board.
2. Connect the board with a PC via USB Type-C and then power on the board.
3. Then, the board will boot into the UMS mode automatically.

**2. Boot the device into the UMS from a SD card**

If there is no workable u-boot in the internal storage (eMMC), in this case the board can not boot into the UMS mode from the internal storage (eMMC), you can boot the board into the UMS mode from a SD card.
1. Flash the image (with u-boot including UMS function) into a SD card.
2. Install the SD card to the board.
3. Connect the board with a PC via USB Type-C and then power on the board.
4. Then, the board will boot into the UMS mode automatically. (You may need to enable the MASKROM jumper to force the device to boot from SD, jump out the eMMC.)

**3. Without UMS mode**

Recovery from SD’s image system & without the PC mode 

1. Plug the Jumper on the Maskrom mode.
(force to boot from SD, jump out the eMMC)
2. Flash the Image (any can bootable) to SD card.
3. Plug the SD card to the board.
4. Booting the board.
It would boot up to the RootFS.
5. use either command dd or methods to flash new image file to eMMC(mmcblk1).

&nbsp;

### 1.2.2 Flash image

You can use the software such as balenaEthcher to flash the images into the SD cards or the internal storage (eMMC) on the board when the board is booted into the UMS mode.

1. Download the software from [balena.io](https://www.balena.io/etcher/).
2. Run balenaEtcher and select the image file.
3. Select the target.
4. Click on Flash to start flashing.

Alternatively, you can also use the command dd. Run the following command, replacing /dev/sdx with your drive, e.g. /dev/sdc. (Do not append a partition number, so do not use something like /dev/sdc1. You can use the command lsblk to find out the target. Make sure that it is not mounted.)

    dd bs=4M if=/path/to/image of=/dev/sdx status=progress && sync

**1. Booting from external Micro SD card**

Requirement:

• 1 x Micro SD card with at least 8GB capacity

• 1 x Power supply

• 1 x Monitor

• 1 x Keyboard and Mouse set

Setting Up:

1. Insert the micro SD card into a Windows® PC.

2. Download the TinkerOS image from the Tinker Board website (https://tinker-board.asus.com/download.html) and burn it into the micro SD card using a third-party ISO software, such as Etcher.

4. Insert the bootable micro SD card into your Tinker Board, then connect the power supply, keyboard, mouse, and monitor to boot up.

**2. Booting  from  onboard  eMMC**

> NOTE: Booting from the onboard eMMC is only available for models with eMMC.

Requirement:

• 1 x USB cable with data transfer function (Micro USB or Type-C®, by SKU)

• 1 x Power supply

• 1 x Monitor

• 1 x Keyboard and Mouse set

Setting Up:

1. Connect the Tinker Board to a PC using a USB cable.

2. Connect the power adapter to the Tinker Board.

3. Download the TinkerOS image from the Tinker Board website (https://tinker-board.asus.com/download.html) and burn it into the Tinker Board using a third-party ISO software, such as [balenaEtcher](https://www.balena.io/etcher/).

4. After the TinkerOS image is successfully burned, disconnect all cables from the Tinker Board.

5. Connect the power supply, keyboard, mouse, and monitor to your Tinker Board to boot up.

&nbsp;

### 1.2.3 How to recover a failed flash

1. Prepare a T-Flash (microSD) card with any Tinker Board 2S image ([Tinker Board (asus.com)](https://tinker-board.asus.com/download-list.html?product=tinker-board-2s)) using Balena Etcher ([balenaEtcher - Flash OS images to SD cards & USB drives](https://aus01.safelinks.protection.outlook.com/?url=https%3A%2F%2Fwww.balena.io%2Fetcher%23download-etcher&data=05%7C01%7CSumantR%40datacom.co.nz%7C060b4b437a4b4d4c641708db301d3d90%7C866c7a4c8a594bd3ad9f8512a581efc0%7C0%7C0%7C638156674395057128%7CUnknown%7CTWFpbGZsb3d8eyJWIjoiMC4wLjAwMDAiLCJQIjoiV2luMzIiLCJBTiI6Ik1haWwiLCJXVCI6Mn0%3D%7C3000%7C%7C%7C&sdata=Jj7pL5RV0G1xzEU8Oz9f2ZrhnTSMIQ7AqXsXoinK8gc%3D&reserved=0))

   **• T-Flash spec: SDHC/SDXC**

2. Ensure the DC power is disconnected from the Tinker Board 2 & 2S.

3. Open up the Tinker Board 2 & 2S, and insert this T-Flash into the SD card port on your Tinker Board 2 & 2S

![圖片3](https://github.com/TinkerBoard/TinkerBoard/assets/97945168/8d8a5bc5-ae19-430e-b548-6b529d01c6e7)

4. Move the J3 Jumper from the default Disabled state to **MASKROM (Recovery) state**.

![圖片4](https://github.com/TinkerBoard/TinkerBoard/assets/97945168/00888340-5c29-4440-bf77-6b9d88c43532)

5. Connect the Tinker Board 2 & 2S to PC via USB Type-c
6. Plug in the DC adaptor and wait a few seconds for Tinkerboard 2S or Tinker Board 2 & 2S to boot. Your system will detect an USB mass storage on your computer.
7. Then you can flash the eMMC with Balena Etcher ([balenaEtcher - Flash OS images to SD cards & USB drives](https://aus01.safelinks.protection.outlook.com/?url=https%3A%2F%2Fwww.balena.io%2Fetcher%23download-etcher&data=05%7C01%7CSumantR%40datacom.co.nz%7C060b4b437a4b4d4c641708db301d3d90%7C866c7a4c8a594bd3ad9f8512a581efc0%7C0%7C0%7C638156674395057128%7CUnknown%7CTWFpbGZsb3d8eyJWIjoiMC4wLjAwMDAiLCJQIjoiV2luMzIiLCJBTiI6Ik1haWwiLCJXVCI6Mn0%3D%7C3000%7C%7C%7C&sdata=Jj7pL5RV0G1xzEU8Oz9f2ZrhnTSMIQ7AqXsXoinK8gc%3D&reserved=0)) using the desirable build downloaded earlier.

   **Note: Win32DiskImager is not recommended.**

8. After finishing the image flash, unplug the USB Type-C from PC, then unplug the DC power

9. Switch the J3 jumper back to Disabled state.

![圖片5](https://github.com/TinkerBoard/TinkerBoard/assets/97945168/cfc859c1-ee55-450e-ac14-4131b1e91597)

10. Remove the T-Flash from the Tinker Board 2 & 2S and reassemble the system.

11. Plug in the DC adaptor to boot the device.

&nbsp;

## 1.3 How to check image version

You can execute the following command to get the version of the image:

`$ cat /etc/version`

&nbsp;

## 1.4 How to get the PPID

**Note:** PPID (unique ID for Tinker board)

1. Copy [tinker_2_read_sn.zip](https://github.com/TinkerBoard/TinkerBoard/files/8109960/tinker_2_read_sn.zip) file to the device.

2. Unzip tinker_2_read_sn.zip and execute the following command to get the serial number:

    `$ sudo bash tinker_2_read_sn.sh`

&nbsp;

## 1.5 Resize image/partition

**Purpose:**

 * This section demonstrates how create a minimized image from an existing storage.
The image can be restored back to the storage (either eMMC or SD card) of the next board.  

**Note:** This instruction is for Tinker Board/Tinker Board S/Tinker Board R2.0/Tinker Board S R2.0/Tinker Board 2/Tinker Board 2S

**Environment:**

 * Board: Tinker Board S

 * OS: Tinker_Board-Debian-Stretch-V2.1.11-20200310.img

 * microSD card: With another Debian installed  
   **Note:** It could be flashed an image thru Etcher or Win32DiskImager under Windows environment or dd under Linux.

**Instruction:**

 1. Hardware setting: (this hardware step is for Tinker Board S only)  
Insert microSD card to the Tinker Board S and setting the jumper as Maskrom Mode (It will disable eMMC booting priority and force boot from the microSD card)  
as shown below:

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

    c. Pop-up a resize window. You can set the size from either of the ovals. If you set the new size as the minimum size, it might not work as it needs some space to process resizing.  

    d. After setting resize, it would be like below shown, then click “Resize/Move” to confirm the size -- After setting the size, click “Resize/Move” (This step just confirms the size, resizing's not been executed yet).  

    ![Tinker_eMMCtogparted_c+d](https://user-images.githubusercontent.com/89904531/154903712-9d3b8f58-a5af-4381-943f-25092f263508.png)

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

## 1.6 Changing the boot logo

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

    ![image](https://user-images.githubusercontent.com/5523365/156532686-49227918-771c-4b4d-a414-41bd66b7710e.png)

6. Powering on device, and open terminal. 

    Enter “reboot-bootloader” in terminal to enter fastboot mode

7. Execute command to flash logo.bmp into splash partition

    `fastboot flash splash logo.bmp`

&nbsp;

## 1.7 Swapfile

Follow along the steps to use eMMC as swap: 
1. ```sudo mkdir /media/linaro/emmc ```
2. add command line below in  ```sudo vi /etc/fstab```
   ```
   /dev/mmcblk1p1  /media/linaro/emmc           ext4        defaults      1      1 
   ```
3. `sudo mount -a`
4. `df`

5. `sudo vi /etc/dphys-swapfile` to adjust the size and location of the swap
    ```
    CONF_SWAPFILE=/media/linaro/emmc/swap
    CONF_SWAPSIZE=1000 #(Unit = MB, so it'd be 1G)
    ```
6. `sudo service dphys-swapfile restart`
7. `sudo swapon` and the result prints
    ```
    linaro@tinkerboard:/media/linaro/emmc$ sudo swapon
    NAME                    TYPE  SIZE USED PRIO
    /var/swap               file  100M   0B   -1
    /media/linaro/emmc/swap file 1000M   0B   -2
    ```

Reference:
https://manpages.debian.org/buster/dphys-swapfile/dphys-swapfile.8.en.html

&nbsp;

## 1.8 Power management tool

* ** For Debian OS**

1. Open a terminal in full screen mode and run the following command:

    `$ tinker-power-management`

2. Adjust CPU or GPU Governor:

    a. Press 'C' or 'G' to open the menu. 'C' is for CPU Governor and 'G' is for GPU Governor. 

    There are 4 options to select: "auto", "manual", "powersave", and "performance".

    b. Use the left or right arrow key to select. Option selected is shown in bold.

    Press the space bar to confirm, or press 'q' to cancel. 

3. Adjust CPU frequency:

    a. Follow Step 2 above to adjust CPU or GPU Governor to "manual"

    b. Take CPU as example:

        When CPU Governor = manual, options for CPU frequency adjustment will be highlighted.
        
        There are 4 options: "min.freq for A53", "max.freq for A53", "min.freq for A72", and "max.freq for A72".
        
        Use the arrow keys to select. Option selected is shown in bold.
        
        Press the space bar to confirm and open the selected CPU frequency menu.
        
        Follow step 2. to adjust CPU or GPU Governor.

    c. Once the frequency menu is shown

        Use the left or right arrow key to select. Option selected is shown in bold.
        
        Press the space bar to confirm, or press 'Q' to cancel. 
        
    Frequency menu needs to be confirmed or closed before adjusting CPU or GPU Governor again.

4. Press "Ctrl" + "C" to exit Tinker Power Management anytime. 

&nbsp;

## 1.9 How to use power manager APP

* **CPU (A53)** Governor setting is in

        ```
        /sys/devices/system/cpu/cpufreq/policy0/scaling_governor
        ```
        use '**echo**' to change.  
        EX:  
        ```
        echo ondemand > /sys/devices/system/cpu/cpufreq/policy0/scaling_governor
        ```
        ```
        CPU(A53) minimum frequency: /sys/devices/system/cpu/cpufreq/policy0/scaling_min_freq
        CPU(A53) maximum frequency: /sys/devices/system/cpu/cpufreq/policy0/scaling_max_freq
        ```

        **Note:** Check available parameter for **CPU (A53)** in `/sys/devices/system/cpu/cpufreq/policy0` before setting.

        ```
        CPU(A72) Governor setting: /sys/devices/system/cpu/cpufreq/policy4/scaling_governor
        CPU(A72) minimum frequency: /sys/devices/system/cpu/cpufreq/policy4/scaling_min_freq
        CPU(A72) maximum frequency: /sys/devices/system/cpu/cpufreq/policy4/scaling_max_freq
        ```

        **Note:** Check available parameter for **CPU (A72)** in `/sys/devices/system/cpu/cpufreq/policy4` before setting.


    * **GPU (T86X)** Governor setting:
        ```
        /sys/class/devfreq/ff9a0000.gpu/governor
        ```
        ```
        GPU minimum frequency: /sys/class/devfreq/ff9a0000.gpu/min_freq
        GPU maximum frequency: /sys/class/devfreq/ff9a0000.gpu/max_freq
        ```

        **Note:** Note: Check available parameter for **GPU (T86X)** in `/sys/class/devfreq/ff9a0000.gpu` before setting.

&nbsp;

## 1.10 How to install OpenCV

### 1.10.1 Install library from Debian repo

OpenCV for Python:
 ```sh
$ sudo apt-get update 
$ sudo apt-get install python-dev python-opencv
 ```

OpenCV for Python3:
 ```sh
$ sudo apt-get update
$ sudo apt-get install python3-dev python3-opencv
 ```

Confirm the Opencv library

OpenCV for Python:
```shell
$ python -c "import cv2; print(cv2.__version__)"
```
OpenCV for Python3:
```
$ python3 -c "import cv2; print(cv2.__version__)"
```

### 1.10.2 Install OpenCV manually

1. Install the required packages

    ```
    $ sudo apt-get update
    $ sudo apt-get -y upgrade
    $ sudo apt-get -y install aptitude
    $ sudo apt-get aptitude libavcodec-dev
    $ sudo apt-get -y install build-essential cmake git pkg-config libgtk-3-dev \
        libavcodec-dev libavformat-dev libswscale-dev libv4l-dev \
        libxvidcore-dev libx264-dev libjpeg-dev libpng-dev libtiff-dev \
        gfortran openexr libatlas-base-dev python3-dev python3-numpy \
        libtbb2 libtbb-dev libdc1394-22-dev`
    ```

2. Clone the OpenCV’s and OpenCV contrib repositories with the following commands:

    ```
    $ mkdir ~/opencv_build && cd ~/opencv_build
    $ git clone https://github.com/opencv/opencv.git
    $ git clone https://github.com/opencv/opencv_contrib.git
    ```

3. Set up the build
    ```
    $ cd ~/opencv_build/opencv
    $ mkdir build && cd build
    $ cmake -D CMAKE_BUILD_TYPE=RELEASE \
        -D CMAKE_INSTALL_PREFIX=/usr/local \
        -D INSTALL_C_EXAMPLES=ON \
        -D INSTALL_PYTHON_EXAMPLES=ON \
        -D OPENCV_GENERATE_PKGCONFIG=ON \
        -D OPENCV_EXTRA_MODULES_PATH=~/opencv_build/opencv_contrib/modules \
        -D BUILD_EXAMPLES=ON ..
    ```

4. Build & install OpenCV

    ```
    $ make -j4
    $ sudo make install
    ```

Reference:
https://linuxize.com/post/how-to-install-opencv-on-debian-10/

&nbsp;

## 1.11 How to control the reserved LED

**Use the terminal to enter commands**
* Bright on the reserved led

    echo 1 > /sys/devices/platform/gpio-leds/leds/led1-led/brightness
* Bright off the reserved led

    echo 0 > /sys/devices/platform/gpio-leds/leds/led1-led/brightness

&nbsp;

## 1.12 How to set WIFI as a Hotspot

1. Update packages and then install dnsmasq & hostapd package: 
 
     sudo apt-get update
     sudo apt install dnsmasq hostapd 

   2. Unzip SoftAP.zip:

      For Tinker Board 2/S

      [SoftAP_tinker2_debian10_20220223.zip](https://github.com/TinkerBoard/TinkerBoard/files/8121127/SoftAP_tinker2_debian10_20220223.zip)


   3. Open terminal and go to SoftAP folder, then execute the command line: 
    ` chmod 755 Enable_SoftAP.sh Disable_SoftAP.sh `

   4. Enable SoftAP mode：
 
     ./Enable_SoftAP.sh 

      default SSID = TinkerSoftAP 

      default Password = 87654321 

      Disable SoftAP mode：

     ./Disable_SoftAP.sh 

   5. You can modify /etc/hostapd/hostapd.conf for your own softap settings. 

     For example: 

     ssid=TinkerSoftAP 

     wpa_passphrase=87654321 

     channel=6 

     ````
     For MAC address access-list 
     0 = accept unless in deny list, deny_mac_file is used to specify deny list. 
     1 = deny unless in accept list, accept_mac_file is used to specify accept list. 
     macaddr_acl=1
     ````     
     
     ````
     Accept/deny lists are read from separate files (containing list of # MAC addresses, one per line). 
     accept_mac_file=/etc/hostapd/hostapd.accept 
     deny_mac_file=/etc/hostapd/hostapd.deny
     ```` 
 
     After modify hostapd.conf, you need to disable / re-enable softap again.

&nbsp;

## 1.13 How to run the application at startup

Applications can be automatically started in a couple of ways:

1. Via GUI

    a. Click “Default applications for LXSession” from start menu.

    Startup → Preferences → Default applications for LXSession

    ![image](https://user-images.githubusercontent.com/5523365/154647817-2d944080-c62e-4233-bb56-233bf82eab7b.png)

    b. Click “Autostart”

    ![image](https://user-images.githubusercontent.com/5523365/154648089-8c6af0db-f771-493f-b63d-254c462a8a6e.png)

    c. Add application name starts with @ in “Manual autostarted applications”.

    For example: Add LXTerminal app on startup, enter “@lxterminal” in the field.

    ![image](https://user-images.githubusercontent.com/5523365/154648140-c261ba07-a761-4ad8-a0f7-7dfb054e1cb8.png)

    d. Click “+Add” button to add application to autostart.

    ![image](https://user-images.githubusercontent.com/5523365/154648180-16f0a6cb-4901-4489-923c-53288d2f4f32.png)

2. Via config file

    a. Edit autostart file

    `$ vim ~/.config/lxsession/LXDE/autostart`

    b. Add application name starts with @.

    For example: Add LXTerminal app on startup, enter “@lxterminal” in the end of the line.

    ![image](https://user-images.githubusercontent.com/5523365/154648336-7edf36e4-42db-44af-8a22-464fc4e67ea3.png)

Reference: https://wiki.archlinux.org/title/LXDE#Autostart  

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


# 2. Android development

## 2.1 Build image

* Source code:   
   https://github.com/TinkerBoard2-Android/kernel (Android)

**1. Establish a build environment**   
   Please refer to [Install Docker Engine](https://docs.docker.com/engine/install/) to install Docker engine.

**2. Download the Android source**   
   Please refer to [Installing Repo](https://source.android.com/setup/develop#installing-repo) to install the Repo Launcher and [Downloading the Source](https://source.android.com/setup/build/downloading) to understand how to download the Android source.  
&nbsp;

**3. Initiale a Repo client**  
   Run repo init to get the latest version of Repo with its most recent bug fixes. You must specify a URL for the manifest, which specifies where the various repositories included in the Android source are placed within your working directory. For different projects, you must also specify the manifest branch or revision with option "-b REVISION".
````
repo init -u https://github.com/TinkerBoard-Android/manifest.git -b REVISION
````
Optionally, you can also specify the initial manifest file with the option "-m NAME.xml" for the specific release for that project.
````
repo init -u https://github.com/TinkerBoard-Android/manifest.git -b REVISION -m NAME.xml
````
 * **Android 10:**    
    ````
    repo init -u https://github.com/TinkerBoard-Android/manifest.git -b android10-rk3399
    ````
    or
    ````
    repo init -u https://github.com/TinkerBoard-Android/manifest.git -b android10-rk3399 -m tinker_board_2-android10-0.0.3.xml
    ````
    or
    ````
    repo init -u https://github.com/TinkerBoard-Android/manifest.git -b android10-rk3399 -m tinker_board_2-android10-1.0.0.xml
    ````
 * **Android 11:**    
    ````
    repo init -u https://github.com/TinkerBoard-Android/manifest.git -b android11-rockchip
    ````
    or
    ````
    repo init -u https://github.com/TinkerBoard-Android/manifest.git -b android11-rockchip -m tinker_board-android11-1.0.0.xml
    ````
    or
    ````
    repo init -u https://github.com/TinkerBoard-Android/manifest.git -b android11-rockchip -m tinker_board_2-android11-2.0.1.xml
    ````
    or
    ````
    repo init -u https://github.com/TinkerBoard-Android/manifest.git -b android11-rockchip -m tinker_board_2-android11-2.0.3.xml
    ````
    or
    ````
    repo init -u https://github.com/TinkerBoard-Android/rockchip-android-manifest.git -b android11-rockchip -m tinker_board_2-android11-2.0.8.xml
    ````
**4. Download the Android source tree**   
   To download the Android source tree to your working directory from the repositories as specified in the default manifest, run:
````
repo sync
````

**5. Build Android**   
   Go to to the directory where you have downloaded the Android source and execute the script as the following. This will take a while to install the necessary packages on the host, build the Docker image, and start the container:

    ./docker_builder/docker-builder-run.sh
Once it is done. You are in the shell of this newly started Docker container and you are ready to build Android.

* **Android 10:**  
    ````
    source build/envsetup.sh
    lunch WW_Tinker_Board_2-userdebug
    ./build.sh -UKAu
    ````
    The image which is able to be flashed to the board via UMS mode will be stored as the following in the directory where you have downloaded the source.  

    ./rockdev/Image-WW_Tinker_Board_2/WW_Tinker_Board_2-raw.img

* **Android 11:**  
    ````
    source build/envsetup.sh
    lunch WW_Tinker_Board_2-userdebug
    ./build.sh -UCKAu
    ````
    The image which is able to be flashed to the board via UMS mode will be stored as the following in the directory where you have downloaded the source.

    ./rockdev/Image-WW_Tinker_Board_2/WW_Tinker_Board_2-raw.img

&nbsp;
 
## 2.2 Flash image

### 2.2.1 Boot mode

**UMS mode**

The USB mass storage class is a USB function which can be used to export and share the storage. When the board is booted into the UMS mode, it shares the internal storage (eMMC) to the connected PC just like a hard drive connected to the PC. Then, the users can use the software such as [balenaEtcher](https://www.balena.io/etcher/) to flash the image into the internal storage (eMMC).

The UMS function is implemented in u-boot. During the u-boot boot-up stage, it will check whether the board is connected to a PC or not. If connected to a PC, the board will enter UMS mode automatically. If not, the board will follow the boot priority to continue the boot process.

**1. Boot the board into the UMS mode from the internal storage (eMMC)**

If the u-boot in the internal storage (eMMC) is still workable with the UMS function, the follow the below steps.
1. Make sure there is no SD card installed on the board.
2. Connect the board with a PC via USB Type-C and then power on the board.
3. Then, the board will boot into the UMS mode automatically.

**2. Boot the device into the UMS from a SD card**

If there is no workable u-boot in the internal storage (eMMC), in this case the board can not boot into the UMS mode from the internal storage (eMMC), you can boot the board into the UMS mode from a SD card.
1. Flash the image (with u-boot including UMS function) into a SD card.
2. Install the SD card to the board.
3. Connect the board with a PC via USB Type-C and then power on the board.
4. Then, the board will boot into the UMS mode automatically. (You may need to enable the MASKROM jumper to force the device to boot from SD, jump out the eMMC.)

**3. Without UMS mode**

Recovery from SD’s image system & without the PC mode 

1. Plug the Jumper on the Maskrom mode.
(force to boot from SD, jump out the eMMC)
2. Flash the Image (any can bootable) to SD card.
3. Plug the SD card to the board.
4. Booting the board.
It would boot up to the RootFS.
5. use either command dd or methods to flash new image file to eMMC(mmcblk1).

&nbsp;

### 2.2.2 Flash image

You can use the software such as balenaEthcher to flash the images into the SD cards or the internal storage (eMMC) on the board when the board is booted into the UMS mode.

1. Download the software from [balena.io](https://www.balena.io/etcher/).
2. Run balenaEtcher and select the image file.
3. Select the target.
4. Click on Flash to start flashing.

Alternatively, you can also use the command dd. Run the following command, replacing /dev/sdx with your drive, e.g. /dev/sdc. (Do not append a partition number, so do not use something like /dev/sdc1. You can use the command lsblk to find out the target. Make sure that it is not mounted.)

    dd bs=4M if=/path/to/image of=/dev/sdx status=progress && sync

**1. Booting from external Micro SD card**

Requirement:

• 1 x Micro SD card with at least 8GB capacity

• 1 x Power supply

• 1 x Monitor

• 1 x Keyboard and Mouse set

Setting Up:

1. Insert the micro SD card into a Windows® PC.

2. Download the TinkerOS image from the Tinker Board website (https://tinker-board.asus.com/download.html) and burn it into the micro SD card using a third-party ISO software, such as Etcher.

4. Insert the bootable micro SD card into your Tinker Board, then connect the power supply, keyboard, mouse, and monitor to boot up.

**2. Booting  from  onboard  eMMC**

> NOTE: Booting from the onboard eMMC is only available for models with eMMC.

Requirement:

• 1 x USB cable with data transfer function (Micro USB or Type-C®, by SKU)

• 1 x Power supply

• 1 x Monitor

• 1 x Keyboard and Mouse set

Setting Up:

1. Connect the Tinker Board to a PC using a USB cable.

2. Connect the power adapter to the Tinker Board.

3. Download the TinkerOS image from the Tinker Board website (https://tinker-board.asus.com/download.html) and burn it into the Tinker Board using a third-party ISO software, such as [balenaEtcher](https://www.balena.io/etcher/).

4. After the TinkerOS image is successfully burned, disconnect all cables from the Tinker Board.

5. Connect the power supply, keyboard, mouse, and monitor to your Tinker Board to boot up.

&nbsp;

### 2.2.3 How to recover a failed flash

1. Prepare a T-Flash (microSD) card with any Tinker Board 2S image ([Tinker Board (asus.com)](https://tinker-board.asus.com/download-list.html?product=tinker-board-2s)) using Balena Etcher ([balenaEtcher - Flash OS images to SD cards & USB drives](https://aus01.safelinks.protection.outlook.com/?url=https%3A%2F%2Fwww.balena.io%2Fetcher%23download-etcher&data=05%7C01%7CSumantR%40datacom.co.nz%7C060b4b437a4b4d4c641708db301d3d90%7C866c7a4c8a594bd3ad9f8512a581efc0%7C0%7C0%7C638156674395057128%7CUnknown%7CTWFpbGZsb3d8eyJWIjoiMC4wLjAwMDAiLCJQIjoiV2luMzIiLCJBTiI6Ik1haWwiLCJXVCI6Mn0%3D%7C3000%7C%7C%7C&sdata=Jj7pL5RV0G1xzEU8Oz9f2ZrhnTSMIQ7AqXsXoinK8gc%3D&reserved=0))

   **• T-Flash spec: SDHC/SDXC**

2. Ensure the DC power is disconnected from the Tinker Board 2 & 2S.

3. Open up the Tinker Board 2 & 2S, and insert this T-Flash into the SD card port on your Tinker Board 2 & 2S

![圖片3](https://github.com/TinkerBoard/TinkerBoard/assets/97945168/8d8a5bc5-ae19-430e-b548-6b529d01c6e7)

4. Move the J3 Jumper from the default Disabled state to **MASKROM (Recovery) state**.

![圖片4](https://github.com/TinkerBoard/TinkerBoard/assets/97945168/00888340-5c29-4440-bf77-6b9d88c43532)

5. Connect the Tinker Board 2 & 2S to PC via USB Type-c
6. Plug in the DC adaptor and wait a few seconds for Tinkerboard 2S or Tinker Board 2 & 2S to boot. Your system will detect an USB mass storage on your computer.
7. Then you can flash the eMMC with Balena Etcher ([balenaEtcher - Flash OS images to SD cards & USB drives](https://aus01.safelinks.protection.outlook.com/?url=https%3A%2F%2Fwww.balena.io%2Fetcher%23download-etcher&data=05%7C01%7CSumantR%40datacom.co.nz%7C060b4b437a4b4d4c641708db301d3d90%7C866c7a4c8a594bd3ad9f8512a581efc0%7C0%7C0%7C638156674395057128%7CUnknown%7CTWFpbGZsb3d8eyJWIjoiMC4wLjAwMDAiLCJQIjoiV2luMzIiLCJBTiI6Ik1haWwiLCJXVCI6Mn0%3D%7C3000%7C%7C%7C&sdata=Jj7pL5RV0G1xzEU8Oz9f2ZrhnTSMIQ7AqXsXoinK8gc%3D&reserved=0)) using the desirable build downloaded earlier.

   **Note: Win32DiskImager is not recommended.**

8. After finishing the image flash, unplug the USB Type-C from PC, then unplug the DC power

9. Switch the J3 jumper back to Disabled state.

![圖片5](https://github.com/TinkerBoard/TinkerBoard/assets/97945168/cfc859c1-ee55-450e-ac14-4131b1e91597)

10. Remove the T-Flash from the Tinker Board 2 & 2S and reassemble the system.

11. Plug in the DC adaptor to boot the device.

&nbsp;

## 2.3 How to use adb

1. Prepare an USB Type-C to Type-A cable

2. Enable USB debugging in the device system settings, under Developer options.

3. The Developer options screen is hidden by default. To make it visible, go to Settings > About tablet and tap Build number seven times. Return to the previous screen to find Developer options at the System > Advanced.

4. You can now connect your device with USB. Connect cable Type-C side to Tinker Board 2 and Type-A side to PC.

5. You can verify that your device is connected by check Device Manager.

![Tinker Board 2_UsingAdb_1](https://user-images.githubusercontent.com/89904531/154975660-5f5d3d0f-264e-4613-b2f9-8ef06c493146.png)

6. If you have ever installed the ASUS_Android_USB_drivers_for_Windows, the device will appear as ASUS Android device.

![Tinker Board 2_UsingAdb_2](https://user-images.githubusercontent.com/89904531/154975793-4028b9d7-286a-4bb0-bd4f-8df0c4872044.png)

7. Executing adb devices from the android_sdk/platform-tools/ directory. If connected, you'll see the device name listed as a device. The platform-tools can download from android website.

![Tinker Board 2_UsingAdb_3](https://user-images.githubusercontent.com/89904531/154975871-002fa24a-07e0-4be7-ba3b-d5fd7a6fa0bb.png)

[Ref: Android Debug Bridge (adb)  |  Android Developers](https://developer.android.com/studio/command-line/adb)

Please visit Android's official website for more information: https://developer.android.com/studio/command-line/adb

&nbsp;

## 2.4 Get log file through adb

For Logcat:

`$ adb logcat > logcat.txt`

Logcat will save as logcat.txt

For Kernel:

`$ adb shell dmesg > kernel.txt`

Logcat will save as kernel.txt

Reference:
https://developer.android.com/studio/command-line/adb
https://developer.android.com/studio/command-line/logcat

&nbsp;

## 2.5 How to get the SN

1. Copy [tinker_2_read_sn.zip](https://github.com/TinkerBoard/TinkerBoard/files/8109960/tinker_2_read_sn.zip) file to the PC

2. Unzip tinker_2_read_sn.zip

3. Push tinker_2_read_sn.sh to Tinker Board 2/S

    `$ adb push tinker_2_read_sn.sh sdcard/`

4. Read ssn

    ```
    $ adb root
    $ adb shell sh sdcard/tinker_2_read_sn.sh
    ```
&nbsp;

## 2.6 How to use ASUS debugger

Support matrix: 

| - | Android 7 | Android 10 | Android 11 |
| --- | --- | --- | --- |
| ASUS Debugger v.3.03 | ✓ | - | - |
| ASUS Debugger v.3.10 | - | ✓ | - |
| ASUS Debugger v.3.11 | - | - | ✓ |

### 2.6.1 Android 10
* **This instruction describes behaviors with the version AsusDebugger v3.10**

1. **Start AsusDebugger:**

    You **CAN’T** find AsusDebugger icon in Launcher. Please get into it from "**Settings**" Application
    1. In Launcher, you can find the Settings icon. Click it to start Settings.
    2. Click **"About tablet"** at the bottom of the preference list.

        ![AsusDebugger_1_1](https://user-images.githubusercontent.com/51226852/167129333-43183416-d02d-4d1b-9627-69ebe6b3c1bf.png)

    3. Click the **“Android Version”** preference.

        ![AsusDebugger_1_2](https://user-images.githubusercontent.com/51226852/167129360-7f974e73-61fd-422f-8741-8dc08b70acb4.png)

    4. Continuously click the preference of **“Build number”** 10 times and will start open the AsusDebugger.

        <img width="574" alt="AsusDebugger_1_3" src="https://user-images.githubusercontent.com/51226852/167129504-b0bf6015-31df-40f5-a2e1-d5fe3cfd7146.png"/>
     
        **NOTE:** There is a quick way. Please see **Section 6**.

2. **Set the configuration of logs:**
    1. The path of capturing logs is shown at **"Log file location"**, it is default set to **"/sdcard/Logs"**.
    2. **"Logcat/kernel/tcpdump rotate number"** is used to decide the number of log rotation. It affects logcat, kernel, and tcpdump.
    3. **"Logcat/kernel file size"** is used to decide the size of log files. It affects logcat, and kernel.

        ![AsusDebugger_2](https://user-images.githubusercontent.com/89904531/154931142-34829d9b-7131-4ce5-977d-52410978695d.png)

3. **Start to catch logs:**
    1. In Debugger, the logcat logs and kernel logs have been separated, if you need "**Enable capture logcat**" and "**Enable capture kernel**", make sure those toggles are checked. 
    2. To enable tcpdump log for debugging internet related issue, make sure "**Enable tcpdump**" toggle is checked.

        ![AsusDebugger_3](https://user-images.githubusercontent.com/89904531/154935572-dcd6e5b7-3929-488b-8596-057cef13313c.png)

4. **Collecting Logs:**
    1. When a bug is found, please press **"COLLECT LOGS"** button in AsusDebugger. You can describe your findings with short log or simply leave it blank.

        ![AsusDebugger_4-1](https://user-images.githubusercontent.com/89904531/154931539-bfff8a3e-9698-43cd-a676-820bf2aab29f.png)

    2. AsusDebugger runs dumpstate automatically when you request collecting logs and it will take some time (2~3 minutes) to generate current system state and information. 

        ![AsusDebugger_4-2](https://user-images.githubusercontent.com/89904531/154931669-31d4ec9c-4872-46fc-8c96-9544aa7c21c6.png)

        Moreover, AsusDebugger collect logs you captured. Once collecting procedure is done, a dialog will be prompted to inform you of the path of the collected logs as follow.

        ![AsusDebugger_4-3](https://user-images.githubusercontent.com/89904531/154931755-0cb7b045-3fc0-46bc-bf60-6ed2d3cf97f8.png)

5. **Output Debugger files:**
    1. After connecting device to computer, drag the status bar and press **"USB connected"**. Then select **"File Transfer"**. 

        ![AsusDebugger_5_1](https://user-images.githubusercontent.com/51226852/167595142-acef1d94-2b2c-4915-9b57-629acc95d6d7.png)
        ![AsusDebugger_5_2](https://user-images.githubusercontent.com/51226852/167595190-393f7214-c28b-44db-95e7-238c61e5530c.png)

    2. Log files in **/sdcard/logs** are logs for current capture session.
    3. All collected logs go to **/sdcard/Logs_collected/** directory

6. **Quickly enter AsusDebugger:**  
    In **Section 3 - "Start to catch logs"**, if any log toggles are enabled, you can see a notification shown the Logging mode is Debugger. You can quickly get into AsusDebugger activity by clicking. 

    ![AsusDebugger_6](https://user-images.githubusercontent.com/89904531/154932645-b0fe7346-64ac-4e04-ab48-4ba3a573343d.png)

7. **Other function:**

    1. **Detect reboot:**

        If you want to detect whether the device is rebooted, make sure **"Detect reboot"** toggle is checked.

        ![AsusDebugger_7-1](https://user-images.githubusercontent.com/89904531/154932845-c50bd246-e170-40e3-abfe-f564ad025e7a.png)

        If detect the device is rebooted, there is a full-screen floating window shown and display timestamp. Remove window by clicking it.

         ![AsusDebugger_7-2](https://user-images.githubusercontent.com/51226852/167600424-58c30578-25ce-4843-9e1d-2ef97bb224ba.png)

    2. **Display usage:**

        If you want to know the device’s usage, includes the information of CPU, GPU, Memory, and Battery, make sure **"Display CPU/GPU/MEM usage and battery level"** toggle is checked. A floating window displays information at right-bottom corner. 

        ![AsusDebugger_7-3](https://user-images.githubusercontent.com/89904531/154933295-58300366-5de4-4a38-8cc6-f8a6b1a0d243.png)

    3. **Ping test:**

        If you want to test the network connection, can use **"Run PING test command"** to run ping test

        ![AsusDebugger_7-4](https://user-images.githubusercontent.com/89904531/154933618-24980ffb-17f1-4b55-9c0f-12648e62b81d.png)
        ![AsusDebugger_7-5](https://user-images.githubusercontent.com/89904531/154933632-2af4eedf-7fab-4b32-b73f-70aa8c8abbde.png)

### 2.6.2 Android 11
* **This instruction describes behaviors with the version AsusDebugger v3.11**

1. **Start AsusDebugger:**  

    You **CAN’T** find AsusDebugger icon in Launcher. Please get into it from **"Settings"** Application
    1. In Launcher, you can find the Settings icon. Click it to start Settings.
    2. Click **"About tablet"** at the bottom of the preference list.

        <img width="539" alt="AsusDebugger_v3 11_1" src="https://user-images.githubusercontent.com/89904531/155090354-e3191c90-ac41-40b7-a4da-36bca63256fb.png"/>

    3. Click **“Android Version”** preference.

        <img width="556" alt="AsusDebugger_v3 11_2" src="https://user-images.githubusercontent.com/89904531/155090406-1281b48c-cfba-4715-a9ba-5a8fd7def640.png"/>

    4. Continuously click **“Kernel version“** preference 10 times and the AsusDebugger will start.

        <img width="494" alt="AsusDebugger_v3 11_3" src="https://user-images.githubusercontent.com/89904531/155090452-13188dd6-4769-4b32-bca4-46704932f809.png"/>

        **NOTE:** There is a quick way. Please see **Section 6.**

2. **Set the configuration of logs:**

    1. The path of capturing logs is shown at **"Log file location"**, it is default set to **"/sdcard/Logs"**.
    2. **"Logcat/kernel/tcpdump rotate number"** is used to decide the number of log rotation. It affects logcat, kernel, and tcpdump. 
    3. **"Logcat/kernel file size"** is used to decide the size of log files. It affects logcat, and kernel. 

        ![AsusDebugger_v3 11_4](https://user-images.githubusercontent.com/89904531/155090476-34a2db68-d77b-45a9-8a26-93cf437554bf.png)

3. **Start to catch logs:**

    1. In Debugger, the logcat logs and kernel logs have been separated, if you need **"Enable capture logcat"** and **"Enable capture kernel"**, make sure those toggles are checked.

        ![AsusDebugger_v3 11_5](https://user-images.githubusercontent.com/89904531/155090500-30e254a5-94ec-40a1-80c3-970054fa79e6.png)

    2. To enable tcpdump log for debugging internet related issue, make sure **"Enable tcpdump"** toggle is checked.

        ![AsusDebugger_v3 11_6](https://user-images.githubusercontent.com/89904531/155090523-a69cd5bc-5993-423f-a651-a1bc2eeca504.png)


4. **Collecting Logs:**

    1. When a bug is found, please press **"COLLECT LOGS"** button in AsusDebugger. You can describe your findings with short log or simply leave it blank.

        ![AsusDebugger_v3 11_7](https://user-images.githubusercontent.com/89904531/155090549-3c6d4f3e-9645-4a6f-8449-9b66bd984913.png)

    2. AsusDebugger runs dumpstate automatically when you request collecting logs and it will take some time (1~2 minutes) to generate current system state and information.

        ![AsusDebugger_v3 11_8](https://user-images.githubusercontent.com/89904531/155090582-682c4a27-fe8e-4b25-a292-2aeb08dd580f.png)

        Moreover, AsusDebugger collect logs you captured. Once collecting procedure is done, a dialog will be prompted to inform you of the path of the collected logs as follows.

        ![AsusDebugger_v3 11_9](https://user-images.githubusercontent.com/89904531/155090609-578afe18-7f9b-4b29-bb63-aab5e850e998.png)


5. **Output Debugger files:**

    1. After connecting device to computer, drag the status bar and press **"USB connected"**. Then select **"File transfers"**.

        ![AsusDebugger_v3 11_10](https://user-images.githubusercontent.com/89904531/155090663-784bc1b8-7a9b-42ec-871c-b7d4cb896d70.png)

        ![AsusDebugger_v3 11_11](https://user-images.githubusercontent.com/89904531/155090680-67738bf3-f82e-41f0-8329-23e886059ca5.png)


    2. Log files in **/sdcard/logs** are logs for current capture session.
    3. All collected logs go to **/sdcard/Logs_collected/** directory

6. **Quickly enter AsusDebugger:**

    In **Section 3 - "Start to catch logs"**, if any log toggles are enabled, you can see a notification shown the Logging mode is Debugger. You can quickly get into AsusDebugger activity by clicking.

    ![AsusDebugger_v3 11_12](https://user-images.githubusercontent.com/89904531/155090716-71ce3672-22e7-4ba0-b269-599e7ad7ade7.png)

7. **Other function:**

    1. **Detect reboot:**

        If you want to detect whether the device is rebooted, make sure **"Detect reboot"** toggle is checked.

        ![AsusDebugger_v3 11_13](https://user-images.githubusercontent.com/89904531/155090747-a4acd157-f199-40e4-827c-18312f7889cb.png)

        If detect the device is rebooted, there is a full-screen floating window shown and display timestamp. Remove window by clicking it.
 
        ![AsusDebugger_v3 11_14](https://user-images.githubusercontent.com/89904531/155090786-acbee000-a337-4af0-a35c-67407ef67715.png)


    2. **Display usage:**

        If you want to know the device’s usage, includes the information of CPU, Memory, and Battery, make sure **"Display CPU/GPU/MEM usage and battery level"** toggle is checked. A floating window displays information at right-bottom corner. 

        ![AsusDebugger_v3 11_15](https://user-images.githubusercontent.com/89904531/155090818-92699db3-d29a-4c6d-9caf-0060327ccf79.png)


    3. **Ping test:**

        If you want to test the network connection, can use **"Run PING test command"** to run ping test.

        ![AsusDebugger_v3 11_16](https://user-images.githubusercontent.com/89904531/155090832-6810c9f9-2032-443f-9dc4-f8b1c3891efb.png)

&nbsp;

## 2.7 Changing the boot logo

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

* **Changing the Android 11 Boot Animation**

This instruction is applicable for Tinker Board and Tinker Board 2 with Android 11 OS

1. Requirements  

    1. adb connection
        * For Tinker Board 2 / Tinker Board 2S:
            USB Type-C cable or WIFI available
        * For Tinker Board / Tinker Board S / Tinker Board R2.0 / Tinker Board S R2.0:
            WIFI available 
   
    2. bootanimation.zip file

        * You can create a bootanimation.zip by yourself or download it from the [Internet](https://forum.xda-developers.com/t/bootanimations-collection.3721978/).  

2. Connect Tinker Board 2 to PC with USB Type-C cable or connect to the device over WIFI as bellow

    ````
    $ adb connect <Tinker IP address>
    ````

3. Push bootanimation.zip to Tinker Board 2 / Tinker Board 2S

      ````
      $ adb root
      $ adb remount 
      $ adb push bootanimation.zip product/media/bootanimation.zip 
      $ adb reboot
      ````
4. After reboot, you can get your own Android boot animation.


&nbsp;

## 2.8 Tinker Config Application

**Introduction**

Tinker Config is an Android-based application that offers flexibility
and an easy way to configure I/O interfaces on 40pin header, DSI/CSI
connectors as well as Linux kernel Devicetree overlays while using
Tinker Board 2S.

![1](https://user-images.githubusercontent.com/51226852/159633579-886fcfa4-9a02-47a4-bbcb-6f727fcd23fa.png)

**Prerequisites**

Tinker Board 2S with Android OS v.2.0.6 (or later) installed. For image
installation, please visit Tinker Board's [wiki
page](https://github.com/TinkerBoard/TinkerBoard/wiki/User-Guide#flash-image)
on Github.

Optional: hardware accessories such as LED modules, monitors ... etc.

Tinker Config is built-in and can be found in the app list.

![2](https://user-images.githubusercontent.com/51226852/159661220-dda03c39-22ac-48f6-9547-56386e2c91a6.png)

**Features**

-   ***Interfaces:** allows users to configure functions for 40 pin GPIO
    header. The complete GPIO config table can be found on [Github
    wiki](https://github.com/TinkerBoard/TinkerBoard/wiki/User-Guide#gpio-config-table-for-tinker-board-2-series).
    Below are the supported functions:*

> UART Settings: UART0, UART4
>
> I2C Settings: I2C6, I2C7
>
> I2S Settings: I2S0
>
> SPI Settings: SPI1, SPI5
>
> PWM Settings: PWM0, PWM1, PWM3A

![3](https://user-images.githubusercontent.com/51226852/159636738-1c8c4ca7-14a3-4e0f-b6f6-e9e16b40fdb5.png)

> *Note: Changes will not take effect immediately, please reboot the
> board each time after changes are made.*

-   ***Linux Kernel Devicetree Overlays:** The display controller of
    Tinker Board 2S is called VOP (Visual Output Processor) and it's
    used to transfer image data from video memory to different types of
    interface.*

*There are two VOPs in Tinker Board 2S:* VOPB supports up to 4K
resolution, and VOPL supports up to 2560x1440 resolution.

*The default setting for HDMI is VOPB, and it can be configured to VOPL
by checking "HDMI_VOPL" in Tinker Config; the default setting for DP is
VOPL, and it can be configured to VOPB by checking "DP_VOPB" in Tinker
Config. For other DSI such as MIPI or DAC, simply tick the box (one at a
time) to change configuration.*

> Device tree blob (DTB) supported include: DP_VOPB, HDMI_VOPL,
> console-uart-overlay, hifiberry-dacplus-overlay, mipi2edp_G156HAB02,
> mipi2lvds_G133HAN01, mipi2lvds_G156BGE-L01, mipi2lvds_G185XW01,
> mipi2lvds_G240HVT01, mipi2lvds_LM215WFF3-SLN1
>

![4](https://user-images.githubusercontent.com/51226852/159636899-fae02698-bf77-4c91-87cb-1e3ec644683c.png)

>
> *Note: Changes will not take effect immediately, please reboot the
> board each time after changes are made.*

-   ***Application Whitelisting:** allows users to prevent running
    applications being terminated when out of memory (OOM) occurred.
    Applications ticked in the Whitelist will be allowed running when
    OOM.*

![5](https://user-images.githubusercontent.com/51226852/159637299-87234860-9442-4963-aa5b-abedfe3edda3.png)

> *Note: Changes will not take effect immediately, please reboot the
> board each time after changes are made.*

-   ***Power Management:** users can scale the CPU and GPU frequency in
    order to either save power or enhance improvement. Below are the
    supported options of power policies:*

CPU:

Governor: interactive, performance, powersave

Little Core Min Frequency: 408000, 600000, 816000, 1008000, 1200000,
1416000, 1512000

Little Core Max Frequency: 408000, 600000, 816000, 1008000, 1200000,
1416000, 1512000

Big Core Min Frequency: 408000, 600000, 816000, 1008000, 1200000,
1416000, 1512000

Big Core Max Frequency: 408000, 600000, 816000, 1008000, 1200000,
1416000, 1512000

GPU:

Governor: simple_ondemand, performance, powersave

![6](https://user-images.githubusercontent.com/51226852/159637718-b2077846-f61f-4d1e-9547-5494476fddb2.png)
![7](https://user-images.githubusercontent.com/51226852/159637728-4b89c071-fa88-48f7-bf1f-c80ba6f91498.png)

> *Note: Changes will not take effect immediately, please reboot the
> board each time after changes are made.*

-   ***Boot Logo: This feature allows user to change the image shown
    when the board is booting.***

*Select an image (size limit: 233k pixels / 700KB), click "Change
image", and click "Apply".*

![8](https://user-images.githubusercontent.com/51226852/159638114-2e8d8b1a-80f6-438b-8d67-54ec7344987c.png)
![9](https://user-images.githubusercontent.com/51226852/159638133-8069fc58-e80b-495c-924c-a3b6671df4e9.png)

*Reboot to make the change take effect.*

![10](https://user-images.githubusercontent.com/51226852/159637967-6b4ec2d6-db7e-404a-8ffe-9e6dc4a39fd3.png)

*The boot image change stays even when the board is reset to factory
settings. Please wipe and re-flash the OS image to change boot logo back
to default settings.*

&nbsp;


# 3. Hardware Guide

## 3.1 How to use serial console Debug?

1.  Prepare an USB to TTL(UART) cable

2. Connect cable to Tinker Board.

    a. Connect TXD pin on the converter to RX pin on the J6 header.

    b. Connect RXD pin on the converter to TX pin on the J6 header.

    c. Connect GND pin on the converter to Tinker Board 2.

    ![image](https://user-images.githubusercontent.com/5523365/154926945-29259782-8593-4dfc-91a2-62a1a485c44d.png)

&nbsp;

## 3.2 Setting up a serial port console

Hardware:

![TinkerBoard2S_serialportconsole_1](https://user-images.githubusercontent.com/89904531/154971537-c9ae65e3-025e-47a2-8d4d-7b3cc9ab05c3.png)

![Tinker Board 2S Block diagram](https://tinker-board.asus.com/images/doc/tb2_qsg_05.jpg)

1.	Connect Tinker Board 2S to PC with a USB serial cable

2.	On PC, open Putty and select Serial. 

3.	The Serial line can be checked from Windows >Device Manager >Ports (COM & LPT). The speed is 115200 baud.

![TinkerBoard2S_serialportconsole_2](https://user-images.githubusercontent.com/89904531/154972496-06c7b06d-6c68-4793-9126-cfc155e5fdf8.png)

4.	Click the Open button on Putty and power the board, and some boot logs will be printed on Putty from PC

&nbsp;

## 3.3 GPIO

### 3.3.1 GPIO Config table

| Chip,line | Device Path | Function2 | Function1 | GPIO| Pin# | Pin# | GPIO | Function1 | Function2 | Device Path |  Chip,line | 
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | 
| --- | --- | --- | VCC3.3V_IO | --- | 1 | 2 | --- | VCC5V_SYS | --- | --- | --- |
| 2,9 | GPIO: /sys/class/gpio/gpio73 I2C: /dev/i2c-6 | --- | I2C6_SDA | GPIO2_B1 | 3 | 4 | --- | VCC5V_SYS | --- | --- | --- |
| 2,10 | GPIO: /sys/class/gpio/gpio74 I2C: /dev/i2c-6 | --- | I2C6_SCL | GPIO2_B2 | 5 | 6 | --- | GND | --- | --- | --- |
| 0,8 | GPIO: /sys/class/gpio/gpio8	 | --- | TEST_CLKOUT2 | GPIO2_B0 | 7 | 8 | GPIO2_C1 | UART0_TXD | --- | GPIO: /sys/class/gpio/gpio81 UART: /dev/ttyS0 | 2,17 |
| --- | --- | --- |GND | --- | 9 | 10 | GPIO0_C0 | UART0_RXD | --- | GPIO: /sys/class/gpio/gpio80 UART: /dev/ttyS0 | 2, 16 |
| 2,19 | GPIO: /sys/class/gpio/gpio83 UART: /dev/ttyS0 | --- | UART0_RTSN | GPIO2_C3 | 11 | 12 | GPIO3_D0 | I2S0_SCLK | --- | GPIO: /sys/class/gpio/gpio120	| 3,24 |
| 2,21 | GPIO: /sys/class/gpio/gpio85 SPI: /dev/spidev5 | --- | SPI5_TX | GPIO2_C5 | 13 | 14 | --- | GND | --- | --- | --- |
| 2,20 | GPIO: /sys/class/gpio/gpio84 SPI: /dev/spidev5 | --- | SPI5_RX | GPIO2_C4 | 15 | 16 | GPIO2_C6 | SPI5_CLK | --- | GPIO: /sys/class/gpio/gpio86 SPI: /dev/spidev5 | 2,22 |
| --- | --- | --- | VCC3.3V_IO | --- | 17 | 18 | GPIO2_C7 | SPI5_CSN | --- | GPIO: /sys/class/gpio/gpio87 SPI: /dev/spidev5.0 | 2, 23 |
| 1,8 | GPIO: /sys/class/gpio/gpio40 SPI: /dev/spidev1 UART: /dev/ttyS4 | UART4_TXD | SPI1_TXD | GPIO1_B0 | 19 | 20 | --- | GND | --- | --- | --- |
| 1,7 | GPIO: /sys/class/gpio/gpio39 SPI: /dev/spidev1 UART: /dev/ttyS4 | UART4_RXD | SPI1_RXD | GPIO1_A7 | 21 | 22 | GPIO3_D4 | I2S0_SDO3 | --- | GPIO: /sys/class/gpio/gpio124 | 3,28 |
| 1,9 | GPIO: /sys/class/gpio/gpio41 SPI: /dev/spidev1 | --- | SPI1_CLK | GPIO1_B1 | 23 | 24 | GPIO1_B2 | SPI1_CSN | --- | GPIO: /sys/class/gpio/gpio42 SPI: /dev/spidev1.0 | 1,10 |
| --- | --- | --- | GND | --- | 25 | 26 | GPIO0_A6 | PWM3A_IR | --- | GPIO: /sys/class/gpio/gpio6 PWM: /sys/class/pwm/pwmchip3 | 0,6 |
| 2,7 | GPIO: /sys/class/gpio/gpio71 I2C: /dev/i2c-7 | --- | I2C7_SDA | GPIO2_A7 | 27 | 28| GPIO2_B0 | I2C7_SCL | --- | GPIO: /sys/class/gpio/gpio72 I2C: /dev/i2c-7 | 2,8 |
| 3,30 | GPIO: /sys/class/gpio/gpio126 | --- | I2S0_SDO1 | GPIO3_D6 | 29 | 30 | --- | GND | --- | --- | --- |
| 3,29 | GPIO: /sys/class/gpio/gpio125 | --- | I2S0_SDO2 | GPIO3_D5 | 31 | 32 | GPIO4_C2 | PWM0 | --- | GPIO: /sys/class/gpio/gpio146 PWM: /sys/class/pwm/pwmchip0 | 4,18 |
| 4,22 | GPIO: /sys/class/gpio/gpio150 PWM: /sys/class/pwm/pwmchip1 | --- | PWM1 | GPIO4_C6 | 33 | 34 | --- | GND | --- | --- | --- |
| 3,25 | GPIO: /sys/class/gpio/gpio121 | --- | I2S0_FS | GPIO3_D1 | 35 | 36 | GPIO2_C2 | UART0_CTSN | --- | GPIO: /sys/class/gpio/gpio82 UART: /dev/ttyS0 | 2,18 |
| 4,21 | GPIO: /sys/class/gpio/gpio149 | --- | SPDIF_TX | GPIO4_C5 | 37 | 38 | GPIO3_D3 | I2S0_SDI0 | --- | GPIO: /sys/class/gpio/gpio123 | 3,27 | 
| --- | --- | --- | GND | ---| 39 | 40 | GPIO3_D7 | I2S0_SDO0 | --- | GPIO: /sys/class/gpio/gpio127 | 3,31 |

&nbsp;

### 3.3.2 GPIO Sample Code

**C:**

C is a general-purpose, imperative computer programming language, supporting structured programming, lexical variable scope and recursion, while a static type system prevents many unintended operations.

Ps: The GPIO WiringPi for C library has been installed in Tinker Board 2 series by default. Step 1 and 2 can be ignored.

1. Navigate to folder

`cd /usr/local/share/gpio_lib_c_rk3399`

2. Install C GPIO library for Tinker Board 2 series

`sudo ./build`

3. Check install success or not

`gpio readall`

![Tinker 2S_GPIO](https://user-images.githubusercontent.com/89904531/154948131-d2750741-b174-4a2a-add4-d81e8bfe6945.png)

4. Reference codes

There’re few sample codes under this folder

`/usr/local/share/gpio_lib_c_rk3399/examples`

To make a simple script create a file with ‘nano blink.c’ and input the following code.

Sample LED blink: Please reference the pin map results about gpio readall.

 - GPIO

```
#include <stdio.h>
#include <wiringPi.h>

// LED Pin - wiringPi pin 30 is GPIO2A7 71.
#define LED     30

int main (void)
{
  printf ("Tinker board 2 blink\n") ;
  wiringPiSetup () ;
  pinMode (LED, OUTPUT) ;

for (;;)
  {
    digitalWrite (LED, HIGH) ;  // On
    delay (500) ;               // mS
    digitalWrite (LED, LOW) ;   // Off
    delay (500) ;
  }

  return 0 ;
}
```

To run the script run the command:

`sudo gcc -o blink blink.c -lwiringPi`

To run the newly compiled led run the command ‘`sudo ./blink`’ 

.sh file for Tinker_2S_Test_input_gpio: https://github.com/TinkerBoard/TinkerBoard/files/8109019/Tinker_2S_Test_input_gpio.zip

**Python:**

Python is a programming language that lets you work quickly and integrate systems more effectively.

Ps: The ASUS.GPIO for Python library has been installed in Tinker Board 2 series by default. Step 1 and 2 can be ignored.

1. Please refer to the pin mapping table above

2. Navigate to folder

`cd /usr/local/share/gpio_lib_python_rk3399`

3. Install Python GPIO library for Tinker Board 2 series for python and python3

```

sudo python setup.py install

sudo python3 setup.py install
```

4. Reference codes

There’re few sample codes under this folder

`cd /usr/local/share/gpio_lib_python_rk3399/test`

To check the sample code by ‘`nano forloop.py`’ and you can see the following codes.

Sample forloop functions: set the all gpio value to high and then set all gpio value to low

```
import ASUS.GPIO as GPIO
import unittest
import time
# to use ASUS tinker board pin numbers
GPIO.setmode(GPIO.BOARD)

# set up GPIO output channel, we set GPIO4 (Pin 7) to OUTPUT

n = 40

for counter in range (1, n+1):
        if counter == 1 or \
           counter == 2 or \
           counter == 4 or \
           counter == 6 or \
           counter == 9 or \
           counter == 14 or \
           counter == 17 or \
           counter == 20 or \
           counter == 25 or \
           counter == 30 or \
           counter == 34 or \
           counter == 39 :
                continue

        GPIO.setup(counter, GPIO.OUT)
        GPIO.output(counter,GPIO.HIGH)
        time.sleep(1)

for counter in range (1, n+1):
        if counter == 1 or \
           counter == 2 or \
           counter == 4 or \
           counter == 6 or \
           counter == 9 or \
           counter == 14 or \
           counter == 17 or \
           counter == 20 or \
           counter == 25 or \
           counter == 30 or \
           counter == 34 or \
           counter == 39 :
                continue

        GPIO.output(counter,GPIO.LOW)
        time.sleep(1)
```

To run the python sample code by the following commands:

`sudo python forloop.py`

Ps: Please reference the pin value by ‘gpio readall’.

&nbsp;

### 3.3.3 Application note

Due to hardware design limitations of certain pins, some designs incorporate level shifters, so there are a few things to keep in mind when using them.

- The location of pins with level shifter:
- Pins number: 7, 13, 15, 16, 18, 26
![image](https://user-images.githubusercontent.com/97945168/192920845-185e949e-ca3d-4d22-ab8c-8c41af04dea7.png)

**Precautions for use:**

If used as a GPI

- A pull-up/ pull-down resistor is needed to automatically restore the default state.
- If default status=1, need to add an external pull-up resistor and must be less than 1.65KΩ.
- If default status=0, it is recommended to use 100KΩ resistor to pull-down.
- This pin can no longer be set to GPO by the software (unless the external resistor design is modified!).

Requirements in the datasheet for input:

![1](https://user-images.githubusercontent.com/97945168/192922029-1f36e537-d083-43f2-a102-5ac168efdad1.png)

Recommended circuits:

![2](https://user-images.githubusercontent.com/97945168/192922637-8e17a1a8-ebfb-49c1-acc8-1bc7e333636c.png)
&nbsp;


### 3.3.4 How to configure GPIO as an individual function and the function work

* The IO mapping can be found at:  
    https://github.com/TinkerBoard/TinkerBoard/wiki/Tinker-Board-2-&-2S-(Editing...)#33-gpio

#### 3.3.4.1 WiringPi C library for Debian 

**I2C WiringPi for C library for Debian**

* Firstly, modify the /boot/config.txt file as following and then reboot to enable I2C6 (wiringPi only support 1 I2C interface).

```
##### Hardware Interface Config #####

## Note: uart4 and spi1 are the same pins. Set the latter one while both on. ##

intf:fiq_debugger=on
#intf:uart0=off
#intf:uart4=off
intf:i2c6=on
#intf:i2c7=off
#intf:i2s0=off
#intf:spdif=off
#intf:spi1=off
#intf:spi5=off
#intf:pwm0=off
#intf:pwm1=off
#intf:pwm3a=off
#intf:test_clkout2=off

```
*    Compiler the following sample codes for DS3231 RTC device

```
1. Sample codes ds3231.c
==============================================================
#include <wiringPi.h>
#include <wiringPiI2C.h>  
#include <stdio.h>
 
#define DS3231_Address 0x68
//seconds,minutes,hours,weekdays,days,months,yeas
char  buf[]={0x00,0x00,0x22,0x06,0x27,0x12,0x19};
char  *str[]  ={"SUN","Mon","Tues","Wed","Thur","Fri","Sat"};
int fd,i;
 
void pcf8563SetTime()
{
    for(i = 0;i < 7;i++)
    {
        wiringPiI2CWriteReg8(fd,i,buf[i]);
    }
}
 
void pcf8563ReadTime() 
{   
    for(i = 0;i < 7;i++)
    {
        buf[i] = (char)wiringPiI2CReadReg8(fd,i);
    }
} 
 
int main(int argc, char **argv)  
{  
    if(wiringPiSetup() < 0)return 1;  
       fd = wiringPiI2CSetup(DS3231_Address);
    printf("DS3231 Test Program ...\n\n"); 
 
    pcf8563SetTime(); 
    while(1)  
    {  
           pcf8563ReadTime();
        buf[0] = buf[0]&0x7F; //sec
        buf[1] = buf[1]&0x7F; //min
        buf[2] = buf[2]&0x3F; //hour
        buf[3] = buf[3]&0x07; //week
        buf[4] = buf[4]&0x3F; //day
        buf[5] = buf[5]&0x1F; //mouth
        //year/month/day
        printf("20%02x/%02x/%02x  ",buf[6],buf[5],buf[4]);
        //hour:minute/second
        printf("%02x:%02x:%02x  ",buf[2],buf[1],buf[0]);
        //weekday
        printf("%s\n",str[(unsigned char)buf[3]]);
        delay(1000); 
    } 
    return 0;  
}
==============================================================

```
1. Compiler sample code by wiringPi library and then get the ds3231 binary file
  
` $ gcc -o ds3231 ds3231.c -lwiringPi`

2. Execute the ds3231 file to get the RTC time

` $ ./ds3231`

.C file of ds3231: https://github.com/TinkerBoard/TinkerBoard/files/8108998/ds3231.zip


Reference of the wiringPi API:  http://wiringpi.com/reference/i2c-library/

**Pwm wiringPi for C library**:

* Firstly, modify the /boot/config.txt file as following and then reboot for SoftPwm function.


```

##### Hardware Interface Config #####

## Note: uart4 and spi1 are the same pins. Set the latter one while both on. ##

intf:fiq_debugger=on
#intf:uart0=off
#intf:uart4=off
#intf:i2c6=off
#intf:i2c7=off
#intf:i2s0=off
#intf:spdif=off
#intf:spi1=off
#intf:spi5=off
#intf:pwm0=off
#intf:pwm1=off
#intf:pwm3a=off
#intf:test_clkout2=off

```

* Compiler the following sample codes for SPI interface


```

1. Sample codes /usr/local/share/gpio_lib_c_rk3399/examples/softPwm.c
==============================================================
#include 
#include 
#include 

#include 
#include 

#define RANGE		100
#define	NUM_LEDS	  8

int ledMap [NUM_LEDS] = { 0, 1, 2, 3, 4, 5, 6, 7 } ;

int values [NUM_LEDS] = { 0, 25, 50, 75, 100, 75, 50, 25 } ;

int main ()
{
  int i, j ;
  char buf [80] ;

  wiringPiSetup ()  ;

  for (i = 0 ; i < NUM_LEDS ; ++i)
  {
    softPwmCreate (ledMap [i], 0, RANGE) ;
    printf ("%3d, %3d, %3d\n", i, ledMap [i], values [i]) ;
  }

  fgets (buf, 80, stdin) ;

// Bring all up one by one:

  for (i = 0 ; i < NUM_LEDS ; ++i)
    for (j = 0 ; j <= 100 ; ++j)
    {
      softPwmWrite (ledMap [i], j) ;
      delay (10) ;
    }

  fgets (buf, 80, stdin) ;

// All Down

  for (i = 100 ; i > 0 ; --i)
  {
    for (j = 0 ; j < NUM_LEDS ; ++j)
      softPwmWrite (ledMap [j], i) ;
    delay (10) ;
  }

  fgets (buf, 80, stdin) ;

  for (;;)
  {
    for (i = 0 ; i < NUM_LEDS ; ++i)
      softPwmWrite (ledMap [i], values [i]) ;

    delay (50) ;

    i = values [0] ;
    for (j = 0 ; j < NUM_LEDS - 1 ; ++j)
      values [j] = values [j + 1] ;
    values [NUM_LEDS - 1] = i ;
  }
}
==============================================================

```


```

1. Compiler sample code by wiringPi library and then get the softPwm binary file
   $ gcc -o softPwm softPwm.c -lwiringPi
2. Execute the softPwm file to simulate by GPIO pins.
   $ sudo ./softPwm
   0,    0,    0
   1,    1,   25
   2,    2,   50
   3,    3,   75
   4,    4,  100
   5,    5,   75
   6,    6,   50
   7,    7,   25

```

[softPwm.zip](https://github.com/TinkerBoard/TinkerBoard/files/8113148/softPwm.zip)

Reference for the wiringPi API: http://wiringpi.com/reference/software-pwm-library/

**Spi wiringPi for C library**:

* Firstly, modify the /boot/config.txt file as following and then reboot to enable  SPI1 and SPI5.


```
##### Hardware Interface Config #####

## Note: uart4 and spi1 are the same pins. Set the latter one while both on. ##

intf:fiq_debugger=on
#intf:uart0=off
#intf:uart4=off
#intf:i2c6=off
#intf:i2c7=off
#intf:i2s0=off
#intf:spdif=off
intf:spi1=on
intf:spi5=on
#intf:pwm0=off
#intf:pwm1=off
#intf:pwm3a=off
#intf:test_clkout2=off

```


* Compiler the folloiwng sample codes for SPI interface


```
1. Sample codes /usr/local/share/gpio_lib_c_rk3399/examples/spiSpeed.c
==============================================================
/*
 * spiSpeed.c:
 *    Code to measure the SPI speed/latency.
 *    Copyright (c) 2014 Gordon Henderson
 ***********************************************************************
 * This file is part of wiringPi:
 *    https://projects.drogon.net/raspberry-pi/wiringpi/
 *
 *    wiringPi is free software: you can redistribute it and/or modify
 *    it under the terms of the GNU Lesser General Public License as
 *    published by the Free Software Foundation, either version 3 of the
 *    License, or (at your option) any later version.
 *
 *    wiringPi is distributed in the hope that it will be useful,
 *    but WITHOUT ANY WARRANTY; without even the implied warranty of
 *    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *    GNU Lesser General Public License for more details.
 *
 *    You should have received a copy of the GNU Lesser General Public
 *    License along with wiringPi.
 *    If not, see <http://www.gnu.org/licenses/&gt;.
 ***********************************************************************
 */


#include <stdio.h>
#include <stdlib.h>
#include <unistd.h>
#include <stdint.h>
#include <string.h>
#include <errno.h>

#include <wiringPi.h>
#include <wiringPiSPI.h>

#define    TRUE    (1==1)
#define    FALSE    (!TRUE)

#define    SPI_CHAN        1
#define    NUM_TIMES        100
#define    MAX_SIZE        (1024*1024)

static int myFd ;


void spiSetup (int speed)
{
  if ((myFd = wiringPiSPISetup (SPI_CHAN, speed)) < 0)
  {
    fprintf (stderr, "Can't open the SPI bus: %s\n", strerror (errno)) ;
    exit (EXIT_FAILURE) ;
  }
}


int main (void)
{
  int speed, times, size ;
  unsigned int start, end ;
  int spiFail ;
  unsigned char *myData ;
  double timePerTransaction, perfectTimePerTransaction, dataSpeed ;

  if ((myData = malloc (MAX_SIZE)) == NULL)
  {
    fprintf (stderr, "Unable to allocate buffer: %s\n", strerror (errno)) ;
    exit (EXIT_FAILURE) ;
  }

  wiringPiSetup () ;

  for (speed = 1 ; speed <= 32 ; speed *= 2)
  {
    printf ("+-------+--------+----------+----------+-----------+------------+\n") ;
    printf ("|   MHz |   Size | mS/Trans |      TpS |    Mb/Sec | Latency mS |\n") ;
    printf ("+-------+--------+----------+----------+-----------+------------+\n") ;

    spiFail = FALSE ;
    spiSetup (speed * 1000000) ;
    for (size = 1 ; size <= MAX_SIZE ; size *= 2)
    {
      printf ("| %5d | %6d ", speed, size) ;

      start = millis () ;
      for (times = 0 ; times < NUM_TIMES ; ++times)
    if (wiringPiSPIDataRW (SPI_CHAN, myData, size) == -1)
    {
      printf ("SPI failure: %s\n", strerror (errno)) ;
      spiFail = TRUE ;
      break ;
    }
      end = millis () ;

      if (spiFail)
    break ;

      timePerTransaction        = ((double)(end - start) / (double)NUM_TIMES) / 1000.0 ;
      dataSpeed                 =  (double)(size * 8)    / (1024.0 * 1024.0) / timePerTransaction  ;
      perfectTimePerTransaction = ((double)(size * 8))   / ((double)(speed * 1000000)) ;

      printf ("| %8.3f ", timePerTransaction * 1000.0) ;
      printf ("| %8.1f ", 1.0 / timePerTransaction) ;
      printf ("| %9.5f ", dataSpeed) ;
      printf ("|   %8.5f ", (timePerTransaction - perfectTimePerTransaction) * 1000.0) ;
      printf ("|\n") ;

    }

    close (myFd) ;
    printf ("+-------+--------+----------+----------+-----------+------------+\n") ;
    printf ("\n") ;
  }

  return 0 ;
}
==============================================================

```


```

1. Compiler sample code by wiringPi library and then get the piSpeed binary file
   $ gcc -o spiSpeed spiSpeed.c -lwiringPi
2. Execute the spiSpeed file to get the RTC time
   $ ./spiSpeed
+-------+--------+----------+----------+-----------+------------+
|   MHz |   Size | mS/Trans |      TpS |    Mb/Sec | Latency mS |
+-------+--------+----------+----------+-----------+------------+
|     1 |      1 |    0.170 |   5882.4 |   0.04488 |    0.16200 |
|     1 |      2 |    0.220 |   4545.5 |   0.06936 |    0.20400 |
|     1 |      4 |    0.230 |   4347.8 |   0.13269 |    0.19800 |
|     1 |      8 |    0.230 |   4347.8 |   0.26537 |    0.16600 |
|     1 |     16 |    0.430 |   2325.6 |   0.28388 |    0.30200 |
|     1 |     32 |    0.410 |   2439.0 |   0.59546 |    0.15400 |
|     1 |     64 |    0.910 |   1098.9 |   0.53657 |    0.39800 |
|     1 |    128 |    1.650 |    606.1 |   0.59186 |    0.62600 |
|     1 |    256 |    3.470 |    288.2 |   0.56286 |    1.42200 |
|     1 |    512 |    6.610 |    151.3 |   0.59096 |    2.51400 |
|     1 |   1024 |   12.590 |     79.4 |   0.62053 |    4.39800 |
|     1 |   2048 |   24.540 |     40.7 |   0.63672 |    8.15600 |
|     1 |   4096 |   48.750 |     20.5 |   0.64103 |   15.98200 |
|     1 |   8192 SPI failure: Message too long
+-------+--------+----------+----------+-----------+------------+
....

```

[spiSpeed.zip](https://github.com/TinkerBoard/TinkerBoard/files/8113157/spiSpeed.zip)

Reference for the wiringPi API: http://wiringpi.com/reference/spi-library/


**Uart wiringPi for C library**: 

* Firstly, modify the /boot/config.txt file as following and then reboot to enable UART0 and UART4.


```

##### Hardware Interface Config #####

## Note: uart4 and spi1 are the same pins. Set the latter one while both on. ##

intf:fiq_debugger=on
intf:uart0=on
intf:uart4=on
#intf:i2c6=off
#intf:i2c7=off
#intf:i2s0=off
#intf:spdif=off
#intf:spi1=off
#intf:spi5=off
#intf:pwm0=off
#intf:pwm1=off
#intf:pwm3a=off
#intf:test_clkout2=off

```


* Compiler the following sample codes by Uart cable


```

1. Test the Uart0 TX/RX by Sample codes /usr/local/share/gpio_lib_c_rk3399/examples/serialTest.c
==============================================================
/*
 * serialTest.c:
 *	Very simple program to test the serial port. Expects
 *	the port to be looped back to itself
 *
 * Copyright (c) 2012-2013 Gordon Henderson. 
 ***********************************************************************
 * This file is part of wiringPi:
 *	https://projects.drogon.net/raspberry-pi/wiringpi/
 *
 *    wiringPi is free software: you can redistribute it and/or modify
 *    it under the terms of the GNU Lesser General Public License as published by
 *    the Free Software Foundation, either version 3 of the License, or
 *    (at your option) any later version.
 *
 *    wiringPi is distributed in the hope that it will be useful,
 *    but WITHOUT ANY WARRANTY; without even the implied warranty of
 *    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *    GNU Lesser General Public License for more details.
 *
 *    You should have received a copy of the GNU Lesser General Public License
 *    along with wiringPi.  If not, see www.gnu.org="">.
 ***********************************************************************
 */

#include 
#include 
#include 

#include 
#include 

int main ()
{
  int fd ;
  int count ;
  unsigned int nextTime ;

  if ((fd = serialOpen ("/dev/ttyS0", 115200)) < 0)
  {
    fprintf (stderr, "Unable to open serial device: %s\n", strerror (errno)) ;
    return 1 ;
  }

  if (wiringPiSetup () == -1)
  {
    fprintf (stdout, "Unable to start wiringPi: %s\n", strerror (errno)) ;
    return 1 ;
  }

  nextTime = millis () + 300 ;

  for (count = 0 ; count < 256 ; )
  {
    if (millis () > nextTime)
    {
      printf ("\nOut: %3d: ", count) ;
      fflush (stdout) ;
      serialPutchar (fd, count) ;
      nextTime += 300 ;
      ++count ;
    }

    delay (3) ;

    while (serialDataAvail (fd))
    {
      printf (" -> %3d", serialGetchar (fd)) ;
      fflush (stdout) ;
    }
  }

  printf ("\n") ;
  return 0 ;
}

==============================================================

```



```

1. Compiler sample code by wiringPi library and then get the serialTest binary file
   $ gcc -o serialTest serialTest.c -lwiringPi
2. Execute the serialTest file to test Uart TX/RX
   $ ./serialTest
   -> Device log for RX
      "Out:  17:  ->  53 ->  53 ->  53 ->  53 ->  53 ->  53 ->  53 ->  52 ->  52 ->  52 ->  52 ->"
   -> PC putty log for TX
      "123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\]^_`abcdefghijklmnopqrstuvwxyz{|}..."

```

[serialTest.zip](https://github.com/TinkerBoard/TinkerBoard/files/8113170/serialTest.zip)


Reference for the wiringPi API: http://wiringpi.com/reference/serial-library/



***




#### 3.3.4.2 Mraa library for android

The IO mapping can be found at: https://github.com/TinkerBoard/TinkerBoard/wiki/User-Guide#gpio-config-table-for-tinker-board-2s

Android Archive file for the IO interface of 40 pin on ASUS Tinker Board 2: 
[mraa-2.2.0.zip](https://github.com/TinkerBoard/TinkerBoard/files/8113275/mraa-2.2.0.zip)

The Sample codes of Mraa API for Tinker Board 2:
[Android-MraaDemo_tinkerboard2.zip](https://github.com/TinkerBoard/TinkerBoard/files/8113283/Android-MraaDemo_tinkerboard2.zip)

The apk of Mraa API for Tinker Board 2:
[Android-MraaDemo_tinkerboard2_APK.zip](https://github.com/TinkerBoard/TinkerBoard/files/8113319/Android-MraaDemo_tinkerboard2_APK.zip)

GPIO pin test SOP:
[GPIOpins_Test_SOP.pdf](https://github.com/TinkerBoard/TinkerBoard/files/9696218/GPIOpins_Test_SOP.pdf)

I2C test SOP
[I2C_Test_SOP.pdf](https://github.com/TinkerBoard/TinkerBoard/files/9696221/I2C_Test_SOP.pdf)

PWM test SOP
[PWM_Test_SOP.pdf](https://github.com/TinkerBoard/TinkerBoard/files/9696235/PWM_Test_SOP.pdf)

SPI test SOP
[SPI_Test_SOP.pdf](https://github.com/TinkerBoard/TinkerBoard/files/9696239/SPI_Test_SOP.pdf)

UART test SOP
[UART_Test_SOP.pdf](https://github.com/TinkerBoard/TinkerBoard/files/9696243/UART_Test_SOP.pdf)


* Class

| class | constructor | class | constructor |
| --- | --- | --- | --- |
| Gpio | Gpio(int pin_index) | Pwm | Pwm (int pin_index) |
| I2c | I2c (int i2c_index) | Uart | Uart(int uart_index) | 
| Spi | Spi (int spi_index)	| --- | --- | 


* Index Class

-GPIO

| Tinker Board | Field | Index Value |
|--- | --- | --- |
| Tinker Board | TINKERBOARD_PIN3	 | 3 |
| Tinker Board | TINKERBOARD_PIN3	 | 5 |
| Tinker Board | TINKERBOARD_PIN3	 | 7 |
| Tinker Board | TINKERBOARD_PIN3	 | 8 |
| Tinker Board | TINKERBOARD_PIN3	 | 10 |
| Tinker Board | TINKERBOARD_PIN3	 | 11 |
| Tinker Board | TINKERBOARD_PIN3	 | 12 |
| Tinker Board | TINKERBOARD_PIN3	 | 13 |
| Tinker Board | TINKERBOARD_PIN3	 | 15 |
| Tinker Board | TINKERBOARD_PIN3	 | 16 |
| Tinker Board | TINKERBOARD_PIN3	 | 18 |
| Tinker Board | TINKERBOARD_PIN3	 | 19 |
| Tinker Board | TINKERBOARD_PIN3	 | 21 |
| Tinker Board | TINKERBOARD_PIN3	 | 22 |
| Tinker Board | TINKERBOARD_PIN3	 | 23 |
| Tinker Board | TINKERBOARD_PIN3	 | 24 |
| Tinker Board | TINKERBOARD_PIN3	 | 26 |
| Tinker Board | TINKERBOARD_PIN3	 | 27 |
| Tinker Board | TINKERBOARD_PIN3	 | 28 |
| Tinker Board | TINKERBOARD_PIN3	 | 29 |
| Tinker Board | TINKERBOARD_PIN3	 | 31 |
| Tinker Board | TINKERBOARD_PIN3	 | 32 |
| Tinker Board | TINKERBOARD_PIN3	 | 33 |
| Tinker Board | TINKERBOARD_PIN3	 | 35 |
| Tinker Board | TINKERBOARD_PIN3	 | 36 |
| Tinker Board | TINKERBOARD_PIN3	 | 37 |
| Tinker Board | TINKERBOARD_PIN3	 | 38 |
| Tinker Board | TINKERBOARD_PIN3	 | 40 |



-I2C

| TinkerBoard2I2C |	Field |	Index Value | The Uart Interface |
|--- | --- | --- | --- |
| TinkerBoard2I2C | TINKERBOARD_2_I2C6 | 0 | I2c6 |
| TinkerBoard2I2C | TINKERBOARD_2_I2C7 | 1 | I2c7 |



-SPI

| TinkerBoard2UART | Field | Index Value | The Uart Interface |
|--- | --- | --- | --- |
| TinkerBoard2UART | TINKERBOARD_2_SPI1 | 0 | Spi1 |
| TinkerBoard2UART | TINKERBOARD_2_SPI5 | 1	| Spi5 |
 

-UART

| TinkerBoard2UART | Field | Index Value | The Uart Interface |
|--- | --- | --- | --- |
| TinkerBoard2UART | TINKERBOARD_2_UART0 | 0 | uart0 |
| TinkerBoard2UART | TINKERBOARD_2_UART4 | 1 | uart4 |




* The mraa API Class for Android




- Gpio
	      
| Methods | Parameter | Description | Return |
| --- | --- | --- | --- |
| dir(Dir dir) | Dir | Set input/output | Result | 
| readDir() | void | Read input/output dir | Dir |
| read() | void | Set input and read gpio value | 0/1 |
| write(int v) | 0/1 | Set output value | Result |




- I2c

| Methods | Parameter | Description | Return |
| --- | --- | --- | --- |
| address(short a) | 0x00-0xFF | Set i2c address | Result |
| readByte() | void | Read a byte data form i2c  |	short |
| writeByte(short b) | Mode | Write a byte data to i2c | Result |
| read(byte[] buf) | byte[] | Read a byte[] data form i2c | read size |
| write(byte[] buf)	byte[] | Write a byte[] data to i2c | Result | 
| readReg(short a) | 0x00-0xFF | Read a byte data form i2c addr | short |
| writeReg(short a, short d) | 0x00-0xFF, 0x00-0xFF| Write a byte data to i2c addr | Result
| readWordReg(short a) | 0x00-0xFF | Read a byte[2] data form i2c addr | int |
| writeWordReg(short a, int d) | 0x00-0xFF, 0x0000-0xFFFF | Write a byte[2] data to i2c addr | Result
| readBytesReg(short a, byte[] b) | 0x00-0xFF, byte[] | Read a byte[] data form i2c addr | int




- Pwm

| Methods | Parameter | Description | Return |
| --- | --- | --- | --- |
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




- Spi

| Methods | Parameter | Description | Return |
| --- | --- | --- | --- |
| defaultConfig() | void | Set mraa default config (mode0,lsb=0,bits=8) | Result |
| mode(Spi_Mode m) | void | Set spi mode | Result |
| frequency(int f) | int | Set spi frequency max=48000000 | Result |
| lsbmode(boolean l) | true/false | Set spi lsmode | Result |
| bitPerWord(long b) | 8/16 | Set spi bit_pre_word | Result |
| writeByte(short a) | 0x00-0xFF | Write a byte data to spi | int(recv data) |
| writeWord(int a) | 0x0000-0xFFFF | Write a byte[2] data to spi | int(recv data) |
| write(byte[] b) | byte[] | Write a byte[] data to spi | byte[](recv data) |



- Uart

| Methods | Parameter | Description | Return |
| --- | --- | --- | --- |
| defaultConfig() | void | Set mraa default config (9600 8N1, no echo or special character) | Result |
| setBaudRate(long b) | long | Set uart baudrate max=150000000 | Result |
| setMode(int bytesize, UartParity parity, int stopbits) | int | Set the transfer mode | Result |
| setFlowcontrol(boolean xonxoff, boolean rtscts) | true/false | Set the flowcontrol | Result |
| setTimeout(int read, int write, int interchar) | -1 - int_max | Set the timeout for read and write operations | Result |
| setNonBlocking(boolean b) | true/false | Set the blocking state for write operations | Result |
| sendBreak(int b) | 0 - max_int | Send a break to the device. | Result |
| flush() | void | Flush the outbound data. | Result |
| dataAvailable() | void | Check to see if data is available on the device for reading, return immediately | boolean
| dataAvailable(long timeout) | 1 - int_max | Check to see if data is available on the device for reading and time out | boolean |
| readStr(int length) | 1 - int_max | Read bytes from the device into a String object | String |
| writeStr(String s) | String | Write bytes in String object to a device | int |
| read(byte[] data) | byte[] | Check to see if data is available on the device for reading and time out | int(read size) |
| wrtie(byte[] data) | byte[] | Check to see if data is available on the device for reading and time out | int(write size) |


* Example for 40 pin hardware interface

-GPIO

```
import mraa.*;

//Test GPIO 3 hardware interface
Gpio gpio3 = new Gpio(TinkerBoard.TINKERBOARD_PIN3.swigValue());
gpio3.dir(Dir.DIR_OUT);
gpio3.write(1);
```

-I2c
```
import mraa.*;

//Test I2c6 interface
I2c i2c = new I2c(TinkerBoard2I2C.TINKERBOARD_2_I2C6.swigValue());
//Test by ADXL345 accelerometer I2c device
i2c.address((short) 0x53);
i2c.writeReg((short)0x01, (short) 0x57);
try {
    Thread.sleep(1000);
} catch (InterruptedException e) {
    e.printStackTrace();
}
i2c.adress((short) 0x50);
Log.d(TAG, "i2c2 read: 0x" + Integer.toHexString(i2c.readReg((short)0x01)));
```


-Pwm

```
import mraa.*;

//enable the pwm0 signal
Pwm pwm =  new Pwm(TinkerBoard.TINKERBOARD_PIN32.swigValue());
pwm.period_us(20000);
pwm.write((float) 0.5);
pwm.enable(true);

//release the pwm signal
pwm.enable(false);
pwm.unexport();
```

-Spi
```
import mraa.*;

//Test Spi5 interface
Spi spi = new Spi(TinkerBoard2SPI.TINKERBOARD_2_SPI5.swigValue());
byte[] recv = spi.write(new byte[]{0x41, 0x61});
Log.d(TAG, String.format("onCreate: recv[0]=0x%x, recv[1]=0x%x, recv[0], recv[1]"));
```

-Uart
```
import mraa.*;

//Test Uart4 interface
Uart uart = new Uart(TinkerBoard2UART.TINKERBOARD_2_UART4.swigValue());
uart.defaultConfig();
uart.setBaudRate(115200);
uart.writeStr("ASUS Tinker Board");
String read = uart.readStr(6);
Log.d(TAG, "uart4 read: " + read);
```

&nbsp;

## 3.4 Fan control

* The FAN connector offers **500mA maximum** by hardware design.
* It provides be controlled High/Low speed by software and kindly find the control method below:

    1. **High speed** setting on **FAN_SPD_CTRL**

        ```
        sudo -i
        echo "154" > /sys/class/gpio/export
        echo "out" > /sys/class/gpio/gpio154/direction
        echo "1" > /sys/class/gpio/gpio154/value
        ```
    2.  **Low speed** setting on **FAN_SPD_CTRL**

        ```
        echo "0" > /sys/class/gpio/gpio154/value
        ```
&nbsp;

# 4. Peripherals Guide

## 4.1 Pi Supply
### 4.1.1 PaPiRus ePaper / eInk Screen HAT for Raspberry Pi
  1. **Enable i2c6 and spi1 in tinker-config then reboot device**　
  2. **Connect to network**
  3. **Sudo apt-get update**
  4. **Install PaPiRus kit as follow steps**
      ````
      # Install dependencies
      sudo apt-get install git bc i2c-tools fonts-freefont-ttf whiptail make gcc -y
      # For Python 2
      sudo apt-get install python-pil python-smbus python-dateutil -y
      # For Python 3
      sudo apt-get install python3-pil python3-smbus python3-dateutil python3-distutils -y
     
      ````
      ````
      git clone --depth=1 https://github.com/PiSupply/PaPiRus.git
      cd PaPiRus
      
      git apply papirus-HAT.diff # for HAT ePaper
      or 
      git apply papirus-PHAT.diff # for PHAT ePaper
      
      # For Python 2
      sudo python setup.py install    # Install PaPirRus python library
      # For Python 3
      sudo python3 setup.py install    # Install PaPirRus python library
      ````

   5. config the screen size 1.44 | 2.0 | 2.7
      ````
      sudo papirus-set [1.44 | 2.0 | 2.7 ]
      or
      sudo papirus-config
      ````

   6.execute the python scipt in PaPiRus/bin

  **Note**
  1. couse of HW limitation, SW1 can't work on HAT, and SW2 can't work on PHAT, board pin 36 is pulled high to 3.3V by HW
  2. need to execute setup.py command every time modify files in PaPiRus
  3. some python script use RPI kit, we don't support it, like papirus-snake and  papirus-can etc.
  4. all modification base on follow link, and just for research, https://github.com/PiSupply/PaPiRus

     [gratis.zip](https://github.com/TinkerBoard/TinkerBoard/files/9702608/gratis.zip)

&nbsp;

### 4.1.2 Pi PoE Switch HAT - Power over Ethernet for Raspberry Pi
  1. **Open the terminal and run the following command**
      ````
     git clone --recursive https://github.com/PiSupply/PiPoE.git
      ````
  2. **Move install_tinker2.sh, removepower_tinkerboard2.py, pipoe_tinkerboard2.service and uninstall_tinkerboard2.sh to the folder PiPoE**
  3. **Execute install_tinker2.sh for installation**
  4. **For uninstallation, please execute uninstall_tinkerboard2.sh**
  5. **Commands for LED controlling**
      ````
      gpio -g mode 86 out
      gpio -g write 86 1
      ````
  6. **This will turn on the green of the dual LED**
      ````
      gpio -g mode 84 out 
      gpio -g mode 87 out 
      gpio -g write 84 1 
      gpio -g write 87 0

      ````
  7. **This will turn on the amber of the dual LED**
      ````
      gpio -g mode 84 out
      gpio -g mode 87 out
      gpio -g write 84 0
      gpio -g write 87 1
      ````
[PiPoE.zip](https://github.com/TinkerBoard/TinkerBoard/files/9856890/PiPoE.zip)

&nbsp;

### 4.1.3 Pi Supply PaPiRus Zero ePaper/eInk pHAT v1.2
  1. **Enable i2c6 and spi1 in tinker-config then reboot device**
  2. **Connect to network**
  3. **Sudo apt-get update**
  4. **Install PaPiRus kit as follow steps**
      ````
      # Install dependencies
      sudo apt-get install git bc i2c-tools fonts-freefont-ttf whiptail make gcc -y
      # For Python 2
      sudo apt-get install python-pil python-smbus python-dateutil -y
      # For Python 3
      sudo apt-get install python3-pil python3-smbus python3-dateutil python3-distutils -y

      git clone --depth=1 https://github.com/PiSupply/PaPiRus.git
      cd PaPiRus

      git apply papirus-HAT.diff # for HAT ePaper
      or 
      git apply papirus-PHAT.diff # for PHAT ePaper

      # For Python 2
      sudo python setup.py install    # Install PaPirRus python library
      # For Python 3
      sudo python3 setup.py install    # Install PaPirRus python library
      ````
      
      ````
      sudo apt-get install libfuse-dev -y

      mkdir /tmp/papirus
      cd /tmp/papirus
      git clone https://github.com/repaper/gratis.git

      cd /tmp/papirus/gratis
      git apply gratis.diff

      make rpi EPD_IO=epd_io.h PANEL_VERSION='V231_G2'
      sudo make rpi-install EPD_IO=epd_io.h PANEL_VERSION='V231_G2'
      sudo systemctl enable epd-fuse.service
      sudo reboot
      ````
  5. **Config the screen size 1.44 | 2.0 | 2.7**
      ````
      sudo papirus-set [1.44 | 2.0 | 2.7 ]
      or
      sudo papirus-config
      ````
  6. **Execute the python scipt in PaPiRus/bin**

  **Note**
  1. Couse of HW limitation, SW1 can't work on HAT, and SW2 can't work on PHAT, board pin 36 is pulled high to 3.3V by HW
  2. Need to execute setup.py command every time modify files in PaPiRus
  3. Some python script use RPI kit, we don't support it, like papirus-snake and  papirus-can etc.
  4. All modification base on follow link, and just for research, https://github.com/PiSupply/PaPiRus

     [gratis.zip](https://github.com/TinkerBoard/TinkerBoard/files/9702611/gratis.zip)

&nbsp;

### 4.1.4 IoT Gateway HAT for Raspberry Pi (868MHz/915MHz) with LoRa®
   IOT LoRa Gateway HAT at Raspberry Pi GPIO Pinout
   |Product | SPI interface ID | Reset GPIO ID|
   |-- | -- | --|
   |Tinker/Tinker S | 2.0 | 167|
   |Tinker 2 | 1.0 | 84|
   |Raspberry Pi 3 | 0.0 | 22|

  1. **Enable spi in tinker-config then reboot**
      ````
      sudo tinker-config
      # Enable spi2 when using Tinker/Tinker S
      # Enable spi1 when using Tinker2
      sudo reboot
      ````
  2. **Copy lorthon_libloragw_modified into device**
  3. **Connect to network**
  4. **Install dependencies as following steps**
      ````
      cd lorthon_libloragw_modified
      # Install pip on python2.7
      sudo python get-pip.py
      # Install cython
      sudo pip install cython
      ````
  5. **Modify library.cfg in lorthon_libloragw_modified/libloragw**
      ````
      nano libloragw/library.cfg
      # The value of PLATFORM represents the config file at libloragw/inc folder, eg iotloragw_tnk2 = inc/iotloragw_tnk2.h
      # For Tinker/Tinker S, set PLATFORM value to iotloragw_tnk
      # For Tinker2, set PLATFORM value to iotloragw_tnk2
      ````
  6. **Build python library**
      ````
      cd lorthon_libloragw_modified
      make
      sudo cp output/lorthon.so /usr/lib/python2.7/lorthon.so
      ````
 7. **Use python with lorthon library**
      ````
      sudo python
      =========== in python ============
      import lorthon
      import time
      lorthon.py_LoRaInit("global_conf.json")
      while True:
          time.sleep(1)
          lorthon.py_LoRaRx()
      ````

  **Note**
  1. Use lora-gateway-reset.sh to trigger gateway reset via gpio
      ````
      # For Tinker/Tinker S
      sudo ./tinker-lora-gateway-reset.sh
      # For Tinker2
      sudo ./tinker2-lora-gateway-reset.sh
      ````
  2. To setup gateway, please follow guide at https://www.mobilefish.com/download/lora/lora_part30.pdf to change global_conf.json
  3. For LoRa raw TX test, please use util_tx_test instead of lorthon
      ````
      cd util_tx_test
      ./util_tx_test -r 1257 -f 915 -k 1 -m LORA -b 125 -s 9 -c 2 -l 9
      ````
  4. All modification based on following links, and just for research https://github.com/galalmounir/lorthon https://github.com/PiSupply/lora_gateway


&nbsp;

# 5. Others

## 5.1 ASUS IoT API

* [ASUS API Programming Guide](https://tinker-board.asus.com/images/doc/download/Asus_API_Programming_Guide_v1.00_20211008.pdf)

* [ASUS API (Library, Header files, Sample code)](https://tinker-board.asus.com/images/doc/download/asusapi_1.0.0-1_aarch64-linux-gnu.tgz.zip)

&nbsp;