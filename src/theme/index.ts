import { extendTheme, useTheme } from "native-base";
import { colors } from "./color";
import { fonts } from "./fonts";

// Doc: https://docs.nativebase.io/customizingTheme
/*
  Issues:
  - Hiện vẫn chưa customize default được item selected trong `Select` comp với field `_itemSelected` -> chỉ có cách set ngay lúc sử dụng tạm
*/
const theme = extendTheme({
  colors,
  fontConfig: fonts.fontConfig,
  fonts: fonts.fonts,
  suppressColorAccessibilityWarning: true, // ignore contrast warning
  radii: {
    none: 0,
    xs: 2,
    sm: 4,
    md: 6,
    lg: 8,
    xl: 12,
    pill: 24,
    full: 9999,
  },
  components: {
    AlertTitle: {
      baseStyle: {
        _text: {
          fontSize: "xs",
        },
      },
    },
    AlertDescription: {
      baseStyle: {
        _text: {
          fontSize: "xs",
        },
      },
    },
    Toast: {
      baseStyle: {
        px: 4,
        py: 2,
        backgroundColor: "primary.900",
        color: "secondary.50",
      },
      defaultProps: {
        maxWidth: 280,
      },
    },
    Text: {
      baseStyle: {
        color: "primary.900",
        fontSize: "sm",
        fontFamily: fonts.fonts.Fado,
      },
    },
    Heading: {
      baseStyle: {
        color: "primary.900",
        fontFamily: fonts.fonts.Fado,
      },
    },
    Button: {
      baseStyle: {
        _text: {
          color: "primary.900",
        },
      },
      defaultProps: {
        size: "md",
      },
      variants: {
        solid: {
          _text: {
            color: "white",
          },
        },
      },
    },
    FormControlLabel: {
      baseStyle: {
        _text: {
          fontSize: "sm",
        },
      },
    },
    Input: {
      baseStyle: {},
      defaultProps: {
        size: "md",
      },
      variants: {
        underlined: {
          px: 0,
          _ios: {
            px: 0,
          },
        },
        unstyled: {
          px: 0,
          _ios: {
            px: 0,
          },
        },
      },
    },
    Select: {
      baseStyle: {},
      defaultProps: {},
      variants: {},
    },
    Switch: {
      baseStyle: {},
      defaultProps: {
        size: "sm",
      },
      variants: {},
    },
    Checkbox: {
      defaultProps: {
        size: "sm",
        _text: {
          fontSize: "sm",
        },
      },
    },
    Radio: {
      defaultProps: {
        size: "sm",
        _text: {
          fontSize: "sm",
        },
      },
    },
    /*
      Customize component này cũng là dành cho khi bấm
      vào selectbox nó sẽ xổ ra danh sách item giống
      như thế này
    */
    ActionsheetItem: {
      baseStyle: {
        py: 0,
        mb: 2,
        _text: {
          fontSize: "sm",
        },
      },
    },
    MenuItem: {
      baseStyle: {
        p: 0,
      },
    },
  },
});

type ThemeType = typeof theme;

declare module "native-base" {
  interface ICustomTheme extends ThemeType {}
}

const useAppTheme = () => useTheme<ThemeType>();
export { theme, ThemeType, useAppTheme };
