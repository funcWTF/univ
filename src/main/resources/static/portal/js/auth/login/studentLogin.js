window.addEventListener("DOMContentLoaded", () => {
    studentLoginAction();
});


const studentLoginAction = function () {
    document.getElementById('studentLogin').onsubmit = (event) => {
        event.preventDefault(); // 기본 submit 막기

        const studentLoginRequest = {
            studentId: document.getElementById('studentIdInput').value,
            password: document.getElementById('studentPasswordInput').value,
        };

        console.log(studentLoginRequest);

        fetch(`/api/portal/auth/studentLoginProcess`, {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(studentLoginRequest)
        }).then(res => res.json())
            .then(json => {
                const loginError = document.getElementById('loginError');
                if (json['result'] === false) {
                    loginError.classList.remove('d-none');
                } else {
                    // redirectUrl이 있으면 해당 주소로, 없으면 기본값
                    const params = new URLSearchParams(window.location.search);
                    const redirectUrl = params.get('redirectUrl') || '/portal/mainPage';
                    location.href = redirectUrl;
                }
            });


        // fetch(`/api/portal/auth/studentLoginProcess`, {
        //     method: 'post',
        //     headers: {
        //         'Content-Type': 'application/json'
        //     },
        //     body: JSON.stringify(studentLoginRequest)
        // }).then(response => response.json())
        //     .then(json => {
        //         // 처리
        //         const loginError = document.getElementById('loginError');
        //         if (json['result'] === false) {
        //             loginError.classList.remove('d-none');
        //         } else {
        //             location.href = '/portal/mainPage';
        //         }
        //     });
    }
};
