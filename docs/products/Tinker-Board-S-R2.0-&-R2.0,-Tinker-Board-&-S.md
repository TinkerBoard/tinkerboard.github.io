# Tinker Board (S) (R2.0)
# 1. Linux Development

## 1.1 Flash image

### 1.1.1 Boot mode

 **UMS mode**
   
   The USB mass storage class is a USB function which can be used to export and share the storage. When the board is booted into the UMS mode, it shares the internal storage (eMMC) to the connected PC just like a hard drive connected to the PC. Then, the users can use the software such as [balenaEtcher](https://www.balena.io/etcher/) to flash the image into the internal storage (eMMC).

   The UMS function is implemented in u-boot. During the u-boot boot-up stage, it will check whether the board is connected to a PC or not. If connected to a PC, the board will enter UMS mode automatically. If not, the board will follow the boot priority to continue the boot process.

   **1. Boot the board into the UMS mode from the internal storage (eMMC)**
   
   If the u-boot in the internal storage (eMMC) is still workable with the UMS function, then follow the below steps.
   
   1. Make sure there is no SD card installed on the board.
   2. Connect the board with a PC via USB and then power on the board.
   3. Then, the board will boot into the UMS mode automatically.

   **2. Boot the device into the UMS from a SD card**
   
   If there is no workable u-boot in the internal storage (eMMC), in this case the board can not boot into the UMS mode from the internal storage (eMMC), you can boot the board into the UMS mode from a SD card.

   1. Flash the image (with u-boot including UMS function) into a SD card.
   2. Install the SD card to the board.
   3. Connect the board with a PC via USB and then power on the board.
   4. Then, the board will boot into the UMS mode automatically. (You may need to enable the MASKROM jumper to force the device to boot from SD, jump out the eMMC.)

   **3. Without UMS mode**
   
   Recovery from SD’s image system & without the PC mode 

   1. Plug the Jumper on the Maskrom mode. (force to boot from SD, jump out the eMMC)
   2. Flash the Image (any can bootable) to SD card.
   3. Plug the SD card to the board.
   4. Booting the board. It would boot up to the RootFS.
   5. use either command dd or methods to flash new image file to eMMC(mmcblk1).

&nbsp;

### 1.1.2 Flash image

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

   3. Insert the bootable micro SD card into your Tinker Board, then connect the power supply, keyboard, mouse, and monitor to boot up.

   
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

   3. Download the TinkerOS image from the Tinker Board website (https://tinker-board.asus.com/download. html) and burn it into the Tinker Board using a third-party ISO software, such as [balenaEtcher](https://www.balena.io/etcher/).

   4. After the TinkerOS image is successfully burned, disconnect all cables from the Tinker Board.

   5. Connect the power supply, keyboard, mouse, and monitor to your Tinker Board to boot up.

&nbsp;

## 1.2 How to check image version

You can execute the following command to get the version of the image:

`$ cat /etc/version`

&nbsp;

## 1.3 How to get the PPID

**Note:** PPID (unique ID for Tinker board)

* **For Debian**

1. Copy [tinker_board_read_sn.zip](https://github.com/TinkerBoard/TinkerBoard/files/8451628/tinker_board_read_sn.zip) file to the device.
    
2. Unzip tinker_board_read_sn.zip and execute the following command to get the serial number:

    `$ sudo bash tinker_board_read_sn.sh`

&nbsp;

## 1.4 Resize image/partition

* **For Debian OS**

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

## 1.5 Changing the Boot Logo

* **For Debian OS**

* Download

    * Kernel Code

        ````
        $ git clone https://github.com/TinkerBoard/debian_kernel.git
        ````    
    * GCC

        ````
        $ wget http://releases.linaro.org/components/toolchain/binaries/6.3-2017.05/aarch64-linux-gnu/gcc-linaro-6.3.1-2017.05-x86_64_aarch64-linux-gnu.tar.xz
        $ tar Jxvf gcc-linaro-6.3.1-2017.05-x86_64_aarch64-linux-gnu.tar.xz -C ~
        ````
    Tinker Board logo: `/kernel/logo.bmp`

* Execute instructions as follows on PC

  ````
  $ git clone https://github.com/TinkerBoard/debian_kernel.git
  $ cd debian_kernel
  $ git checkout -b tinker_board-debian-3.0.11
  $ cd debian_kernel
  $ make ARCH=arm tinker_board_defconfig
  $ make ARCH=arm CROSS_COMPILE=~/gcc-linaro-6.3.1-2017.05-x86_64_arm-linux-gnueabihf/bin/arm-linux-gnueabihf- rk3288-tinker_board.img -j48
  $ make ARCH=arm CROSS_COMPILE=~/gcc-linaro-6.3.1-2017.05-x86_64_arm-linux-gnueabihf/bin/arm-linux-gnueabihf- rk3288-tinker_board.img modules -j48
  ````
* When compilation has finished, copy "debian-kernel/zboot.img" to the tinker board
  ````
  $ sudo dd if=zboot.img of=/dev/mmcblk1p4
  $ sudo reboot
  ````

&nbsp;

## 1.6 Swapfile

* **For Debian OS**

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

## 1.7 Power management tool

* **For Debian OS**

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

## 1.8 How to use power manager APP

* **CPU (A17)** Governor setting is in

        ```
        /sys/devices/system/cpu/cpufreq/policy0/scaling_governor
        ```
        use '**echo**' to change.  
        EX:  
        ```
        echo ondemand > /sys/devices/system/cpu/cpufreq/policy0/scaling_governor
        ```
        ```
        CPU minimum frequency: /sys/devices/system/cpu/cpufreq/policy0/scaling_min_freq
        CPU maximum frequency: /sys/devices/system/cpu/cpufreq/policy0/scaling_max_freq
        ```

        **Note:** Check available parameter for **CPU (A17)** in `/sys/devices/system/cpu/cpufreq/policy0` before setting.  

    * **GPU (T76X)** Governor setting:

        ```
        /sys/class/devfreq/ffa30000.gpu/governor
        ```
        ```
        GPU minimum frequency: /sys/class/devfreq/ffa30000.gpu/min_freq
        GPU maximum frequency: /sys/class/devfreq/ffa30000.gpu/max_freq
        ```

        **Note:** Check available parameter for **GPU (T76X)** in `/sys/class/devfreq/ffa30000.gpu` before setting. 

&nbsp;

## 1.9 How to install OpenCV

### 1.9.1 Install library from Debian repo

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

### 1.9.2 Install OpenCV manually

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

## 1.10 How to control the reserved LED

**Use the terminal to enter commands**
* Bright on the reserved led

    echo 1 > /sys/devices/platform/gpio-leds/leds/led1-led/brightness
* Bright off the reserved led

    echo 0 > /sys/devices/platform/gpio-leds/leds/led1-led/brightness

&nbsp;

## 1.11 How to set WIFI as a Hotspot

   1. Update packages and then install dnsmasq & hostapd package: 
 
     sudo apt-get update
     sudo apt install dnsmasq hostapd 

   2. Unzip SoftAP.zip:

      For Tinker Board (S)

      [SoftAP_debian10_20220127.zip](https://github.com/TinkerBoard/TinkerBoard/files/8107749/SoftAP_debian10_20220127.zip)
   
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

        For MAC address access-list 
        0 = accept unless in deny list, deny_mac_file is used to specify deny list. 
        1 = deny unless in accept list, accept_mac_file is used to specify accept list. 
        macaddr_acl=1 
 
       Accept/deny lists are read from separate files (containing list of # MAC addresses, one per line). 
       `accept_mac_file=/etc/hostapd/hostapd.accept` 
       `deny_mac_file=/etc/hostapd/hostapd.deny` 

       After modify hostapd.conf, you need to disable / re-enable softap again.

&nbsp;

## 1.12 How to run the application at startup

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

## 1.13 How to set a script from startup

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

## 1.14 How to collect log

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

**Build OS, Kernel & Uboot instruction**

   **1. Establish a build environment**
   
   Please refer to [Install Docker Engine](https://docs.docker.com/engine/install/) to install Docker engine.
   
   **2. Download the Android source**
   
   Please refer to [Installing Repo](https://source.android.com/setup/develop#installing-repo) to install the Repo Launcher and 
[Downloading the Source](https://source.android.com/setup/build/downloading) to understand how to download the Android source.  
   
   **3. Initiale a Repo client**  
   Run repo init to get the latest version of Repo with its most recent bug fixes. You must specify a URL for the manifest, which specifies where the 
   various repositories included in the Android source are placed within your working directory. For different projects, you must also specify the 
   manifest branch or revision with option "-b REVISION".
   
   ````
   repo init -u https://github.com/TinkerBoard-Android/manifest.git -b REVISION
   ````
   Optionally, you can also specify the initial manifest file with the option "-m NAME.xml" for the specific release for that project.

   ````
   repo init -u https://github.com/TinkerBoard-Android/manifest.git -b REVISION -m NAME.xml
   ````

   * **Android 7:**  
   ````
   repo init -u https://github.com/TinkerBoard-Android/manifest.git -b n-mr1-rk3288-tb
   ````
   or
   ````
   repo init -u https://github.com/TinkerBoard-Android/manifest.git -b n-mr1-rk3288-tb -m 14.4.0.23.xml
   ````
   or
   ````
   repo init -u https://github.com/TinkerBoard-Android/manifest.git -b n-mr1-rk3288-tb -m 14.4.0.22.xml
   ````
   or
   ````
   repo init -u https://github.com/TinkerBoard-Android/manifest.git -b n-mr1-rk3288-tb -m 14.4.0.18.xml
   ````
   or
   ````
   repo init -u https://github.com/TinkerBoard-Android/manifest.git -b n-mr1-rk3288-tb -m 14.4.0.14.xml
   ````
   or
   ````
   repo init -u https://github.com/TinkerBoard-Android/manifest.git -b n-mr1-rk3288-tb -m 14.4.0.5.xml
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

   * **Android 7:**  
    
   ````
   ./build.sh
   ````
   The image will be stored as the following in the directory where you have downloaded the source.

   ./IMAGE/Tinker_Board-AndroidN-eng-YYYYMMDD.HHMM/IMAGES/update.img

   Please download the [SpiImageTools](https://gitlab.com/rockchip-group/RKTools/-/blob/rk3399/mid/develop9.0/windows/SpiImageTools_v1.41.zip) for Windows.  
   
   Execute the file SpiImageTools.exe and click on the top-left button to load the file update.img. Then, click on the bottom-left button to generate the image which is able to be flashed to the board via UMS mode. The image is stored as data.in along with the file SpiImageTools.exe.  

   * **Android 11:**  
   
   ````
   source build/envsetup.sh
   lunch WW_Tinker_Board-userdebug
   ./build.sh -UCKAu
   ````
   
   The image which is able to be flashed to the board via UMS mode will be stored as the following in the directory where you have downloaded the source.

   ./rockdev/Image-WW_Tinker_Board/WW_Tinker_Board-raw.img  

&nbsp;

## 2.2 Flash image

### 2.2.1 Boot mode

   **UMS mode**
   
   The USB mass storage class is a USB function which can be used to export and share the storage. When the board is booted into the UMS mode, it shares the internal storage (eMMC) to the connected PC just like a hard drive connected to the PC. Then, the users can use the software such as [balenaEtcher](https://www.balena.io/etcher/) to flash the image into the internal storage (eMMC).

   The UMS function is implemented in u-boot. During the u-boot boot-up stage, it will check whether the board is connected to a PC or not. If connected to a PC, the board will enter UMS mode automatically. If not, the board will follow the boot priority to continue the boot process.

   **1. Boot the board into the UMS mode from the internal storage (eMMC)**
   
   If the u-boot in the internal storage (eMMC) is still workable with the UMS function, the follow the below steps.
   
   1. Make sure there is no SD card installed on the board.
   2. Connect the board with a PC via USB and then power on the board.
   3. Then, the board will boot into the UMS mode automatically.

   **2. Boot the device into the UMS from a SD card**
   
   If there is no workable u-boot in the internal storage (eMMC), in this case the board can not boot into the UMS mode from the internal storage (eMMC), you can boot the board into the UMS mode from a SD card.

   1. Flash the image (with u-boot including UMS function) into a SD card.
   2. Install the SD card to the board.
   3. Connect the board with a PC via USB and then power on the board.
   4. Then, the board will boot into the UMS mode automatically. (You may need to enable the MASKROM jumper to force the device to boot from SD, jump out the eMMC.)

   **3. Without UMS mode**
   
   Recovery from SD’s image system & without the PC mode 

   1. Plug the Jumper on the Maskrom mode. (force to boot from SD, jump out the eMMC)
   2. Flash the Image (any can bootable) to SD card.
   3. Plug the SD card to the board.
   4. Booting the board. It would boot up to the RootFS.
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

   3. Insert the bootable micro SD card into your Tinker Board, then connect the power supply, keyboard, mouse, and monitor to boot up.

   
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

   3. Download the TinkerOS image from the Tinker Board website (https://tinker-board.asus.com/download. html) and burn it into the Tinker Board using a third-party ISO software, such as [balenaEtcher](https://www.balena.io/etcher/).

   4. After the TinkerOS image is successfully burned, disconnect all cables from the Tinker Board.

   5. Connect the power supply, keyboard, mouse, and monitor to your Tinker Board to boot up.

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

## 2.5 How to use ASUS debugger

Support matrix: 

| - | Android 7 | Android 10 | Android 11 |
| --- | --- | --- | --- |
| ASUS Debugger v.3.03 | ✓ | - | - |
| ASUS Debugger v.3.10 | - | ✓ | - |
| ASUS Debugger v.3.11 | - | - | ✓ |


### 2.5.1 Android 7
* **This instruction describes behaviors with the version AsusDebugger v3.03**  

1. **Start AsusDebugger:**

    Please get into it from **"Settings"** Application  
    1. In Launcher, You can find Settings icon. Go to Settings and click **"About tablet"**.

        <img width="960" alt="AsusDebugger_v3 03_0" src="https://user-images.githubusercontent.com/51226852/167125163-54ae7209-d3ab-444d-88e9-908cbfff1d2f.png"/>

    2. Continuously click 7 times the preference of **“Kernel version”** and will get into AsusDebugger. When clicking, the Toast will be shown up the remaining times.

        <img width="960" alt="AsusDebugger_v3 03_1" src="https://user-images.githubusercontent.com/89904531/155081640-e6943c18-8df9-4d4a-bc74-4272c844eaf5.png"/>

        **NOTE:** There is a quick way. Please see **Section 6**.

2. **Set the configuration of logs:**
    1. The path of capturing logs is shown at **"Log file location"**, it is default set to **"/sdcard/Logs"**
    2. **"Logcat/kernel/tcpdump rotate number"** is used to decide the number of log rotation. It affects logcat, kernel, and tcpdump. 
    3. **"Logcat/kernel file size"** is used to decide the size of log files. It affects logcat, and kernel.

        ![AsusDebugger_v3 03_2](https://user-images.githubusercontent.com/89904531/155081912-671ac993-546c-4639-bfa6-e1c3a0f49b2a.png)

3. **Start to catch logs:**
    1. In Debugger, the logcat logs and kernel logs have been separated, if you need **"Enable capture logcat"** and **"Enable capture kernel"**, make sure those toggles are checked.

        ![AsusDebugger_v3 03_3](https://user-images.githubusercontent.com/89904531/155082208-c4be7420-5c73-43ab-a2d6-ec90ca74997a.png)

    2. To enable tcpdump log for debugging internet related issue, make sure **"Enable tcpdump"** toggle is checked.

        ![AsusDebugger_v3 03_4](https://user-images.githubusercontent.com/89904531/155082334-7f3643ea-30e3-403c-b681-8181cc1fa894.png)

4. **Collecting Logs:**
    1. When a bug is found, please press **"COLLECT LOGS"** button in AsusDebugger. You can describe your findings with short log or simply leave it blank.

        ![AsusDebugger_v3 03_5](https://user-images.githubusercontent.com/89904531/155082584-57353fd4-0137-41d7-8aa2-6f02c96cf889.png)

    2. AsusDebugger runs dumpstate automatically when you request collecting logs and it will take some time (2~3 minutes) to generate current system state and information.

        ![AsusDebugger_v3 03_6](https://user-images.githubusercontent.com/89904531/155082730-8275623c-d9b9-4db2-8c0e-c78406ff1add.png)

        Moreover, AsusDebugger collect logs you captured. Once collecting procedure is done, a dialog will be prompted to inform you of the path of the collected logs as follow.

        ![AsusDebugger_v3 03_7](https://user-images.githubusercontent.com/89904531/155082766-11b5a9fb-fde9-4479-b3c4-6eb07d42777c.png)

5. **Output Debugger files:**
    1. After connecting device to computer, drag the status bar and press **"USB drive"**. 

        <img width="807" alt="AsusDebugger_v3 03_8" src="https://user-images.githubusercontent.com/89904531/155083025-22f7a918-346f-4784-9ac7-ed4e82ddd3aa.png"/>

    2. Log files in **/sdcard/logs** are logs for current capture session.
    3. All collected logs go to **/sdcard/Logs_collected/** directory
    4. Copy collected log to USB drive

6. **Quickly enter AsusDebugger:**

    In **Section 3 - "Start to catch logs"**, if any log toggles are enabled, you can see a notification shown the Logging mode is Debugger. You can quickly get into AsusDebugger activity by clicking.

    ![AsusDebugger_v3 03_9](https://user-images.githubusercontent.com/89904531/155083251-16ddc2e1-14cd-4354-b748-99d4c4091d29.png)

7. **Other function:**

    1. **Detect reboot**

        If you want to detect whether the device is rebooted, make sure **"Detect reboot"** toggle is checked.
    
        ![AsusDebugger_v3 03_10](https://user-images.githubusercontent.com/89904531/155083419-813e03a7-0820-4c5c-871b-befac2edb583.png)

        If detect the device is rebooted, there is a full-screen floating window shown and display timestamp. Remove window by clicking it.

        ![AsusDebugger_v3 03_11](https://user-images.githubusercontent.com/89904531/155083490-2236e0eb-259b-4b35-8d82-fdf6c69d04ad.png)

    2. **Display usage**

        If you want to know the device’s usage, includes the information of CPU, GPU, Memory, and Battery, make sure **"Display CPU/GPU/MEM usage and battery level"** toggle is checked. A floating window displays information at right-bottom corner.

        ![AsusDebugger_v3 03_12](https://user-images.githubusercontent.com/89904531/155084082-ee6d6822-8a50-4e6f-9bc0-f3e94d9a42b3.png)
   
        **NOTE:** GPU usage cannot be shown on Tinker Board.

    3. **Ping test**

        If you want to test the network connection, can use **"Run PING test command"** to run ping test

        ![AsusDebugger_v3 03_13](https://user-images.githubusercontent.com/89904531/155084645-29bc4a47-057e-45d7-a737-d7c4431b8d04.png)

### 2.5.2 Android 11 
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

## 2.6 Changing the boot logo

* **For Android 7**
* **Static boot logo**

    * **Requirement**
        1. Please prepare the 24 bit bmp file and the length/width must be divisible by 4. 
            * For example : 1000x400, 1920x1080 are OK, but 1921x1000 is not allowed  
            * We recommended that you can use the Microsoft paint to save the picture as the 24 bit bmp.  
            * Let's assume the picture name is logo.bmp

        2. Use the linux tool "convert" to change the format

            ```
            $ convert -compress rle -colors 256 logo.bmp logo_kernel.bmp
            ```
            logo.bmp is the file which is came from step 1 and logo_kernel.bmp is the file which is after convert.

        3. Android M: Replace the logo.bmp and logo_kernel.bmp which is came from step 1 and step 2 to the kernel folder  
            Android N: Use the logo_kernel.bmp which is came from step 2 to replace the logo.bmp and logo_kernel.bmp at kernel folder

        4. Rebuild kernel image: [How to rebuild kernel](https://web.archive.org/web/20210729150747/https://tinkerboarding.co.uk/wiki/index.php?title=Software#Android_6.0.1_kernel)  

    * **Note**:
        * Please notice that the version of \"convert\" is also importance. The version of convert must be equal to the below

            ```
            $ convert -version
            Version: ImageMagick 6.6.9-7 2017-03-14 Q16 http://www.imagemagick.org
            Copyright: Copyright (C) 1999-2011 ImageMagick Studio LLC
            Features: OpenMP
            ```
        * If your OS is Ubuntu 12.04，just use apt to get the convert package

            ```
            $ sudo apt-get install imagemagick
            ```
        * If you have no Ubuntu 12.04, you can use the Tinker Board with [Tinker-OS V2.0.3](https://github.com/TinkerBoard/debian_kernel/releases/download/2.0.3/20170928-tinker-board-linaro-stretch-alip-v2.0.3.img.zip)

            ```
            $ sudo apt-get install graphicsmagick-imagemagick-compat
            ```

* **Dynamic boot logo**

    You can reference the bootanimation.zip and replaced the png file inside. The Android framework will play the picture from 0.png to the last png file one by one. And it will look like an animation.  
    After you finish the zip file, please put the bootanimation.zip to `/system/media/bootanimation.zip`  
    The zip file name must be **bootanimation.zip**. You can download the example from below link  
[https://bitbucket.org/TinkerBoard_Android/rk-device-rockchip-rk3288/raw/e57382fe021e651a01d3b3f6b3df21a6f5ed19d1/rk3288_vr/bootanimation.zip](https://bitbucket.org/TinkerBoard_Android/rk-device-rockchip-rk3288/raw/e57382fe021e651a01d3b3f6b3df21a6f5ed19d1/rk3288_vr/bootanimation.zip)

* **Wallpaper**

  Please check the following 2 commits. One is for HDMI and the other is for DSI.  
[https://bitbucket.org/TinkerBoard_Android/rk-device-rockchip-rk3288/commits/a5a00b724063b3992a1e6ad711e69e0f4ecd63ce?at=sbc/tinkerboard/asus/Android-6.0.1](https://bitbucket.org/TinkerBoard_Android/rk-device-rockchip-rk3288/commits/a5a00b724063b3992a1e6ad711e69e0f4ecd63ce?at=sbc/tinkerboard/asus/Android-6.0.1)  
[https://bitbucket.org/TinkerBoard_Android/rk-device-rockchip-rk3288/commits/0a382ad572b909d758553c43a6b6c929aacbadc6?at=sbc/tinkerboard/asus/Android-6.0.1](https://bitbucket.org/TinkerBoard_Android/rk-device-rockchip-rk3288/commits/0a382ad572b909d758553c43a6b6c929aacbadc6?at=sbc/tinkerboard/asus/Android-6.0.1)  

&nbsp;

# 3. Hardware Guide

## 3.1 How to use Serial console? Debug?

1.  Prepare an USB to TTL(UART) cable

2. Connect cable to Tinker Board.

    a. Connect TXD pin on the converter to pin 36 on the Tinker Board.

    b. Connect RXD pin on the converter to pin 37 on the Tinker Board.

    c. Connect GND pin on the converter to pin 39 on the Tinker Board.

    [[https://user-images.githubusercontent.com/89904531/154911411-171aa68e-9eb8-40c4-b21e-78822d87cd0b.jpg|width=300px]]

3. Connect Tinker Board to PC with a USB serial cable

4. On PC, open Putty and select Serial. 

	The Serial line can be checked from Windows >Device Manager >Ports (COM & LPT). The speed is 115200 baud.

    ![Tinker_serialconsole2](https://user-images.githubusercontent.com/89904531/154913008-feb44131-401b-4f9c-aa3e-ef14578ad4d7.jpg)

&nbsp;

## 3.2 GPIO

### 3.2.1 GPIO Config table

| Chip,line | Device Path | GPIO number | Function2 | Function1 | GPIO | Pin# | Pin# | GPIO | Function1 | Function2 | GPIO number | Device Path | Chip,line | 
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| --- | --- | --- | --- | VCC3.3V_IO | --- |  1   |   2  | --- | VCC5V_SYS | --- | --- | --- | --- |
| 8,4 | GPIO:/sys/class/gpio/gpio252 I2C:/dev/i2c-1 | 252 | --- | I2C1_SDA | GPIO8_A4 | 3 | 4 | --- | VCC5V_SYS | --- | --- | --- | ---|
| 8,5 | GPIO:/sys/class/gpio/gpio253 I2C:/dev/i2c-1 | 253 | --- | I2C1_SCL | GPIO8_A5 | 5 | 6 | --- | GND | --- | --- | --- | ---|
| 0,17 | GPIO:/sys/class/gpio/gpio17	 | 17 | --- | TEST_CLKOUT | GPIO0_C1 | 7 | 8 | GPIO5_B1	 | UART1_TXD | --- | 161 | GPIO:/sys/class/gpio/gpio161 UART:/dev/ttyS1 | 5,9 |
| --- | --- | --- | --- | GND | --- | 9 | 10 | GPIO5_B0	| UART1_RXD | --- | 160 | GPIO:/sys/class/gpio/gpio160 UART:/dev/ttyS1 | 5,8 |
| 5,12 | GPIO:/sys/class/gpio/gpio164 SPI:/dev/spidev0 UART:/dev/ttyS4 | 164 | UART4_CTSN | SPI0_CLK | GPIO5_B4 | 11 | 12 | GPIO6_A0 | I2S_SCLK	| ---| 184 | GPIO:/sys/class/gpio/gpio184 | 6,0 |
| 5,14 | GPIO:/sys/class/gpio/gpio166 SPI:/dev/spidev0 UART:/dev/ttyS4 | 166 | UART4_TXD | SPI0_TXD | GPIO5_B6 | 13 | 14 | --- | GND | --- | --- | --- | ---| --- | 
| 5,15 | GPIO:/sys/class/gpio/gpio167 SPI:/dev/spidev0 UART:/dev/ttyS4 | 167 | UART4_RXD | SPI0_RXD | GPIO5_B7 | 15 | 16 | GPIO5_B2 | UART1_CTSN | --- | 162 | GPIO:/sys/class/gpio/gpio162 UART:/dev/ttyS1 | 5,10 |
| --- | --- | --- | --- | VCC3.3V_IO | --- | 17 | 18 | GPIO5_B3 | UART1_RTSN | --- | 163 | GPIO:/sys/class/gpio/gpio163 UART:/dev/ttyS1 | 5,11 |
| 8,9 | GPIO:/sys/class/gpio/gpio257 SPI:/dev/spidev2 | 257 | --- | SPI2_TXD | GPIO8_B1 | 19 | 20 | --- | GND | --- | --- | --- | --- |
| 8,8 | GPIO:/sys/class/gpio/gpio256 SPI:/dev/spidev2 | 256 | --- | SPI2_RXD | GPIO8_B0 | 21 | 22 | GPIO5_C3 | --- | --- | 171 | GPIO:/sys/class/gpio/gpio171 | 5,19 |
| 8,6 | GPIO:/sys/class/gpio/gpio254 SPI:/dev/spidev2 | 254 | --- | SPI2_CLK | GPIO8_A6 | 23 | 24 | GPIO8_A7 | SPI2_CSN0 | --- | 255 | GPIO:/sys/class/gpio/gpio255 SPI:/dev/spidev2.0 | 8,7 |
| --- | --- | --- | --- | GND | --- | 25 | 26 | GPIO8_A3 | SPI2_CSN1 | --- | 251 | 	GPIO:/sys/class/gpio/gpio251 SPI:/dev/spidev2.1 | 8,3 |
| 7,17 | GPIO:/sys/class/gpio/gpio233 I2C:/dev/i2c-4 | 233 | --- | I2C4_SDA | GPIO7_C1 | 27 | 28 | GPIO7_C2 | I2C4_SCL | --- | 234 | GPIO:/sys/class/gpio/gpio234 I2C:/dev/i2c-4 | 7,18 |
| 5,13 | GPIO:/sys/class/gpio/gpio165 SPI:/dev/spidev0.0 | 165 | UART4_RTSN | SPI0_CSN0 | GPIO5_B5 | 29 | 30 | --- | GND | --- | --- | --- | --- |
| 5,16 | GPIO:/sys/class/gpio/gpio168 SPI:/dev/spidev0.1 | 168 | --- | SPI0_CSN1 | GPIO5_C0 | 31 | 32 | GPIO7_C7 | UART2_TXD | PWM | 239 | GPIO:/sys/class/gpio/gpio239 UART:/dev/ttyS2 PWM:/sys/class/pwm/pwmchip3 | 7,23 |
| 7,22 | GPIO:/sys/class/gpio/gpio238 UART:/dev/ttyS2 PWM:/sys/class/pwm/pwmchip2 | 238 | PWM2 | UART2_RXD | GPIO7_C6 | 33 | 34 | --- | GND | --- | --- | --- | --- |
| 6,1 | GPIO:/sys/class/gpio/gpio185 | 185 | --- | I2S_LRCKRX | GPIO6_A1 | 35 | 36 | I2S_LRCKRX | UART3_RXD | --- | 233 | GPIO:/sys/class/gpio/gpio223 UART:/dev/ttyS3 | 7,7 |
| 7,8 | GPIO:/sys/class/gpio/gpio224 UART:/dev/ttyS3 | 224 | --- | UART3_TXD  | GPIO7_B0 | 37 | 38 | GPIO6_A3 | I2S_SDI | --- | 187 | GPIO:/sys/class/gpio/gpio187 | 6,3 |
| --- | --- | --- | --- | GND | --- | 39 | 40 | GPIO6_A4 | I2S_SDO0 | --- | 188 | GPIO:/sys/class/gpio/gpio188 | 6,4 |

&nbsp;

### 3.2.2 GPIO Sample Code

- For GPIO API, please refer to the documentation on the Tinker Board website:  
    https://tinker-board.asus.com/doc_tbs.html#gpio

- WiringPi C:  
    https://github.com/TinkerBoard/gpio_lib_c

- ASUS.GPIO Python:  
    Install gpio_lib_python steps:

    ````
    git clone https://github.com/TinkerBoard/gpio_lib_python.git
    sudo apt-get install python-dev python2.7-dev python3-dev
    cd gpio_lib_python/
    sudo python3 setup.py install
    sudo python setup.py install
    python3 -c 'import ASUS; print(ASUS.__path__)'
    cd test/
    python3 GPIO_IN_OUT_test.py
    ````
*please note that the .py has be located somewhere other than the source directory, otherwise the module will not be recognized: error ImportError: No module named 'ASUS.GPIO' 

&nbsp;

### 3.2.3 How to configure GPIO as an individual function and the function work

The IO mapping can be found at:  
        https://github.com/TinkerBoard/TinkerBoard/wiki/Tinker-Board-S-R2.0-&-R2.0,-Tinker-Baord,-Tinker-Board-S#321-gpio-config-table

#### 3.2.3.1 WiringPi C library for Debian

**I2C WiringPi for C library for Debian**

* Firstly, modify the /boot/config.txt file as following and then reboot to enable I2C1 and I2C4.

```
##### Hardware Interface Config #######
Note: fiq_debugger and uart3 use the same pin. Set fiq_debugger first while bb oth on. ##
## Note: uart4 and spi0 are the same pins. Set the latter one while both on. ##
## Note: uart2 is the same pins to pwm2 and pwm3. Set the latter one while both on. ##

intf:fiq_debugger=on
intf:i2c1=on
intf:i2c4=on
#intf:spi0=off
#intf:spi2=off
#intf:pwm2=off
#intf:pwm3=off
intf:pcm_i2s=on
#intf:uart1=off
#intf:uart2=off
#intf:uart3=off
#intf:uart4=off
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

```
1. Compiler sample code by wiringPi library and then get the ds3231 binary file
   $ gcc -o ds3231 ds3231.c -lwiringPi -DTINKER_BOARD
2. Execute the ds3231 file to get the RTC time
   $ ./ds3231
```

Reference for the wiringPi API: http://wiringpi.com/reference/i2c-library/


**Pwm wiringPi for C library**:

* Firstly, modify the /boot/config.txt file as following and then reboot to enable PWM2 and PWM3.

```
##### Hardware Interface Config #######
Note: fiq_debugger and uart3 use the same pin. Set fiq_debugger first while bb oth on. ##
## Note: uart4 and spi0 are the same pins. Set the latter one while both on. ##
## Note: uart2 is the same pins to pwm2 and pwm3. Set the latter one while both on. ##

intf:fiq_debugger=on
#intf:i2c1=off
#intf:i2c4=off
#intf:spi0=off
#intf:spi2=off
intf:pwm2=on
intf:pwm3=on
intf:pcm_i2s=on
#intf:uart1=off
#intf:uart2=off
#intf:uart3=off
#intf:uart4=off
```


* Compiler the following sample codes for SPI interface

```
1. Sample codes : gpio_lib_c/examples/pwm.c
#include <wiringPi.h>

#include <stdio.h>
#include <stdlib.h>
#include <stdint.h>

int main (void)
{
  int bright ;

  printf ("Raspberry Pi wiringPi PWM test program\n") ;
  wiringPiSetup();
  pinMode (26, PWM_OUTPUT) ;
  for (;;)
  {
    for (bright = 0 ; bright < 1024 ; bright=bright+4)
    {
      pwmWrite (26, bright) ;
      delay (10) ;
    }

    for (bright = 1023 ; bright >= 0 ; bright=bright-4)
    {
      pwmWrite (26, bright) ;
      delay (10) ;
    }
  }

  return 0 ;
}
```

```
1. Compiler sample code by wiringPi library and then get the softPwm binary file
   $ gcc -o pwm pwm.c -lwiringPi -DTINKER_BOARD
2. Execute the pwm binary file to show led blinking.
   $ ./pwm
```


**Spi wiringPi for C library**:

* Firstly, modify the /boot/config.txt file as following and then reboot to enable SPI0 and SPI2.

```
##### Hardware Interface Config #######
Note: fiq_debugger and uart3 use the same pin. Set fiq_debugger first while bb oth on. ##
## Note: uart4 and spi0 are the same pins. Set the latter one while both on. ##
## Note: uart2 is the same pins to pwm2 and pwm3. Set the latter one while both on. ##

intf:fiq_debugger=on
#intf:i2c1=off
#intf:i2c4=off
intf:spi0=on
intf:spi2=on
#intf:pwm2=off
#intf:pwm3=off
intf:pcm_i2s=on
#intf:uart1=off
#intf:uart2=off
#intf:uart3=off
#intf:uart4=off
```

* Compiler the following sample codes for SPI interface

```
1. Sample codes gpio_lib_c/examples/spiSpeed.c
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

#define    SPI_CHAN        0
#define    NUM_TIMES       100
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
   $ gcc -o spiSpeed spiSpeed.c -lwiringPi -DTINKER_BOARD
2. Execute the spiSpeed file to get the RTC time
   $ sudo ./spiSpeed
+-------+--------+----------+----------+-----------+------------+
|   MHz |   Size | mS/Trans |      TpS |    Mb/Sec | Latency mS |
+-------+--------+----------+----------+-----------+------------+
|     1 |      1 |    0.010 | 100000.0 |   0.76294 |    0.00200 |
|     1 |      2 |    0.030 |  33333.3 |   0.50863 |    0.01400 |
|     1 |      4 |    0.040 |  25000.0 |   0.76294 |    0.00800 |
|     1 |      8 |    0.070 |  14285.7 |   0.87193 |    0.00600 |
|     1 |     16 |    0.140 |   7142.9 |   0.87193 |    0.01200 |
|     1 |     32 |    0.270 |   3703.7 |   0.90422 |    0.01400 |
|     1 |     64 |    0.570 |   1754.4 |   0.85663 |    0.05800 |
|     1 |    128 |    1.130 |    885.0 |   0.86421 |    0.10600 |
|     1 |    256 |    2.250 |    444.4 |   0.86806 |    0.20200 |
|     1 |    512 |    4.480 |    223.2 |   0.87193 |    0.38400 |
|     1 |   1024 |    8.400 |    119.0 |   0.93006 |    0.20800 |
|     1 |   2048 |   16.950 |     59.0 |   0.92183 |    0.56600 |
|     1 |   4096 |   33.370 |     30.0 |   0.93647 |    0.60200 |
|     1 |   8192 SPI failure: Message too long
+-------+--------+----------+----------+-----------+------------+

+-------+--------+----------+----------+-----------+------------+
|   MHz |   Size | mS/Trans |      TpS |    Mb/Sec | Latency mS |
+-------+--------+----------+----------+-----------+------------+
|     2 |      1 |    0.100 |  10000.0 |   0.07629 |    0.09600 |
|     2 |      2 |    0.110 |   9090.9 |   0.13872 |    0.10200 |
|     2 |      4 |    0.150 |   6666.7 |   0.20345 |    0.13400 |
|     2 |      8 |    0.110 |   9090.9 |   0.55487 |    0.07800 |
|     2 |     16 |    0.110 |   9090.9 |   1.10973 |    0.04600 |
|     2 |     32 |    0.310 |   3225.8 |   0.78755 |    0.18200 |
|     2 |     64 |    0.380 |   2631.6 |   1.28495 |    0.12400 |
|     2 |    128 |    0.580 |   1724.1 |   1.68373 |    0.06800 |
|     2 |    256 |    1.130 |    885.0 |   1.72843 |    0.10600 |
|     2 |    512 |    2.260 |    442.5 |   1.72843 |    0.21200 |
....
```
Reference for the wiringPi API: http://wiringpi.com/reference/spi-library/


**Uart wiringPi for C library**:

* Firstly, modify the /boot/config.txt file as following and then reboot to enable UART1, UART2 and UART4.

```
##### Hardware Interface Config #######
Note: fiq_debugger and uart3 use the same pin. Set fiq_debugger first while bb oth on. ##
## Note: uart4 and spi0 are the same pins. Set the latter one while both on. ##
## Note: uart2 is the same pins to pwm2 and pwm3. Set the latter one while both on. ##

intf:fiq_debugger=on
#intf:i2c1=off
#intf:i2c4=off
#intf:spi0=off
#intf:spi2=off
#intf:pwm2=off
#intf:pwm3=off
intf:pcm_i2s=on
intf:uart1=on
intf:uart2=on
#intf:uart3=off
intf:uart4=on
```


* Compiler the following sample codes by Uart cable

```
1. Test the Uart1 TX/RX by Sample codes gpio_lib_c/examples/serialTest.c
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
 *    along with wiringPi.  If not, see .
 ***********************************************************************
 */

#include <stdio.h>
#include <string.h>
#include <errno.h>

#include <wiringPi.h>
#include <wiringSerial.h>

int main ()
{
  int fd ;
  int count ;
  unsigned int nextTime ;

  if ((fd = serialOpen ("/dev/ttyS1", 115200)) < 0)
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
1. Compiler sample code by wiringPi library and then get the serialTest binary file
   $ gcc -o serialTest serialTest.c -lwiringPi -DTINKER_BOARD
2. Execute the serialTest file to test Uart TX/RX
   $ ./serialTest
   -> Device log for RX
      ...
      "Out:  17:  ->  80 -> 117 -> 84 -> 84 -> 89"
      "Out:  18:"
      ...
   -> PC putty log for TX
      "...!"#$%&'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\]^_`abcdefghijklmnopqrstuvwxyz{|}..."

```

Reference for the wiringPi API: http://wiringpi.com/reference/serial-library/

&nbsp;

# 4. Peripherals Guide

## 4.1 Pi Supply
### 4.1.1 Pi PoE Switch HAT - Power over Ethernet for Raspberry Pi
  1. **Open the terminal and run the following command**　
      ````
      git clone --recursive https://github.com/PiSupply/PiPoE.git
      ````
  2. **Move install_tinkerboard.sh, removepower_tinkerboard.py, pipoe_tinkerboard.service and uninstall_tinkerboard.sh to the folder PiPoE**
  3. **Execute install_tinker.sh for installation**
  4. **For uninstallation, please execute uninstall_tinkerboard.sh**
  5. **Commands for LED controlling**
      ````
      gpio -g mode 23 out
      gpio -g write 23 1
      ````
  6. **This will turn on the green of the dual LED**   
      ````
      gpio -g mode 22 out
      gpio -g mode 24 out
      gpio -g write 22 1
      gpio -g write 24 0
      ````
  7. **This will turn on the amber of the dual LED**   
      ````
      gpio -g mode 22 out
      gpio -g mode 24 out
      gpio -g write 22 0
      gpio -g write 24 1
      ````
[PiPoE.zip](https://github.com/TinkerBoard/TinkerBoard/files/9856880/PiPoE.zip)

### 4.1.2 IoT Gateway HAT for Raspberry Pi (868MHz/915MHz) with LoRa®
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
