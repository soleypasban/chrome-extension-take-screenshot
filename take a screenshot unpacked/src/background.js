// Updated by: Soley Pasban

// Copyright (c) 2012 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

var id = 1000;

chrome.browserAction.onClicked.addListener(function () {

  chrome.tabs.captureVisibleTab(function (src) {
    let url = chrome.extension.getURL('src/screenshot.html?id=' + id++)
    let targetId = null;

    chrome.tabs.onUpdated.addListener(function listener(tabId, changedProps) {
      if (tabId != targetId || changedProps.status != "complete")
        return;
      chrome.tabs.onUpdated.removeListener(listener);
      chrome.extension
        .getViews()
        .filter(view => view.location.href === url)
        .forEach(view => {
          view.setSrc(src)
        });
    });

    chrome.tabs.create({ url }, (tab) => { targetId = tab.id })

  });
});

