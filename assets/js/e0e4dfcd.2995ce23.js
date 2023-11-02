"use strict";(self.webpackChunkmy_website=self.webpackChunkmy_website||[]).push([[2],{3905:(e,n,t)=>{t.d(n,{Zo:()=>u,kt:()=>k});var o=t(7294);function r(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}function a(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);n&&(o=o.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),t.push.apply(t,o)}return t}function i(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?a(Object(t),!0).forEach((function(n){r(e,n,t[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):a(Object(t)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}))}return e}function l(e,n){if(null==e)return{};var t,o,r=function(e,n){if(null==e)return{};var t,o,r={},a=Object.keys(e);for(o=0;o<a.length;o++)t=a[o],n.indexOf(t)>=0||(r[t]=e[t]);return r}(e,n);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(o=0;o<a.length;o++)t=a[o],n.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(r[t]=e[t])}return r}var d=o.createContext({}),s=function(e){var n=o.useContext(d),t=n;return e&&(t="function"==typeof e?e(n):i(i({},n),e)),t},u=function(e){var n=s(e.components);return o.createElement(d.Provider,{value:n},e.children)},c="mdxType",p={inlineCode:"code",wrapper:function(e){var n=e.children;return o.createElement(o.Fragment,{},n)}},h=o.forwardRef((function(e,n){var t=e.components,r=e.mdxType,a=e.originalType,d=e.parentName,u=l(e,["components","mdxType","originalType","parentName"]),c=s(t),h=r,k=c["".concat(d,".").concat(h)]||c[h]||p[h]||a;return t?o.createElement(k,i(i({ref:n},u),{},{components:t})):o.createElement(k,i({ref:n},u))}));function k(e,n){var t=arguments,r=n&&n.mdxType;if("string"==typeof e||r){var a=t.length,i=new Array(a);i[0]=h;var l={};for(var d in n)hasOwnProperty.call(n,d)&&(l[d]=n[d]);l.originalType=e,l[c]="string"==typeof e?e:r,i[1]=l;for(var s=2;s<a;s++)i[s]=t[s];return o.createElement.apply(null,i)}return o.createElement.apply(null,t)}h.displayName="MDXCreateElement"},3331:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>d,contentTitle:()=>i,default:()=>p,frontMatter:()=>a,metadata:()=>l,toc:()=>s});var o=t(7462),r=(t(7294),t(3905));const a={sidebar_position:3},i="Developer Guide",l={unversionedId:"developer-guide",id:"developer-guide",title:"Developer Guide",description:"Source control tools",source:"@site/docs/developer-guide.md",sourceDirName:".",slug:"/developer-guide",permalink:"/docs/developer-guide",draft:!1,editUrl:"https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/docs/developer-guide.md",tags:[],version:"current",sidebarPosition:3,frontMatter:{sidebar_position:3},sidebar:"tutorialSidebar",previous:{title:"User Guide",permalink:"/docs/user-guide"},next:{title:"Tinker OS Releases",permalink:"/docs/tinker-os-releases"}},d={},s=[{value:"Source control tools",id:"source-control-tools",level:2},{value:"Downloading the source",id:"downloading-the-source",level:2},{value:"Building the code",id:"building-the-code",level:2},{value:"Tinker Board 2/2S",id:"tinker-board-22s",level:3},{value:"Tinker OS Android",id:"tinker-os-android",level:4},{value:"Tinker Board 3N",id:"tinker-board-3n",level:3},{value:"Tinker OS Debian",id:"tinker-os-debian",level:4},{value:"Tinker OS Yocto",id:"tinker-os-yocto",level:4},{value:"Tinker OS Android",id:"tinker-os-android-1",level:4},{value:"Enable A/B boot",id:"enable-ab-boot",level:5},{value:"Enable secure boot",id:"enable-secure-boot",level:5}],u={toc:s},c="wrapper";function p(e){let{components:n,...t}=e;return(0,r.kt)(c,(0,o.Z)({},u,t,{components:n,mdxType:"MDXLayout"}),(0,r.kt)("h1",{id:"developer-guide"},"Developer Guide"),(0,r.kt)("h2",{id:"source-control-tools"},"Source control tools"),(0,r.kt)("p",null,"Working with Tinker Board series code requires using both Git (an open-source version-control system) and Repo (a Google-built repository-management tool that runs on top of Git). We refer to how Android does for ",(0,r.kt)("a",{parentName:"p",href:"https://source.android.com/docs/setup/download"},"Source control tools"),"."),(0,r.kt)("p",null,"Please refer to ",(0,r.kt)("a",{parentName:"p",href:"https://source.android.com/setup/develop#installing-repo"},"Installing Repo")," to install the Repo Launcher."),(0,r.kt)("h2",{id:"downloading-the-source"},"Downloading the source"),(0,r.kt)("p",null,"Since Tinker Board series code is organized in the same way as how Android code is done, please refer to ",(0,r.kt)("a",{parentName:"p",href:"https://source.android.com/setup/build/downloading"},"Downloading the Source")," to understand how to download the Android code for more information."),(0,r.kt)("p",null,"There are branches for different products and manifests for different releases in Tinker Board series code."),(0,r.kt)("p",null,"For Tinker OS Debian and Yocto:"),(0,r.kt)("p",null,"To check out the latest code for a product, please run the following command and use the branch name for that product as REVISION."),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-bash"},"repo init -u https://github.com/TinkerBoard/rockchip-linux-manifest.git -b REVISION\n")),(0,r.kt)("p",null,"To check out the code base for a specific release, please run the following command and use the branch name for that product as REVISION and the manifest as NAME.xml."),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-bash"},"repo init -u https://github.com/TinkerBoard/rockchip-linux-manifest.git -b REVISION -m NAME.xml\n")),(0,r.kt)("p",null,"For Tinker OS Android:"),(0,r.kt)("p",null,"To check out the latest code for a product, please run the following command and use the branch name for that product as REVISION."),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-bash"},"repo init -u https://github.com/TinkerBoard-Android/rockchip-android-manifest.git -b REVISION\n")),(0,r.kt)("p",null,"To check out the code base for a specific release, please run the following command and use the branch name for that product as REVISION and the manifest as NAME.xml."),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-bash"},"repo init -u https://github.com/TinkerBoard-Android/rockchip-android-manifest.git -b REVISION -m NAME.xml\n")),(0,r.kt)("p",null,"Here REVISON is the manifest branch for the product and NAME.xml is the manifest file for the release. Regarding the branches and manifests for each project, please refer to ",(0,r.kt)("a",{parentName:"p",href:"/docs/tinker-os-releases"},"Tinker OS Releaes"),"."),(0,r.kt)("p",null,"To download the code base source tree to your working directory from the repositories as specified in the default manifest, run:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-bash"},"repo sync\n")),(0,r.kt)("h2",{id:"building-the-code"},"Building the code"),(0,r.kt)("p",null,"We use Docker to establish a build environment, please refer to ",(0,r.kt)("a",{parentName:"p",href:"https://docs.docker.com/engine/install/ubuntu/"},"Install Docker Engine on Ubuntu")," to install Docker Engine on Ubuntu."),(0,r.kt)("p",null,"To build the image, go to to the directory where you have downloaded the code base and run the script as the following. This will take a while to install the necessary packages on the host and build the Docker image."),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-bash"},"./docker_builder/docker-builder-run.sh\n")),(0,r.kt)("p",null,"Once the above is done, you are in the shell of the newly started Docker container. You can start to run commands as usual. You can then run the commands to build the image. The images will be saved in the directory IMAGE."),(0,r.kt)("h3",{id:"tinker-board-22s"},"Tinker Board 2/2S"),(0,r.kt)("h4",{id:"tinker-os-android"},"Tinker OS Android"),(0,r.kt)("p",null,"To build the image, please run the following commands."),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-bash"},"source build/envsetup.sh\nlunch Tinker_Board_2-userdebug\n./build.sh -UCKAu\n")),(0,r.kt)("h3",{id:"tinker-board-3n"},"Tinker Board 3N"),(0,r.kt)("h4",{id:"tinker-os-debian"},"Tinker OS Debian"),(0,r.kt)("p",null,"To build the image, please run the following commands."),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-bash"},"./build.sh rockchip_rk3568_tinker_board_3n_debain_defconfig\nVERSION=release ./build.sh\n")),(0,r.kt)("h4",{id:"tinker-os-yocto"},"Tinker OS Yocto"),(0,r.kt)("p",null,"To build the image, please run the following commands."),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-bash"},"./build.sh rockchip_rk3568_tinker_board_3n_yocto_defconfig\n./build.sh\n")),(0,r.kt)("h4",{id:"tinker-os-android-1"},"Tinker OS Android"),(0,r.kt)("p",null,"Please run the following commands to configure and chooose to build for Tinker Board 3N."),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-bash"},"source build/envsetup.sh\nlunch Tinker_Board_3N-userdebug \n")),(0,r.kt)("p",null,"Usally, we will run the follwing commands to build all the images and those will be stored in the directory rockdev/Image-Tinker_Board_3N."),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-bash"},"./build.sh -UCKAu\n")),(0,r.kt)("p",null,"We can also specify the argument ",(0,r.kt)("inlineCode",{parentName:"p"},"o")," to build the OTA package and configure the build number with the argument ",(0,r.kt)("inlineCode",{parentName:"p"},"n"),". If the argument ",(0,r.kt)("inlineCode",{parentName:"p"},"p")," is used, the build result will be moved to the directory IMAGE."),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-bash"},"./build.sh -UCKAoup -n X.Y.Z\n")),(0,r.kt)("h5",{id:"enable-ab-boot"},"Enable A/B boot"),(0,r.kt)("p",null,"To enable A/B boot, please apply the following modification and specify the argument ",(0,r.kt)("inlineCode",{parentName:"p"},"B"),"."),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},"u-boot")),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-diff"},"From fe04a288147c040a800f2917d8b06113c6674a0c Mon Sep 17 00:00:00 2001\nFrom: yi-hsin_hung <yi-hsin_hung@asus.com>\nDate: Tue, 31 Oct 2023 16:44:35 +0800\nSubject: [PATCH] AB boot: Enable AB boot config by uboot\n\nChange-Id: Iba605527449a4b67368e749bb2ae7489c973341d\nSigned-off-by: yi-hsin_hung <yi-hsin_hung@asus.com>\n---\n configs/tinker_board_3n_defconfig | 1 +\n 1 file changed, 1 insertion(+)\n\ndiff --git a/configs/tinker_board_3n_defconfig b/configs/tinker_board_3n_defconfig\nindex a7b28f952b..6779b1a11e 100644\n--- a/configs/tinker_board_3n_defconfig\n+++ b/configs/tinker_board_3n_defconfig\n@@ -32,6 +32,7 @@ CONFIG_SYS_CONSOLE_INFO_QUIET=y\n # CONFIG_DISPLAY_CPUINFO is not set\n CONFIG_ANDROID_BOOTLOADER=y\n CONFIG_ANDROID_AVB=y\n+CONFIG_ANDROID_AB=y\n CONFIG_ANDROID_BOOT_IMAGE_HASH=y\n CONFIG_SPL_BOARD_INIT=y\n # CONFIG_SPL_RAW_IMAGE_SUPPORT is not set\n-- \n2.34.1\n")),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},"device/asus/tinker_board_3")),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-diff"},"From 3d2b1be9735232e587be1cb273d347d57150c706 Mon Sep 17 00:00:00 2001\nFrom: yi-hsin_hung <yi-hsin_hung@asus.com>\nDate: Tue, 31 Oct 2023 16:45:59 +0800\nSubject: [PATCH] AB boot: Enable AB IMAGE for Tinker Board 3N\n\nChange-Id: I87f0ba831481667ba0c57ee91fe845da7052d16a\nSigned-off-by: yi-hsin_hung <yi-hsin_hung@asus.com>\n---\n Tinker_Board_3N/BoardConfig.mk | 2 +-\n 1 file changed, 1 insertion(+), 1 deletion(-)\n\ndiff --git a/Tinker_Board_3N/BoardConfig.mk b/Tinker_Board_3N/BoardConfig.mk\nindex 59d3f8a..d19d66d 100644\n--- a/Tinker_Board_3N/BoardConfig.mk\n+++ b/Tinker_Board_3N/BoardConfig.mk\n@@ -17,7 +17,7 @@ include device/asus/tinker_board_3/BoardConfig.mk\n BUILD_WITH_GO_OPT := false\n \n # AB image definition\n-BOARD_USES_AB_IMAGE := false\n+BOARD_USES_AB_IMAGE := true\n BOARD_ROCKCHIP_VIRTUAL_AB_ENABLE := false\n \n ifeq ($(strip $(BOARD_USES_AB_IMAGE)), true)\n-- \n2.34.1\n")),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-bash"},"./build.sh -UCKABoup -n X.Y.Z\n")),(0,r.kt)("h5",{id:"enable-secure-boot"},"Enable secure boot"),(0,r.kt)("p",null,"To enable secure boot, please apply the following modification first."),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-diff"},"From b829122af4073a0594dd502cfef852e7d04ca9e3 Mon Sep 17 00:00:00 2001\nFrom: frank_chiang <frank_chiang@asus.com>\nDate: Thu, 2 Nov 2023 10:05:42 +0800\nSubject: [PATCH] defconfig: Add Base Secure Boot setting for Tinker Board 3N\n\nChange-Id: Iafeda29fbdc4127ec1e7aad2bd9d95b985b1c373\n---\n configs/tinker_board_3n_defconfig | 3 +++\n 1 file changed, 3 insertions(+)\n\ndiff --git a/configs/tinker_board_3n_defconfig b/configs/tinker_board_3n_defconfig\nindex a7b28f952b..19d8766ced 100644\n--- a/configs/tinker_board_3n_defconfig\n+++ b/configs/tinker_board_3n_defconfig\n@@ -220,3 +220,6 @@ CONFIG_RK_AVB_LIBAVB_USER=y\n CONFIG_OPTEE_CLIENT=y\n CONFIG_OPTEE_V2=y\n CONFIG_OPTEE_ALWAYS_USE_SECURITY_PARTITION=y\n+CONFIG_FIT_SIGNATURE=y\n+CONFIG_SPL_FIT_SIGNATURE=y\n+CONFIG_AVB_VBMETA_PUBLIC_KEY_VALIDATE=y\n-- \n2.34.1\n")),(0,r.kt)("p",null,"Then, generate keys in the directory u-boot. (You only need to do this once if you don't have the keys generated.)"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-bash"},"cd u-boot\nmkdir -p keys\n../rkbin/tools/rk_sign_tool kk --bits 2048 --out . \nmv private_key.pem keys/dev.key && mv public_key.pem keys/dev.pubkey \nopenssl req -batch -new -x509 -key keys/dev.key -out keys/dev.crt \n")),(0,r.kt)("p",null,"Once the keys are ready, we need to build and sign the output first."),(0,r.kt)("admonition",{type:"warning"},(0,r.kt)("p",{parentName:"admonition"},"--burn-key-hash: If you add this compiling option, the secure boot for this SoC will enabled during the 1st boot-up after the image is installed. Suggest you only do this for enablement. Then just use the option --spl-new to sign the image without the option --burn-key-hash.")),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-bash"},"./make.sh tinker_board_3n --spl-new --burn-key-hash\n")),(0,r.kt)("p",null,"Then, build the rest without re-building u-boot."),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-bash"},"source build/envsetup.sh \nlunch Tinker_Board_3N-userdebug  \n./build.sh -CKABoup -n X.Y.Z\n")),(0,r.kt)("p",null,"Once the device boots up with the signed image, you can see the console log as the following."),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-console"},"U-Boot SPL 2017.09-dirty #android (May 16 2023 - 16:36:29) \n\u2026 \nTrying fit image at 0x4000 sector \n## Verified-boot: 1 \nsha256,rsa2048:dev## Verified-boot: 1 \n")),(0,r.kt)("admonition",{type:"warning"},(0,r.kt)("p",{parentName:"admonition"},"Once the signed image is installed on the device and the device will be enbled for the secure boot for the 1st boot up. Then, the device can not boot with any other images which are not signed by the same keys.")))}p.isMDXComponent=!0}}]);