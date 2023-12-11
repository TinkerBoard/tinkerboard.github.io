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
repo init -u https://github.com/TinkerBoard-Linux/rockchip-linux-manifest.git -b REVISION
```

To check out the code base for a specific release, please run the following command and use the branch name for that product as REVISION and the manifest as NAME.xml.
```bash
repo init -u https://github.com/TinkerBoard-Linux/rockchip-linux-manifest.git -b REVISION -m NAME.xml
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
There are Dockerfile and scripts provided to establish a build environment. Please refer to [Install Docker Engine on Ubuntu](https://docs.docker.com/engine/install/ubuntu/) to install Docker Engine on Ubuntu.

To build the code, go to to the directory where you have downloaded the code base and run the `docker-builder-run.sh` script. This will take a while to install the necessary packages on the host and build the Docker image.
```bash
./docker_builder/docker-builder-run.sh
```

Once the above is done, the shell of the newly started Docker container is available. You can run commands in the shell to build the code.