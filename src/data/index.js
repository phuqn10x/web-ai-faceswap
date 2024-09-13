import section1Rt from "../assets/images/remove_text_section1_homepage.png";
// import section1Rb from "../assets/images/remove_background_section1_homepage.png";
import section1Ca from "../assets/images/change_age_section1_homepage.png";
import section1Cs from "../assets/images/change_sky_section1_homepage.png";
import section1Ap from "../assets/images/art_portrait_section1_homepage.png";
import section1Pe from "../assets/images/photo_enhander_section1_homepage.png";
import headerPe from "../assets/images/photo_enhander_header.png";
import headerCa from "../assets/images/change_age_header.png";
import headerCs from "../assets/images/change_sky_header.png";
import headerAp from "../assets/images/portrait_header.png";
import headerRo from "../assets/images/remove_obj_header.png";
import headerRt from "../assets/images/remove_text_header.png";
import headerS from "../assets/images/sketch_header.png";

const ai_items = [
  {
    key: "enhancer",
    hot: true,
    title: "AI Enhancer",
    link: "/ai-tools/enhancer",
    description_homepage:
      "Using advanced AI technology increases detail and clarity, delivering sharp and professional photos",
    image_header: headerPe,
    image_homepage: section1Pe,
    short_description: {
      header: "Increase detail and clarity",
      page: ["Fix blurry photos", "Brings instant clarity"],
    },
  },
  {
    key: "change_age",
    title: "AI Age Transformation",
    link: "/ai-tools/change-age",
    description_homepage:
      "Using advanced AI technology increases detail and clarity, delivering sharp and professional photos",
    image_header: headerCa,
    image_homepage: section1Ca,
    short_description: {
      header: "Preview yourself at various ages",
      page: [
        "Preview yourself at various ages",
        "Bring an enjoyable experience ",
      ],
    },
  },

  {
    key: "remove_object",
    title: "AI Remove Object",
    link: "/ai-tools/remove-text",
    description_homepage: "No skills needed",
    image_header: headerRo,
    image_homepage: section1Rt,
    short_description: {
      header: "Remove object smoothly",
      page: ["Remove object quickly and easily", "Change to empty space"],
    },
  },
  {
    key: "change_sky",
    title: "AI Change Sky Background",
    link: "/ai-tools/change-sky",
    description_homepage:
      "No skill required, just upload your photo and let the AI do the rest",
    image_header: headerCs,
    image_homepage: section1Cs,
    short_description: {
      header: "Change sky smoothly",
      page: ["Change sky quickly and easily", "Change to empty space"],
    },
  },
  {
    key: "remove_text",
    title: "AI Remove Text",
    link: "/ai-tools/remove-text",
    description_homepage:
      "This tool allows you to quickly and easily remove text or writing on photos",
    image_header: headerRt,
    image_homepage: section1Rt,
    short_description: {
      header: "Remove Text smoothly",
      page: ["Remove text quickly and easily", "Change to empty space"],
    },
  },

  {
    key: "sketch",
    title: "AI Sketch",
    link: "/ai-tools/sketch",
    description_homepage:
      "Using advanced AI technology increases detail and clarity, delivering sharp and professional photos",
    image_header: headerS,
    image_homepage: section1Pe,
    short_description: {
      header: "Change image to sketch",
      page: ["Change image to sketch", "Bring a new experience"],
    },
  },
  {
    key: "art_portrait",
    title: "AI Portrait Generator",
    link: "/ai-tools/art-portrait",
    description_homepage:
      "Using advanced AI technology increases detail and clarity, delivering sharp and professional photos",
    image_header: headerAp,
    image_homepage: section1Ap,
    short_description: {
      header: "Add your face to the art portrait",
      page: ["Add your face to the art portrait", "Beautiful and unique"],
    },
  },

  // {
  //   key: "remove_bg",
  //   title: "AI Remove Background",
  //   link: "/ai-tools/remove-background",
  //   description_homepage:
  //     "Internal AI technology helps identify and process the background automatically, preserving the quality and naturalness of the main subject",
  //   image_homepage: section1Rb,
  //   short_description: {
  //     header: "Automatically delete",
  //     page: ["Automatically delete", "Quickly and easily"],
  //   },
  // },
];
const list_rate = [
  {
    user: "Monik morgan",
    rate: 5.0,
    comment:
      "I love this API! I'm trying to remove the background with this API. I'm a programmer and instructional designer and I am glad to know this API.",
  },
  {
    user: "Nathaliaapalm",
    rate: 5.0,
    comment:
      "Best app I've ever used to remove background from images! It is very very very easy and intuitive to use, especially the online version.",
  },
  {
    user: "Phillip Sear",
    rate: 5.0,
    comment: "Congratulations on developing such an amazing web app.",
  },
  {
    user: "Ashwin A.",
    rate: 5.0,
    comment:
      "I like this service as they provide quick and fast service. Its Ui is amazing and easy to navigate through.",
  },
  {
    user: "igeeksblog",
    rate: 5.0,
    comment:
      "PicWish has been impeccably accurate in most cases, so kudos to the AI. It’s quick, and the web version has free and Pro options, perfect for one-off users, beginners, and intermediates.",
  },
];
export { ai_items, list_rate };
