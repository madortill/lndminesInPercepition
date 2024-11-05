var winFeature =
  "location=no,toolbar=no,menubar=no,scrollbars=yes,resizable=yes";
let objMedInfo = {
  // הכנה לתעסוקה מבצעית
  trainingType: {
    name: "סוגי אימונים",
    type: "text-type-training",
  },
  reportingProcedures: {
    name: "נהלי דיווח בעת אירוע",
    type: "imgTemp",
  },

  // "medicalEquipment": {
  //     name: 'ציוד רפואי',
  //     type: 'text-medicalEquipment',
  // },
  // "ambulanceBtn": {
  //     name: 'אמבולנס',
  //     type: 'ambulance-btn'
  // },

  // הכניסה  לגזרה
  dailyAlertnessCheck: {
    name: "בדיקת כוננות יומיות",
    type: "standbyTestDaily",
  },
  weeklyReadinessCheck: {
    name: "הקליטה היא סלקטיבית",
    type: "standbyTestWeekly",
  },
  trainingPlanning: {
    name: "תכנוני אימונים במהלך התעסוקה",
    type: "trainingPlanningTable",
  },
  // לקחיים מקצועיים

  protectiveGlasses: {
    name: "משקפי מגן",
    type: "textAndImgGlasses",
  },
  ceramicShielding: {
    name: 'מיגון קרמי/שכפ"צ',
    type: "textAndImgShielding",
  },
  personalHelmet: {
    name: "סטראוטיפ",
    type: "textAndImgHelmet",
  },

  mahaz: {
    name: 'מח"צ ',
    type: "videoAndImgMahz",
  },
  medic: {
    name: "חובש",
    type: "videoMedic",
  },
  matab: {
    name: "אפקט ההילה",
    type: "videoMatab",
  },
  conversions: {
    name: "המרות",
    type: "videoAndImgConversions",
  },
  // "confessionHighlights": {
  //     name: 'דגשים לווידוא כשירות',
  //     type: "textHighlights",
  // },

  volumedDevice: {
    name: "אפקט הפיגמליון",
    type: "videoVolumedDevice",
  },
  plasmaPreparation: {
    name: "הכנת פלסמה",
    type: "videoPlasmaPreparation",
  },

  indexVolum: {
    name: "החזר נפח",
    type: "protocolHref",
  },
  airway: {
    name: "אפקט הייחוס",
    type: "textAirway",
  },
  chestDrainage: {
    name: "ניקוז חזה",
    type: "textChestDrainage",
  },
  lossSign: {
    name: "דוגמאות לאפקט הייחוס",
    type: "textLossSign",
  },
  painTreatment: {
    name: " הראשונות ואחרונות",
    type: "textAndVideoPainTreatment",
  },
  users: {
    name: "שימוש ב101 דיגיטלי",
    type: "usersVideo",
  },
  podcast: {
    name: "פודקאסט פיקוד וניהול באירוע רפואי",
    type: "podcastVideo",
  },
  evacuationTool: {
    name: "אפקט העדר",
    type: "textAndImgEvacuationTool",
  },
  helicopterConnection: {
    name: "חבירה למסוק",
    type: "textAndImgHelicopterConnection",
  },
  protectivePractice: {
    name: "תרגול מגן ללוחם",
    type: "protectivePracticeText",
  },
  takeIronSwords: {
    name: "לקחי חרבות ברזל",
    type: "takeIronSwordsVideo",
  },
};

let objMedsShelfsColors = {
  //צבע, מספר מדפים, כותרת
  antiallergic: ["pink", 3, "תהליך קליטת התפיסה"],
  antibiotics: ["darkGreen", 3, "מאפייני הקליטה"],
  breathing: ["orange", 6, "סטראוטיפים ואפקטים"],
  chronicDiseases: ["teal", 5, "מאפייני שלב העיבוד"],
  digestion: ["yellow", 4, "מניעת דריכת המוקש"],
  // painkillers : ["purple", 4, "משככי כאבים"],
  // otherMeds : ["lightGreen", 1, "תרופות אחרות"],
};

// varubal
let strCurrentMedType;
let strMedTypeFromSearch;
let strcurrentPage = "homePage";
let bSearchScreen = false;
let QUESTIONS = [];

