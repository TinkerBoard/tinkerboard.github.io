---
sidebar_position: 3
---

# Tinker Board 2/2S
## Tinker OS Debian
|Debian Version|Release|Manifest Branch|Manifest File|
|-|-|-|-|
|Debian 11|latest|linux5.10-rk3399-debian11|default.xml|
|Debian 11|3.0.25|linux5.10-rk3399-debian11|tinker_board_2-debian_11-3.0.25.xml|
|Debian 11|3.0.23|linux5.10-rk3399-debian11|tinker_board_2-debian_11-3.0.23.xml|
|Debian 11|3.0.20|linux5.10-rk3399-debian11|tinker_board_2-debian_11-3.0.20.xml|
|Debian 11|3.0.18|linux5.10-rk3399-debian11|tinker_board_2-debian_11-3.0.18.xml|
|Debian 11|3.0.16|linux5.10-rk3399-debian11|tinker_board_2-debian_11-3.0.16.xml|
|Debian 11|3.0.11|linux5.10-rk3399-debian11|tinker_board_2-debian_11-3.0.11.xml|
|Debian 11|3.0.6|linux5.10-rk3399-debian11|tinker_board_2-debian_11-3.0.6.xml|

### Release notes
#### Tinker Board 2/2S Debian 11 (kernel 5.10) V3.0.25
- Default username/password: linaro/linaro  
- Release file: [Tinker_Board_2-Debian-Bullseye-v3.0.25-20250311-release.zip](https://dlcdnets.asus.com/pub/ASUS/Embedded_IPC/Tinker%20Board%202/Tinker_Board_2-Debian-Bullseye-v3.0.25-20250311-release.zip?model=Tinker%20Board%202S)  
- SHA-256 checksum: 1911f7a047ecab0de75588753fe0d89fe7c40ba3ab35b5fc9cfb65b026aedc1d

##### Changelog
- Merge Rockchip SDK version to rk3399_linux5.10_release_v1.5.0_20240620
- Support SYR837 regulator
- Fix occasional PHY power-on failure on USB 3.0 Type-A port after system reboot.
- Support Moschip 7840 usb serail driver
- Improve system stability

#### Tinker Board 2 /2S Debian 11 (kernel 5.10) V3.0.23
- Default username/password: linaro/linaro  
- Release file: [Tinker_Board_2-Debian-Bullseye-v3.0.23-20241220-release.zip](https://dlcdnets.asus.com/pub/ASUS/Embedded_IPC/Tinker%20Board%202/Tinker_Board_2-Debian-Bullseye-v3.0.23-20241220-release.zip?model=Tinker%20Board%202S)  
- SHA-256 checksum: 64786eb572948dba14ccf14048d36653c0591309c860f84d9a650eac9247ac3e

##### Changelog
- display: dsi: support to ACTION FAST AF101U1280800M450SA 10 inch panel
- power manager: support to scheduling power on and off
- wiringPi: fix the spi and i2c interface number for gpio_lib_c_rk3399
- Add the tinker-config tool to application bar and desktop
- display: LVDS: support to G156HAN02.03 panel
- tpm: support TPM 2.0
- Add wifi_keepalive service
- Add AICC browser shortcut on desktop

#### Tinker Board 2 /2S Debian 11 (kernel 5.10) V.3.0.20
- Default username/password: linaro/linaro  
- Release file: [Tinker_Board_2-Debian-Bullseye-v3.0.20-20240527-release.zip](https://dlcdnets.asus.com/pub/ASUS/Embedded_IPC/Tinker%20Board%202/Tinker_Board_2-Debian-Bullseye-v3.0.20-20240527-release.zip?model=Tinker%20Board%202S)  
- SHA-256 checksum: 02b98a559aef72185b675591fd0967b441976dcf2bd349f5461ff12b54b19938

##### Changelog
- u-boot: avoid infinite loop caused by parsing corrupted files
- CVE Security Patch:
  - Kernel: CVE-2016-3695, CVE-2019-12381, CVE-2019-15922, CVE-2019-18675, CVE-2019-18786, CVE-2019-19064, CVE-2019-19602, CVE-2020-16119, CVE-2020-29534, CVE-2020-36322, CVE-2021-20177, CVE-2021-28660, CVE-2021-28712, CVE-2021-28713, CVE-2021-32078, CVE-2021-3411, CVE-2021-3493, CVE-2021-3564, CVE-2021-3573, CVE-2021-3587, CVE-2021-3600, CVE-2021-3760, CVE-2021-38202, CVE-2021-38300, CVE-2021-39685, CVE-2021-42008, CVE-2021-43976, CVE-2021-45095, CVE-2021-45480, CVE-2021-45485, CVE-2021-45486, CVE-2022-0330, CVE-2022-0480, CVE-2022-25375
  - U-Boot: CVE-2018-25032, CVE-2019-11059, CVE-2019-13104, CVE-2019-13105. CVE-2019-13106, CVE-2019-14194, CVE-2019-14195, CVE-2019-14196, CVE-2019-14197, CVE-2019-14198, CVE-2019-14200, CVE-2019-14201, CVE-2019-14202, CVE-2019-14203, CVE-2019-14204, CVE-2020-8432, CVE-2022-20412, CVE-2022-34835
- WS Security Patch:
  - U-Boot: WS-2018-0604
 
#### Tinker Board 2 /2S Debian 11 (kernel 5.10) V.3.0.18
- Default username/password: linaro/linaro
- Release file: [Tinker_Board_2-Debian-Bullseye-v3.0.18-20240425-release.zip](https://dlcdnets.asus.com/pub/ASUS/Embedded_IPC/Tinker%20Board%202/Tinker_Board_2-Debian-Bullseye-v3.0.18-20240425-release.zip?model=Tinker%20Board%202)
- SHA-256 checksum: 28b7b64c2b991bfab732b8daa353cc3ee95a83bf046c0305603b53bf60240b1a

##### Changelog
- Disable auto login for the UART console and the dekstop environment.
- Force the user linaro to change its password at the linaro's next login.
- SSH: Fix SSH start failed at first boot

#### Tinker Board 2 /2S Debian 11 (kernel 5.10) V3.0.16
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

#### Tinker Board 2 /2S Debian 11 (kernel 5.10) V3.0.11
- Default username/password: linaro/linaro
- Release file: [Tinker_Board_2-Debian-Bullseye-v3.0.11-20231024-release.zip](https://dlcdnets.asus.com/pub/ASUS/Embedded_IPC/Tinker%20Board%202/Tinker_Board_2-Debian-Bullseye-v3.0.11-20231024-release.zip?model=Tinker%20Board%202S)
- SHA-256 checksum: f9ed6f6790aa84d2df58d7750486c69b1b21bfff6a840d53abba5ff4696e9f71

##### Changelog
- bsp: migrate Rockchip SDK version to rk3399_linux5.10_release_v1.2.1_20230720
- xserver: fix rendering lag issue
- display: use SW cursor
- uboot: correct the wrong memory address for cmdline append
- serial-getty@.service: fix login automatically as root failed
- docker: modify kernel config for support the docker for Tinker Board 2
- LTE: add modemmanager v1.20.0
- panel: support LKW070N13000-V2 touch panel
- panel: support Innolux_G215HCJ-L01 touch panel

#### Tinker Board 2 /2S Debian 11 (kernel 5.10) V3.0.6
- Default username/password: linaro/linaro
- Release file: [Tinker_Board_2-Debian-Bullseye-v3.0.6-20230627.zip](https://dlcdnets.asus.com/pub/ASUS/Embedded_IPC/Tinker%20Board%202/Tinker_Board_2-Debian-Bullseye-v3.0.6-20230627.zip?model=Tinker%20Board%202S)
- SHA-256 checksum: 533f768e0f658bb13c3bf93b6f152ed0ab133647e6159d360e75f2c36bd5c7cf

##### Changelog
- First release of Debian 11 image for Tinker Board 2S

## Tinker OS Yocto
|Debian Version|Release|Manifest Branch|Manifest File|
|-|-|-|-|
|Yocto 4|latest|linux5.10-rk3399-debian11|default.xml||
|Yocto 4|1.0.5|linux5.10-rk3399-debian11|tinker_board_2-yocto4.0-1.0.5.xml|
|Yocto 4|1.0.3|linux5.10-rk3399-debian11|tinker_board_2-yocto4.0-1.0.3.xml|
|Yocto 4|1.0.2|linux5.10-rk3399-debian11|There is no tag to be uploaded.|

### Release notes
#### Tinker Board 2 /2S Yocto 4.0 (kernel 5.10) V1.0.5
- Release file: [Tinker_Board_2-Yocto-Kirkstone-v1.0.5-20240826-release.zip](https://dlcdnets.asus.com/pub/ASUS/Embedded_IPC/Tinker%20Board%202/Tinker_Board_2-Yocto-Kirkstone-v1.0.5-20240826-release.zip?model=Tinker%20Board%202S)
- SHA-256 checksum: 1f64e0b3c41a440d99ce0d759a23737d28fa013fd8e472ef33053b0d9e5c7614

##### Changelog
- Merge SDK rk356x_linux5.10_release_v1.5.0_20240620
- tinker-scheduler: install tinker-scheduler-applet

#### Tinker Board 2 /2S Yocto 4 (kernel 5.10) V1.0.3
- Release file: [Tinker_Board_2-Yocto-Kirkstone-v1.0.3-20240325-release.zip](https://dlcdnets.asus.com/pub/ASUS/Embedded_IPC/Tinker%20Board%202/Tinker_Board_2-Yocto-Kirkstone-v1.0.3-20240325-release.zip?model=Tinker%20Board%202)
- SHA-256 checksum: dc30cce09c9d6fdfa30eb8a268657adad851acf667e8c96949338e4b2b401363

##### Changelog
- bump Yocto version for 4.0.13
- FOTA update support
#### Tinker Board 2 /2S Yocto 4.0 (kernel 5.10) V1.0.2
- Release file: [Tinker_Board_2-Yocto-Kirkstone-1.0.2-20230919-release.zip](https://dlcdnets.asus.com/pub/ASUS/Embedded_IPC/Tinker%20Board%202/Tinker_Board_2-Yocto-Kirkstone-1.0.2-20230919-release.zip?model=Tinker%20Board%202S)
- SHA-256 checksum: 0acfb2e23fac0f5b53b7cce9c99f6d6b493627f6235c92839ecb42e521a03e79

##### Changelog
- First release of Yocto 4.0 image for Tinker Board 2 series.

## Tinker OS Android
|Android Version|Release|Branch|Manifest|
|-|-|-|-|
|Android 12|latest|android12-rockchip|default.xml|
