const BASE_URL = "http://localhost:3000/images/1";

//fetch the data from the local JSON server
fetch(BASE_URL)
  .then((resp) => resp.json())
  .then((data) => flatagramRender(data));

//variables for all of the different elements I must create/edit
const title = document.getElementById("card-title");
const image = document.getElementById("card-image");
let likeNumber = document.getElementById("like-count").innerText;
let likeSection = document.getElementById("like-count");
const comments = document.getElementById("comments-list");
const likeButton = document.getElementById("like-button");
const form = document.getElementById("comment-form");
console.log(likeNumber);

//event listeners for clicks on elements and form submissions
likeButton.addEventListener("click", increaseLikes);
form.addEventListener("submit", (e) => addComment(e));
title.addEventListener("click", hideImage);
image.addEventListener("click", () =>
  fetch("https://dog.ceo/api/breeds/image/random") //fetches a random dog picture
    .then((resp) => resp.json())
    .then((data) => imageRandomizer(data))
);

function flatagramRender(data) {
  title.innerText = data.title;
  image.src = data.image;
  comments.innerHTML = "";
  likeSection.innerText = `${likeNumber} likes`;

  for (i = 0; i < data.comments.length; i++) {
    //loop through the comments array
    comment = document.createElement("li");
    comment.innerText = data.comments[i].content;
    comments.appendChild(comment);
    comment.addEventListener("click", (e) => {
      e.target.remove(); //remove comments on click
    });
  }
}

function increaseLikes() {
  likeNumber = Number(likeNumber) + 1;
  likeSection.innerHTML = `${likeNumber} likes`;

  //PATCH the new # of likes to the JSON server. Data persists to the JSON server but gets overwritten on refresh. Something funky is going on with how I'm rendering the likeNumber above? Uncommenting doesn't break anything else.

  // fetch(BASE_URL, {
  //     method: "PATCH",
  //     headers:{
  //         "Content-Type": "application/json"
  //     },
  //     body: JSON.stringify({"likes": likeNumber})
  // })
  // .then(res => res.json())
  // .then(data => console.log(likeNumber))
}

function addComment(e) {
  e.preventDefault();
  let newComment = document.createElement("li");
  newComment.innerText = e.target[0].value;
  comments.appendChild(newComment);
  form.reset();
  newComment.addEventListener("click", (e) => {
    //remove new comments
    e.target.remove();
  });

  //Ran out of time while debugging the PATCH for comments. It puts the comment in the wrong place on the JSON server. Uncommenting doesn't break anything else.

  //   fetch(`http://localhost:3000/images/1`, {
  //     method: "PATCH",
  //     headers:{
  //         "Content-Type": "application/json"
  //     },
  //     body: JSON.stringify({
  //         "imageid": 1,
  //         "content": newComment.innerText
  //     })
  // })
  // .then(res => res.json())
  // .then(data => console.log(newComment.innerText))
}

let showImage = false; //set status of image

function hideImage() {
  showImage = !showImage;
  if (showImage) {
    //switch between showing and hiding the image
    image.style.display = "block";
  } else {
    image.style.display = "none";
  }
}

function imageRandomizer(data) {
  //uses the data from the Dog CEO fetch the cheange the displayed image
  image.src = `${data.message}`;
}
