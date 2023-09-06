const form = document.getElementById("myform");

form.addEventListener("submit", function (event) {
  event.preventDefault();

  const url = document.getElementById("url").value;

  const videoPlayer = document.getElementById("videoPlayer");
  const videoContainer = document.getElementById("videoContainer");
  const filename = document.getElementById("filename");
  const filesize = document.getElementById("filesize");
  const error = document.getElementById("error");

  const full_url = "http://wibu-api.eu.org/api/bypass/terabox?url=" + url;

  fetch(`https://api.allorigins.win/get?url=${encodeURIComponent(full_url)}`)
    .then((response) => {
      if (response.ok) return response.json();
    })
    .then((data) => {
      if(error.innerText != '') error.innerText = '';
      res = JSON.parse(data.contents);
      console.log(res.result[0].url, res.title, res.total_size);
      videoPlayer.src = res.result[0].url;
      filename.innerHTML = "File Name : " + res.title;
      filesize.innerHTML =
        "File Size : " + Math.round(res.total_size / (1024 * 1024)) + " Mb";
      videoContainer.style.display = "block";
    })
    .catch((err) => {
      error.innerText = "Error Occured";
      console.log(err);
    });
});
