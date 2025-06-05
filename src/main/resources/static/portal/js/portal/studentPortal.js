window.addEventListener("DOMContentLoaded", () => {
    studentLoginBtnAction();
    centerBtnAction();
});

const studentLoginBtnAction = function () {
    const studentLoginBtn = document.getElementById('studentLoginBtn')
    studentLoginBtn.onclick = () => {
        location.href = '/portal/studentLoginPage';
    };
};

const centerMap = {
    colJob: 'job',
    colBarrierFree: 'barrierFree',
    colInternship: 'internship',
    colResidence: 'residence',
    colLifeEdu: 'exRelation/lifeEduStudent'
};

const centerBtnAction = function () {
    Object.entries(centerMap).forEach(([id, center]) => {
        const DOM = document.getElementById(id);
        if (DOM) DOM.onclick = () => goToCenter(center);
    });
};

function goToCenter(center) {
    window.location.href = `/${center}`;
}

