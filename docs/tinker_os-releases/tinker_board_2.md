---
sidebar_position: 3
---

# Tinker Board 2/2S
## Tinker OS Debian
|Debian Version|Release|Branch|Manifest|
|-|-|-|-|
|Debian 11|latest|linux5.10-rk3399-debian11|default.xml|
|Debian 11|v3.0.18|linux5.10-rk3399-debian11|tinker_board_2-debian_11-3.0.18.xml|
|Debian 11|v3.0.16|linux5.10-rk3399-debian11|tinker_board_2-debian_11-3.0.16.xml|

### Release notes
#### Tinker Board 2/2S Debian 11 v3.0.18
- Linux kernel version: 5.10
- Default username/password: linaro/linaro
- Release file: [Tinker_Board_2-Debian-Bullseye-v3.0.18-20240425-release.zip](https://dlcdnets.asus.com/pub/ASUS/Embedded_IPC/Tinker%20Board%202/Tinker_Board_2-Debian-Bullseye-v3.0.18-20240425-release.zip?model=Tinker%20Board%202)
- SHA-256 checksum: 28b7b64c2b991bfab732b8daa353cc3ee95a83bf046c0305603b53bf60240b1a

##### Changelog
- Disable auto login for the UART console and the dekstop environment.
- Force the user linaro to change its password at the linaro's next login.
- SSH: Fix SSH start failed at first boot

#### Tinker Board 2/2S Debian 11 v3.0.16
- Linux kernel version: 5.10
- Default username/password: linaro/linaro
- Release file: [Tinker_Board_2-Debian-Bullseye-v3.0.16-20240327-release.zip](https://dlcdnets.asus.com/pub/ASUS/Embedded_IPC/Tinker%20Board%202/Tinker_Board_2-Debian-Bullseye-v3.0.16-20240327-release.zip?model=Tinker%20Board%202)
- SHA-256 checksum: 12258655cd17997913eb757176abaa36d2f00dc34c77ae498e0a41a14cff3d00

##### Changelog
- BSP: migrate Rockchip SDK version to rk3399_linux5.10_release_v1.4.0_20231220
- Upgrade kernel from 5.10.160 to 5.10.198
- Upgrade Debian to 11.8
- defconfig: enable netfilter connection related configs
- defconfig: enable CONFIG_WIREGUARD and CONFIG_IP_MULTIPLE_TABLES
- net: fix ufw and iptables not working
- audio: fix hdmi sound issue
- uboot: fix boot failed if fiq_debugger set to disabled
- splash: add splash partition for boot logo
- bluetooth: btusb: support to RTL8852BE, RTL8852CE.
- bluetooth: rtk_bt: upgrade to 20230413_LINUX_BT_DRIVER_RTL8852C_COEX_v0707
- camera: ignore set clk in ov5647
- camera: update rk-camera-module.h sync to v1.4.0_20231220
- camera: Fixed issue and update librkisp.so
- rkximagesink: fix cropping for video with non-square aspect ratio
- kmssink: fix cropping for video with non-square aspect ratio

## Tinker OS Yocto
|Yocto Project Version|Release|Branch|Manifest|
|-|-|-|-|
|Yocto 4|latest|linux5.10-rk3399-debian11|default.xml||
|Yocto 4|v1.0.3|linux5.10-rk3399-debian11|tinker_board_2-yocto4.0-1.0.3.xml|

### Release notes
#### Tinker Board 2/2S Yocto 4 V1.0.3
- Linux kernel version: 5.10
- Release file: [Tinker_Board_2-Yocto-Kirkstone-v1.0.3-20240325-release.zip](https://dlcdnets.asus.com/pub/ASUS/Embedded_IPC/Tinker%20Board%202/Tinker_Board_2-Yocto-Kirkstone-v1.0.3-20240325-release.zip?model=Tinker%20Board%202)
- SHA-256 checksum: dc30cce09c9d6fdfa30eb8a268657adad851acf667e8c96949338e4b2b401363

##### Changelog
- bump Yocto version for 4.0.13
- FOTA update support

## Tinker OS Android
|Android Version|Release|Branch|Manifest|
|-|-|-|-|
|Android 12|latest|android12-rockchip|default.xml|
