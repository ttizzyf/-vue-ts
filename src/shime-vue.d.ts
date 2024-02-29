declare module "*.vue" {
  import type { DefineComponent } from "vue";
  const comment: DefineComponent<{}, {}, any>;

  export default comment;
}

declare module "markdown-it";
declare module "markdown-it-emoji";
declare module "markdown-it-checkbox";
declare module "markdown-it-sup";
declare module "markdown-it-sub";
declare module "markdown-it-footnote";
declare module "markdown-it-mark";
declare module "markdown-it-deflist";
declare module "markdown-it-container";
declare module "markdown-it-abbr";
declare module "@md-reader/markdown-it-mermaid";
