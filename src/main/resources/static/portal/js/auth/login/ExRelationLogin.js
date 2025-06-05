window.addEventListener("DOMContentLoaded", () => {
    exRelationLoginAction();
});

const exRelationLoginAction = function () {
    document.getElementById('exRelationLogin').onsubmit = (event) => {
        event.preventDefault(); // 기본 submit 막기

        const exRelationLoginRequest = {
            accountName: document.getElementById('exRelationIdInput').value,
            password: document.getElementById('exRelationPasswordInput').value,
        };

        fetch(`/api/portal/auth/exRelationLoginProcess`, {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(exRelationLoginRequest)
        }).then(response => response.json())
            .then(json => {
                // 처리
                const loginError = document.getElementById('loginError');
                if (json['result'] === false) {
                    loginError.classList.remove('d-none');
                } else {
                    // loginError.classList.add('d-none');
                    // const exRelationResponse = encodeURIComponent(JSON.stringify(json['result']));
                    //
                    // console.log(exRelationResponse['center']);
                    console.log(json['result']['center']);

                    if (json['result']['center'] === 'job') {
                        location.href = `/exRelation/job`;
                    } else if (json['result']['center'] === 'barrierFree') {
                        location.href = `/exRelation/barrierFree`;
                    } else if (json['result']['center'] === 'internship') {
                        location.href = `/exRelation/internship`;
                    } else if (json['result']['center'] === 'residence') {
                        location.href = `/exRelation/residence`;
                    } else if (json['result']['center'] === 'lifeEduStudent') {
                        location.href = `/exRelation/lifeEduStudent`;
                    } else if (json['result']['center'] === 'lifeEduInstructor') {
                        location.href = `/exRelation/lifeEduInstructor`;
                    }

                }
            });
    }
};