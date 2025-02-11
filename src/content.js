const requestQueue = [];
let isProcessing = false;

const enableImageHoverButton = () => {
  let currentElement = null;
  const hoverButton = document.createElement("button");
  hoverButton.innerText = "Try On";
  Object.assign(hoverButton.style, {
    position: "absolute",
    padding: "5px 10px",
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    cursor: "pointer",
    zIndex: "9999",
    display: "none",
    pointerEvents: "auto",
  });
  document.body.appendChild(hoverButton);

  const getImageUrl = (element) => {
    if (!element) return null;
    if (element.tagName.toLowerCase() === "img") {
      return element.src;
    }
    const style = window.getComputedStyle(element);
    const backgroundImage = style.backgroundImage;
    return backgroundImage.match(/url\("?(.*?)"?\)/)?.[1] || null;
  };

  document.addEventListener("mouseover", (event) => {
    const target = event.target;
    if (
      target.tagName.toLowerCase() === "img" ||
      (target.tagName.toLowerCase() === "div" &&
        target.classList.contains("image-grid-image"))
    ) {
      currentElement = target;
      const imageUrl = getImageUrl(target);
      if (!imageUrl) return;

      const rect = target.getBoundingClientRect();
      hoverButton.style.top = `${rect.top + window.scrollY + 10}px`;
      hoverButton.style.left = `${
        rect.left + window.scrollX + rect.width - hoverButton.offsetWidth - 10
      }px`;
      hoverButton.style.display = "block";

      hoverButton.onclick = () => {
        alert(`Image URL copied: ${imageUrl}`);

        chrome.storage.local.get("presignedUrl", (items) => {
          const userImageUrl = items.presignedUrl;
          console.log(userImageUrl);
          if (!userImageUrl) {
            console.log("image not found");
            return;
          }

          addToQueue(userImageUrl, imageUrl, () =>
            console.log("Request successfully handled")
          );
        });
      };
    }
  });

  document.addEventListener("mouseout", (event) => {
    if (
      !hoverButton.contains(event.relatedTarget) &&
      event.target !== currentElement
    ) {
      hoverButton.style.display = "none";
    }
  });
};

const processQueue = async () => {
  if (isProcessing || requestQueue.length === 0) return;
  isProcessing = true;

  const { userImageUrl, imageUrl, callback } = requestQueue.shift();
  try {
    console.log("Sending request:", { userImageUrl, imageUrl });
    await sendRequest(userImageUrl, imageUrl);
    console.log("Request complete");
    if (callback) callback();
  } catch (error) {
    console.error("Request failed:", error);
  } finally {
    isProcessing = false;
    if (requestQueue.length > 0) processQueue();
  }
};

const sendRequest = async (userImageUrl, imageUrl) => {
  const apiUrl =
    "https://p35jn4hjb6.execute-api.us-east-1.amazonaws.com/version-1/send-to-inference";

  const payload = {
    imageUrl,
    userImageUrl,
  };

  try {
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        Accept: "*/*",
        "User-Agent": "Thunder Client (https://www.thunderclient.com)",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const result = await response.json();
    console.log("Request processed successfully:", result);

    const STORAGE_KEY = "responseList";
    chrome.storage.local.get([STORAGE_KEY], (items) => {
      const responseList = items[STORAGE_KEY] || [];
      chrome.storage.local.set({ [STORAGE_KEY]: responseList }, () => {
        console.log("Response added to storage:", responseList);
      });
    });

    return result;
  } catch (error) {
    console.error("Error during request:", error);
    throw error;
  }
};

const addToQueue = (userImageUrl, imageUrl, callback) => {
  console.log("hi");
  requestQueue.push({ userImageUrl, imageUrl, callback });
  processQueue();
};

const virtualTryOn = () => {
  chrome.runtime.sendMessage({action: "openPopup"}, (response)=>{
    if(chrome.runtime.lastError){
      console.error("Error sending message to background.js: ", chrome.runtime.lastError);
    }
    else{
      console.log("Popup open request sent successfully:", response);
    }
  })
}

const addVirtualTryOnButton = ()=>{
  const vtButton = document.createElement("button");
  vtButton.innerText = "VT";
  Object.assign(vtButton.style, {
    position: "fixed",
    bottom: "20px",
    right: "20px",
    padding: "10px 15px",
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    borderRadius: "50%",
    fontSize: "16px",
    fontWeight: "bold",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    cursor: "pointer",
    zIndex: "9999",
  });
  vtButton.onclick = virtualTryOn;
  document.body.appendChild(vtButton);
};

addVirtualTryOnButton();
enableImageHoverButton();
