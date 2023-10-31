---
sidebar_position: 2
---

# User Guide

## Boot sources
The devices supports to boot from the internal storage (eMMC) or SD card.

### Internal storage (eMMC)
### SD card

## Boot modes
There are different boot modes supported for different purpose.

### Normal OS mode
This is normal OS boot such as Debian, Yocto, and Android. The device can boot into normal OS mode while the OS image is correctly flashed into the eMMC (if exist) or a SD card inserted when powering up.

### UMS mode
The USB mass storage class is a USB function which can be used to export and share the storage. The UMS function is implemented in u-boot. During the u-boot boot-up stage, the device will check whether the deivce is connected to a PC or not. If connected to a PC, the device will enter the UMS mode automatically. If not, the device will follow the boot priority to continue the boot process.

When the device boots into the UMS mode, it exports and shares the internal storage (eMMC) to the connected PC just like a hard drive connected to the PC or a SD card inserted into a PC. Then, the users can use the disk wrtier software such as [balenaEtcher](https://www.balena.io/etcher/) or Linux `dd` command to write the image into the internal storage (eMMC).

#### Boot the device into the UMS mode from the internal storage (eMMC)
If the u-boot in the internal storage (eMMC) is still workable for the UMS function, then you can follow the following step to boot the device into the UMS mode from the internal storage (eMMC).
1. Make sure there is no SD card insterted into the device.
2. Connect the device with a PC via the USB cable and then power on the device.
3. Then, the device will boot into the UMS mode automatically.

##### Boot the device into the UMS from a SD card
If there is no workable u-boot for the UMS function in the internal storage (eMMC), in this case the device can not boot into the UMS mode from the internal storage (eMMC), you can still boot the device into the UMS mode from a SD card.
1. Flash the image (with u-boot including UMS function) into a SD card.
2. Instreted the SD card intoo the device.
3. Connect the device with a PC via the USB cable and then power on the device.
4. Then, the device will boot into the UMS mode automatically.
