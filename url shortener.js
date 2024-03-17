//AOS.init();
//console.log(navigator.isOnline);

const menuIcon = document.querySelector("#burger-menu-icon");
const mobileMenu = document.querySelector(".mobile-menu");
const signUpBtn = document.getElementById("sign-up");
const shortenLinkBtn = document.getElementById("shorten-link-btn");
const linkInput = document.getElementById("link-input");
const warningTxt = document.querySelector(".warning-txt");
const copyBtns = document.querySelectorAll(".copy");
const copiedmsg = document.getElementById("copied-msg");
const shortenedLinksContainer = document.querySelector(
  ".shortened-links-container"
);
const backToTopBtn = document.querySelector(".backToTop");
const waitTxt = document.getElementById("waitTxt");
const nodeleteBtn = document.getElementById("no-delete");
const yesdeleteBtn = document.getElementById("yes-delete");

let storeCurrentCardCallingDeleteFunction;
let show;
let filteredArr;
let inputLinks = [];
let outputLinks = [];
let nwArr = [];
let itemremovedfilter;
let cardToBeDeleted;
let fullShortLink;
let fullShortLinkArr = [];
let getStoredShortenedLinks;
let shortenedLinkOfTheCardToBeDeleted;
let filteredShortLinksArr;
let allCardsFiltetedArr;
let allCardsArr = [];
let trimmedAllCardsArr;
let eachCard;
let findCard;

//CHECKS FOR THE SCROLL EVENT, TO ACTIVATE THE BACK TO TOP BUTTON
window.onscroll = (e) => (backToTopBtn.style.opacity = "1");

//SCROLLS BACK TO TOP OF THE PAGE
backToTopBtn.onclick = (e) => document.body.scrollIntoView();

document.body.onclick = (e) => (backToTopBtn.style.opacity = "0");

// FOR THE MOBILE MENU FUNCTIONALITY
menuIcon.onclick = (e) => {
  mobileMenu.classList.toggle("visible");
  if (e.target.className === "menu-open") {
    e.target.src = "./images/icon-close.svg";
    e.target.className = "menu-close";
  } else {
    e.target.src = "./images/icon-menu.svg";
    e.target.className = "menu-open";
  }
};

//SHORTEN LINK BUTTON FUNCTIONALITY
shortenLinkBtn.onclick = (e) => {
  //checks if the input field is empty to display warning text.
  if (linkInput.value === "") {
    warningTxt.style.display = "block";
    linkInput.style.border = "3px solid var(--red)";
  } else {
    if (trimmedAllCardsArr.includes(linkInput.value)) {
      warningTxt.style.display = "block";
      linkInput.style.border = "3px solid var(--red)";
      warningTxt.textContent =
        "This link has previously been shortened and is still available for copy.";

      //find link location.
      for (let x = 0; x < shortenedLinksContainer.children.length; x++) {
        findCard = shortenedLinksContainer.children[x].children[0].textContent;
        console.log(findCard);
      }
    } else {
      waitTxt.style.display = "inline-block";

      //fetches Api for shortening link
      const fetchShortenedUrl = async () => {
        // const endpointurl = 'https://urlbae.com/api/url/add';
        // const apiKey = 'a4c0204702086f2424b03d769a295bac';

        // // url=${encodeURIComponent(url)}
        // const options = {
        //   method: 'POST',
        //   headers: {
        //     Authorization: `Bearer ${apiKey}`,
        //     'Content-Type': 'application/json'
        //   },
        //   body: JSON.stringify({
        //     'url': `${linkInput.value}`,
        //   })
        // }

        try {
          const res = await fetch(`https://ulvis.net/api.php?url=${linkInput.value}`);
          const data = await res.json();
          console.log(data);

          // fullShortLink = result.full_short_link;

          // var createLinkCards = document.createElement("div");
          // createLinkCards.setAttribute("class", "shortened-urls");
          // //createLinkCards.setAttribute("data-aos", "zoom-in");

          // let pastedLink = document.createElement("p");
          // pastedLink.setAttribute("class", "link");
          // pastedLink.textContent = linkInput.value;
          // let generatedLink = document.createElement("input");
          // generatedLink.setAttribute("class", "shortened-link");
          // generatedLink.setAttribute("readonly", "");
          // generatedLink.setAttribute("type", "text");
          // generatedLink.setAttribute("value", fullShortLink);
          // let deleteBtn = document.createElement("img");
          // deleteBtn.setAttribute("src", "./images/icon-delete.svg");
          // deleteBtn.setAttribute("alt", "delete icon");
          // deleteBtn.setAttribute("class", "delete-icon");

          // let createCopyBtn = document.createElement("button");
          // createCopyBtn.textContent = "copy";
          // createCopyBtn.setAttribute("class", "copy");
          // pastedLink.append(deleteBtn);
          // createLinkCards.append(pastedLink);
          // createLinkCards.append(generatedLink);
          // createLinkCards.append(createCopyBtn);
          // shortenedLinksContainer.append(createLinkCards);

          // waitTxt.style.display = "none";

          // //STORING THE LINKS IN THE LOCAL STORAGE.
          // inputLinks.push(pastedLink.textContent);

          // localStorage.setItem("storedInputLinks", JSON.stringify(inputLinks));

          // linkInput.value = "";
          // fullShortLinkArr.push(fullShortLink);

          // localStorage.setItem(
          //   "storedShortenedLinks",
          //   JSON.stringify(fullShortLinkArr)
          // );
        } catch (e) {
          console.log(e);
          warningTxt.style.display = "block";
          linkInput.style.border = "3px solid var(--red)";
          warningTxt.textContent = e;
          //"Invalid URL (Please enter a valid URL)."
          waitTxt.style.display = "none";
        }

        return;
      };

      fetchShortenedUrl();
    }
  }
};

