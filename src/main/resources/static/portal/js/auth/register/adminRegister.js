window.addEventListener("DOMContentLoaded", () => {
    onblurDOM();
    registrationIdValidation();

    adminRegisterAction();
});


const onblurDOM = function () {
    document.querySelectorAll('input[class*="form-control"]')
        .forEach(function (input) {
            input.addEventListener('blur', function (event) {
                if (event.target.id === 'adminIdInput') {
                    // 아이디 전용 동작
                    const accountName = document.getElementById(event.target.id);
                    accountNameDuplicationCheck(accountName);
                }
                if (event.target.id === 'adminPasswordInput') {
                    // 비번 전용 동작
                }
            });
        });
};

const accountNameDuplicationCheck = function (DOM) {
    const adminIdValue = DOM.value;

    fetch(`/api/porter/auth/adminIdCheck?adminId=${encodeURIComponent(adminIdValue)}`, {
        method: 'get',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    }).then(response => { return response.json();}
    ).then(json => {
        if (json['result']) {
            document.getElementById('colIdError').classList.add('d-none');
        } else {
            document.getElementById('colIdError').classList.remove('d-none');
        }
    });
};

const adminInputValue = function () {

    const adminRegisterIdFirst = document.getElementById('adminRegisterIdFirstInput').value;
    const adminRegisterIdSecond = document.getElementById('adminRegisterIdSecondInput').value;

    let birth;
    let gender;
    if (isValidBirthYYMMDD(adminRegisterIdFirst) && /^\d{7}$/.test(adminRegisterIdSecond)) {
        birth = getFullBirthDate(adminRegisterIdFirst, adminRegisterIdSecond);  // 'YYYY-MM-DD'
        gender = getGenderByJuminCode(adminRegisterIdSecond[0]); // '남자' 또는 '여자'
        console.log('생년월일:', birth);
        console.log('성별:', gender);
    } else {
        console.log('입력값 오류!');
    }

    const adminPhoneFirstInput = document.getElementById('adminPhoneFirstInput').value;
    const adminPhoneSecondInput = document.getElementById('adminPhoneSecondInput').value;
    const adminPhoneThirdInput = document.getElementById('adminPhoneThirdInput').value;

    const formData = new FormData();
    formData.append('adminId', document.getElementById('adminIdInput').value);
    formData.append('password', document.getElementById('adminPasswordInput').value);
    formData.append('name', document.getElementById('adminNameInput').value);
    formData.append('registrationId', adminRegisterIdFirst + '-' + adminRegisterIdSecond);
    formData.append('birth', birth);
    formData.append('gender', gender);
    formData.append('email', document.getElementById('adminEmailInput').value);
    formData.append('phone', adminPhoneFirstInput + '-' + adminPhoneSecondInput + '-' + adminPhoneThirdInput);
    formData.append('address', document.getElementById('adminRoadAddress').value);
    formData.append('center', document.getElementById('adminCenterSelect').value);
    formData.append('idPhotoLoc', document.getElementById('adminPhotoInput').files[0]);

    return formData;
    // const djo = {
    //     adminId: document.getElementById('adminIdInput').value,
    //     password: document.getElementById('adminPasswordInput').value,
    //     name: document.getElementById('adminNameInput').value,
    //     registrationId: adminRegisterIdFirst + '-' + adminRegisterIdSecond,
    //     birth: birth,
    //     gender: gender,
    //     email: document.getElementById('adminEmailInput').value,
    //     phone: adminPhoneFirstInput + '-' + adminPhoneSecondInput + '-' + adminPhoneThirdInput,
    //     address: document.getElementById('adminRoadAddress').value,
    //     center: document.getElementById('adminCenterSelect').value,
    //     idPhotoLoc: formData
    // };
};

