export const themeInitScript = `
(function(){
  var t = "light";
  try { t = localStorage.getItem("pmc-theme") === "dark" ? "dark" : "light"; } catch(e) {}
  document.documentElement.setAttribute("data-theme", t);
  document.documentElement.classList.remove("no-js");
})();`;
