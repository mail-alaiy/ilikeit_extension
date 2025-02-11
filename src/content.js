const enableImageHoverButton = () => {
  let currentElement = null;
  const hoverButton = document.createElement("button");
  hoverButton.innerText = "Try On";

  Object.assign(hoverButton.style, {
    position: "absolute",
    padding: "4px 8px", // Small button
    fontSize: "0.75rem", // Small text
    fontWeight: "600",
    backgroundColor: "#dc2626", // Red color
    color: "#fff",
    border: "1.5px solid #b91c1c", // Darker red border
    borderRadius: "6px",
    boxShadow: "3px 3px 0px black",
    cursor: "pointer",
    transition: "all 0.2s ease-in-out",
    zIndex: "9999",
    display: "none",
    pointerEvents: "auto",
  });

  // Hover effect
  hoverButton.addEventListener("mouseover", () => {
    hoverButton.style.backgroundColor = "#b91c1c";
  });

  hoverButton.addEventListener("mouseout", () => {
    hoverButton.style.backgroundColor = "#dc2626";
  });

  // Active (click) effect
  hoverButton.addEventListener("mousedown", () => {
    hoverButton.style.transform = "translateY(1px)";
    hoverButton.style.boxShadow = "2px 2px 0px black";
  });

  hoverButton.addEventListener("mouseup", () => {
    hoverButton.style.transform = "translateY(0)";
    hoverButton.style.boxShadow = "3px 3px 0px black";
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

      // Ensure button stays within the image and does not go off-screen
      const buttonPadding = 5; // Spacing from the image edges
      let buttonTop = rect.top + window.scrollY + buttonPadding;
      let buttonLeft =
        rect.left +
        window.scrollX +
        rect.width -
        hoverButton.offsetWidth -
        buttonPadding;

      // Adjust if the button goes off-screen
      if (buttonLeft < rect.left + window.scrollX) {
        buttonLeft = rect.left + window.scrollX + buttonPadding;
      }
      if (buttonTop < rect.top + window.scrollY) {
        buttonTop = rect.top + window.scrollY + buttonPadding;
      }

      hoverButton.style.top = `${buttonTop}px`;
      hoverButton.style.left = `${buttonLeft}px`;
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
          chrome.runtime.sendMessage(
            {
              action: "tryOnImage",
              userImageUrl,
              imageUrl,
            },
            (response) => {
              if (chrome.runtime.lastError) {
                console.log(
                  "Error sending message to background.js: ",
                  chrome.runtime.lastError
                );
              } else {
                console.log("Request sent to background.js");
              }
            }
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

const virtualTryOn = () => {
  chrome.runtime.sendMessage({ action: "openPopup" }, (response) => {
    if (chrome.runtime.lastError) {
      console.error(
        "Error sending message to background.js: ",
        chrome.runtime.lastError
      );
    } else {
      console.log("Popup open request sent successfully:", response);
    }
  });
};

const addVirtualTryOnButton = () => {
  const vtButton = document.createElement("button");
  vtButton.innerText = "💙"; // Blue heart emoji in center

  Object.assign(vtButton.style, {
    position: "fixed",
    bottom: "20px",
    right: "20px",
    width: "50px", // Ensures it's a perfect circle
    height: "50px",
    backgroundColor: "#dc2626", // Red button (Tailwind's red-600)
    color: "#fff",
    border: "2px solid #b91c1c", // Darker red border (Tailwind's red-700)
    borderRadius: "50%", // Circular button
    fontSize: "24px", // Large enough for emoji
    fontWeight: "bold",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    boxShadow: "4px 4px 0px black",
    cursor: "pointer",
    transition: "all 0.2s ease-in-out",
    zIndex: "9999",
  });

  // Hover effect (darker red)
  vtButton.addEventListener("mouseover", () => {
    vtButton.style.backgroundColor = "#b91c1c"; // Darker red on hover
  });

  vtButton.addEventListener("mouseout", () => {
    vtButton.style.backgroundColor = "#dc2626"; // Original red
  });

  // Active (click) effect
  vtButton.addEventListener("mousedown", () => {
    vtButton.style.transform = "translateY(2px)";
    vtButton.style.boxShadow = "2px 2px 0px black";
  });

  vtButton.addEventListener("mouseup", () => {
    vtButton.style.transform = "translateY(0)";
    vtButton.style.boxShadow = "4px 4px 0px black";
  });

  vtButton.onclick = virtualTryOn;
  document.body.appendChild(vtButton);
};

addVirtualTryOnButton();
enableImageHoverButton();
