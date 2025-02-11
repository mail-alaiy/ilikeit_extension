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
          chrome.runtime.sendMessage({
            action: "tryOnImage", userImageUrl, imageUrl
          },
          (response)=>{
            if(chrome.runtime.lastError){
              console.log("Error sending message to background.js: ", chrome.runtime.lastError);
            }
            else{
              console.log("Request sent to background.js");
            }
          })
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