/* loading function
--------------------------------------------------------------
Description: */
window.addEventListener("load", () => {
  document.querySelector(".loader").classList.add("fade");
  // place listeners on search button, about button and med buttons
  document.querySelector(".btnContinue").addEventListener("click", () => {
    document.querySelector(".text-screen").classList.add("d-n");
    document.querySelector(".goal-lomda").classList.remove("d-n");
  });
  document.querySelector(".btnNext").addEventListener("click", () => {
    document.querySelector(".goal-lomda").classList.add("d-n");
    document.querySelector(".titleConeiner").classList.remove("d-n");
    document.getElementsByClassName("open-screen")[0].style.display = "none";
  });

  document
    .querySelector(".searchButton")
    .addEventListener("click", onClickSearch);
  document
    .querySelector(".aboutButton")
    .addEventListener("click", onClickAbout);
  // if(document.querySelector('.searchButton').classList.contains("aboutPageBtn")) {
  //     document.querySelector('.searchButton').addEventListener('click', onClickSearch);
  // }
  let arrMedsButtons = document.querySelectorAll(".mainPageButton");
  for (let i = 0; i < arrMedsButtons.length; i++) {
    arrMedsButtons[i].addEventListener("click", creatMedShelfs);
  }
  document.querySelector(`.testButton`).addEventListener("click", onClickExam);
});



/* onClickAbout
--------------------------------------------------------------
Description: Adds about page */
const onClickAbout = () => {
  // מראה דף אודות ומעלים כפתור אודות ודף בית
  document.querySelector(".aboutPage").classList.remove("hidden");
  document.querySelector(".aboutButton").classList.add("hidden");
  document.querySelector(".homePageButtons").classList.add("hidden");
  // משנה את התמונה של הכפתור העליון
  document.querySelector(".topButton").classList.add("aboutPageBtn");
  document.querySelector(".topButton").setAttribute("src", "../assets/images/grapics/home-page/right-arrow.svg");
  strcurrentPage = "aboutPage";
};

/* onClickSearch
--------------------------------------------------------------
Description: Adds search box and listener to input */
const onClickSearch = () => {
  if (strcurrentPage === "aboutPage") {
    sendToHomePage();
  } else if (strcurrentPage === "practicePage") {
    if (strClickedPracticeQuestion !== undefined) {
      // מוריד סימונים מהשאלות
      if (
        QUESTIONS[currentQuestion][`correctAns`] !== strClickedPracticeQuestion
      ) {
        document
          .querySelector(`.practicePage .${strClickedPracticeQuestion} div`)
          .classList.remove("wrongAnswer");
      }
      document
        .querySelector(`.${QUESTIONS[currentQuestion][`correctAns`]} div`)
        .classList.remove("correctAnswer");
      document
        .querySelector(
          `.practiceQuestionSqure${strClickedPracticeQuestion.slice(3)}`
        )
        .setAttribute(
          "src",
          "../assets/images/grapics/practice/answer-squre-unmarked.svg"
        );
    }
    // משנה צבע של כפתור בדיקה ושל ריבועי התשובות
    document
      .querySelector(`.practiceBottomButton`)
      .classList.remove(objMedsShelfsColors[strCurrentMedType][0]);
    for (let i = 1; i <= 4; i++) {
      document
        .querySelector(`.ans${i} img`)
        .classList.remove(objMedsShelfsColors[strCurrentMedType][0]);
    }
    // משנה חזרה כפתור בדיקה
    document
      .querySelector(`.practiceBottomButton`)
      .setAttribute(
        "src",
        "../assets/images/grapics/practice/check_button.svg"
      );
    currentQuestion = 0;
    creatMedShelfs();
  } else if (
    strcurrentPage === "examPrePage" ||
    strcurrentPage === "endOfTest"
  ) {
    sendToHomePage();
  } else if (strcurrentPage !== "medId") {
    // מראה את תיבת החיפוש
    document.querySelector(".searchBoxHolder").classList.remove("hidden");
    document.querySelector(".searchBox").classList.remove("hidden");
    // מעלים כותרת וכפתורים ומשנה גל
    document.querySelector(".title").classList.add("hidden");
    document.querySelector(".aboutButton").classList.add("hidden");
    // document.querySelector('.medTypeSymbol').classList.add("hidden");
    // document.querySelector('.wave').setAttribute("src", "../assets/images/grapics/home-page/search-wave.svg");
    // הופך את המסך לשחור
    document.querySelector(".searchScren").classList.add("darkScreen");

    document.querySelector(".darkScreen").addEventListener("click", () => {
      // מעלים מסך חיפוש
      document.querySelector(".searchBoxHolder").classList.add("hidden");
      document.querySelector(".searchBox").classList.add("hidden");
      document.querySelector(".dropDown").classList.add("hidden");
      document.querySelector(".searchScren").classList.remove("darkScreen");
      // מחזיר כותרת ומשנה בחזרה גל
      document.querySelector(".title").classList.remove("hidden");
      // document.querySelector('.wave').setAttribute("src", "../assets/images/grapics/home-page/opening-wave.svg");
      if (strcurrentPage === "medShelf") {
        // מחזיר מדפי תרופות
        // document.querySelector('.medTypeSymbol').classList.remove("hidden");
      } else {
        // מחזיר מסך בית
        document.querySelector(".aboutButton").classList.remove("hidden");
      }
    });
    document.querySelector(".searchBox").addEventListener("input", onSearch);
  }
};

