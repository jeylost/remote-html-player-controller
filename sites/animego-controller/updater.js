// // Select the parent element that contains the iframes
// const parentElement = document.getElementById('parent');

// // Create a new MutationObserver instance
// const observer = new MutationObserver((mutations) => {
//   // Loop through the mutations
//   mutations.forEach((mutation) => {
//     // Check if a new iframe has been added
//     if (mutation.type === 'childList' && mutation.addedNodes.length) {
//       const iframe = mutation.addedNodes[0];
//       // Inject your script into the new iframe
//       const script = iframe.contentDocument.createElement('script');
//       script.textContent = '/* your script here */';
//       iframe.contentDocument.body.appendChild(script);
//     }
//   });
// });

// // Start observing changes to the parent element
// observer.observe(parentElement, { childList: true });