const registrationIdValidation = function () {
    // 주민번호 입력: 자리수/숫자만 제한
    const first6 = document.getElementById('adminRegisterIdFirstInput');
    const last7  = document.getElementById('adminRegisterIdSecondInput');

    last7.onblur = () => {
        const first6Value = first6.value;
        const last7Value  = last7.value;

        const validationErrors = validateJumin(first6Value, last7Value);

        if (validationErrors.length === 0) {
            // 유효한 주민번호
            // alert('주민번호가 올바릅니다!');
            document.getElementById('colRegistrationIdError').classList.add('d-none');
        } else {
            // 오류 메시지 출력
            // alert(validationErrors.join('\n'));
            document.getElementById('colRegistrationIdError').classList.remove('d-none');
        }
    };
};

function validateJumin(first6, last7) {
    const errors = [];

    // 자리수/숫자만
    if (!/^\d{6}$/.test(first6)) {
        errors.push('앞자리(생년월일)는 6자리 숫자여야 합니다.');
    }
    if (!/^\d{7}$/.test(last7)) {
        errors.push('뒷자리(개인번호)는 7자리 숫자여야 합니다.');
    }

    // 생년월일 검사
    if (/^\d{6}$/.test(first6)) {
        const yy = parseInt(first6.substr(0, 2), 10);
        const mm = parseInt(first6.substr(2, 2), 10);
        const dd = parseInt(first6.substr(4, 2), 10);

        if (mm < 1 || mm > 12) {
            errors.push('생월(2~3번째 자리)이 올바르지 않습니다.');
        } else {
            // 연대 판단(성별코드 필요)
            if (/^\d{7}$/.test(last7)) {
                const genderCode = last7[0];
                let century;
                if ('1256'.includes(genderCode)) century = 1900;
                else if ('3478'.includes(genderCode)) century = 2000;
                else if ('90'.includes(genderCode)) century = 1800;
                else century = null;

                if (century === null) {
                    errors.push('뒷자리 첫 글자가 유효한 성별 코드가 아닙니다.');
                } else {
                    const fullYear = century + yy;
                    const date = new Date(fullYear, mm - 1, dd);
                    if (
                        date.getFullYear() !== fullYear ||
                        date.getMonth() + 1 !== mm ||
                        date.getDate() !== dd
                    ) {
                        errors.push('생년월일이 올바르지 않습니다.');
                    }
                }
            }
        }
    }

    // 성별코드 검사
    if (/^\d{7}$/.test(last7)) {
        const genderCode = last7[0];
        if (!'1234567890'.includes(genderCode)) {
            errors.push('뒷자리 첫 글자가 유효한 성별 코드가 아닙니다.');
        }
    }

    return errors;
}


const isValidBirthYYMMDD = function (str) {
    if (!/^\d{6}$/.test(str)) return false;
    const year = parseInt(str.slice(0, 2), 10);
    const month = parseInt(str.slice(2, 4), 10);
    const day = parseInt(str.slice(4, 6), 10);

    if (month < 1 || month > 12) return false;

    // 임시로 2000년 1월 1일로 연도 완성(성별코드에서 실제 연도 구분)
    const fakeYear = 2000;
    const date = new Date(fakeYear, month - 1, day);
    return (date.getMonth() + 1 === month && date.getDate() === day);
}

function getFullBirthDate(juminFirst, juminSecond) {
    if (!/^\d{6}$/.test(juminFirst) || !/^\d{7}$/.test(juminSecond)) return null;
    // 뒷자리 첫글자(성별코드)로 연대 구분
    const yy = juminFirst.slice(0, 2);
    const mm = juminFirst.slice(2, 4);
    const dd = juminFirst.slice(4, 6);
    const genderCode = juminSecond[0];

    let century;
    if (genderCode === '1' || genderCode === '2' || genderCode === '5' || genderCode === '6') {
        century = '19';
    } else if (genderCode === '3' || genderCode === '4' || genderCode === '7' || genderCode === '8') {
        century = '20';
    } else if (genderCode === '9' || genderCode === '0') {
        century = '18';
    } else {
        return null; // 성별코드 이상
    }
    const year = century + yy;
    return `${year}-${mm}-${dd}`;
}

function getGenderByJuminCode(code) {
    switch (code) {
        case '1': case '3':
            return 'M';
        case '2': case '4':
            return 'F';
    }
}