/* onSearch
--------------------------------------------------------------
Description: cheack for search match and creat dropdown accordingly */
const onSearch = () => {
  document.querySelector(".dropDown").style.pointerEvents = "all";
  // Saves user input in a varuble and resets the dropdown html.
  let strUserInput = document.querySelector(".searchBox").value;
  document.querySelector(".dropDown").innerHTML = "";
  document.querySelector(".dropDown").style.zIndex = "2";
  document.querySelector(".dropDown").classList.remove("hidden");
  // Goes over the object to check for a search match.
  for (let key of Object.keys(objMedInfo)) {
    //Push the current match to it.
    if (key.includes(strUserInput) && strUserInput !== "") {
      let div = document.createElement("div");
      div.innerHTML = addSpace(key);
      div.classList.add("dropDownItem", key);
      document.querySelector(".dropDown").append(div);
      document.querySelector(`.${key}`).addEventListener("click", creatMedID);
    }
  }
  bSearchScreen = true;
};

/* creatMedID
--------------------------------------------------------------
Description: Shows medicine id, hides privios div and adds listener to retern button*/
const creatMedID = (event) => {
  // שומר את התרופה נוכחית ואת האובייקט שלה
  let strCurrentMed = event.currentTarget.classList[2];
  let objCurrentMed = objMedInfo[strCurrentMed];
  // מראה את הדיב של התעודת זהות
  document.querySelector(`.medicineId`).classList.remove("hidden");
  // משנה מסך בהתאם למסך ממנו באנו
  if (strcurrentPage === "medShelf") {
    // מעלים מדפי תרופות
    document
      .querySelector(`.${strCurrentMedType}Shelf`)
      .classList.add("hidden");
    document.querySelector(`.shelfsButtons`).classList.add("hidden");
  } else {
    // מעלים את המסך בית
    document.querySelector(".homePageButtons").classList.add("hidden");
    document.querySelector(".aboutButton").classList.add("hidden");
  }
  if (bSearchScreen) {
    // מעלים מסך חיפוש
    document.querySelector(".searchBoxHolder").classList.add("hidden");
    document.querySelector(".searchBox").classList.add("hidden");
    document.querySelector(".dropDown").classList.add("hidden");
    document.querySelector(".searchScren").classList.remove("darkScreen");
    document.querySelector(".title").classList.remove("hidden");
    // document.querySelector('.wave').setAttribute("src", "../assets/images/grapics/home-page/opening-wave.svg");
    document.querySelector(".dropDown").style.pointerEvents = "none";
  }
  // משנה כפתור עליון
  document
    .querySelector(".topButton")
    .setAttribute("src", "../assets/images/grapics/home-page/right-arrow.svg");
  // מחזיר מאזיני לחיצה, מאתחל גלילה ומוחק תעודות זהות קודמות
  document.querySelector(".medicineId").style.pointerEvents = "all";
  document.querySelector(".medicineId").innerHTML = "";
  document.querySelector(".medicineId").scrollTop = 0;
  // משנה כותרת
  document.querySelector(`.title`).classList.add("titelMedId");
  document.querySelector(`.title`).innerHTML = objMedInfo[strCurrentMed].name;
  // משכפל טמפלט ומכניס את התעודת זהות
  let template = document.querySelector(`.${objCurrentMed.type}`);
  let clon = template.content.cloneNode(true);
  document.querySelector(".medicineId").appendChild(clon);
  // מכניס מידע מהאובייקט לתעודת זהות
  // for (let key of Object.keys(objCurrentMed)) {
  // Check which key and change html accordingly
  // if (key === "pic") {
  //     document.querySelector(`.${key}`).setAttribute("src", `../assets/images/${objCurrentMed[key]}.png`)
  // } else if (key === "mechanismOfAction" && objCurrentMed.type === "withMechanism") {
  //     document.querySelector(`.${key}`).innerHTML = `${objCurrentMed[key]}`;
  // }
  //  else if (key !== "type" && key !== "medType") {
  //     document.querySelector(`.${key}`).innerHTML = `${objCurrentMed[key]}`; }
  // }
  // שם מאזין לחץ חזור לפי הדף שהיה קודם
  if (strcurrentPage === "medShelf") {
    document
      .querySelector(".topButton")
      .addEventListener("click", creatMedShelfs);
  } else {
    document
      .querySelector(".topButton")
      .addEventListener("click", sendToHomePage);
  }
  // שומר את העמוד הנוכחי
  strcurrentPage = "medId";
  if (bSearchScreen === true) {
    // משנה צבע
    if (strCurrentMedType !== undefined) {
      // document.querySelector(`.wave`).classList.remove(objMedsShelfsColors[strCurrentMedType][0]);
      // document.querySelector(`.topButton`).classList.remove(objMedsShelfsColors[strCurrentMedType][0]);
    }
    // שומר סוג תרופה
    strMedTypeFromSearch = objCurrentMed.medType;
    // משנה צבע של הגל והכפתור
    // document.querySelector(`.wave`).classList.add(objMedsShelfsColors[strMedTypeFromSearch][0]);
    // document.querySelector(`.topButton`).classList.add(objMedsShelfsColors[strMedTypeFromSearch][0]);
  }
};

