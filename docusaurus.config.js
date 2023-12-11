// @ts-check
// `@type` JSDoc annotations allow editor autocompletion and type checking
// (when paired with `@ts-check`).
// There are various equivalent ways to declare your Docusaurus config.
// See: https://docusaurus.io/docs/api/docusaurus-config

import {themes as prismThemes} from 'prism-react-renderer';

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

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
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
          sidebarPath: './sidebars.js',
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/TinkerBoard/tinkerboard.github.io/tree/main/',
        },
        blog: {
          showReadingTime: true,
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/TinkerBoard/tinkerboard.github.io/tree/main/',
        },
        theme: {
          customCss: './src/css/custom.css',
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
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
      },
      colorMode: {
        defaultMode: 'light',
        disableSwitch: true,
      },
      algolia: {
        // The application ID provided by Algolia
        appId: 'KKIK38Y7O4',
  
        // Public API key: it is safe to commit it
        apiKey: 'fe1a078cdf4142df4a346ee145471711',
  
        indexName: 'tinkerboardio',
  
        // Optional: see doc section below
        contextualSearch: true,
  
        // Optional: Specify domains where the navigation should occur through window.location instead on history.push. Useful when our Algolia config crawls multiple documentation sites and we want to navigate with window.location.href to them.
        externalUrlRegex: 'external\\.com|domain\\.com',
  
        // Optional: Replace parts of the item URLs from Algolia. Useful when using the same search index for multiple deployments using a different baseUrl. You can use regexp or string in the `from` param. For example: localhost:3000 vs myCompany.com/docs
        //replaceSearchResultPathname: {
        //  from: '/docs/', // or as RegExp: /\/docs\//
        //  to: '/',
        //},
  
        // Optional: Algolia search parameters
        searchParameters: {},
  
        // Optional: path for search page that enabled by default (`false` to disable it)
        searchPagePath: 'search',
  
        //... other Algolia params
      },
    }),
};

export default config;
