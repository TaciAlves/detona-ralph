const getById = (id) => document.querySelector(`#${id}`);

const screenSelect = {
    mainScreen: getById("mainScreen"),
    gameScreen : getById("gameScreen"),
    optionsScreen: getById("optionsScreen"),
    btnOptions: getById("btn-options"),
    screens: getById("screens"),
    btnReturn: getById("btn-return")
}

screenSelect.btnOptions.addEventListener("click", () => {
    screenSelect.optionsScreen.classList.toggle("disabled-screen");
    screenSelect.mainScreen.classList.toggle("disabled-screen");
});

screenSelect.btnReturn.addEventListener("click", () =>{
    screenSelect.optionsScreen.classList.toggle("disabled-screen");
    screenSelect.mainScreen.classList.toggle("disabled-screen");
});