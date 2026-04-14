const fs=require("fs");
const d=fs.readFileSync("dashboard.html","utf8");
const si=d.indexOf("<style>")+7;
const se=d.indexOf("</style>");
const css=d.substring(si,se);
const sbs=d.indexOf("<aside");
const sbe=d.indexOf("</aside>")+8;
const sb=d.substring(sbs,sbe);
const favs=d.indexOf("<link rel="icon"");
const fave=d.indexOf("svg>">",favs)+6;
const fav=d.substring(favs,fave);
function swapA(s,a){return s.replace(/class="sb-item active"/g,"class="sb-item"").replace("href=""+a+".html" class="sb-item"","href=""+a+".html" class="sb-item active"");}
const fonts="<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap" rel="stylesheet">";
// Settings and Billing HTML stored as base64 body chunks
// We will read them from separate files
console.log("gen3 loaded");