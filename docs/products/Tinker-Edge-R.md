# Tinker Edge R

# 1. Flash Image

1. Flash old version image

   **Flash the image released before 2021/8/1**

   Please refer to the following web page. 

   https://tinker-board.asus.com/doc_er.html#started

&nbsp;

2. Flash image from old version to new version

   **Flash the image from versions before 2021/8/1 to versions after 2021/8/1**

   Pleaase refer to the following file.

   [TinkerEdgeR-Flash Image-UMS mode.pdf](https://github.com/TinkerBoard/TinkerBoard/files/12801859/TinkerEdgeR-Flash.Image-UMS.mode.pdf)

&nbsp;

3. Flash new version image

   **Flash the image released after 2021/8/1**

   ***Booting  from  onboard  eMMC**

   > NOTE: Booting from the onboard eMMC is only available for models with eMMC.

   Requirement:

   • 1 x Type-C® cable with data transfer function

   • 1 x Power supply

   • 1 x Monitor

   • 1 x Keyboard and Mouse set

   Setting Up:

   1. Make sure there is no jumper on the Recovery header. 

   2. Connect the Tinker Edge R to a PC using a Type-C® cable.

   3. Connect the power adapter to the Tinker Edge R.

   4. Download the TinkerOS image from the Tinker Board website (https://tinker-board.asus.com/download-list.html?product=tinker-edge-r) and burn it into the Tinker Board using a third-party ISO software, such as [balenaEtcher](https://www.balena.io/etcher/).

   5. After the TinkerOS image is successfully burned, disconnect all cables from the Tinker Board.

   6. Connect the power supply, keyboard, mouse, and monitor to your Tinker Board to boot up.

&nbsp;

# 2. Hardware Guide

## 2.1 GPIO Application note

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

&nbsp; 

## 2.2 FAN control

**Control GPIO4_D6 the high speed or low speed by software**

1. High speed setting on FAN_SPD_CTRL

````
sudo echo "158" > /sys/class/gpio/export
sudo echo "out" > /sys/class/gpio/gpio158/direction
sudo echo "1" /sys/class/gpio/gpio154/value
````

2. Low speed setting on FAN_SPD_CTRL

````
sudo echo "158" > /sys/class/gpio/export
sudo echo "out" > /sys/class/gpio/gpio158/direction
sudo echo "0" > /sys/class/gpio/gpio158/value
````

&nbsp; 

# 3. Others

## 3.1 ASUS IoT API

* [ASUS Connectivity Manager Command Line Interface User Manual V1.0](https://tinker-board.asus.com/images/doc/download/Asus_Connectivity_Manager_v1.0_20220208.pdf)