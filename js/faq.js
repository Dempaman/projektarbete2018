window.addEventListener("load", function(event){
  let faqBtn = document.getElementById("faqBtn");

  faqBtn.addEventListener("click", function(event){

    let faqWrap = document.createElement('div');
    faqWrap.className = 'faq';
    let faqTitle = document.createElement('h2');
    faqTitle.innerText = 'Frågor och svar';
    let faqBody = document.createElement("div");
    faqBody.className = "faqBody";

    let faqQuestionOne = document.createElement("h3");
    faqQuestionOne.innerText = "Hur kan jag anmäla mig på ett meetup?";
    faqQuestionOne.className = "question";

    let faqQuestionTwo = document.createElement("h3");
    faqQuestionTwo.innerText = "Jag kan inte delta på meetup men min kompis skulle vilja ta min plats.";
    faqQuestionTwo.className = "question";

    let faqQuestionThree = document.createElement("h3");
    faqQuestionThree.innerText = "Kan ni ta bort/ändra mina uppgifter från er databas?";
    faqQuestionThree.className = "question";

    let faqAnswerOne = document.createElement("p");
    faqAnswerOne.innerText = "Det är enklare än man tror! Du kan registrera dig med Google, Facebook eller eget namn och lösenord. Hitta meetup som passar dig och klicka på 'Gå med i meetup'";
    faqAnswerOne.className = "answer";

    let faqAnswerTwo = document.createElement("p");
    faqAnswerTwo.innerText = "Om du inte kan delta på meetup måste du 'Lämna meetup' så att en annan registrerad användare kan få din plats.";
    faqAnswerTwo.className = "answer";

    let faqAnswerThree = document.createElement("p");
    faqAnswerThree.innerText = "Vill du ändra dina uppgifter i vår databas så går det bra att skicka ett mail till info@mewent.com";
    faqAnswerThree.className = "answer";

    let closeBtn = document.createElement("div");
    closeBtn.className ="closeBtn";
    closeBtn.innerText = "Stäng";

    let askMore = document.createElement("h3");
    askMore.innerText = `Hittade du inte svar på din fråga? Ring
    00 - 030 53 52 51 eller skicka mail på info@mewent.com!`;
    askMore.className = "askMore";


    faqBody.appendChild(faqQuestionOne);
    faqBody.appendChild(faqAnswerOne);
    faqBody.appendChild(faqQuestionTwo);
    faqBody.appendChild(faqAnswerTwo);
    faqBody.appendChild(faqQuestionThree);
    faqBody.appendChild(faqAnswerThree);

    faqWrap.appendChild(faqTitle);
    faqWrap.appendChild(faqBody);
    faqWrap.appendChild(askMore);
    faqWrap.appendChild(closeBtn);
    let body = document.getElementsByTagName('body')[0];
    body.appendChild(faqWrap);

    closeBtn.addEventListener('click', function(){
      body.removeChild(faqWrap);
    });

  })
})
