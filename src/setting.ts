interface GenerateThemeColor {
  bg: string; // 主要颜色
  text: string; // 错误颜色
  primary: string; // 警告颜色
}

function generateThemeColor(
  bg: string,
  text: string,
  primary: string
): GenerateThemeColor {
  return {
    bg: bg,
    text: text,
    primary: primary,
  };
}

export default {
  // 网站信息
  websiteInfo: {
    name: "W·Admin",
    version: "1.0.0",
  },

  // 快捷键
  // 支持快捷键 例如 ctrl+shift+s
  hotkey: {
    search: {
      open: "s",
      close: "esc",
    },
  },
  // 通过索引顺序排列颜色
  theme: {
    list: [
      generateThemeColor("#000000", "#ffffff", "#109b45"),
      generateThemeColor("#2e050c", "#ffccd5", "#f50"),
      generateThemeColor("#210", "#f60", "#00ffff"),
      generateThemeColor("#444", "#eee", "#00ffff"),
      generateThemeColor("#eef6f6", "black", "#0000ff"),
    ],
  },
};