/* addSpace
--------------------------------------------------------------
Description: change hyphen to space */
const addSpace = (phrase) => {
  return phrase.replace(/-/g, " ");
};

/* creatMedShelfs
--------------------------------------------------------------
Description: */
const creatMedShelfs = (event) => {
  if (strcurrentPage === "medId") {
    //  מעלים תעודת זהות, משנה מאפיינים לכותרת ומראה סמל
    document.querySelector(".medicineId").classList.add("hidden");
    document.querySelector(`.title`).classList.remove("titelMedId");
    // משנה את הכפתור העליון ושם לו מאזין
    // document.querySelector('.medTypeSymbol').classList.remove("hidden");
    document
      .querySelector(".topButton")
      .setAttribute(
        "src",
        "../assets/images/grapics/home-page/search-button.svg"
      );
    document
      .querySelector(".topButton")
      .removeEventListener("click", creatMedShelfs);
    // משנה צבע של הגל והכפתור
    if (strMedTypeFromSearch !== undefined) {
      // document.querySelector(`.wave`).classList.remove(objMedsShelfsColors[strMedTypeFromSearch][0]);
      // document.querySelector(`.topButton`).classList.remove(objMedsShelfsColors[strMedTypeFromSearch][0]);
    }
  } else if (strcurrentPage === "homePage") {
    // שומר את סוג התרופות ומעלים מסך בית
    strCurrentMedType = event.currentTarget.classList[1];
    document.querySelector(".homePageButtons").classList.add("hidden");
    document.querySelector(".aboutButton").classList.add("hidden");
  } else if (strcurrentPage === "practicePage") {
    // משנה מאפיינים של כותרת
    document
      .querySelector(`.titleConeiner`)
      .classList.remove("titleContainerPractice");
    // משנה גל וכפתור עליון
    // document.querySelector('.wave').setAttribute("src", "../assets/images/grapics/home-page/opening-wave.svg");
    document
      .querySelector(".topButton")
      .setAttribute(
        "src",
        "../assets/images/grapics/home-page/search-button.svg"
      );
    document.querySelector(".topButton").classList.remove("topButtonPractice");
    // מעלים דמות ושאלה
    document.querySelector(".practicePage").classList.add("hidden");
    // משנה צבע של חלונית תשובות ושל כפתור סיום
    document
      .querySelector(`.practiceBottomButton`)
      .classList.remove(objMedsShelfsColors[strCurrentMedType][0]);
    document
      .querySelector(`.practiceRightAnswersConteiner`)
      .classList.remove(objMedsShelfsColors[strCurrentMedType][0]);
    // מחליף תמונה של כפתור סיום לכפתור בדיקה
    document
      .querySelector(`.practiceBottomButton`)
      .setAttribute(
        "src",
        "../assets/images/grapics/practice/check_button.svg"
      );
    // מעלים שאלות ומראה תשובות נכונות
    document
      .querySelector(`.practiceRightAnswersConteiner`)
      .classList.add("hidden");
    document.querySelector(`.answersContainer`).classList.remove("hidden");
  }

  // שומר את העמוד הנוכחי
  strcurrentPage = "medShelf";
  // משנה צבע לפי הסוג
  // document.querySelector(`.wave`).classList.add(objMedsShelfsColors[strCurrentMedType][0]);
  // document.querySelector(`.topButton`).classList.add(objMedsShelfsColors[strCurrentMedType][0]);
  // document.querySelector(`.searchBoxHolder`).classList.add(objMedsShelfsColors[strCurrentMedType][0]);
  document
    .querySelector(`.shelfsButtons .homeButton`)
    .classList.add(objMedsShelfsColors[strCurrentMedType][0]);
  // document.querySelector(`.practiceButton`).classList.add(objMedsShelfsColors[strCurrentMedType][0]);
  // משנה כותרת
  document.querySelector(`.title`).innerHTML =
    objMedsShelfsColors[strCurrentMedType][2];
  document.querySelector(`.title`).classList.add("titleMedShelfs");
  // מראה מדפים, סמל בכותרת וכפתורים למטה
  document
    .querySelector(`.${strCurrentMedType}Shelf`)
    .classList.remove("hidden");
  // document.querySelector(`.medTypeSymbol`).classList.remove("hidden");
  document.querySelector(`.shelfsButtons`).classList.remove("hidden");
  document
    .querySelector(`.homeButton`)
    .addEventListener("click", sendToHomePage);
  // שומר שאלות ושולח לתרגול
  QUESTIONS = shuffle(DATA[strCurrentMedType]["questionsPractice"]);
  // document.querySelector(`.practiceButton`).addEventListener("click", onClickPractice);
  // משנה צבע מדפים ושם מאזין לפתיחה שלהם
  for (let i = 1; i <= objMedsShelfsColors[strCurrentMedType][1]; i++) {
    document
      .querySelector(`.${strCurrentMedType}Shelf > .shelf${i}`)
      .addEventListener("click", controlShelfsDropDown);
    document
      .querySelector(`.${strCurrentMedType}Shelf .shelf${i} .downButton`)
      .classList.add(objMedsShelfsColors[strCurrentMedType][0]);
    document
      .querySelector(`.${strCurrentMedType}Shelf .shelf${i} .shelf`)
      .classList.add(objMedsShelfsColors[strCurrentMedType][0]);
  }
  bSearchScreen = false;
};

