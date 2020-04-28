document.addEventListener('DOMContentLoaded', function() {
  chrome.tabs.getSelected(null, function(tab) {
      //Checking if the video is opened
      chrome.tabs.executeScript(null, { code: 'document.querySelector("[aria-current=\'true\'] .udi-play-circle")' },
          function(result){
              if (typeof(result) != 'undefined' || result != null){
                  if (typeof(result[0]) != 'undefined' && result[0] != null){
                      const a = document.querySelector('a');
                      document.querySelectorAll('.h').forEach(element => element.classList.remove('h'));
                      document.querySelector('.error').classList.add('h');

                      //Getting video's title
                      chrome.tabs.executeScript(null, { code: 'document.querySelector("[aria-current=\'true\'] .item-link").getAttribute("aria-label")' },
                          function(result){
                              a.download = result;
                              document.querySelector(".title").innerHTML = result;
                          });

                      //Getting video's duration
                      chrome.tabs.executeScript(null, { code: 'document.querySelector(" [data-purpose=\'duration\']").innerHTML' },
                          function(result){
                              document.querySelector(".duration").innerHTML = result;
                          });

                      //Downloading the video
                      chrome.tabs.executeScript(null, { code: 'document.querySelector(".vjs-tech").src' },
                          function (result) {
                              a.href = result;
                          });
                  }
              }
          });
  });
});
