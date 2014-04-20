//From http://meteorhacks.com/xss-and-meteor.html

BrowserPolicy.content.disallowInlineScripts();
BrowserPolicy.content.disallowConnect();

var rootUrl = __meteor_runtime_config__.ROOT_URL;
BrowserPolicy.content.allowConnectOrigin(rootUrl);
BrowserPolicy.content.allowConnectOrigin(rootUrl.replace('http', 'ws'));

BrowserPolicy.content.allowConnectOrigin("https://*.meteor.com");
BrowserPolicy.content.allowConnectOrigin("wss://*.meteor.com");

BrowserPolicy.content.allowImageOrigin("*");