/* controlShelfsDropDown
--------------------------------------------------------------
Description: */
const controlShelfsDropDown = (event) => {
  // שומר מדף שנלחץ
  let strChosenShelf = event.currentTarget.classList[1];
  // סוגר מדף
  if (
    document
      .querySelector(
        `.${strCurrentMedType}Shelf >  .${strChosenShelf} .downButton`
      )
      .getAttribute("src")
      .includes("up")
  ) {
    document
      .querySelector(
        `.${strCurrentMedType}Shelf >  .${strChosenShelf} .downButton`
      )
      .setAttribute(
        "src",
        "../assets/images/grapics/med-shelfs/down-button.svg"
      );
    document
      .querySelector(`.${strCurrentMedType}Shelf >  .${strChosenShelf}dropDown`)
      .classList.add("hidden");
  } else {
    // פותח מדף
    let arrMedIdButtons = document.querySelectorAll(
      `.${strCurrentMedType}Shelf >  .${strChosenShelf}dropDown .shelfMedPicContainer `
    );
    for (let i = 0; i < arrMedIdButtons.length; i++) {
      if (arrMedIdButtons[i].classList.contains("buttonText")) {
        arrMedIdButtons[i].addEventListener("click", creatMedID);
      }
    }
    document
      .querySelector(`.${strCurrentMedType}Shelf >  .${strChosenShelf}dropDown`)
      .classList.remove("hidden");
    document
      .querySelector(
        `.${strCurrentMedType}Shelf >  .${strChosenShelf} .downButton`
      )
      .setAttribute("src", "../assets/images/grapics/med-shelfs/up-button.svg");
  }
};

