export type ProviderMatch = { id:string; name:string; category:string; support:"Recognized · inspection only"|"Generic URL"; hosts:string[] };
const providers:ProviderMatch[]=[
{id:"bitly",name:"Bitly",category:"URL shortener",support:"Recognized · inspection only",hosts:["bit.ly"]},
{id:"tinyurl",name:"TinyURL",category:"URL shortener",support:"Recognized · inspection only",hosts:["tinyurl.com"]},
{id:"t-co",name:"t.co",category:"Social link redirector",support:"Recognized · inspection only",hosts:["t.co"]},
{id:"is-gd",name:"is.gd",category:"URL shortener",support:"Recognized · inspection only",hosts:["is.gd"]},
{id:"rebrandly",name:"Rebrandly",category:"Branded URL shortener",support:"Recognized · inspection only",hosts:["rebrand.ly"]}
];
export function detectProvider(hostname:string):ProviderMatch {const host=hostname.toLowerCase().replace(/^www\./,"");return providers.find(p=>p.hosts.includes(host))??{id:"generic",name:"Unknown / generic",category:"Public URL",support:"Generic URL",hosts:[]};}
export function listProviders(){return providers.map(({id,name,category,hosts})=>({id,name,category,hosts}));}