const adminRegisterAction = function () {
    const adminRegBtn = document.getElementById('adminRegBtn');
    adminRegBtn.onclick = () => {

        const adminRegRequest = adminInputValue();
        const fdObj = {};
        adminRegRequest.forEach((value, key) => {
            fdObj[key] = value;
        });
        console.log(fdObj);

        const colCenterError = document.getElementById('colCenterError');
        const colIdError = document.getElementById('colIdError');

        if (!adminRegRequest['center']) {
            // alert("소속 센터를 선택해 주세요!");
            // return;
            colCenterError.classList.remove('d-none');
        } else {
            colCenterError.classList.add('d-none');

            fetch(`/api/porter/auth/adminRegisterProcess`, {
                method: `post`,
                // headers: {
                //     'Content-Type': 'application/json'
                // },
                body: adminRegRequest
            }).then(response => response.json())
                .then(json => {
                    // if (json['result'] === false) {
                    //     colIdError.classList.remove('d-none');
                    // } else {
                    //     colIdError.classList.add('d-none');
                    //     const dtoParam = encodeURIComponent(JSON.stringify(json['result']));
                    //     location.href = `adminsRegisterSuccessPage?ExRelationDto=${dtoParam}`;
                    // }
                });
        }
    };
};



//본 예제에서는 도로명 주소 표기 방식에 대한 법령에 따라, 내려오는 데이터를 조합하여 올바른 주소를 구성하는 방법을 설명합니다.
const sample4_execDaumPostcode = function () {
    new daum.Postcode({
        oncomplete: function(data) {
            // 팝업에서 검색결과 항목을 클릭했을때 실행할 코드를 작성하는 부분.

            // 도로명 주소의 노출 규칙에 따라 주소를 표시한다.
            // 내려오는 변수가 값이 없는 경우엔 공백('')값을 가지므로, 이를 참고하여 분기 한다.
            var roadAddr = data.roadAddress; // 도로명 주소 변수
            var extraRoadAddr = ''; // 참고 항목 변수

            // 법정동명이 있을 경우 추가한다. (법정리는 제외)
            // 법정동의 경우 마지막 문자가 "동/로/가"로 끝난다.
            if(data.bname !== '' && /[동|로|가]$/g.test(data.bname)){
                extraRoadAddr += data.bname;
            }
            // 건물명이 있고, 공동주택일 경우 추가한다.
            if(data.buildingName !== '' && data.apartment === 'Y'){
                extraRoadAddr += (extraRoadAddr !== '' ? ', ' + data.buildingName : data.buildingName);
            }
            // 표시할 참고항목이 있을 경우, 괄호까지 추가한 최종 문자열을 만든다.
            if(extraRoadAddr !== ''){
                extraRoadAddr = ' (' + extraRoadAddr + ')';
            }

            // 우편번호와 주소 정보를 해당 필드에 넣는다.
            // document.getElementById('sample4_postcode').value = data.zonecode;
            document.getElementById("adminRoadAddress").value = roadAddr;
            // document.getElementById("sample4_jibunAddress").value = data.jibunAddress;

            // 참고항목 문자열이 있을 경우 해당 필드에 넣는다.
            // if(roadAddr !== ''){
            //     document.getElementById("sample4_extraAddress").value = extraRoadAddr;
            // } else {
            //     document.getElementById("sample4_extraAddress").value = '';
            // }

            // var guideTextBox = document.getElementById("guide");
            // // 사용자가 '선택 안함'을 클릭한 경우, 예상 주소라는 표시를 해준다.
            // if(data.autoRoadAddress) {
            //     var expRoadAddr = data.autoRoadAddress + extraRoadAddr;
            //     guideTextBox.innerHTML = '(예상 도로명 주소 : ' + expRoadAddr + ')';
            //     guideTextBox.style.display = 'block';
            //
            // } else if(data.autoJibunAddress) {
            //     var expJibunAddr = data.autoJibunAddress;
            //     guideTextBox.innerHTML = '(예상 지번 주소 : ' + expJibunAddr + ')';
            //     guideTextBox.style.display = 'block';
            // } else {
            //     guideTextBox.innerHTML = '';
            //     guideTextBox.style.display = 'none';
            // }
        }
    }).open();
}