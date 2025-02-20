---
sidebar_position: 4
---

# Tinker Board 3/3S
## Tinker OS Debian
|Debian Version|Release|Branch|Manifest|
|-|-|-|-|
|Debian 11|latest|linux5.10-rk356x|default.xml|
|Debian 11|v1.0.1|linux5.10-rk356x|tinker_board_3-debian_11-1.0.1.xml|

### Release notes
#### Tinker Board 3/3S Debian 11 v.1.0.1
- Linux kernel version: 5.10
- Default username/password: linaro/linaro
- Release file: [Tinker_Board_3-Debian-Bullseye-v1.0.1-20240606-release.zip](https://dlcdnets.asus.com/pub/ASUS/Embedded_IPC/Tinker%20Board%203/Tinker_Board_3-Debian-Bullseye-v1.0.1-20240606-release.zip?model=Tinker%20Board%203)
- SHA-256 checksum: 1dae122612ac1f88022108b52681ad946ae1e561274107a044fd85d5882aa31b

##### Changelog
- First release of Debian 11 image for Tinker Board 3

## Tinker OS Android
|Android Version|Release|Manifest Branch|Manifest File|
|-|-|-|-|
|Android 14|latest|android14-rockchip|default.xml|
|Android 14|1.0.9|android14-rockchip|tinker_board_3-android14-1.0.9.xml|
|Android 14|1.0.7|android14-rockchip|tinker_board_3-android14-1.0.7.xml|

### Release Notes
#### Tinker Board 3/3S Android 14 (kernel 6.1) V.1.0.9
Release file: [Tinker_Board_3-Android14-v1.0.9-20241004.zip](https://dlcdnets.asus.com/pub/ASUS/Embedded_IPC/Tinker%20Board%203/Tinker_Board_3-Android14-v1.0.9-20241004.zip?model=Tinker%20Board%203)  
SHA-256 checksum: 658404b1d4f09eb22299cd41a66bb4170f43b783339a4b108c6129b9ad6e4399
- display: keep display rotation settings after reboot
- display: LVDS: LT9211: modify some register's value when enable SSC

#### Tinker Board 3/3S Android 14 (kernel 6.1) V.1.0.7
Release file: [Tinker_Board_3-Android14-v1.0.7-20240911.zip](https://dlcdnets.asus.com/pub/ASUS/Embedded_IPC/Tinker%20Board%203/Tinker_Board_3-Android14-v1.0.7-20240911.zip?model=Tinker%20Board%203)  
SHA-256 checksum: 8ac270d3d47b4e852ac90b398497f7accbbc000e90694a689380a7b7fc05458a
- This is the first Android 14 release for Tinker Board 3/3S.
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
