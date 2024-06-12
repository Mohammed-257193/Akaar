// �������� �������
var captchaData = [
    { src: "captcha1.jpg", solution: "226md" },
    { src: "captcha2.jpg", solution: "22d5n" },
    { src: "captcha3.jpg", solution: "2356g" },
    { src: "captcha4.jpg", solution: "25m6p" },
    { src: "captcha5.jpg", solution: "25257" }
];
var currentCaptcha = null;
var selectedProperty = {};



function toggleSelection(button, city, description, rent) {
    var selectedRow = button.parentNode.parentNode;
    selectedRow.classList.toggle("selected-row");

    var continueButton = document.getElementById('continueButton');
    var anySelected = document.querySelector(".selected-row");

    if (anySelected) {
        continueButton.style.display = "inline-block";
        selectedProperty = { city: city, description: description, rent: rent };
    } else {
        continueButton.style.display = "none";
        selectedProperty = {};
    }
}

function showRequestForm() {
    document.getElementById("requestForm").style.display = "block";
    loadRandomCaptcha();
}

function cancelRequest() {
    document.getElementById("form").reset(); // ����� ����� �������
    document.getElementById("requestForm").style.display = "none"; // ����� �������
}

function loadRandomCaptcha() {
    var randomIndex = Math.floor(Math.random() * captchaData.length);
    currentCaptcha = captchaData[randomIndex];
    var captchaImage = document.getElementById("captchaImage");

    captchaImage.src = currentCaptcha.src;

    captchaImage.onerror = function () {
        console.error("Failed to load captcha image");
        document.getElementById("error-message").textContent = "��� ����� ���� ��������. ���� �������� ��� ����.";
    };
}

function validateForm() {
    var fullName = document.getElementById("fullName").value;
    var nationalID = document.getElementById("nationalID").value;
    var birthDate = document.getElementById("birthDate").value;
    var mobileNumber = document.getElementById("mobileNumber").value;
    var email = document.getElementById("email").value;
    var captcha = document.getElementById("captcha").value;
    var errorMessage = document.getElementById("error-message");

    // ���� �� ����� ������
    if (fullName && !/^[\u0621-\u064A\s]+$/.test(fullName)) {
        errorMessage.textContent = "���� ����� ���� ����� ��� �� ��� ����� ������.";
        return false;
    }

    // ���� �� ����� ������
    if (nationalID && !/^\d{11}$/.test(nationalID)) {
        errorMessage.textContent = "���� ����� 11 ����� �� ��� ����� ������.";
        return false;
    }

    // ���� �� ��� ������ �������
    if (mobileNumber && !/^09[3-9]\d{7}|094\d{7}$/.test(mobileNumber)) {
        errorMessage.textContent = "���� ����� ��� ���� ���� ������ Syriatel � MTN.";
        return false;
    }

    // ���� �� ��� ������ ����������
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        errorMessage.textContent = "���� ����� ���� �������� ����.";
        return false;
    }

    // ���� �� ��� ��������
    if (!captcha || captcha !== currentCaptcha.solution) {
        errorMessage.textContent = "Invalid captcha.";
        return false;
    }

    // ��� �� ���� ������ ���� ����� �������
    errorMessage.textContent = "";

    // ����� ����� ��� ��������
    document.getElementById("requestForm").style.display = "none";

    // ��� ����� ������
    alert("Will the request be sent?");

    // ����� ������ ������ �������
    showPropertyDetails();

    return false;
}


function showPropertyDetails() {
    var propertyDetails = document.getElementById("propertyDetails");
    document.getElementById("propertyCity").textContent = "City: " + selectedProperty.city;
    document.getElementById("propertyDescription").textContent = "Details: " + selectedProperty.description;
    document.getElementById("propertyRent").textContent = "Amount to be paid:" + selectedProperty.rent;
    propertyDetails.style.display = "block";
}
