chrome.runtime.onInstalled.addListener(({ reason }) => {
  if (reason === "install") {
    chrome.tabs.create({
      url: "https://script-scan-landing-page.vercel.app/",
    });
  }
});

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.type === "openNewTab") {
    chrome.tabs.create({ url: request.url });
  }
});
