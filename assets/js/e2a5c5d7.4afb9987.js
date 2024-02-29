"use strict";(self.webpackChunktinkerboard_github_io=self.webpackChunktinkerboard_github_io||[]).push([[879],{5899:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>s,contentTitle:()=>d,default:()=>_,frontMatter:()=>a,metadata:()=>r,toc:()=>l});var i=t(4848),o=t(8453);const a={sidebar_position:1},d="Tinker OS Android",r={id:"developer-guide/tinker_board_3n/tinker_os_android",title:"Tinker OS Android",description:"Initialize the environment with the envsetup.sh script.",source:"@site/docs/developer-guide/tinker_board_3n/tinker_os_android.md",sourceDirName:"developer-guide/tinker_board_3n",slug:"/developer-guide/tinker_board_3n/tinker_os_android",permalink:"/docs/developer-guide/tinker_board_3n/tinker_os_android",draft:!1,unlisted:!1,editUrl:"https://github.com/TinkerBoard/tinkerboard.github.io/tree/main/docs/developer-guide/tinker_board_3n/tinker_os_android.md",tags:[],version:"current",lastUpdatedBy:"Leslie Yu",lastUpdatedAt:1703833361,formattedLastUpdatedAt:"Dec 29, 2023",sidebarPosition:1,frontMatter:{sidebar_position:1},sidebar:"tutorialSidebar",previous:{title:"Tinker Board 3N",permalink:"/docs/developer-guide/tinker_board_3n/"},next:{title:"Tinker OS Releases",permalink:"/docs/tinker_os-releases/"}},s={},l=[{value:"Building OTA package",id:"building-ota-package",level:2},{value:"A/B boot",id:"ab-boot",level:2},{value:"Creating a new partition for A/B boot",id:"creating-a-new-partition-for-ab-boot",level:2},{value:"Secure boot",id:"secure-boot",level:2},{value:"Android verified boot",id:"android-verified-boot",level:2}];function c(e){const n={a:"a",admonition:"admonition",code:"code",h1:"h1",h2:"h2",li:"li",p:"p",pre:"pre",ul:"ul",...(0,o.R)(),...e.components};return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(n.h1,{id:"tinker-os-android",children:"Tinker OS Android"}),"\n",(0,i.jsxs)(n.p,{children:["Initialize the environment with the ",(0,i.jsx)(n.code,{children:"envsetup.sh"})," script."]}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-bash",children:"source build/envsetup.sh\n"})}),"\n",(0,i.jsxs)(n.p,{children:["Run the ",(0,i.jsx)(n.code,{children:"lunch"})," command to choose ",(0,i.jsx)(n.code,{children:"Tinker_Board_3N-userdebug"})," as the target to build for Tinker Board 3N."]}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-bash",children:"lunch Tinker_Board_3N-userdebug \n"})}),"\n",(0,i.jsxs)(n.p,{children:["Run the ",(0,i.jsx)(n.code,{children:"build.sh"})," script to build the code. Here the option ",(0,i.jsx)(n.code,{children:"U"})," is provided to build the u-boot, the options ",(0,i.jsx)(n.code,{children:"C"})," and ",(0,i.jsx)(n.code,{children:"K"})," are provided to build the kernel, the option ",(0,i.jsx)(n.code,{children:"A"})," is provided to build the Android, and the option ",(0,i.jsx)(n.code,{children:"u"})," is provided to pack all the images. All the images will be stored in the directory rockdev/Image-Tinker_Board_3N."]}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-bash",children:"./build.sh -UCKAu\n"})}),"\n",(0,i.jsxs)(n.p,{children:["You can configure the build number with the option ",(0,i.jsx)(n.code,{children:"n"}),". If the option ",(0,i.jsx)(n.code,{children:"p"})," is provided, the build output will be moved to the directory IMAGE."]}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-bash",children:"./build.sh -UCKAup -n X.Y.Z\n"})}),"\n",(0,i.jsx)(n.h2,{id:"building-ota-package",children:"Building OTA package"}),"\n",(0,i.jsxs)(n.p,{children:["You can provide the option ",(0,i.jsx)(n.code,{children:"o"})," to build target files archieve and the OTA package. The target-files.zip archive and the full OTA package will be built out."]}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-bash",children:"./build.sh -UCKAou\n"})}),"\n",(0,i.jsxs)(n.p,{children:["Please refer to ",(0,i.jsx)(n.a,{href:"https://source.android.com/docs/core/ota/tools",children:"Building OTA packages"})," to build full updates and incremental updates."]}),"\n",(0,i.jsx)(n.h2,{id:"ab-boot",children:"A/B boot"}),"\n",(0,i.jsx)(n.p,{children:"To enable the A/B boot, please apply the modification under each directory."}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsx)(n.li,{children:"u-boot: In the directory u-boot, make sure the config CONFIG_ANDROID_AB is enabled."}),"\n"]}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-diff",children:"diff --git a/configs/tinker_board_3n_defconfig b/configs/tinker_board_3n_defconfig\nindex a7b28f952b..6779b1a11e 100644\n--- a/configs/tinker_board_3n_defconfig\n+++ b/configs/tinker_board_3n_defconfig\n@@ -32,6 +32,7 @@ CONFIG_SYS_CONSOLE_INFO_QUIET=y\n # CONFIG_DISPLAY_CPUINFO is not set\n CONFIG_ANDROID_BOOTLOADER=y\n CONFIG_ANDROID_AVB=y\n+CONFIG_ANDROID_AB=y\n CONFIG_ANDROID_BOOT_IMAGE_HASH=y\n CONFIG_SPL_BOARD_INIT=y\n # CONFIG_SPL_RAW_IMAGE_SUPPORT is not set\n"})}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsx)(n.li,{children:"device/asus/tinker_board_3: In the directory device/asus/tinker_board_3, change the flag BOARD_USES_AB_IMAGE to true."}),"\n"]}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-diff",children:"diff --git a/Tinker_Board_3N/BoardConfig.mk b/Tinker_Board_3N/BoardConfig.mk\nindex 59d3f8a..d19d66d 100644\n--- a/Tinker_Board_3N/BoardConfig.mk\n+++ b/Tinker_Board_3N/BoardConfig.mk\n@@ -17,7 +17,7 @@ include device/asus/tinker_board_3/BoardConfig.mk\n BUILD_WITH_GO_OPT := false\n \n # AB image definition\n-BOARD_USES_AB_IMAGE := false\n+BOARD_USES_AB_IMAGE := true\n BOARD_ROCKCHIP_VIRTUAL_AB_ENABLE := false\n \n ifeq ($(strip $(BOARD_USES_AB_IMAGE)), true)\n"})}),"\n",(0,i.jsxs)(n.p,{children:["Please also provide the option ",(0,i.jsx)(n.code,{children:"B"})," when running the ",(0,i.jsx)(n.code,{children:"build.sh"})," script."]}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-bash",children:"./build.sh -UCKABu\n"})}),"\n",(0,i.jsx)(n.h2,{id:"creating-a-new-partition-for-ab-boot",children:"Creating a new partition for A/B boot"}),"\n",(0,i.jsxs)(n.p,{children:["If want to creat a new partition for A/B boot, you can refer to this example. This example is to create a new partition ",(0,i.jsx)(n.code,{children:"persist"})," for A/B boot and the partition will be mounted on ",(0,i.jsx)(n.code,{children:"/persist"}),". Please apply the modification under each directory."]}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsxs)(n.li,{children:["device/asus/common: In the directory device/asus/common, edit the ",(0,i.jsx)(n.code,{children:"mkimage_ab.sh"})," script to create the persist.img file. The initial data could also be added here."]}),"\n"]}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-diff",children:'diff --git a/mkimage_ab.sh b/mkimage_ab.sh\nindex 7bfcf27..2e5efe0 100755\n--- a/mkimage_ab.sh\n+++ b/mkimage_ab.sh\n@@ -313,4 +313,14 @@ rm -rf $IMAGE_PATH/.tmp\n echo "done."\n fi\n \n+echo -n "create persist.img"\n+dd if=/dev/zero of=$IMAGE_PATH/persist.img count=2000 bs=8k\n+mkdosfs $IMAGE_PATH/persist.img\n+# You can uncomment the followings to put some initial files if needed.\n+#mkdir $IMAGE_PATH/.tmp\n+#sudo mount $IMAGE_PATH/persist.img $IMAGE_PATH/.tmp\n+#sudo umount $IMAGE_PATH/.tmp\n+#rm -rf $IMAGE_PATH/.tmp\n+echo "done."\n+\n chmod a+r -R $IMAGE_PATH/\n'})}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsxs)(n.li,{children:["device/asus/tinker_board_3: In the directory device/asus/tinker_board_3,","\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsxs)(n.li,{children:["Edit the ",(0,i.jsx)(n.code,{children:"RebuildParameter.mk"})," file to add the partition ",(0,i.jsx)(n.code,{children:"persist"})," into the partition_list."]}),"\n",(0,i.jsxs)(n.li,{children:["Edit the ",(0,i.jsx)(n.code,{children:"Tinker_Board_3N/fstab.in"})," file and the ",(0,i.jsx)(n.code,{children:"Tinker_Board_3N/recovery.fstab_AB"})," file to add the partition /dev/block/by-name/persist."]}),"\n",(0,i.jsxs)(n.li,{children:["Edit the ",(0,i.jsx)(n.code,{children:"sepolicy/dtoverlay/file_contexts"})," file to configure SELinux for the partition /dev/block/by-name/persist."]}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-diff",children:"diff --git a/RebuildParameter.mk b/RebuildParameter.mk\nindex 95796c2..8c3e6c5 100644\n--- a/RebuildParameter.mk\n+++ b/RebuildParameter.mk\n@@ -38,6 +38,8 @@ partition_list := $(partition_list),splash:16M\n # Added by ASUS: dtoverlay partition\n partition_list := $(partition_list),dtoverlay:16M\n \n+partition_list := $(partition_list),persist:16M\n+\n ifeq ($(strip $(BOARD_SUPER_PARTITION_GROUPS)),rockchip_dynamic_partitions)\n partition_list := $(partition_list),super:$(BOARD_SUPER_PARTITION_SIZE)\n else # BOARD_USE_DYNAMIC_PARTITIONS\ndiff --git a/Tinker_Board_3N/fstab.in b/Tinker_Board_3N/fstab.in\nindex 89348c2..e8c9696 100755\n--- a/Tinker_Board_3N/fstab.in\n+++ b/Tinker_Board_3N/fstab.in\n@@ -26,6 +26,7 @@ ${_block_prefix}odm     /odm      ext4 ro,barrier=1 ${_flags},first_stage_mount\n # Added by ASUS\n /dev/block/by-name/splash       /splash             emmc      defaults     defaults\n /dev/block/by-name/dtoverlay    /dtoverlay          vfat      defaults     defaults\n+/dev/block/by-name/persist    /persist         vfat      defaults     defaults\n \n #  Full disk encryption has less effect on rk3326, so default to enable this.\n /dev/block/by-name/userdata /data f2fs noatime,nosuid,nodev,discard,reserve_root=32768,resgid=1065 latemount,wait,check,fileencryption=aes-256-xts:aes-256-cts:v2+inlinecrypt_optimized,keydirectory=/metadata/vold/metadata_encryption,quota,formattable,reservedsize=128M,checkpoint=fs\ndiff --git a/Tinker_Board_3N/recovery.fstab_AB b/Tinker_Board_3N/recovery.fstab_AB\nindex e4b65c6..4478d16 100644\n--- a/Tinker_Board_3N/recovery.fstab_AB\n+++ b/Tinker_Board_3N/recovery.fstab_AB\n@@ -24,3 +24,4 @@ odm_dlkm    /odm_dlkm    ext4 ro,barrier=1 wait,slotselect,logical,first_stage_m\n # Added by ASUS\n /dev/block/by-name/splash           /splash                emmc             defaults                  defaults\n /dev/block/by-name/dtoverlay           /dtoverlay                vfat             defaults                  defaults\n+/dev/block/by-name/persist    /persist         vfat      defaults     defaults\ndiff --git a/sepolicy/dtoverlay/file_contexts b/sepolicy/dtoverlay/file_contexts\nindex fd6a17f..75c0564 100644\n--- a/sepolicy/dtoverlay/file_contexts\n+++ b/sepolicy/dtoverlay/file_contexts\n@@ -1,3 +1,6 @@\n /dtoverlay(/.*)?                u:object_r:vfat:s0\n \n /dev/block/by-name/dtoverlay    u:object_r:userdata_block_device:s0\n+\n+/persist(/.*)?                u:object_r:vfat:s0\n+/dev/block/by-name/persist    u:object_r:userdata_block_device:s0\n"})}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsxs)(n.li,{children:["RKTools: In the directory RKTools, add the partition ",(0,i.jsx)(n.code,{children:"persist"})," using the image persist.img."]}),"\n"]}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-diff",children:"diff --git a/linux/Linux_Pack_Firmware/rockdev/package-file-Tinker_Board_3N-ab b/linux/Linux_Pack_Firmware/rockdev/package-file-Tinker_Board_3N-ab\nindex 1cf0780..17489b5 100755\n--- a/linux/Linux_Pack_Firmware/rockdev/package-file-Tinker_Board_3N-ab\n+++ b/linux/Linux_Pack_Firmware/rockdev/package-file-Tinker_Board_3N-ab\n@@ -13,6 +13,7 @@ dtbo_a      Image/dtbo.img\n dtbo_b      Image/dtbo.img\n splash      Image/splash.img\n dtoverlay   Image/dtoverlay.img\n+persist   Image/persist.img\n vbmeta_a    Image/vbmeta.img\n vbmeta_b    Image/vbmeta.img\n baseparameter    Image/baseparameter.img\n"})}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsxs)(n.li,{children:["system/core: In the directory system/core, edit the ",(0,i.jsx)(n.code,{children:"rootdir/Android.mk"})," file to mount the partition ",(0,i.jsx)(n.code,{children:"persist"})," on ",(0,i.jsx)(n.code,{children:"/persist"}),"."]}),"\n"]}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-diff",children:"diff --git a/rootdir/Android.mk b/rootdir/Android.mk\nindex 63a1a484b..39cea748d 100644\n--- a/rootdir/Android.mk\n+++ b/rootdir/Android.mk\n@@ -116,6 +116,8 @@ ifdef BOARD_USES_DTOVERLAY_PARTITION\n   LOCAL_POST_INSTALL_CMD += ; mkdir -p $(TARGET_ROOT_OUT)/dtoverlay\n endif\n \n+LOCAL_POST_INSTALL_CMD += ; mkdir -p $(TARGET_ROOT_OUT)/persist\n+\n # For /odm partition.\n LOCAL_POST_INSTALL_CMD += ; mkdir -p $(TARGET_ROOT_OUT)/odm\n # For Treble Generic System Image (GSI), system-as-root GSI needs to work on\n"})}),"\n",(0,i.jsx)(n.h2,{id:"secure-boot",children:"Secure boot"}),"\n",(0,i.jsx)(n.p,{children:"To enable the secure boot, please apply the modification under each directory."}),"\n",(0,i.jsx)(n.admonition,{type:"caution",children:(0,i.jsx)(n.p,{children:"If the secure boot is eanbled, the device can not boot with any other images which are not signed by the same key used to enable the secure boot."})}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsx)(n.li,{children:"u-boot: In the directory u-boot, make sure the configs CONFIG_FIT_SIGNATURE, CONFIG_SPL_FIT_SIGNATURE, and CONFIG_AVB_VBMETA_PUBLIC_KEY_VALIDATE are enabled. You can also enable the config CONFIG_SPL_FIT_ROLLBACK_PROTECT to enable the u-boot rollback protection."}),"\n"]}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-diff",children:"diff --git a/configs/tinker_board_3n_defconfig b/configs/tinker_board_3n_defconfig\nindex a7b28f952b..1428a5abb5 100644\n--- a/configs/tinker_board_3n_defconfig\n+++ b/configs/tinker_board_3n_defconfig\n@@ -220,3 +221,6 @@ CONFIG_RK_AVB_LIBAVB_USER=y\n CONFIG_OPTEE_CLIENT=y\n CONFIG_OPTEE_V2=y\n CONFIG_OPTEE_ALWAYS_USE_SECURITY_PARTITION=y\n+CONFIG_FIT_SIGNATURE=y\n+CONFIG_SPL_FIT_SIGNATURE=y\n+CONFIG_AVB_VBMETA_PUBLIC_KEY_VALIDATE=y\n"})}),"\n",(0,i.jsx)(n.p,{children:"Generate keys in the directory u-boot. (You only need to do this once if you don't have the keys generated.)"}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-bash",children:"cd u-boot\nmkdir -p keys\n../rkbin/tools/rk_sign_tool kk --bits 2048 --out . \nmv private_key.pem keys/dev.key && mv public_key.pem keys/dev.pubkey\nopenssl req -batch -new -x509 -key keys/dev.key -out keys/dev.crt\ncd ..\n"})}),"\n",(0,i.jsxs)(n.p,{children:["Once the keys are ready, build and sign the u-boot by providing the option ",(0,i.jsx)(n.code,{children:"--spl-new"})," and make it able to enable the secure boot automaticall by providing the option ",(0,i.jsx)(n.code,{children:"--burn-key-hash"}),"."]}),"\n",(0,i.jsx)(n.admonition,{type:"danger",children:(0,i.jsxs)(n.p,{children:["--burn-key-hash: If this option is provided, the secure boot for this SoC will be enabled during the 1st boot-up automatically after the image is installed. Then, the device can not boot with any other images which are not signed by the same key. Suggest you only do this for the secure boot enablement and use the option ",(0,i.jsx)(n.code,{children:"--spl-new"})," to sign the image without the option ",(0,i.jsx)(n.code,{children:"--burn-key-hash"}),"."]})}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-bash",children:"cd u-boot\n./make.sh tinker_board_3n --spl-new --burn-key-hash\ncd ..\n"})}),"\n",(0,i.jsxs)(n.p,{children:["Or only to build and sign the u-boot by providing the option ",(0,i.jsx)(n.code,{children:"--spl-new"})]}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-bash",children:"cd u-boot\n./make.sh tinker_board_3n --spl-new\ncd ..\n"})}),"\n",(0,i.jsxs)(n.p,{children:["If the config CONFIG_SPL_FIT_ROLLBACK_PROTECT is enabled to support the u-boot rollback protection. You will need to provide the options ",(0,i.jsx)(n.code,{children:"-version-uboot"})," and ",(0,i.jsx)(n.code,{children:"--rollback-index-uboot"}),"."]}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-bash",children:"cd u-boot\n./make.sh tinker_board_3n --spl-new --version-uboot 0 --rollback-index-uboot 1\ncd ..\n"})}),"\n",(0,i.jsxs)(n.p,{children:["Then, build the rest without re-building u-boot by removing the option ",(0,i.jsx)(n.code,{children:"U"}),"."]}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-bash",children:"./build.sh -CKABu\n"})}),"\n",(0,i.jsx)(n.p,{children:"Once the device boots up with the signed image, you can see the console log as the following."}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-console",children:"U-Boot SPL 2017.09-dirty #android (May 16 2023 - 16:36:29) \n\u2026 \nTrying fit image at 0x4000 sector \n## Verified-boot: 1 \nsha256,rsa2048:dev## Verified-boot: 1 \n"})}),"\n",(0,i.jsx)(n.p,{children:"You can also use the adb command to get the property vendor.secureboot and it will be true if the secure boot is enabled."}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-bash",children:'adb shell getprop | grep "vendor.secureboot"\n[vendor.secureboot]: [true]\n'})}),"\n",(0,i.jsx)(n.h2,{id:"android-verified-boot",children:"Android verified boot"}),"\n",(0,i.jsx)(n.p,{children:"To enable the Android verified boot, please apply the modification under each directory."}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsxs)(n.li,{children:["external/avb: In the directory externa/avb, edit the ",(0,i.jsx)(n.code,{children:"test/avb_atx_generate_test_data"})," file to change the product ID."]}),"\n"]}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-diff",children:'diff --git a/test/avb_atx_generate_test_data b/test/avb_atx_generate_test_data\nindex 1b8bb2b..83016ad 100755\n--- a/test/avb_atx_generate_test_data\n+++ b/test/avb_atx_generate_test_data\n@@ -48,7 +48,7 @@ AVBTOOL=$(dirname "$0")/../avbtool\n echo AVBTOOL = ${AVBTOOL}\n \n # Get a zero product ID.\n-echo 00000000000000000000000000000000 | xxd -r -p - atx_product_id.bin\n+echo 000000000000000000000000000000123 | xxd -r -p - atx_product_id.bin\n \n # Generate key pairs.\n if [ ! -f testkey_atx_prk.pem ]; then\n'})}),"\n",(0,i.jsx)(n.p,{children:"Remove the default test keys and generate new atx_permanent_attributes.bin , atx_metadata.bin, testkey_atx_pik.pem, testkey_atx_prk.pem, testkey_atx_psk.pem, testkey_atx_puk.pem, atx_unlock_challenge.bin, atx_unlock_credential.bin stored in the external/avb/test/data directory. (You only need to do this once if you don't have these generated.)"}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-bash",children:"cd external/avb/test/data\nrm testkey_atx_p*\n../avb_atx_generate_test_data\n"})}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsx)(n.li,{children:"u-boot: In the directory u-boot, make sure the configs CONFIG_AVB_VBMETA_PUBLIC_KEY_VALIDATE and CONFIG_RK_AVB_LIBAVB_ENABLE_ATH_UNLOCK are enabled. You can also enable the config CONFIG_ANDROID_AVB_ROLLBACK_INDEX to enable the rollback protection."}),"\n"]}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-diff",children:"diff --git a/configs/tinker_board_3n_defconfig b/configs/tinker_board_3n_defconfig\nindex a7b28f952b..4f7502fdf9 100644\n--- a/configs/tinker_board_3n_defconfig\n+++ b/configs/tinker_board_3n_defconfig\n@@ -220,3 +220,5 @@ CONFIG_RK_AVB_LIBAVB_USER=y\n CONFIG_OPTEE_CLIENT=y\n CONFIG_OPTEE_V2=y\n CONFIG_OPTEE_ALWAYS_USE_SECURITY_PARTITION=y\n+CONFIG_AVB_VBMETA_PUBLIC_KEY_VALIDATE=y\n+CONFIG_RK_AVB_LIBAVB_ENABLE_ATH_UNLOCK=y\n"})}),"\n",(0,i.jsx)(n.admonition,{type:"danger",children:(0,i.jsx)(n.p,{children:"If the AVB key is embeded in th u-boot, the AVB for this SoC will be enabled during the 1st boot-up automatically after the image is installed. Suggest you only do this for the AVB enablement."})}),"\n",(0,i.jsx)(n.p,{children:"Embed the AVB key in the u-boot to write the key automatically during the 1st boot-up automatically after the image is installed."}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsx)(n.li,{children:"Apply the patch to embed the AVB key in to the u-boot and extract the public key."}),"\n",(0,i.jsxs)(n.li,{children:["Edit the ",(0,i.jsx)(n.code,{children:"lib/avb/libavb_user/avb_ops_user.c"})," file to replace the data of avb_root_pub[] with the data of avb_root_pub_bin in avb_root_pub.h extracted."]}),"\n"]}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-bash",children:"cd u-boot\ngit apply ../RKDocs/common/security/patch/u-boot/0001-avb-add-embedded-key.patch\ncd -\ncd external/avb\n./avbtool extract_public_key --key test/data/testkey_atx_psk.pem --output avb_root_pub.bin$ xxd -i avb_root_pub.bin > test/data/avb_root_pub.h\ncd -\n"})}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsx)(n.li,{children:"device/asus/tinker_board_3: In the directory device/asus/tinker_board_3, make sure the config BOARD_AVB_ENABLE is enabled and the configs BOARD_AVB_ALGORITHM, BOARD_AVB_KEY_PATH, and BOARD_AVB_METADATA_BIN_PATH are defined. You can also define BOARD_AVB_ROLLBACK_INDEX to enable the rollback protection and this will need CONFIG_ANDROID_AVB_ROLLBACK_INDEX to be enabled for u-boot as well."}),"\n"]}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-bash",children:"diff --git a/BoardConfig.mk b/BoardConfig.mk\nindex 6ce3cd7..33f515b 100644\n--- a/BoardConfig.mk\n+++ b/BoardConfig.mk\n@@ -22,7 +22,10 @@ PRODUCT_KERNEL_ARCH ?= arm64\n #PRODUCT_KERNEL_DTS ?= rk3568-tinker_board_3\n #PRODUCT_KERNEL_CONFIG ?= tinker_board_3_defconfig\n \n-# BOARD_AVB_ENABLE := true\n+BOARD_AVB_ENABLE := true\n+BOARD_AVB_ALGORITHM := SHA256_RSA4096\n+BOARD_AVB_KEY_PATH := external/avb/test/data/testkey_atx_psk.pem\n+BOARD_AVB_METADATA_BIN_PATH := external/avb/test/data/atx_metadata.bin\n # used for fstab_generator, sdmmc controller address\n PRODUCT_BOOT_DEVICE := fe310000.sdhci,fe330000.nandc,fe2b0000.dwmmc\n\n"})}),"\n",(0,i.jsx)(n.p,{children:"Once the device boots up with the AVB enabled image, you can see the console log as the following."}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-console",children:"Console log in uboot stage:\nVboot=0, AVB images, AVB verify\nread_is_device_unlocked() ops returned that device is LOCKED\n"})}),"\n",(0,i.jsx)(n.p,{children:"You can also use the adb command to get the property ro.boot.verifiedbootstate and it will be green if the image is verified OK."}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-bash",children:'adb shell getprop | grep "ro.boot.verifiedbootstate"\n[ro.boot.verifiedbootstate]: [green]\n'})})]})}function _(e={}){const{wrapper:n}={...(0,o.R)(),...e.components};return n?(0,i.jsx)(n,{...e,children:(0,i.jsx)(c,{...e})}):c(e)}},8453:(e,n,t)=>{t.d(n,{R:()=>d,x:()=>r});var i=t(6540);const o={},a=i.createContext(o);function d(e){const n=i.useContext(a);return i.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function r(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(o):e.components||o:d(e.components),i.createElement(a.Provider,{value:n},e.children)}}}]);