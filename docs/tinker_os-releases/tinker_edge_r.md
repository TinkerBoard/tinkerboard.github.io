---
sidebar_position: 2
---

# Tinker Edge R
## Tinker OS Debian
|Debian Version|Release|Manifest Branch|Manifest File|
|-|-|-|-|
|Debian 10|latest|linux4.4-rk3399pro|default.xml|
|Debian 10|2.0.5|linux4.4-rk3399pro|tinker_edge_r-debian-2.0.5.xml|

### Release notes
#### Tinker Edge R Debian 10 V2.0.5
- Linux kernel version: 4.4
- Default username/password: linaro/linaro
- Release file: [Tinker_Edge_R-Debian-Buster-v2.0.5-20220217.zip](https://dlcdnets.asus.com/pub/ASUS/mb/Embedded_IPC/Tinker_Edge_R/Tinker_Edge_R-Debian-Buster-v2.0.5-20220217.zip?model=Tinker%20Edge%20R)
- SHA-256 checksum: c5ccd489174e0472cfc14f95f76cab7aeb1e5e05dc1322793de2fb0c1dd33d59

##### Changelog
- Merge Rockchip release rk3399pro_linux_release_v1.4.1_20201203
- RKNNAPI: API: 1.7.1 (566a9b6 build: 2021-10-28 14:56:17)
- RKNNAPI: DRV: 1.6.0 (159d2d3 build: 2021-01-12 15:23:09)
- Upgrade to Debian 10
- Upgrade Wi-Fi driver to v5.12.1.8-2-g58609677a.20210923_COEX20210504-2323
- Wi-Fi: Disable P2P
- Fine tune USB type C
- Modem: supported automatically connecting and SIM detection
- Fine tune modem manager
- Upgrade modemmanager to v1.14.12
- gst-rkmpp: Update packages to disable mpeg2 decoder
- HDMI: Support HDMI panel VGG804826, VGG804838 and DWE2100
- Support flag to disable UMS mode
- Enable saveenv on MMC devices.
- Modify saveenv based on boot up device.
- mmc: assign right mmc card for rk_vendor_storage (This resolves the rebooting aging failure.)

## Tinker OS Android
|Android Version|Release|Manifest Branch|Manifest File|
|-|-|-|-|
|Android|latest|android|default.xml|
