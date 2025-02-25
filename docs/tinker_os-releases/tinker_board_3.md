---
sidebar_position: 4
---

# Tinker Board 3/3S
## Tinker OS Debian
|Debian Version|Release|Manifest Branch|Manifest File|
|-|-|-|-|
|Debian 11|latest|linux5.10-rk356x|default.xml|
|Debian 11|1.0.7|linux5.10-rk356x|tinker_board_3-debian_11-1.0.7.xml|
|Debian 11|1.0.6|linux5.10-rk356x|tinker_board_3-debian_11-1.0.6.xml|
|Debian 11|1.0.4|linux5.10-rk356x|tinker_board_3-debian_11-1.0.4.xml|
|Debian 11|v1.0.1|linux5.10-rk356x|tinker_board_3-debian_11-1.0.1.xml|

### Release notes
#### Tinker Board 3/3S Debian 11 (kernel 5.10) V.1.0.7
Default username/password: linaro/linaro  
Release file: [Tinker_Board_3-Debian-Bullseye-v1.0.7-20241219-release.zip](https://dlcdnets.asus.com/pub/ASUS/Embedded_IPC/Tinker%20Board%203/Tinker_Board_3-Debian-Bullseye-v1.0.7-20241219-release.zip?model=Tinker%20Board%203)  
SHA-256 checksum: 16a1050acc8bcff1454b782263a7d79e9660647555c0bce0c0a0c2d7dd515399
- Add AICC browser shortcut on desktop
- Add wifi_keepalive service
- Merge RK SDK 1.5.0

#### Tinker Board 3/3S Debian 11 (kernel 5.10) V.1.0.6
Default username/password: linaro/linaro  
Release file: [Tinker_Board_3-Debian-Bullseye-v1.0.6-20241030-release.zip](https://dlcdnets.asus.com/pub/ASUS/Embedded_IPC/Tinker%20Board%203/Tinker_Board_3-Debian-Bullseye-v1.0.6-20241030-release.zip?model=Tinker%20Board%203)  
SHA-256 checksum: 24aebe493f0515133fbee17316bad6e5b597f3f8ddce2a74ad8b29351e78c347
- Fix the wrong usage of devnum in parsing config.txt
- [CM] Implement failover service and focli
- [CM] Support failover
- defconfig: support Wireless USB Network Adapter for tinkerboard 3
- TB3: usb: enable DYNAMIC_DEBUG and modify debugfs path for ehci
- [CM] fix wrong permission for failover service
- display: SPI: set fbtft config to y
- rk3566/rk3568: ddr: update ddrbin to v1.23
- 40PIN: MRAA: support Tinker Board 3 debain
- 40PIN: Tinker 3: ASUS GPIO and WiringPI 1st version

#### Tinker Board 3/3S Debian 11 (kernel 5.10) V.1.0.4
Default username/password: linaro/linaro  
Release file: [Tinker_Board_3-Debian-Bullseye-v1.0.4-20240815-release.zip](https://dlcdnets.asus.com/pub/ASUS/Embedded_IPC/Tinker%20Board%203/Tinker_Board_3-Debian-Bullseye-v1.0.4-20240815-release.zip?model=Tinker%20Board%203)  
SHA-256 checksum: db4f195c5b7376616ca7feb2d5ca75341c58ca7219a3769bf1552600fc5131a9
- Merge rk356x_linux5.10_release_v1.5.0_20240620
- 40Pin: Fix 3V3 and 5V0
- package: add dhcpcd to /etc/group to fix build fail
- 
#### Tinker Board 3/3S Debian 11 v.1.0.1
- Linux kernel version: 5.10
- Default username/password: linaro/linaro
- Release file: [Tinker_Board_3-Debian-Bullseye-v1.0.1-20240606-release.zip](https://dlcdnets.asus.com/pub/ASUS/Embedded_IPC/Tinker%20Board%203/Tinker_Board_3-Debian-Bullseye-v1.0.1-20240606-release.zip?model=Tinker%20Board%203)
- SHA-256 checksum: 1dae122612ac1f88022108b52681ad946ae1e561274107a044fd85d5882aa31b

##### Changelog
- First release of Debian 11 image for Tinker Board 3

## Tinker OS Yocto
|Yocto Project Version|Release|Manifest Branch|Manifest File|
|-|-|-|-|
|Yocto 4.0|latest|linux5.10-rk356x|default.xml|
|Yocto 4.0|1.0.1|linux5.10-rk356x|tinker_board_3-yocto4.0-1.0.1.xml|

### Release Notes
#### Tinker Board 3/3S Yocto 4.0 (kernel 5.10) V.1.0.1
Release file: [Tinker_Board_3-Yocto-Kirkstone-v1.0.1-20240827-release.zip](https://dlcdnets.asus.com/pub/ASUS/Embedded_IPC/Tinker%20Board%203/Tinker_Board_3-Yocto-Kirkstone-v1.0.1-20240827-release.zip?model=Tinker%20Board%203)  
SHA-256 checksum: db4f195c5b7376616ca7feb2d5ca75341c58ca7219a3769bf1552600fc5131a9
- This the first Yocto 4.0 release for Tinker Board 33S
- Merge rk356x_linux5.10_release_v1.5.0_20240620
- 40Pin: Fix 3V3 and 5V0
- package: add dhcpcd to /etc/group to fix build fail

## Tinker OS Android
|Android Version|Release|Manifest Branch|Manifest File|
|-|-|-|-|
|Android 14|latest|android14-rockchip|default.xml|
|Android 14|1.0.9|android14-rockchip|tinker_board_3-android14-1.0.9.xml|
|Android 14|1.0.7|android14-rockchip|tinker_board_3-android14-1.0.7.xml|

### Release Notes
#### Tinker Board 3/3S Android 14 v1.0.9
Linux kernel version: 6.1  
Release file: [Tinker_Board_3-Android14-v1.0.9-20241004.zip](https://dlcdnets.asus.com/pub/ASUS/Embedded_IPC/Tinker%20Board%203/Tinker_Board_3-Android14-v1.0.9-20241004.zip?model=Tinker%20Board%203)  
SHA-256 checksum: 658404b1d4f09eb22299cd41a66bb4170f43b783339a4b108c6129b9ad6e4399
- Camera: Disable camera HAL in Below SKU
- display: keep display rotation settings after reboot
- Camera: Don't copy rkaiq IQ files in below SKU
- display: LVDS: LT9211: modify some register's value when enable SSC

#### Tinker Board 3/3S Android 14 v1.0.7
Linux kernel version: 6.1  
Release file: [Tinker_Board_3-Android14-v1.0.7-20240911.zip](https://dlcdnets.asus.com/pub/ASUS/Embedded_IPC/Tinker%20Board%203/Tinker_Board_3-Android14-v1.0.7-20240911.zip?model=Tinker%20Board%203)  
SHA-256 checksum: 8ac270d3d47b4e852ac90b398497f7accbbc000e90694a689380a7b7fc05458a
- First release of Android 14 image for Tinker Board 3
- Avoid Locksetting Service using Weaver as protector for Tinker Board 3(2/2)
- hid: Change the permission of hidraw0 to 666.
- tinker board 3: splash: correct SDcard splash partition name to mmcblk0p14
- Avoid Locksetting Service using Weaver as protector (1/2)
- set the default launcher to Launcher3
- Kiosk mode: support exit gestures and key public kiosk mode settings
- Kiosk: add Kiosk mode apk
- SystemUI: support lock/unlock status bar dynamically
- SystemUI: support hide/show back/home/recents button dynamically
- SystemUI: hide volume button by default
- SystemUI: support to dynamic show/hide navigation bar
- SystemUI: show navigation bar instead of task bar
- Bluetooth: fix build error
- rkx110_x120_core: fix the build fail on user version
- RKDeviceTest: change the stressapptest to aarch64 for memory test
- Kiosk: fix crash issue when click Kiosk Setting
- webview: add com.google.android.webview to config_webview_packages.xml for user select
- phy: naneng-combphy: init u3phy by specified address
- support to auto-start applications
