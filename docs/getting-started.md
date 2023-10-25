# Getting started
## Download
### Source control tools
Working with Tinker Board series code requires using both Git (an open-source version-control system) and Repo (a Google-built repository-management tool that runs on top of Git). We refer to how Android does for [Source control tools](https://source.android.com/docs/setup/download).

Please refer to [Installing Repo](https://source.android.com/setup/develop#installing-repo) to install the Repo Launcher.

### Downloading the source
Since Tinker Board series code is organized in the same way as how Android code is done, please refer to [Downloading the Source](https://source.android.com/setup/build/downloading) to understand how to download the Android code for more information.

There are branches for different products and manifests for different releases in Tinker Board series code.

To check out the latest code for a product, please run the following command and use the branch name for that product as REVISION.

    $ repo init -u https://github.com/TinkerBoard/rockchip-linux-manifest.git -b REVISION

To check out the code base for a specific release, please run the following command and use the branch name for that product as REVISION and the manifest as NAME.xml.

    $ repo init -u https://github.com/TinkerBoard/rockchip-linux-manifest.git -b REVISION -m NAME.xml

Here REVISON is the manifest branch for the product and NAME.xml is the manifest file for the release. Regarding the branches and manifests for each project, please refer to [Releases](#releases).

To download the code base source tree to your working directory from the repositories as specified in the default manifest, run:

    $ repo sync

## Build
We use Docker to establish a build environment, please refer to [Install Docker Engine on Ubuntu](https://docs.docker.com/engine/install/ubuntu/) to install Docker Engine on Ubuntu.

To build the image, go to to the directory where you have downloaded the code base and run the script as the following. This will take a while to install the necessary packages on the host and build the Docker image.

    $ ./docker_builder/docker-builder-run.sh

Once the above is done, you are in the shell of the newly started Docker container. You can start to run commands as usual. You can then run the commands to build the image. The images will be saved in the directory IMAGE.

### Tinker Board 2/2S
#### Tinker OS Android
To build the image, please run the following commands.

    $ source build/envsetup.sh
    $ lunch Tinker_Board_2-userdebug
    $ ./build.sh -UCKAu

### Tinker Board 3N
#### Tinker OS Debian
To build the image, please run the following commands.

    ​$ ./build.sh rockchip_rk3568_tinker_board_3n_debain_defconfig
    $ VERSION=release ./build.sh

#### Tinker OS Yocto
To build the image, please run the following commands.

    $ ./build.sh rockchip_rk3568_tinker_board_3n_yocto_defconfig
    $ ./build.sh

#### Tinker OS Android
To build the image, please run the following commands.

    $ source build/envsetup.sh
    $ lunch Tinker_Board_3N-userdebug 
    $ ./build.sh -UCKAu