function readURL(input) {
  if (input.files && input.files[0]) {
    const reader = new FileReader();


    reader.onload = function(e) {
      document.getElementById('blah').src = e.target.result;
    };


    reader.readAsDataURL(input.files[0]); // convert to base64 string

  }
}

const imagePreview = document.getElementById('imgInp');
imagePreview.addEventListener("change", function() {
  readURL(this);
});


function addImageToBackground() {
  const image = document.getElementById('blah').src;
  const image64 = image.replace(/data:image\/png;base64,/, '');

  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    chrome.tabs.executeScript(
      tabs[0].id,
      {
        code: '' +
          'const imageTag = document.createElement("img");' +
          'imageTag.src = "' + image64 + '";' +
          'document.body.appendChild(imageTag);'
      });
  });

}

const addImage = document.getElementById("addImageToPage");

addImage.addEventListener("click", addImageToBackground);


const sliderValue = document.getElementById("slider-value");

sliderValue.addEventListener("change", function (e) {
  const opacityValue = (e.target.value) / 100;
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    chrome.tabs.executeScript(
      tabs[0].id,
      {code: 'console.log(' + opacityValue + ');'});
  });

});
