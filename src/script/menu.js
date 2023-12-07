const controll = {
  
    values: {
      difficult: 1,
      lives: 3
    },
    views: {
      listDifficult: getById("list-difficult"),
      listLives: getById("list-lives"),
      btnReturn: getById("btn-return")
    }
  }
  
  function addOrRemoveClass(elementsByName) {
      let selectedElements = document.getElementsByName(elementsByName);
      selectedElements.forEach((element) => {
        if (element.checked){
          element.previousElementSibling.classList.add("option-radio__checked");
          if(element.name === 'live') controll.values.lives = parseInt(element.value);
          else if(element.name === 'difficult') controll.values.difficult = parseInt(element.value);
        }
      else
      element.previousElementSibling.classList.remove("option-radio__checked");
    });
    }
    
  
    controll.views.btnReturn.addEventListener("click", e => {
      e.preventDefault()
    })
    
    controll.views.listDifficult.addEventListener("click", () => addOrRemoveClass("difficult"));
    controll.views.listLives.addEventListener("click", () => addOrRemoveClass("live"));
