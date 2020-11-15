function readURL(input) {
  if (input.files && input.files[0]) {
    const reader = new FileReader();


    reader.onload = function(e) {
      console.log(e.target.result);
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
  const reader = new FileReader();
  const image = document.getElementById('blah').src;
  reader.readAsDataURL(image); // convert to base64 string

  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    chrome.tabs.executeScript(
      tabs[0].id,
      {code: 'document.body.style.backgroundImage = url('+ image + ');'});
  });

}

const addImage = document.getElementById("addImageToPage");

addImage.addEventListener("click", addImageToBackground);


const sliderValue = document.getElementById("slider-value");

sliderValue.addEventListener("change", function (e) {
  const opacityValue = (e.target.value) / 100;
  console.log(opacityValue);
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    chrome.tabs.executeScript(
      tabs[0].id,
      {code: 'document.body.style.backgroundImage.opacity = ' + opacityValue + ';'});
  });

});
