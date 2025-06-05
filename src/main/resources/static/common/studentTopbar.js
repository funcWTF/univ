window.addEventListener("DOMContentLoaded", () => {
    portalBtnAction();
});



const portalBtnAction = function () {
    const portalBtn = document.getElementById('portalBtn');
    portalBtn.onclick = () => {
        location.href = `/portal/mainPage`;
    };
};