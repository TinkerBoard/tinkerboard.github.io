---
sidebar_position: 3
---

# Developer Guide
## Source control tools
Working with Tinker Board series code requires using both Git (an open-source version-control system) and Repo (a Google-built repository-management tool that runs on top of Git). We refer to how Android does for [Source control tools](https://source.android.com/docs/setup/download).

Please refer to [Installing Repo](https://source.android.com/setup/develop#installing-repo) to install the Repo Launcher.

## Downloading the source
Since Tinker Board series code is organized in the same way as how Android code is done, please refer to [Downloading the Source](https://source.android.com/setup/build/downloading) to understand how to download the Android code for more information.

There are branches for different products and manifests for different releases in Tinker Board series code.

For Tinker OS Debian and Yocto:

To check out the latest code for a product, please run the following command and use the branch name for that product as REVISION.
```bash
repo init -u https://github.com/TinkerBoard/rockchip-linux-manifest.git -b REVISION
```

To check out the code base for a specific release, please run the following command and use the branch name for that product as REVISION and the manifest as NAME.xml.
```bash
repo init -u https://github.com/TinkerBoard/rockchip-linux-manifest.git -b REVISION -m NAME.xml
```
For Tinker OS Android:

To check out the latest code for a product, please run the following command and use the branch name for that product as REVISION.
```bash
repo init -u https://github.com/TinkerBoard-Android/rockchip-android-manifest.git -b REVISION
```

To check out the code base for a specific release, please run the following command and use the branch name for that product as REVISION and the manifest as NAME.xml.
```bash
repo init -u https://github.com/TinkerBoard-Android/rockchip-android-manifest.git -b REVISION -m NAME.xml
```

Here REVISON is the manifest branch for the product and NAME.xml is the manifest file for the release. Regarding the branches and manifests for each project, please refer to [Tinker OS Releaes](tinker-os-releases.md).

To download the code base source tree to your working directory from the repositories as specified in the default manifest, run:
```bash
repo sync
```

## Building the code
We use Docker to establish a build environment, please refer to [Install Docker Engine on Ubuntu](https://docs.docker.com/engine/install/ubuntu/) to install Docker Engine on Ubuntu.

To build the image, go to to the directory where you have downloaded the code base and run the script as the following. This will take a while to install the necessary packages on the host and build the Docker image.
```bash
./docker_builder/docker-builder-run.sh
```

Once the above is done, you are in the shell of the newly started Docker container. You can start to run commands as usual. You can then run the commands to build the image. The images will be saved in the directory IMAGE.

### Tinker Board 2/2S
#### Tinker OS Debian
To build the image, please run the following commands.
```bash
./build.sh rockchip_rk3399_tinker_board_2_debian_defconfig
VERSION=release ./build.sh
```

#### Tinker OS Yocto
To build the image, please run the following commands.
```bash
./build.sh rockchip_rk3399_tinker_board_2_yocto_defconfig
./build.sh
```

#### Tinker OS Android
To build the image, please run the following commands.
```bash
source build/envsetup.sh
lunch Tinker_Board_2-userdebug
./build.sh -UCKAu
```

### Tinker Board 3N
#### Tinker OS Debian
To build the image, please run the following commands.
```bash
./build.sh rockchip_rk3568_tinker_board_3n_debain_defconfig
VERSION=release ./build.sh
```

#### Tinker OS Yocto
To build the image, please run the following commands.
```bash
./build.sh rockchip_rk3568_tinker_board_3n_yocto_defconfig
./build.sh
```

#### Tinker OS Android
Please run the following commands to configure and chooose to build for Tinker Board 3N.
```bash
source build/envsetup.sh
lunch Tinker_Board_3N-userdebug 
```

Usally, we will run the follwing commands to build all the images and those will be stored in the directory rockdev/Image-Tinker_Board_3N.
```bash
./build.sh -UCKAu
```

We can also specify the argument `o` to build the OTA package and configure the build number with the argument `n`. If the argument `p` is used, the build result will be moved to the directory IMAGE.
```bash
./build.sh -UCKAoup -n X.Y.Z
```

##### Enable A/B boot
To enable A/B boot, please apply the following modification and specify the argument `B`.
- u-boot
```diff
From fe04a288147c040a800f2917d8b06113c6674a0c Mon Sep 17 00:00:00 2001
From: yi-hsin_hung <yi-hsin_hung@asus.com>
Date: Tue, 31 Oct 2023 16:44:35 +0800
Subject: [PATCH] AB boot: Enable AB boot config by uboot

Change-Id: Iba605527449a4b67368e749bb2ae7489c973341d
Signed-off-by: yi-hsin_hung <yi-hsin_hung@asus.com>
---
 configs/tinker_board_3n_defconfig | 1 +
 1 file changed, 1 insertion(+)

diff --git a/configs/tinker_board_3n_defconfig b/configs/tinker_board_3n_defconfig
index a7b28f952b..6779b1a11e 100644
--- a/configs/tinker_board_3n_defconfig
+++ b/configs/tinker_board_3n_defconfig
@@ -32,6 +32,7 @@ CONFIG_SYS_CONSOLE_INFO_QUIET=y
 # CONFIG_DISPLAY_CPUINFO is not set
 CONFIG_ANDROID_BOOTLOADER=y
 CONFIG_ANDROID_AVB=y
+CONFIG_ANDROID_AB=y
 CONFIG_ANDROID_BOOT_IMAGE_HASH=y
 CONFIG_SPL_BOARD_INIT=y
 # CONFIG_SPL_RAW_IMAGE_SUPPORT is not set
-- 
2.34.1
```

- device/asus/tinker_board_3
```diff
From 3d2b1be9735232e587be1cb273d347d57150c706 Mon Sep 17 00:00:00 2001
From: yi-hsin_hung <yi-hsin_hung@asus.com>
Date: Tue, 31 Oct 2023 16:45:59 +0800
Subject: [PATCH] AB boot: Enable AB IMAGE for Tinker Board 3N

Change-Id: I87f0ba831481667ba0c57ee91fe845da7052d16a
Signed-off-by: yi-hsin_hung <yi-hsin_hung@asus.com>
---
 Tinker_Board_3N/BoardConfig.mk | 2 +-
 1 file changed, 1 insertion(+), 1 deletion(-)

diff --git a/Tinker_Board_3N/BoardConfig.mk b/Tinker_Board_3N/BoardConfig.mk
index 59d3f8a..d19d66d 100644
--- a/Tinker_Board_3N/BoardConfig.mk
+++ b/Tinker_Board_3N/BoardConfig.mk
@@ -17,7 +17,7 @@ include device/asus/tinker_board_3/BoardConfig.mk
 BUILD_WITH_GO_OPT := false
 
 # AB image definition
-BOARD_USES_AB_IMAGE := false
+BOARD_USES_AB_IMAGE := true
 BOARD_ROCKCHIP_VIRTUAL_AB_ENABLE := false
 
 ifeq ($(strip $(BOARD_USES_AB_IMAGE)), true)
-- 
2.34.1
```

```bash
./build.sh -UCKABoup -n X.Y.Z
```
##### Enable secure boot
To enable secure boot, please apply the following modification first.
```diff
From b829122af4073a0594dd502cfef852e7d04ca9e3 Mon Sep 17 00:00:00 2001
From: frank_chiang <frank_chiang@asus.com>
Date: Thu, 2 Nov 2023 10:05:42 +0800
Subject: [PATCH] defconfig: Add Base Secure Boot setting for Tinker Board 3N

Change-Id: Iafeda29fbdc4127ec1e7aad2bd9d95b985b1c373
---
 configs/tinker_board_3n_defconfig | 3 +++
 1 file changed, 3 insertions(+)

diff --git a/configs/tinker_board_3n_defconfig b/configs/tinker_board_3n_defconfig
index a7b28f952b..19d8766ced 100644
--- a/configs/tinker_board_3n_defconfig
+++ b/configs/tinker_board_3n_defconfig
@@ -220,3 +220,6 @@ CONFIG_RK_AVB_LIBAVB_USER=y
 CONFIG_OPTEE_CLIENT=y
 CONFIG_OPTEE_V2=y
 CONFIG_OPTEE_ALWAYS_USE_SECURITY_PARTITION=y
+CONFIG_FIT_SIGNATURE=y
+CONFIG_SPL_FIT_SIGNATURE=y
+CONFIG_AVB_VBMETA_PUBLIC_KEY_VALIDATE=y
-- 
2.34.1
```

Then, generate keys in the directory u-boot. (You only need to do this once if you don't have the keys generated.)
```bash
cd u-boot
mkdir -p keys
../rkbin/tools/rk_sign_tool kk --bits 2048 --out . 
mv private_key.pem keys/dev.key && mv public_key.pem keys/dev.pubkey 
openssl req -batch -new -x509 -key keys/dev.key -out keys/dev.crt 
```

Once the keys are ready, we need to build and sign the output first.

:::warning
--burn-key-hash: If you add this compiling option, the secure boot for this SoC will enabled during the 1st boot-up after the image is installed. Suggest you only do this for enablement. Then just use the option --spl-new to sign the image without the option --burn-key-hash.
:::

```bash
./make.sh tinker_board_3n --spl-new --burn-key-hash
```

Then, build the rest without re-building u-boot.
```bash
source build/envsetup.sh 
lunch Tinker_Board_3N-userdebug  
./build.sh -CKABoup -n X.Y.Z
```

Once the device boots up with the signed image, you can see the console log as the following.
```console 
U-Boot SPL 2017.09-dirty #android (May 16 2023 - 16:36:29) 
… 
Trying fit image at 0x4000 sector 
## Verified-boot: 1 
sha256,rsa2048:dev## Verified-boot: 1 
```

:::warning
Once the signed image is installed on the device and the device will be enbled for the secure boot for the 1st boot up. Then, the device can not boot with any other images which are not signed by the same keys.
:::
