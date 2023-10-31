---
sidebar_position: 3
---

# User Guide
## 1. Boot modes
### UMS mode
The USB mass storage class is a USB function which can be used to export and share the storage. When the board is booted into the UMS mode, it shares the internal storage (eMMC) to the connected PC just like a hard drive connected to the PC. Then, the users can use the software such as [balenaEtcher](https://www.balena.io/etcher/) to flash the image into the internal storage (eMMC).

The UMS function is implemented in u-boot. During the u-boot boot-up stage, it will check whether the board is connected to a PC or not. If connected to a PC, the board will enter UMS mode automatically. If not, the board will follow the boot priority to continue the boot process.

#### Boot the board into the UMS mode from the internal storage (eMMC)
If the u-boot in the internal storage (eMMC) is still workable with the UMS function, the follow the below steps.
1. Make sure there is no SD card installed on the board.
2. Connect the board with a PC via USB and then power on the board.
3. Then, the board will boot into the UMS mode automatically.

#### Boot the device into the UMS from a SD card
If there is no workable u-boot in the internal storage (eMMC), in this case the board can not boot into the UMS mode from the internal storage (eMMC), you can boot the board into the UMS mode from a SD card.
1. Flash the image (with u-boot including UMS function) into a SD card.
2. Install the SD card to the board.
3. Connect the board with a PC via USB and then power on the board.
4. Then, the board will boot into the UMS mode automatically. (You may need to enable the MASKROM jumper to force the device to boot from SD, jump out the eMMC.)

#### Without UMS mode
Recovery from SD’s image system & without the PC mode 

1. Plug the Jumper on the Maskrom mode.
(force to boot from SD, jump out the eMMC)
2. Flash the Image (any can bootable) to SD card.
3. Plug the SD card to the board.
4. Booting the board.
It would boot up to the RootFS.
5. use either command dd or methods to flash new image file to eMMC(mmcblk1).

## 2. Flash Image
### This is general for Tinker Board (S), Tinker Board (S) R2.0 & Tinker Board 2 seires.
You can use the software such as balenaEthcher to flash the images into the SD cards or the internal storage (eMMC) on the board when the board is booted into the UMS mode.

1. Download the software from [balena.io](https://www.balena.io/etcher/).
2. Run balenaEtcher and select the image file.
3. Select the target.
4. Click on Flash to start flashing.

Alternatively, you can also use the command dd. Run the following command, replacing /dev/sdx with your drive, e.g. /dev/sdc. (Do not append a partition number, so do not use something like /dev/sdc1. You can use the command lsblk to find out the target. Make sure that it is not mounted.)

    dd bs=4M if=/path/to/image of=/dev/sdx status=progress && sync

### Booting from external Micro SD card

Requirement:

• 1 x Micro SD card with at least 8GB capacity

• 1 x Power supply

• 1 x Monitor

• 1 x Keyboard and Mouse set

Setting Up:

1. Insert the micro SD card into a Windows® PC.

2. Download the TinkerOS image from the Tinker Board website (https://tinker-board.asus.com/download.html) and burn it into the micro SD card using a third-party ISO software, such as Etcher.

4. Insert the bootable micro SD card into your Tinker Board, then connect the power supply, keyboard, mouse, and monitor to boot up.

### Booting  from  onboard  eMMC

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

## 3. GPIO

### GPIO Config Table for Tinker Board (S) / Tinker Board (S) R2.0:

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

### GPIO Config Table for Tinker Board 2 series:

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


### Sample code for Tinker Board (S) / Tinker Board (S) R2.0:

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



### Sample code for Tinker Board 2 series:
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

### Application note for Tinker Board 2 series:
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

### Application note for Tinker Edge R:
Due to hardware design limitations of certain pins, some designs incorporate level shifters, so there are a few things to keep in mind when using them.

- The location of pins with level shifter:
- Pins number: 7, 12, 13, 15, 16, 18, 19, 21, 22, 23, 24, 26, 29, 31, 35, 38, 40
![image](https://user-images.githubusercontent.com/97945168/194475856-ebcb8127-677e-4edc-9fd5-7b80c5bd22d5.png)


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



## 4. Power management tool

### Debian only

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

## 5. Swapfile
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

## 6. OpenCV how to install

### Install library from Debian repo

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

### Install OpenCV manually

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


## 7. Tinker Config Application

### Introduction

Tinker Config is an Android-based application that offers flexibility
and an easy way to configure I/O interfaces on 40pin header, DSI/CSI
connectors as well as Linux kernel Devicetree overlays while using
Tinker Board 2S.

![1](https://user-images.githubusercontent.com/51226852/159633579-886fcfa4-9a02-47a4-bbcb-6f727fcd23fa.png)

### Prerequisites

Tinker Board 2S with Android OS v.2.0.6 (or later) installed. For image
installation, please visit Tinker Board's [wiki
page](https://github.com/TinkerBoard/TinkerBoard/wiki/User-Guide#flash-image)
on Github.

Optional: hardware accessories such as LED modules, monitors ... etc.

Tinker Config is built-in and can be found in the app list.

![2](https://user-images.githubusercontent.com/51226852/159661220-dda03c39-22ac-48f6-9547-56386e2c91a6.png)

### Features

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

## 8. Fan Control
* **For Tinker Board 2 / Tinker Board 2S**
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


