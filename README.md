# Tilt Status Monitor Extension

This Chrome extension displays the status of your Tilt instance and allows quick access to its web interface.

## Table of Contents

1. [Managing Necessary Permissions](#managing-necessary-permissions)
2. [Testing the Extension](#testing-the-extension)
3. [Troubleshooting Common Issues](#troubleshooting-common-issues)
4. [Possible Improvements](#possible-improvements)

---

## Managing Necessary Permissions

Ensure that the permissions in your `manifest.json` file are correctly set to enable the extension to function properly:

```json
{
  "permissions": ["storage", "alarms", "activeTab"],
  "host_permissions": ["http://localhost:10350/*"]
}
```

- **`permissions`:** Grants the extension access to Chrome's storage, alarms, and active tab functionalities.
- **`host_permissions`:** Specifies which URLs the extension can interact with. If you encounter Cross-Origin Resource Sharing (CORS) issues during the `fetch` request, you may need to adjust this permission.

**Note:** Be cautious with broad permissions like `"<all_urls>"`, as they may lead to rejection when publishing the extension on the Chrome Web Store due to security concerns.

## Testing the Extension

Follow these steps to test your extension in Chrome:

1. **Open Extensions Page:**
   - Navigate to `chrome://extensions` in your Chrome browser.

2. **Enable Developer Mode:**
   - Toggle the "Developer mode" switch located in the top right corner.

3. **Load Unpacked Extension:**
   - Click on "Load unpacked" and select the directory containing your extension files.

4. **Verify Extension Installation:**
   - The extension should now appear in the list with its icon.

5. **Test Functionality:**
   - Click the extension icon to test opening the Tilt web page.
   - Access the extension's options page to configure the Tilt URL if necessary.

6. **Check Icon Status:**
   - Ensure that the extension icon changes according to the status of Tilt (active, inactive, or error).

## Troubleshooting Common Issues

### CORS Problems

- **Issue:** Errors related to the browser's security policy during the `fetch` request.
- **Solution:** Adjust the `host_permissions` in your `manifest.json` or configure the server to include appropriate CORS headers.

### Icons Not Updating

- **Issue:** The extension icon does not reflect the current status.
- **Solution:** 
  - Verify that the icon file paths in your code are correct.
  - Ensure the icons are saved in the specified sizes (16x16, 48x48, 128x128 pixels).

### Insufficient Permissions

- **Issue:** The extension lacks necessary permissions to perform certain actions.
- **Solution:** 
  - Double-check that all required permissions are declared in `manifest.json`.
  - Pay special attention to `permissions` and `host_permissions`.

### Console Errors

- **Issue:** Uncaught exceptions or errors in the background script.
- **Solution:** 
  - Open the Chrome Developer Tools (`Ctrl+Shift+I` or `Cmd+Option+I`).
  - Check the console for error messages and stack traces.
  - Debug and fix the issues as indicated.

## Possible Improvements

Consider enhancing your extension with the following features:

### Add Notifications

- **Description:** Implement browser notifications to inform the user when the status of Tilt changes.
- **Implementation:** Use the `chrome.notifications` API to create and display notifications.

### Customize the Check Interval

- **Description:** Allow users to set how frequently the extension checks the status of Tilt.
- **Implementation:** 
  - Add an input field in `options.html` for the interval.
  - Store the interval using `chrome.storage.sync`.
  - Update the alarm creation in `background.js` to use the user-defined interval.

### Support Multiple Tilt Instances

- **Description:** Enable the extension to monitor multiple Tilt URLs and display their respective statuses.
- **Implementation:** 
  - Modify the options page to accept an array of URLs.
  - Update the background script to loop through the list of URLs and check each one.
  - Change the icon or add a badge to indicate multiple statuses.

### Enhance Error Handling

- **Description:** Improve the robustness of your extension by handling more edge cases.
- **Implementation:** 
  - Add more specific catch blocks in your `fetch` promises.
  - Provide user-friendly error messages or fallback behaviors.

### User Interface Enhancements

- **Description:** Improve the user experience with better visuals and interactions.
- **Implementation:** 
  - Create a popup (`popup.html`, `popup.js`) to display more detailed status information.
  - Use badges or context menus for additional functionality.
