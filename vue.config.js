module.exports = {
  css: {
    loaderOptions: {
      sass: {
        additionalData: `
          @import "@/assets/styles/abstracts/_variables.scss";
          @import "@/assets/styles/abstracts/_mixins.scss";
          @import "@/assets/styles/themes/_theme.scss";
          `,
      },
    },
  },
};
