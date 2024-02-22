const openModal = function (modalId) {
    console.log("Opening Modal ", modalId)
    let modal = document.getElementById(modalId);
    let overlay = document.getElementById("modal-overlay");
    modal.classList.remove("hidden");
    overlay.classList.remove("hidden");

    initClosingListener(modalId);

};

const initClosingListener = function(modalId){
    let overlay = document.getElementById("modal-overlay");
    overlay.addEventListener("click", closeModal(modalId));
}

const closeModal = function (modalId){
    let modal = document.getElementById(modalId);
    let overlay = document.getElementById("modal-overlay");
    modal.classList.remove("hidden");
    overlay.classList.remove("hidden");
}