
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

document.addEventListener('DOMContentLoaded', () => {

    let overlay = document.getElementById("modal-overlay");
    overlay.addEventListener("click", function() {
        closeModal();
    });
})



const openModal = function (modalId) {
    console.log("Opening Modal ", modalId)
    let modal = document.getElementById(modalId);
    let overlay = document.getElementById("modal-overlay");
    modal.classList.remove("hidden");
    overlay.classList.remove("hidden");

}

const closeModal = function () {
    let overlay = document.getElementById("modal-overlay");
    overlay.classList.add("hidden");

    let modals = document.getElementsByClassName("modal");
    [...modals].forEach((modal) => {
        modal.classList.add("hidden");
    });
}