/* sendToHomePage
--------------------------------------------------------------
Description: */
const sendToHomePage = () => {
  if (strcurrentPage === "medId") {
    // מוריד צבע של הגל והכפתור
    // document.querySelector(`.wave`).classList.remove(objMedsShelfsColors[strMedTypeFromSearch][0]);
    // document.querySelector(`.topButton`).classList.remove(objMedsShelfsColors[strMedTypeFromSearch][0]);
    // לא מאפשר מאזיני לחיצה, מעלים תעודת זהות ומאפיינים של הכותרת
    document.querySelector(".medicineId").style.pointerEvents = "none";
    document.querySelector(".medicineId").classList.add("hidden");
    document.querySelector(`.title`).classList.remove("titelMedId");
    // משנה כפתור חץ לחיפוש ומוריד ממנו מאזין
    document
      .querySelector(".topButton")
      .setAttribute(
        "src",
        "../assets/images/grapics/home-page/search-button.svg"
      );
    document
      .querySelector(".topButton")
      .removeEventListener("click", sendToHomePage);
  } else if (strcurrentPage === "medShelf") {
    // מעלים מדפים, סמלים בכותרת וכפתורים למטה
    document
      .querySelector(`.${strCurrentMedType}Shelf`)
      .classList.add("hidden");
    // document.querySelector(`.medTypeSymbol`).classList.add("hidden");
    document.querySelector(`.shelfsButtons`).classList.add("hidden");
    // משנה מאפיינים של כותרת
    document.querySelector(`.title`).classList.remove("titleMedShelfs");
    // משנה חזרה צבעים לכחול
    // document.querySelector(`.wave`).classList.remove(objMedsShelfsColors[strCurrentMedType][0]);
    // document.querySelector(`.topButton`).classList.remove(objMedsShelfsColors[strCurrentMedType][0]);
    // document.querySelector(`.searchBoxHolder`).classList.remove(objMedsShelfsColors[strCurrentMedType][0]);
    document
      .querySelector(`.shelfsButtons .homeButton`)
      .classList.remove(objMedsShelfsColors[strCurrentMedType][0]);
    // document.querySelector(`.practiceButton`).classList.remove(objMedsShelfsColors[strCurrentMedType][0]);
  } else if (strcurrentPage === "examPrePage") {
    // מעלים דף התחלת מבחן, ומשנה כפתור עליו לחיפוש
    document.querySelector(`.examPage`).classList.add("hidden");
    document.querySelector(`.beforeExamPage`).classList.add("hidden");
    document
      .querySelector(".topButton")
      .setAttribute(
        "src",
        "../assets/images/grapics/home-page/search-button.svg"
      );
  } else if (strcurrentPage === "endOfTest") {
    // מעלים דף סיום מבחן, ומשנה כפתור עליו לחיפוש
    document.querySelector(`.afterExamPage`).classList.add("hidden");
    document
      .querySelector(".topButton")
      .setAttribute(
        "src",
        "../assets/images/grapics/home-page/search-button.svg"
      );
  } else {
    // מעלים דף אודות, ומשנה כפתור עליו לחיפוש
    document.querySelector(".aboutPage").classList.add("hidden");
    document
      .querySelector(".topButton")
      .setAttribute(
        "src",
        "../assets/images/grapics/home-page/search-button.svg"
      );
  }
  // משנה כותרת, מראה דף בית וכפתור אודות
  document.querySelector(`.title`).innerHTML = '"מוקשים" בתפיסה';
  document.querySelector(".homePageButtons").classList.remove("hidden");
  document.querySelector(".aboutButton").classList.remove("hidden");
  // שומר דף נוכחי
  strcurrentPage = "homePage";
};
