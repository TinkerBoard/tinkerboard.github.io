---
sidebar_position: 2
---

# Tinker Board 2/2S
## Tinker OS Debian
To build the image, please run the following commands.
```bash
./build.sh rockchip_rk3399_tinker_board_2_debian_defconfig
VERSION=release ./build.sh
```

## Tinker OS Yocto
To build the image, please run the following commands.
```bash
./build.sh rockchip_rk3399_tinker_board_2_yocto_defconfig
./build.sh
```

## Tinker OS Android
To build the image, please run the following commands.
```bash
source build/envsetup.sh
lunch Tinker_Board_2-userdebug
./build.sh -UCKAu
```
