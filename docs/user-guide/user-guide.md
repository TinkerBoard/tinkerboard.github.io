---
sidebar_position: 1
---

# User Guide
## Boot media types
The devices supports to boot from different media types such as the internal storage (eMMC) or SD card. If there is a bootable image installed on the SD card which is plugged into the device while powering on, the device will boot from the SD card. Otherwise, it will boot from the internal storage (eMMC) if there is a bootable image installed on the internal storage (eMMC).

### Internal storage (eMMC)
### SD card

## Boot modes
There are different boot modes supported for different purposes.

### Normal OS mode
This is the normal OS boot such as Debian, Yocto, and Android. The device can boot into the normal OS mode while the OS image is correctly installed on the eMMC (if exist) or a SD card plugged in when powering up.

### UMS mode
The USB mass storage class is a USB function which can be used to export and share the storage. The UMS function is implemented in u-boot. During the u-boot boot-up stage, the device will check whether the deivce is connected to a PC or not. If connected to a PC, the device will enter the UMS mode automatically. If not, the device will follow the boot priority to continue the boot process.

When the device boots into the UMS mode, it exports and shares the internal storage (eMMC) to the connected PC just like a USB storage connected to the PC or a SD card plugged into a PC. Then, the users can use the disk writer software such as [balenaEtcher](https://www.balena.io/etcher/) or Linux `dd` command to write the image into the internal storage (eMMC).

#### Booting the device into the UMS mode from the internal storage (eMMC)
You can follow the following steps to boot the device into the UMS mode from the internal storage (eMMC).
1. Make sure there is no SD card plugged into the device.
2. Connect the device with a PC via the USB cable and then power on the device.
3. Then, the device will boot into the UMS mode automatically.

If you fail to do this, you can still try to boot the device into the UMS mode from a SD card.

#### Booting the device into the UMS mode from a SD card
If you fail to boot the device into the UMS mode from the internal storage (eMMC), you can still boot the device into the UMS mode from a SD card.
1. Flash the image (with u-boot including UMS function) into a SD card.
2. Plug in the SD card into the device.
3. Connect the device with a PC via the USB cable and then power on the device.
4. Then, the device will boot into the UMS mode automatically.

### Flashing the images
Once the device equipped with the internal storage (eMMC) boots into the [UMS mode](#ums-mode), you can use the disk writer software such as [balenaEtcher](https://www.balena.io/etcher/).

1. Download the Tinker OS images from the [Tinker Board website](https://tinker-board.asus.com/download.html).
2. Download the software [balenaEtcher](https://www.balena.io/etcher/).
2. Run balenaEtcher and select the image file downloaded.
3. Select the target.
4. Click on Flash to start flashing.

Alternatively, you can also use the Linux command `dd`, replacing /dev/sdx with your drive, e.g. /dev/sdc. (Do not append a partition number. For example, do not use something like /dev/sdc1. You can use the command lsblk to find out the target. Make sure that it is not mounted.)
```bash
dd bs=4M if=/path/to/image of=/dev/sdx status=progress && sync
```

For booting from SD card, you can just use the same way as above to flash the image into a SD card.
