const form = document.getElementById("myform");

form.addEventListener("submit", function (event) {
  event.preventDefault();

  const url = document.getElementById("url").value;

  const videoPlayer = document.getElementById("videoPlayer");
  const videoContainer = document.getElementById("videoContainer");
  const details = document.getElementById("details");
  const filename = document.getElementById("filename");
  const filesize = document.getElementById("filesize");
  const error = document.getElementById("error");
  const link = document.getElementById("link");
  const spinner = document.getElementById("spinner");

  spinner.style.display = "block";
  details.style.display = "none";
  videoContainer.style.display = "none";

  const full_url = "http://wibu-api.eu.org/api/bypass/terabox?url=" + url;

  fetch(`https://api.allorigins.win/get?url=${encodeURIComponent(full_url)}`)
    .then((response) => {
      if (response.ok) return response.json();
    })
    .then((data) => {
      if(error.innerText != '') error.innerText = '';
      res = JSON.parse(data.contents);
      console.log(res,"\n", res.result[0].url,"\n",res.title, res.total_size);
      videoPlayer.src = res.result[0].url;
      link.href = res.result[0].url;
      setTimeout(()=>{
        spinner.style.display = "none";
        filename.innerHTML = "File Name : " + res.title;
        filesize.innerHTML = "File Size : " + Math.round(res.total_size / (1024 * 1024)) + " Mb";
        details.style.display = "block";
        videoContainer.style.display = "block";
      },1000)
    })
    .catch((err) => {
      error.innerText = "Error Occured";
      error.innerText = err;
    });
});
