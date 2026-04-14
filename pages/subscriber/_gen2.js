const fs=require("fs");
const dash=fs.readFileSync("dashboard.html","utf8");

// Extract CSS
const cssMatch=dash.match(/<style>([sS]*?)</style>/);
const sharedCSS=cssMatch[1];

// Extract favicon
const favMatch=dash.match(/<link rel="icon"[^>]*>/);
const fav=favMatch[0];

// Extract sidebar and make it reusable
const sbMatch=dash.match(/<aside class="sidebar">[sS]*?</aside>/);
const sbTpl=sbMatch[0];

function makeSB(active){
  let sb=sbTpl.replace(/class="sb-item active"/g,"class=\"sb-item\"");
  sb=sb.replace(new RegExp("href=\""+active+"\.html\" class=\"sb-item\""),"href=\""+active+".html\" class=\"sb-item active\"");
  return sb;
}