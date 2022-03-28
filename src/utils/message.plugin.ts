import M from "materialize-css";

export default {
  install: (app: any, options: any) => {
    app.config.globalProperties.$message = function (html: any) {
      window.M.toast({ html });
    };
    app.config.globalProperties.$error = function (html: any) {
      M.toast({ html: `[Error]:${html}` });
    };
  },
};
