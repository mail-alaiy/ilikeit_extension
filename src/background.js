chrome.runtime.onInstalled.addListener(() => {
  chrome.tabs.create({ url: chrome.runtime.getURL("tab.html") });
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "openPopup") {
    chrome.action.openPopup();
    sendResponse({ success: true });
  }
  if (message.action === "tryOnImage") {
    fetch(
      "https://p35jn4hjb6.execute-api.us-east-1.amazonaws.com/version-1/send-to-inference",
      {
        method: "POST",
        headers: {
          Accept: "*/*",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          imageUrl: message.imageUrl,
          userImageUrl: "https://i.imghippo.com/files/LkVA5783HI.jpeg",
        }),
      }
    )
      .then((response) => response.json())
      .then((data) => {
        console.log("API Response:", data);
      })
      .catch((error) => {
        console.error("Error calling API:", error);
      });
  }
});