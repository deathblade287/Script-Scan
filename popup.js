function isGitHubFileUrl(url) {
  const regex =
    /^https?:\/\/(?:www\.)?github\.com\/[^\s\/]+\/[^\s\/]+\/blob\/[^\/]+\//;
  return regex.test(url);
}

function convertToRawFileUrl(fileUrl) {
  const rawUrlRegex =
    /^https?:\/\/(?:www\.)?github\.com\/([^\s\/]+\/[^\s\/]+)\/blob\/([^\/]+)\/(.*)$/;

  // Extract username/repository, branch, and file path from the URL
  const [, repoPath, branch, filePath] = fileUrl.match(rawUrlRegex);

  const rawFileUrl = `https://raw.githubusercontent.com/${repoPath}/${branch}/${filePath}`;

  return rawFileUrl;
}

async function fetchRawFileText(rawFileUrl) {
  try {
    const response = await fetch(rawFileUrl);
    if (response.ok) {
      const text = await response.text();
      return text;
    } else {
      throw new Error("Failed to fetch the raw file content");
    }
  } catch (error) {
    console.error(error);
    return null;
  }
}

document.addEventListener(
  "DOMContentLoaded",
  function () {
    document.getElementById("openTab").addEventListener("click", function () {
      chrome.runtime.sendMessage({
        type: "openNewTab",
        url: "https://weuwch2xx3a.typeform.com/to/N9VUN4xI",
      });
    });
  },
  false
);

chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
  const URL = tabs[0].url;
  if (isGitHubFileUrl(URL)) {
    const rawURL = convertToRawFileUrl(URL);
    fetchRawFileText(rawURL).then((code) => {
      console.log(code);
      const apiUrl = "http://159.65.130.248:8000";
      const req_url = `${apiUrl}/?code=${encodeURIComponent(code)}`;

      fetch(req_url)
        .then((response) => response.text())
        .then((expl) => {
          document.getElementById("expl").textContent = expl;
        })
        .catch((error) => {
          console.error("Error:", error);
          // Handle any error that occurred
        });
    });
  } else {
    document.getElementById("expl").textContent = "Not a GitHub file URL";
  }
});
