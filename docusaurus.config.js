// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'ASUS Tinker Board Series Documentation',
  //tagline: 'Dinosaurs are cool',
  favicon: 'img/tinker_board-favicon.png',

  // Set the production url of your site here
  url: 'https://tinkerboard.github.io',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'TinkerBoard', // Usually your GitHub org/user name.
  projectName: 'tinkerboard.github.io', // Usually your repo name.
  trailingSlash: false,

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  // Even if you don't use internalization, you can use this field to set useful
  // metadata like html lang. For example, if your site is Chinese, you may want
  // to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          //editUrl:
          //  'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
        },
        blog: {
          showReadingTime: true,
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          //editUrl:
          //  'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      // Replace with your project's social card
      image: 'img/tinker_board-logo.png',
      navbar: {
        title: 'ASUS Tinker Board Series Documentation',
        logo: {
          alt: 'ASUS Tinker Board Series Documentation Logo',
          src: 'img/tinker_board-logo.png',
        },
        items: [
          {
            type: 'docSidebar',
            sidebarId: 'tutorialSidebar',
            position: 'left',
            label: 'Getting Started',
          },
          {to: '/blog', label: 'Blog', position: 'left'},
          {
            href: 'https://tinker-board.asus.com',
            label: 'Tinker Board Website',
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Documentation',
            items: [
              {
                label: 'Getting Started',
                to: '/docs/getting-started',
              },
            ],
          },
          {
            title: 'ASUS',
            items: [
              {
                label: 'ASUS',
                href: 'https://www.asus.com',
              },
              {
                label: 'ASUS IoT',
                href: 'https://iot.asus.com',
              },
            ],
              },
              {
            title: 'Tinker Board Series',
            items: [
              {
                label: 'Tinker Board Website',
                href: 'https://tinker-board.asus.com',
              },
              {
                label: 'Tinker Board Wiki',
                href: 'https://github.com/TinkerBoard/TinkerBoard/wiki/',
              },
            ],
          },
          {
            title: 'Community',
            items: [
              {
                label: 'Tinker Board Forum',
                href: 'https://tinker-board.asus.com/forum/',
              },
            ],
          },
          {
            title: 'More',
            items: [
              {
                label: 'Blog',
                to: '/blog',
              },
              {
                label: 'GitHub - Linux',
                href: 'https://github.com/TinkerBoard/',
              },
              {
                label: 'GitHub - Android',
                href: 'https://github.com/TinkerBoard-Android/',
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} ASUSTeK Computer Inc. Built with Docusaurus.`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
      colorMode: {
        defaultMode: 'light',
        disableSwitch: true,
      },
    }),
};

module.exports = config;
