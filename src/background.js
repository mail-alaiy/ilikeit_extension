const requestQueue = [];
let isProcessing = false;

chrome.runtime.onInstalled.addListener(() => {
  chrome.tabs.create({ url: chrome.runtime.getURL("tab.html") });
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "openPopup") {
    chrome.action.openPopup();
    sendResponse({ success: true });
  }
  if (message.action === "tryOnImage") {
    console.log("Call made to background for inferencing")
    addToQueue(message.imageUrl, message.userImageUrl);
    sendResponse({success: true});
  }
});

const addToQueue = (imageUrl, userImageUrl) => {
  requestQueue.push({ imageUrl, userImageUrl });
  console.log("Pushed the items to the queue");
  processQueue();
};

const processQueue = async () => {
  console.log(`is Processing variable state: ${isProcessing}`);
  if (isProcessing || requestQueue.length == 0) return;
  isProcessing = true;
  console.log(`After setting it true: ${isProcessing}`);
  const { imageUrl, userImageUrl } = requestQueue.shift();
  
  try {
    const response = await fetch(
      "https://p35jn4hjb6.execute-api.us-east-1.amazonaws.com/version-1/send-to-inference",
      {
        method: "POST",
        headers: {
          Accept: "*/*",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ imageUrl, userImageUrl }),
      }
    );
    console.log("Request sent")
    if (!response.ok) {
      throw new Error(`HTTP Error: ${response.status}`);
    }
    const result = await response.json();
    console.log("API response Result:", result);
    storeResponse(result);
  } catch (error) {
    console.error("Error calling API:", error);
  } finally {
    isProcessing = false;
    if (requestQueue.length > 0) processQueue();
  }
};

const storeResponse = async (result) => {
  const STORAGE_KEY = "responseList";
  console.log("Storing response:", result);
  chrome.storage.local.get({ responseList: [] }, (items) => {
    const responseList = items.responseList || [];
    responseList.push(result);
    chrome.storage.local.set({ responseList }, () => {
      console.log("Response stored successfully.");
    });
  });
};