//GETS THE STORED LINK VALUES IN THE LOCAL STORAGE, AND PRESENT IT ON EACH PAGE LOAD.
window.onload = () => {
  if (localStorage.getItem("storedInputLinks") != null) {
    let getStoredLinks = JSON.parse(localStorage.getItem("storedInputLinks"));

    getStoredShortenedLinks = JSON.parse(
      localStorage.getItem("storedShortenedLinks")
    );

    //loop through the items parsed back from the localstorage, so we can store them individually in the array again, to enable the array not to be empty each time the page loads.

    for (let i = 0; i < getStoredLinks.length; i++) {
      inputLinks.push(getStoredLinks[i]);
    }

    //pushing and storing all the shortenedLinks stored in the local storage, back to the starting array.
    getStoredShortenedLinks.forEach((itemm) => fullShortLinkArr.push(itemm));

    //create a cards container for each of the items in the array.
    for (let q = 0; q < inputLinks.length; q++) {
      shortenedLinksContainer.innerHTML +=
        '<div class="shortened-urls" /*data-aos="zoom-in"*/>' +
        '	<p class="link">' +
        inputLinks[q] +
        '<img src="./images/icon-delete.svg" alt="delete icon" class="delete-icon"> </p>	<input type="text" class="shortened-link" readonly value =' +
        fullShortLinkArr[q] +
        '> <button class="copy">copy</button></div>';
    }
  }

  for (let a = 0; a < shortenedLinksContainer.children.length; a++) {
    eachCard = shortenedLinksContainer.children[a].children[0].textContent;
    allCardsArr.push(eachCard);
  }

  trimmedAllCardsArr = allCardsArr.map((remChar) => {
    return remChar.trim();
  });
};

linkInput.onkeydown = (e) => {
  linkInputFunction(e);
};

function linkInputFunction(e) {
  e.target.style.border = "none";
  warningTxt.style.display = "none";
}
linkInput.onpaste = (e) => {
  linkInputFunction(e);
};

document.onclick = (e) => {
  let delConfirmModal = document.getElementById("delete-confirmation-modal");

  if (e.target.className == "copy") {
    e.target.style.backgroundColor = "var(--darkViolet)";
    e.target.textContent = "copied!";
    copiedmsg.style.display = "block";
    let copiedMsgTimeout = () => {
      copiedmsg.style.display = "none";
    };
    setTimeout(copiedMsgTimeout, 3000);

    /* Get the text field */

    let txtToCopy = e.target.previousElementSibling;

    /* Select the text field */
    txtToCopy.select();
    txtToCopy.setSelectionRange(0, 99999); /* For mobile devices */

    /* Copy the text inside the text field */
    //  navigator.clipboard.writeText(txtToCopy);
    document.execCommand("copy");
  }

  if (e.target.className == "delete-icon") {
    delConfirmModal.style.height = "100vh";
    storeCurrentCardCallingDeleteFunction = e.target.parentNode.textContent;
    cardToBeDeleted = e.target.parentNode.parentNode;
    shortenedLinkOfTheCardToBeDeleted =
      e.target.parentNode.nextElementSibling.value;
  } else if (e.target.id == "yes-delete") {
    for (let L = 0; L < shortenedLinksContainer.children.length; L++) {
      show = shortenedLinksContainer.children[L].children[0].textContent;

      nwArr.push(show);
      //console.log(shortenedLinksContainer.children.length	);
    }

    if (nwArr.includes(storeCurrentCardCallingDeleteFunction)) {
      filteredArr = nwArr.filter((item) => {
        return item != storeCurrentCardCallingDeleteFunction;
      });

      itemremovedfilter = nwArr.filter((item) => {
        return item == storeCurrentCardCallingDeleteFunction;
      });

      filteredShortLinksArr = fullShortLinkArr.filter((item) => {
        return item != shortenedLinkOfTheCardToBeDeleted;
      });

      if (itemremovedfilter[0] == storeCurrentCardCallingDeleteFunction) {
        shortenedLinksContainer.removeChild(cardToBeDeleted);
        localStorage.setItem("storedInputLinks", JSON.stringify(filteredArr));

        localStorage.setItem(
          "storedShortenedLinks",
          JSON.stringify(filteredShortLinksArr)
        );
      }
    }

    nwArr = [];
    delConfirmModal.style.height = "0vh";
  }

  //Remove the Delete Modal If The Cancel Button Was Clicked;
  else if (e.target.id === "no-delete") {
    delConfirmModal.style.height = "0vh";
  }
};
