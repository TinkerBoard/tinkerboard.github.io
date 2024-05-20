---
sidebar_position: 1
---

# Tinker Board (S) (R2.0)
## Tinker OS Debian
|Debian Version|Release|Branch|Manifest|
|-|-|-|-|
|Debian 10|latest|linux4.4-rk3288-tinker_board|default.xml|
|Debian 10|v3.0.27|linux4.4-rk3288-tinker_board|tinker_board-debian-3.0.27.xml|
|Debian 10|v3.0.23|linux4.4-rk3288-tinker_board|tinker_board-debian-3.0.23.xml|

### Release notes
#### Tinker Board (S) (R2.0) Debian 10 v.3.0.27
- Linux kernel version: 4.4
- Default username/password: linaro/linaro
- Release file: [Tinker_Board-Debian-Buster-v3.0.27-20240424.zip](https://dlcdnets.asus.com/pub/ASUS/Embedded_IPC/Tinker%20Board%20R2.0/Tinker_Board-Debian-Buster-v3.0.27-20240424.zip?model=Tinker%20Board%20R2.0)
- SHA-256 checksum: 8c9eb62643676d654e4932ddb4208d33054b7f930ce5c71b21f567cecac7e949

##### Changelog
- Disable autologin functions for PSTI
- Improve eMMC stability
- Improvie the stability for P170ETN01 panel
- Eable ROCKCHIP_EFUSE config for u-boot to set cpuid from efuse to fix the issue that all CPU has the same ID
- leds: Add gpio_leds label for gpio-leds node.
- overlay: Add the pin33 mmc led dts

#### Tinker Board (S) (R2.0) Debian 10 v.3.0.23
- Linux kernel version: 4.4
- Default username/password: linaro/linaro
- Release file: [Tinker_Board-Debian-Buster-v3.0.23-20230426.zip](https://dlcdnets.asus.com/pub/ASUS/Embedded_IPC/Tinker%20Board%20R2.0/Tinker_Board-Debian-Buster-v3.0.23-20230426.zip?model=Tinker%20Board%20R2.0)
- SHA-256 checksum: f05a75da90fb4af982e47bdeff904d8a52401c366460a7d009c7198e2c9f52b3

##### Changelog
- Add w1-gpio-overlay.dts file for the one wire function on pin7
- Enable NFT kernel configs for Tinker Board (S)
  - CONFIG_NFT_CHAIN_NAT_IPV4=y
  - CONFIG_NFT_MASQ_IPV4=y
  - CONFIG_NFT_CHAIN_NAT_IPV6=y
  - CONFIG_NFT_MASQ_IPV6=y
- U-boot: Enable CONFIG_ENV_OVERWRITE to overwrite ethaddr, eth1addr, and serial#
- Support lt9211 mipi2lvds adapter and enable the following panels
  - mipi2lvds2_G156BGE-L01
  - mipi2lvds2_G185XW01
- Built in VNC server
- Fix the issue that kernel message is not displayed on the VGA console
- Integrate Wi-Fi drivers rtl8192eu, rtl88xxu and rtl88x2bu for USB Wi-Fi dongles TP-Link Archer T2U PLUS, TP-Link Archer T4U ver.3 and IWA 3001
- Support external sound cards:
  - Hifiberry AMP+
  - Hifiberry DAC+ RCA
  - Hifiberry DAC+ light
  - Hifiberry Digi+ Stand
  - Hifiberry Digi Pro
  - JustBoom DAC HAT, Amp HAT, DAC Zero and Amp Zero
  - JustBoom Digi HAT and Digi Zero
  - IQaudIO DAC/Pi-DAC+/Pi-DAC Pro/Pi-Digi+
  - seeed-2mic-voicecard
- Support USB printer
- usb: dwc2: Fix gadget DMA unmap direction

## Tinker OS Yocto
|Yocto Project Version|Release|Branch|Manifest|Note|
|-|-|-|-|-|
|Yocto 4.0|latest||default.xml||

## Tinker OS Android
|Android Version|Release|Branch|Manifest|Note|
|-|-|-|-|-|
|Android 12|latest|android12-rockchip|default.xml||