---
sidebar_position: 1
---

# Tinker OS Android
Initialize the environment with the `envsetup.sh` script.
```bash
source build/envsetup.sh
```

Run the `lunch` command to choose `Tinker_Board_3N-userdebug` as the target to build for Tinker Board 3N.
```bash
lunch Tinker_Board_3N-userdebug 
```

Run the `build.sh` script to build the code. Here the option `U` is provided to build the u-boot, the options `C` and `K` are provided to build the kernel, the option `A` is provided to build the Android, and the option `u` is provided to pack all the images. All the images will be stored in the directory rockdev/Image-Tinker_Board_3N.
```bash
./build.sh -UCKAu
```

You can configure the build number with the option `n`. If the option `p` is provided, the build output will be moved to the directory IMAGE.
```bash
./build.sh -UCKAup -n X.Y.Z
```

## Building OTA package
You can provide the option `o` to build target files archieve and the OTA package. The target-files.zip archive and the full OTA package will be built out.
```bash
./build.sh -UCKAou
```

Please refer to [Building OTA packages](https://source.android.com/docs/core/ota/tools) to build full updates and incremental updates.

## A/B boot
To enable the A/B boot, please apply the modification under each directory.

- u-boot: In the directory u-boot, make sure the config CONFIG_ANDROID_AB is enabled.
```diff
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
```

- device/asus/tinker_board_3: In the directory device/asus/tinker_board_3, change the flag BOARD_USES_AB_IMAGE to true.
```diff
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
```

Please also provide the option `B` when running the `build.sh` script.
```bash
./build.sh -UCKABu
```

## Creating a new partition for A/B boot
If want to creat a new partition for A/B boot, you can refer to this example. This example is to create a new partition `persist` for A/B boot and the partition will be mounted on `/persist`. Please apply the modification under each directory.

- device/asus/common: In the directory device/asus/common, edit the `mkimage_ab.sh` script to create the persist.img file. The initial data could also be added here.
```diff
diff --git a/mkimage_ab.sh b/mkimage_ab.sh
index 7bfcf27..2e5efe0 100755
--- a/mkimage_ab.sh
+++ b/mkimage_ab.sh
@@ -313,4 +313,14 @@ rm -rf $IMAGE_PATH/.tmp
 echo "done."
 fi
 
+echo -n "create persist.img"
+dd if=/dev/zero of=$IMAGE_PATH/persist.img count=2000 bs=8k
+mkdosfs $IMAGE_PATH/persist.img
+# You can uncomment the followings to put some initial files if needed.
+#mkdir $IMAGE_PATH/.tmp
+#sudo mount $IMAGE_PATH/persist.img $IMAGE_PATH/.tmp
+#sudo umount $IMAGE_PATH/.tmp
+#rm -rf $IMAGE_PATH/.tmp
+echo "done."
+
 chmod a+r -R $IMAGE_PATH/
```

- device/asus/tinker_board_3: In the directory device/asus/tinker_board_3,
  - Edit the `RebuildParameter.mk` file to add the partition `persist` into the partition_list.
  - Edit the `Tinker_Board_3N/fstab.in` file and the `Tinker_Board_3N/recovery.fstab_AB` file to add the partition /dev/block/by-name/persist.
  - Edit the `sepolicy/dtoverlay/file_contexts` file to configure SELinux for the partition /dev/block/by-name/persist.
```diff
diff --git a/RebuildParameter.mk b/RebuildParameter.mk
index 95796c2..8c3e6c5 100644
--- a/RebuildParameter.mk
+++ b/RebuildParameter.mk
@@ -38,6 +38,8 @@ partition_list := $(partition_list),splash:16M
 # Added by ASUS: dtoverlay partition
 partition_list := $(partition_list),dtoverlay:16M
 
+partition_list := $(partition_list),persist:16M
+
 ifeq ($(strip $(BOARD_SUPER_PARTITION_GROUPS)),rockchip_dynamic_partitions)
 partition_list := $(partition_list),super:$(BOARD_SUPER_PARTITION_SIZE)
 else # BOARD_USE_DYNAMIC_PARTITIONS
diff --git a/Tinker_Board_3N/fstab.in b/Tinker_Board_3N/fstab.in
index 89348c2..e8c9696 100755
--- a/Tinker_Board_3N/fstab.in
+++ b/Tinker_Board_3N/fstab.in
@@ -26,6 +26,7 @@ ${_block_prefix}odm     /odm      ext4 ro,barrier=1 ${_flags},first_stage_mount
 # Added by ASUS
 /dev/block/by-name/splash       /splash             emmc      defaults     defaults
 /dev/block/by-name/dtoverlay    /dtoverlay          vfat      defaults     defaults
+/dev/block/by-name/persist    /persist         vfat      defaults     defaults
 
 #  Full disk encryption has less effect on rk3326, so default to enable this.
 /dev/block/by-name/userdata /data f2fs noatime,nosuid,nodev,discard,reserve_root=32768,resgid=1065 latemount,wait,check,fileencryption=aes-256-xts:aes-256-cts:v2+inlinecrypt_optimized,keydirectory=/metadata/vold/metadata_encryption,quota,formattable,reservedsize=128M,checkpoint=fs
diff --git a/Tinker_Board_3N/recovery.fstab_AB b/Tinker_Board_3N/recovery.fstab_AB
index e4b65c6..4478d16 100644
--- a/Tinker_Board_3N/recovery.fstab_AB
+++ b/Tinker_Board_3N/recovery.fstab_AB
@@ -24,3 +24,4 @@ odm_dlkm    /odm_dlkm    ext4 ro,barrier=1 wait,slotselect,logical,first_stage_m
 # Added by ASUS
 /dev/block/by-name/splash           /splash                emmc             defaults                  defaults
 /dev/block/by-name/dtoverlay           /dtoverlay                vfat             defaults                  defaults
+/dev/block/by-name/persist    /persist         vfat      defaults     defaults
diff --git a/sepolicy/dtoverlay/file_contexts b/sepolicy/dtoverlay/file_contexts
index fd6a17f..75c0564 100644
--- a/sepolicy/dtoverlay/file_contexts
+++ b/sepolicy/dtoverlay/file_contexts
@@ -1,3 +1,6 @@
 /dtoverlay(/.*)?                u:object_r:vfat:s0
 
 /dev/block/by-name/dtoverlay    u:object_r:userdata_block_device:s0
+
+/persist(/.*)?                u:object_r:vfat:s0
+/dev/block/by-name/persist    u:object_r:userdata_block_device:s0
```

- RKTools: In the directory RKTools, add the partition `persist` using the image persist.img.
```diff
diff --git a/linux/Linux_Pack_Firmware/rockdev/package-file-Tinker_Board_3N-ab b/linux/Linux_Pack_Firmware/rockdev/package-file-Tinker_Board_3N-ab
index 1cf0780..17489b5 100755
--- a/linux/Linux_Pack_Firmware/rockdev/package-file-Tinker_Board_3N-ab
+++ b/linux/Linux_Pack_Firmware/rockdev/package-file-Tinker_Board_3N-ab
@@ -13,6 +13,7 @@ dtbo_a      Image/dtbo.img
 dtbo_b      Image/dtbo.img
 splash      Image/splash.img
 dtoverlay   Image/dtoverlay.img
+persist   Image/persist.img
 vbmeta_a    Image/vbmeta.img
 vbmeta_b    Image/vbmeta.img
 baseparameter    Image/baseparameter.img
```

- system/core: In the directory system/core, edit the `rootdir/Android.mk` file to mount the partition `persist` on `/persist`.
```diff
diff --git a/rootdir/Android.mk b/rootdir/Android.mk
index 63a1a484b..39cea748d 100644
--- a/rootdir/Android.mk
+++ b/rootdir/Android.mk
@@ -116,6 +116,8 @@ ifdef BOARD_USES_DTOVERLAY_PARTITION
   LOCAL_POST_INSTALL_CMD += ; mkdir -p $(TARGET_ROOT_OUT)/dtoverlay
 endif
 
+LOCAL_POST_INSTALL_CMD += ; mkdir -p $(TARGET_ROOT_OUT)/persist
+
 # For /odm partition.
 LOCAL_POST_INSTALL_CMD += ; mkdir -p $(TARGET_ROOT_OUT)/odm
 # For Treble Generic System Image (GSI), system-as-root GSI needs to work on
```

## Secure boot
To enable the secure boot, please apply the modification under each directory.

:::caution
If the secure boot is eanbled, the device can not boot with any other images which are not signed by the same key used to enable the secure boot.
:::

- u-boot: In the directory u-boot, make sure the configs CONFIG_FIT_SIGNATURE, CONFIG_SPL_FIT_SIGNATURE, and CONFIG_AVB_VBMETA_PUBLIC_KEY_VALIDATE are enabled. You can also enable the config CONFIG_SPL_FIT_ROLLBACK_PROTECT to enable the u-boot rollback protection.
```diff
diff --git a/configs/tinker_board_3n_defconfig b/configs/tinker_board_3n_defconfig
index a7b28f952b..1428a5abb5 100644
--- a/configs/tinker_board_3n_defconfig
+++ b/configs/tinker_board_3n_defconfig
@@ -220,3 +221,6 @@ CONFIG_RK_AVB_LIBAVB_USER=y
 CONFIG_OPTEE_CLIENT=y
 CONFIG_OPTEE_V2=y
 CONFIG_OPTEE_ALWAYS_USE_SECURITY_PARTITION=y
+CONFIG_FIT_SIGNATURE=y
+CONFIG_SPL_FIT_SIGNATURE=y
+CONFIG_AVB_VBMETA_PUBLIC_KEY_VALIDATE=y
```

Generate keys in the directory u-boot. (You only need to do this once if you don't have the keys generated.)
```bash
cd u-boot
mkdir -p keys
../rkbin/tools/rk_sign_tool kk --bits 2048 --out . 
mv private_key.pem keys/dev.key && mv public_key.pem keys/dev.pubkey
openssl req -batch -new -x509 -key keys/dev.key -out keys/dev.crt
cd ..
```

Once the keys are ready, build and sign the u-boot by providing the option `--spl-new` and make it able to enable the secure boot automaticall by providing the option `--burn-key-hash`.

:::danger
--burn-key-hash: If this option is provided, the secure boot for this SoC will be enabled during the 1st boot-up automatically after the image is installed. Then, the device can not boot with any other images which are not signed by the same key. Suggest you only do this for the secure boot enablement and use the option `--spl-new` to sign the image without the option `--burn-key-hash`.
:::

```bash 
cd u-boot
./make.sh tinker_board_3n --spl-new --burn-key-hash
cd ..
```

Or only to build and sign the u-boot by providing the option `--spl-new`
```bash 
cd u-boot
./make.sh tinker_board_3n --spl-new
cd ..
```

If the config CONFIG_SPL_FIT_ROLLBACK_PROTECT is enabled to support the u-boot rollback protection. You will need to provide the options `-version-uboot` and `--rollback-index-uboot`.

```bash 
cd u-boot
./make.sh tinker_board_3n --spl-new --version-uboot 0 --rollback-index-uboot 1
cd ..
```

Then, build the rest without re-building u-boot by removing the option `U`.
```bash 
./build.sh -CKABu
```

Once the device boots up with the signed image, you can see the console log as the following.
```console 
U-Boot SPL 2017.09-dirty #android (May 16 2023 - 16:36:29) 
… 
Trying fit image at 0x4000 sector 
## Verified-boot: 1 
sha256,rsa2048:dev## Verified-boot: 1 
```

You can also use the adb command to get the property vendor.secureboot and it will be true if the secure boot is enabled.
```bash
adb shell getprop | grep "vendor.secureboot"
[vendor.secureboot]: [true]
```

## Android Verified Boot
To enable the Android Verified Boot, please generate the key pairs and the data for your product first. In the directory `externa/avb`, edit the `test/avb_atx_generate_test_data` file to change the product ID for your product.
```diff
diff --git a/test/avb_atx_generate_test_data b/test/avb_atx_generate_test_data
index 1b8bb2b..83016ad 100755
--- a/test/avb_atx_generate_test_data
+++ b/test/avb_atx_generate_test_data
@@ -48,7 +48,7 @@ AVBTOOL=$(dirname "$0")/../avbtool
 echo AVBTOOL = ${AVBTOOL}
 
 # Get a zero product ID.
-echo 00000000000000000000000000000000 | xxd -r -p - atx_product_id.bin
+echo 000000000000000000000000000000123 | xxd -r -p - atx_product_id.bin
 
 # Generate key pairs.
 if [ ! -f testkey_atx_prk.pem ]; then
```

Remove the default test keys and generate new atx_product_id.bin, testkey_atx_prk.pem, testkey_atx_pik.pem,  testkey_atx_psk.pem, testkey_atx_puk.pem, atx_permanent_attributes.bin, atx_pik_certificate.bin, atx_psk_certificate.bin, atx_metadata.bin, atx_unlock_challenge.bin, atx_puk_certificate.bin, atx_unlock_credential.bin, stored in the external/avb/test/data directory. (You only need to do this once if you don't have these generated. You can put those you generated before here if you already have and skip this step.)
```bash
cd external/avb/test/data
rm testkey_atx_p*
../avb_atx_generate_test_data
cd -
```

In the directory `u-boot`, make sure the configs CONFIG_AVB_VBMETA_PUBLIC_KEY_VALIDATE and CONFIG_RK_AVB_LIBAVB_ENABLE_ATH_UNLOCK are enabled. You can also enable the config CONFIG_ANDROID_AVB_ROLLBACK_INDEX to enable the rollback protection.
```diff
diff --git a/configs/tinker_board_3n_defconfig b/configs/tinker_board_3n_defconfig
index a7b28f952b..4f7502fdf9 100644
--- a/configs/tinker_board_3n_defconfig
+++ b/configs/tinker_board_3n_defconfig
@@ -220,3 +220,5 @@ CONFIG_RK_AVB_LIBAVB_USER=y
 CONFIG_OPTEE_CLIENT=y
 CONFIG_OPTEE_V2=y
 CONFIG_OPTEE_ALWAYS_USE_SECURITY_PARTITION=y
+CONFIG_AVB_VBMETA_PUBLIC_KEY_VALIDATE=y
+CONFIG_RK_AVB_LIBAVB_ENABLE_ATH_UNLOCK=y
```

In the directory `device/asus/tinker_board_3`, make sure the config BOARD_AVB_ENABLE is enabled and the configs BOARD_AVB_ALGORITHM, BOARD_AVB_KEY_PATH, and BOARD_AVB_METADATA_BIN_PATH are defined. 
```bash
diff --git a/BoardConfig.mk b/BoardConfig.mk
index 6ce3cd7..33f515b 100644
--- a/BoardConfig.mk
+++ b/BoardConfig.mk
@@ -22,7 +22,10 @@ PRODUCT_KERNEL_ARCH ?= arm64
 #PRODUCT_KERNEL_DTS ?= rk3568-tinker_board_3
 #PRODUCT_KERNEL_CONFIG ?= tinker_board_3_defconfig
 
-# BOARD_AVB_ENABLE := true
+BOARD_AVB_ENABLE := true
+BOARD_AVB_ALGORITHM := SHA256_RSA4096
+BOARD_AVB_KEY_PATH := external/avb/test/data/testkey_atx_psk.pem
+BOARD_AVB_METADATA_BIN_PATH := external/avb/test/data/atx_metadata.bin
 # used for fstab_generator, sdmmc controller address
 PRODUCT_BOOT_DEVICE := fe310000.sdhci,fe330000.nandc,fe2b0000.dwmmc

```

If the config CONFIG_ANDROID_AVB_ROLLBACK_INDEX is enabled in the u-boot to support the rollback protection. You will need to define BOARD_AVB_ROLLBACK_INDEX as the following as well.
```bash 
+BOARD_AVB_ROLLBACK_INDEX := 1
```

There are 2 ways to enable AVB, one is to embed the key into u-boot and the other one is to write the key into the OTP area. You just need to choose one of the following 2 ways to enable AVB.

1. To embed the AVB key in the u-boot
- Extract the public key
```bash
cd external/avb
./avbtool extract_public_key --key test/data/testkey_atx_psk.pem --output avb_root_pub.bin
xxd -i avb_root_pub.bin > test/data/avb_root_pub.h
cd -
```

- Generate the SHA256 checksum for unblocking the devices
```bash
cd external/avb
sha256sum test/data/atx_unlock_credential.bin | cut -d' ' -f1 | xxd -r -p > test/data/avb_unlock_credential_sha256sum.bin
xxd -i test/data/avb_unlock_credential_sha256sum.bin > test/data/avb_unlock_credential_sha256sum.h
cd -
```

- Apply the patchs
```bash
cd u-boot
git apply ../RKDocs/common/security/patch/u-boot/0001-avb-add-embedded-key.patch
git apply ../RKDocs/common/security/patch/u-boot/0002-Remove-hardcode-of-locking-devices.patch
git apply ../RKDocs/common/security/patch/u-boot/0003-fastboot-support-authenticated-unlock-using-embedded.patch
cd -
```

- Edit the `lib/avb/libavb_user/avb_ops_user.c` file to replace the data of avb_root_pub[] with the data of avb_root_pub_bin in the `avb_root_pub.h` file generated.
- Edit the `lib/avb/rk_avb_user/rk_avb_ops_user.c` file to replace the data of atx_unlock_credential_hash[] with the data of test_data_avb_unlock_credential_sha256sum_bin in `avb_unlock_credential_sha256sum.h` file generated.

2. To write the key into the OTP area using fastboot commands
:::caution
If the AVB key is written into the OTP area, it can not be changed and undone.
:::

Please boot the device to the bootloader mode and use the `atx_permanent_attributes.bin` file generated previously to write the key into the OTP area.
```bash
fastboot stage atx_permanent_attributes.bin
fastboot oem fuse at-perm-attr
```

Once either way above is done, boot the device to the bootloader mode and use the fastboot command to lock the device.
```bash
fastboot oem at-lock-vboot
```

Then, boot up the device with the AVB enabled image, you can see the console log as the following.
```console 
Console log in uboot stage:
Vboot=0, AVB images, AVB verify
read_is_device_unlocked() ops returned that device is LOCKED
```

You can also use the adb command to get the property ro.boot.verifiedbootstate and it will be green if the image is verified OK.
```bash
adb shell getprop | grep "ro.boot.verifiedbootstate"
[ro.boot.verifiedbootstate]: [green]
```

If you want to use the fastboot commands to flash the devices, you need to unlock them first. To unlock the devices for flashing, the unlock credential will be reqired. Since we have 2 ways to enable AVB, please provide the unlock credential according to the way you enable AVB.

1. If the AVB key is embedded in the u-boot, please use the `atx_unlock_credential.bin` file generated previously and run the following commands to unlock the devices.
```bash
fastboot stage atx_unlock_credential.bin
fastboot oem at-unlock-vboot
```

2. If the AVB key is written into the OTP area, we need to generate the new credential based on the challenge received.
- Get the raw unlock challenge
```bash
fastboot oem at-get-vboot-unlock-challenge
fastboot get_staged raw_unlock_challenge.bin
```

- Run the `avb-challenge-verify.py` file (Shown as the following) to verify raw unlock challenge using `atx_product_id.bin` file generated previously and generate the `unlock_challenge.bin` file.

```python
#/user/bin/env python
"this is a test module for getting unlock challenge"
import sys
import  os
from hashlib import sha256

def challenge_verify():
	if (len(sys.argv) != 3) :
		print "Usage: avb-challenge-verify.py [challenge_file] [product_id_file]"
		return
	if ((sys.argv[1] == "-h") or (sys.argv[1] == "--h")):
		print "Usage: avb-challenge-verify.py [challenge_file] [product_id_file]"
		return
	try:
		challenge_file = open(sys.argv[1], 'rb')
		product_id_file = open(sys.argv[2], 'rb')
		challenge_random_file = open('unlock_challenge.bin', 'wb')
		challenge_data = challenge_file.read(52)
		product_id_data = product_id_file.read(16)
		product_id_hash = sha256(product_id_data).digest()
		print("The challege version is %d" %ord(challenge_data[0]))
		if (product_id_hash != challenge_data[4:36]) :
			print("Product id verify error!")
			return
		challenge_random_file.write(challenge_data[36:52])
		print("Success!")
	finally:
		if challenge_file:
			challenge_file.close()
		if product_id_file:
			product_id_file.close()
		if challenge_random_file:
			challenge_random_file.close()

if __name__ == '__main__':
	challenge_verify()
```

```bash
python avb-challenge-verify.py raw_unlock_challenge.bin atx_product_id.bin
```

- Use the `unlock_challenge.bin` file and certificates generated previously to generate the new `atx_unlock_credential.bin` file. Please make sure the paths for files are correct.
```bash
cd external/avb
python avbtool make_atx_unlock_credential --output=test/data/atx_unlock_credential.bin --intermediate_key_certificate=test/data/atx_pik_certificate.bin --unlock_key_certificate=test/data/atx_puk_certificate.bin --challenge=unlock_challenge.bin --unlock_key=test/data/testkey_atx_puk.pem
cd -
```

- Use the new generated `stage atx_unlock_credential.bin` file and the following commands to unlock the devices.

```bash
fastboot stage atx_unlock_credential.bin
fastboot oem at-unlock-vboot
```
