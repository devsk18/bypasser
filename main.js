const form = document.getElementById("myform");

form.addEventListener("submit", function (event) {
  event.preventDefault();

  const url = document.getElementById("url").value;
  //const converted_url = 'https://' + url.slice(8);

  let shortUrl = url.slice(26)
  setThumbnail(shortUrl)


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

  const wibu_api_url = "https://wibu-api.eu.org/api/bypass/terabox?url=" + url + "&x_wibu_key=WIBUAPI-zYODEyNzQ5NjI3RGV2c1lCb3RzU3VwcG9ydA==x";
  console.log(wibu_api_url);
  fetch(`https://api.allorigins.win/raw?url=${encodeURIComponent(wibu_api_url)}`)
    .then((response) => {
      if (response.ok) return response.json();
    })
    .then((res) => {
      if(error.innerText != '') error.innerText = '';
      //res = JSON.parse(res);
      //console.log(res,"\n", res.result[0].url,"\n",res.title, res.total_size);
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
      error.innerText = err;
      spinner.style.display = "none";
    });
});


function setThumbnail(shortUrl) {
  const videoPlayer = document.getElementById("videoPlayer");
  const direct_url = "http://www.1024tera.com/share/list?app_id=250528&web=1&channel=dubox&clienttype=0&jsToken=BEDADEDECC8CCFDC9E2094332E1B619445821CB79F417C3F059003E651D5AA23B6F3C0785FF72D23F63E43167CFDBC474CDEEBF438E14BCD12FD1601CB6D404E&dp-logid=51575800518531130011&page=1&num=20&by=name&order=asc&site_referer=&scene=purchased_list&shorturl="+shortUrl+"&root=1";
  fetch(`https://api.allorigins.win/raw?url=${encodeURIComponent(direct_url)}`,)
    .then((response) => {
      if (response.ok) return response.json();
    })
    .then((res) => {
      console.log(res);
      videoPlayer.poster = res.list[0].thumbs.url3
    })
}


