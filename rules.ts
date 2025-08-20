import fs from "fs";
import { KarabinerRules } from "./types";
import { app, createHyperSubLayers, open } from "./utils";

const rules: KarabinerRules[] = [
  // Define the Hyper key itself
  {
    description: "Hyper Key (⌃⌥⇧⌘)",
    manipulators: [
      {
        description: "Caps Lock -> Hyper Key",
        from: {
          key_code: "caps_lock",
          modifiers: {
            optional: ["any"],
          },
        },
        to: [
          {
            set_variable: {
              name: "hyper",
              value: 1,
            },
          },
        ],
        to_after_key_up: [
          {
            set_variable: {
              name: "hyper",
              value: 0,
            },
          },
        ],
        to_if_alone: [
          {
            key_code: "escape",
          },
        ],
        type: "basic",
      },
    ],
  },
  ...createHyperSubLayers({
    // b = "Browse"
    b: {
      g: open("https://github.com"),
      p: open("https://github.com/pom421"),
      t: open("https://twitter.com"),
      y: open("https://news.ycombinator.com"),
      r: open("https://reddit.com"),
      s: open("https://simonwillison.net"),
    },
    // o = "Open" applications
    o: {
      b: app("Brave"),
      c: app("Visual Studio Code"),
      n: app("Notion"),
      t: app("Ghostty"),
      f: app("Finder"),
    },

    // s = "System"
    s: {
      u: {
        to: [
          {
            key_code: "volume_increment",
          },
        ],
      },
      j: {
        to: [
          {
            key_code: "volume_decrement",
          },
        ],
      },
      i: {
        to: [
          {
            key_code: "display_brightness_increment",
          },
        ],
      },
      k: {
        to: [
          {
            key_code: "display_brightness_decrement",
          },
        ],
      },
      l: {
        to: [
          {
            key_code: "q",
            modifiers: ["right_control", "right_command"],
          },
        ],
      },
      p: {
        to: [
          {
            key_code: "play_or_pause",
          },
        ],
      },
      semicolon: {
        to: [
          {
            key_code: "fastforward",
          },
        ],
      },
    },

    // r = "Raycast"
    r: {
      c: open("raycast://extensions/thomas/color-picker/pick-color"),
      e: open(
        "raycast://extensions/raycast/emoji-symbols/search-emoji-symbols",
      ),
      p: open("raycast://extensions/raycast/raycast/confetti"),
      a: open("raycast://extensions/raycast/raycast-ai/ai-chat"), // KO?
      h: open(
        "raycast://extensions/raycast/clipboard-history/clipboard-history", // KO?
      ),
    },
  }),
];

fs.writeFileSync(
  "karabiner.json",
  JSON.stringify(
    {
      global: {
        show_in_menu_bar: false,
      },
      profiles: [
        {
          name: "Default pompom",
          complex_modifications: {
            rules,
          },
          devices: [
            {
              "identifiers": {
                "is_keyboard": true,
                "is_pointing_device": true,
                "product_id": 45921, // Logitech MX Keys for Mac
                "vendor_id": 1133,
              },
              "ignore": false,
              "treat_as_built_in_keyboard": true,
            },
            {
              "identifiers": {
                "is_pointing_device": true,
                "product_id": 45108, // Logitech MX Mouse
                "vendor_id": 1133,
              },
              "ignore": false,
            },
          ],
          "selected": true,
          "virtual_hid_keyboard": {
            // Nécessaire pour Logitech MX Keys for Mac in AZERTY layout
            "keyboard_type_v2": "ansi",
          },
        },
      ],
    },
    null,
    2,
  ),
);
