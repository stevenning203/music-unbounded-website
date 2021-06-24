function RedirectToTeam()
{
	window.location.href = "https://musicunbounded.org/join-us";
}

function ShowLoading()
{
    var text = document.getElementById("registration_loading_text");
    text.style.display = "block";
}

function HideLoading()
{
    var text = document.getElementById("registration_loading_text");
    text.style.display = "none";
}

function Redirect()
{
	window.location.href = "https://musicunbounded.org/thank-you";
	HideLoading();
}

function Void()
{
	
}


function GetThankYou(piano) {
	var response = "Thank you so much for registering with us! We will be in touch within two weeks!";
	response += "<br><br>";
	response += "This is an automated email which is not monitored. Do not reply to this email. If you have any questions or concerns, please email us at info@musicunbounded.org";
	if (piano == true)
	{
		response += " Because you registered as a piano student, we must inform you that we have a high volume of piano students which means that you may not be able to be assigned a teacher at all. If you would like to register for another instrument, please register through the form on the website again.";
	}
	return response
}


function FormDataToBody(form_data) {
	let body = ""
	let entries = {
		"parent_name": "Guardian Name",
		"student_name": "Student Name",
		"email": "Email",
		"number": "Number",
		"method": "Preferred method for contact",
		"platform": "Platform",
		"instrument": "Instrument",
		"where": "Where they found us",
		"lesson_times": "Statement about lesson times"
	}

    for (let key in form_data) {
    	let info = form_data[key]

    	if (info == '') {
    		info = "N/A"
    	}

    	body += entries[key] + ": <b>" + info + "</b><br>" 
    }

    return body
}


function Register(body, date, receiver, piano)
{
	// Info email to music unbounded email.
    Email.send(
    {
        SecureToken: "37a95e7b-7fdd-4c23-8164-65168edc77f4",
        To: "register@musicunbounded.org",
        From: "noreplymusicunbounded@gmail.com",
        Subject: "Automatic Registration On: " + date,
        Body: body,
    }).then(message => Void());

    // Thank you email to registeree.
	Email.send(
	{
		SecureToken: "37a95e7b-7fdd-4c23-8164-65168edc77f4",
        To: receiver,
        From: "noreplymusicunbounded@gmail.com",
        Subject: "Thank you for registering with us! On: " + date,
        Body: GetThankYou(piano),
	}).then(message => Redirect());
}


function GetPrefPhone() {
	return document.getElementById("registration_phone_preferred_checkbox").checked == true
}


function GetFormData() {
	let parent_name, student_name, email, number, method, platform, instrument, where, lesson_times;
	parent_name = document.getElementById('registration_parent_name_field').value;
    student_name = document.getElementById('registration_student_name_field').value;
    email = document.getElementById('registration_email_field').value;
	number = document.getElementById('registration_phone_number_field').value;
    platform = document.getElementById('registration_platform_field').value;
    instrument = document.getElementById("registration_form_insturment_drop_down").value;
    where = document.getElementById("registration_form_where_drop_down").value;
    lesson_times = document.getElementById('registration_lesson_times_field').value;

    method = "Email"
    if (GetPrefPhone()) {
    	method = "Phone"
    }

    return {
    	parent_name, 
    	student_name,
    	email,
    	number,
    	method,
    	platform,
    	instrument,
    	where,
    	lesson_times
    }
}


function ClearFormInputs() {
	document.getElementById('registration_parent_name_field').value = '';
    document.getElementById('registration_student_name_field').value = '';
    document.getElementById('registration_email_field').value = '';
    document.getElementById('registration_platform_field').value = '';
    document.getElementById("registration_form_insturment_drop_down").value = '';
    document.getElementById("registration_form_where_drop_down").value = '';
    document.getElementById('registration_lesson_times_field').value = '';
	document.getElementById('registration_phone_number_field').value = '';
}


function IsMandatoryFilled(data) {
	const mandatory = [
		"parent_name",
		"student_name",
		"email",
		"platform",
		"instrument",
		"where",
		"lesson_times"
	]

	let isGood = true;
	for (let item of mandatory) {
		isGood = isGood && data[item] != ''
	}
	
	return isGood
}


function GetToday() {
	var today = new Date();
    var day = String(today.getDate()).padStart(2, '0');
    var month = String(today.getMonth() + 1).padStart(2, '0');
    var date = month + '/' + day + '/' + today.getFullYear();
    return date
}


function SendEmail()
{
    ShowLoading();

    let form_data = GetFormData();
    console.log(form_data)

    if (!IsMandatoryFilled(form_data))
    {
        alert("Please fill out all the required fields");
        HideLoading();
        return;
    }

    let body = FormDataToBody(form_data)
    let date = GetToday()

    Register(body, date, form_data.email, form_data.instrument == "piano");
    ClearFormInputs();
}
