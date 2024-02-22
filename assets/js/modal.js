
document.addEventListener('click', function (event) {
    const targetObject = event.target;
    const openModalAttribute = 'data-open-modal-id';
    const closeModalAttribute = 'data-close-modal-id';
    if (targetObject.hasAttribute(openModalAttribute)) {
        openModal(targetObject.getAttribute(openModalAttribute));
    }else if(targetObject.hasAttribute(closeModalAttribute)){
        closeModal(targetObject.getAttribute(closeModalAttribute));
    }
});




const openModal = function (modalId) {
    console.log("Opening Modal ", modalId)
    let modal = document.getElementById(modalId);
    let overlay = document.getElementById("modal-overlay");
    modal.classList.remove("hidden");
    overlay.classList.remove("hidden");

    // A timeout so that modal doesnt immediately close
    setTimeout(function(){
        initClosingListener(modalId);
    },500);
}

const initClosingListener = function (modalId) {
    let overlay = document.getElementById("modal-overlay");
    overlay.addEventListener("click", function() {
        closeModal(modalId);
    });
}

const closeModal = function (modalId) {
    let modal = document.getElementById(modalId);
    let overlay = document.getElementById("modal-overlay");
    modal.classList.add("hidden");
    overlay.classList.add("hidden");
}