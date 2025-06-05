window.addEventListener("DOMContentLoaded", () => {
    studentLoginBtnAction();
    centerBtnAction();
    studentSessionCheck();
    studentLogoutAction();
    portalBtnAction();
});

// const studentLoginBtnAction = function () {
//     const studentLoginBtn = document.getElementById('studentLoginBtn')
//     studentLoginBtn.onclick = () => {
//         location.href = '/portal/studentLoginPage';
//     };
// };

const studentLoginBtnAction = function () {
    const studentLoginBtn = document.getElementById('studentLoginBtn')
    studentLoginBtn.onclick = () => {
        // 현재 페이지 주소를 encodeURIComponent로 인코딩
        const redirectUrl = encodeURIComponent(window.location.pathname + window.location.search);
        location.href = `/portal/studentLoginPage?redirectUrl=${redirectUrl}`;
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

const studentSessionCheck = function () {
    fetch('/api/portal/auth/studentSessionCheck', {
        method: 'GET',
        credentials: 'include' // 세션 쿠키 반드시 포함!
    })
        .then(response => response.json())
        .then(json => {
            if (json['login']) {
                document.getElementById('studentLoginBtn').classList.add('d-none');
                document.getElementById('studentLogoutBtn').classList.remove('d-none');
            } else {
                document.getElementById('studentLoginBtn').classList.remove('d-none');
                document.getElementById('studentLogoutBtn').classList.add('d-none');
            }
        });
};

const studentLogoutAction = function () {
    const studentLogoutBtn = document.getElementById('studentLogoutBtn');
    studentLogoutBtn.onclick = () => {
        fetch('/api/portal/auth/studentLogout', {
            method: 'POST',
            credentials: 'include'
        })
            .then(response => response.json())
            .then(json => {
                if (json.result) {
                    document.getElementById('studentLoginBtn').classList.remove('d-none');
                    document.getElementById('studentLogoutBtn').classList.add('d-none');
                }
            });
    };
};

const portalBtnAction = function () {
    const portalBtn = document.getElementById('portalBtn');
    portalBtn.onclick = () => {
        location.href = `/portal/mainPage`;
    };
};