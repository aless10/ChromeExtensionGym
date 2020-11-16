function readURL(input) {
  if (input.files && input.files[0]) {
    const reader = new FileReader();


    reader.onload = function(e) {
      const preview = document.getElementById('blah')
      preview.style.display = "block";
      preview.src = e.target.result;
    };


    reader.readAsDataURL(input.files[0]); // convert to base64 string

  }
}

const imagePreview = document.getElementById('imgInp');

imagePreview.addEventListener("change", function() {
  readURL(this);
});


function addImgElementScript(img) {
  return 'let imageTag = document.createElement("div");' +
    'imageTag.id = "extensionImgDiv";' +
    'imageTag.style.height= "100%";' +
    'imageTag.style.backgroundPosition = "center";' +
    'imageTag.style.opacity = "0.5";' +
    'imageTag.style.backgroundRepeat = "no-repeat";' +
    'imageTag.style.backgroundSize = "cover";' +
    'imageTag.style.backgroundImage = "url(\'' + img + '\')";' +
    'const body = document.getElementsByTagName("body")[0];' +
    'body.childNodes.forEach((item) => {' +
      'imageTag.appendChild(item)' +
    '});' +
    'body.appendChild(imageTag);';

  /*return 'let imageTag = document.createElement("div");' +
    'imageTag.id = "extensionImgDiv";' +
    'imageTag.style.height= "100%";' +
    'imageTag.style.backgroundPosition = "center";' +
    'imageTag.style.opacity = "0.5";' +
    'imageTag.style.backgroundRepeat = "no-repeat";' +
    'imageTag.style.backgroundSize = "cover";' +
    'imageTag.style.backgroundImage = "url(\'' + img + '\')";' +
    'document.body.appendChild(imageTag);'*/
}

function addImageToBackground() {
  const image = document.getElementById('blah').src;
  const image64 = image.replace(/data:image\/png;base64,/, '');


  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    chrome.tabs.executeScript(
      tabs[0].id,
      {
        code: addImgElementScript(image64)
      });
  });

}

const addImage = document.getElementById("addImageToPage");

addImage.addEventListener("click", addImageToBackground);

function changeOpacity(value) {
  return 'document.getElementById("extensionImgDiv").style.opacity = "' + value + '";'
}


const sliderValue = document.getElementById("slider-value");

sliderValue.addEventListener("change", function (e) {
  const opacityValue = (e.target.value) / 100;
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    chrome.tabs.executeScript(
      tabs[0].id,
      {code: changeOpacity(opacityValue)});
  });

});
