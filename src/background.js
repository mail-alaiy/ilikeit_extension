chrome.runtime.onInstalled.addListener(() => {
  chrome.tabs.create({ url: chrome.runtime.getURL("tab.html") });
});

chrome.tabs.query({}, function (tabs) {
  tabs.forEach((tab) => {
    if (tab.url && tab.url.startsWith("https://www.alaiy.com")) {
      console.log("aryan123");
      chrome.tabs.remove(tab.id);
    }
  });
});

// chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
//   if (changeInfo.url) {
//     console.log("Tab URL changed:", changeInfo.url);
//   }
// });

// chrome.tabs.onActivated.addListener((activeInfo) => {
//   chrome.tabs.get(activeInfo.tabId, (tab) => {
//     console.log("Active tab URL:", tab.url);
//   });
// });

// // add tab listener when background script starts
// chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
//   console.log("aryan", changeInfo);
//   if (changeInfo.url?.startsWith(chrome.identity.getRedirectURL())) {
//     finishUserOAuth(changeInfo.url);
//   }
// });

// /**
//  * Method used to finish OAuth callback for a user authentication.
//  */
// async function finishUserOAuth(url) {
//   try {
//     console.log(`handling user OAuth callback ...`);
//     const supabase = createClient(secrets.supabase.url, secrets.supabase.key);

//     // extract tokens from hash
//     const hashMap = parseUrlHash(url);
//     const access_token = hashMap.get("access_token");
//     const refresh_token = hashMap.get("refresh_token");
//     if (!access_token || !refresh_token) {
//       throw new Error(`no supabase tokens found in URL hash`);
//     }

//     // check if they work
//     const { data, error } = await supabase.auth.setSession({
//       access_token,
//       refresh_token,
//     });
//     if (error) throw error;

//     // persist session to storage
//     await chrome.storage.local.set({ session: data.session });

//     // finally redirect to a post oauth page
//     chrome.tabs.update({ url: "https://myapp.com/user-login-success/" });

//     console.log(`finished handling user OAuth callback`);
//   } catch (error) {
//     console.error(error);
//   }
// }

// /**
//  * Helper method used to parse the hash of a redirect URL.
//  */
// function parseUrlHash(url) {
//   const hashParts = new URL(url).hash.slice(1).split("&");
//   const hashMap = new Map(
//     hashParts.map((part) => {
//       const [name, value] = part.split("=");
//       return [name, value];
//     })
//   );

//   return hashMap;
// }
