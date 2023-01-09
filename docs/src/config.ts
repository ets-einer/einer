export const SITE = {
  title: "TCC-ETS Docs",
  description: "Documentação do desenvolvimento do TCC para a área de ETS.",
  defaultLanguage: "pt_BR",
};

export const OPEN_GRAPH = {
  image: {
    src: "https://github.com/withastro/astro/blob/main/assets/social/banner.jpg?raw=true",
    alt:
      "astro logo on a starry expanse of space," +
      " with a purple saturn-like planet floating in the right foreground",
  },
  twitter: "astrodotbuild",
};

// This is the type of the frontmatter you put in the docs markdown files.
export type Frontmatter = {
  title: string;
  description: string;
  layout: string;
  image?: { src: string; alt: string };
  dir?: "ltr" | "rtl";
  ogLocale?: string;
  lang?: string;
};

export const KNOWN_LANGUAGES = {
  // English: "en",
  Portuguese: "pt",
} as const;
export const KNOWN_LANGUAGE_CODES = Object.values(KNOWN_LANGUAGES);

export const GITHUB_EDIT_URL = `https://github.com/tcc-ets/docs/tree/main`;

// See "Algolia" section of the README for more information.
export const ALGOLIA = {
  indexName: "XXXXXXXXXX",
  appId: "XXXXXXXXXX",
  apiKey: "XXXXXXXXXX",
};

export type Sidebar = Record<
  typeof KNOWN_LANGUAGE_CODES[number],
  Record<string, { text: string; link: string }[]>
>;
export const SIDEBAR: Sidebar = {
  pt: {
    Introdução: [
      { text: "Bem-vindo", link: "pt/bem-vindo" },
      { text: "Como documentar", link: "pt/como-documentar" },
      { text: "Git e Github", link: "pt/git-e-github" },
    ],
    Aplicações: [
      { text: "Borum", link: "pt/aplicacoes/borum" },
      { text: "BoschPlanner", link: "pt/aplicacoes/boschplanner" },
      { text: "VSDIAWeb", link: "pt/aplicacoes/vsdiaweb" },
      { text: "Common", link: "pt/aplicacoes/common" },
    ],
    Utils: [
      { text: "Links", link: "pt/utils/links" }
    ]
  },
};
