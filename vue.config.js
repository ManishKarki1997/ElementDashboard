module.exports = {
  css: {
    loaderOptions: {
      sass: {
        additionalData: `
          @import "@/assets/styles/abstracts/_theme-enums.scss";
          @import "@/assets/styles/themes/_theme.scss";
          @import "@/assets/styles/abstracts/_variables.scss";
          @import "@/assets/styles/abstracts/_mixins.scss";
          @import "@/assets/styles/abstracts/_functions.scss";
          `,
      },
    },
  },
};
