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

function Register(body, date, receiver, piano)
{
    Email.send(
    {
        SecureToken: "37a95e7b-7fdd-4c23-8164-65168edc77f4",
        To: "register@musicunbounded.org",
        From: "noreplymusicunbounded@gmail.com",
        Subject: "Automatic Registration On: " + date,
        Body: body,
    }).then(message => Void());
	var response = "Thank you so much for registering with us! We will be in touch within two weeks!";
	response += "<br><br>";
	response += "This is an automated email which is not monitored. Do not reply to this email. If you have any questions or concerns, please email us at info@musicunbounded.org";
	if (piano == true)
	{
		response += " Because you registered as a piano student, we must inform you that we have a high volume of piano students which means that you may not be able to be assigned a teacher at all. If you would like to register for another instrument, please register through the form on the website again.";
	}
	Email.send(
	{
		SecureToken: "37a95e7b-7fdd-4c23-8164-65168edc77f4",
        To: receiver,
        From: "noreplymusicunbounded@gmail.com",
        Subject: "Thank you for registering with us! On: " + date,
        Body: response,
	}).then(message => Redirect());
}

function SendEmail()
{
    ShowLoading();
    parent_name = document.getElementById('registration_parent_name_field').value;
    student_name = document.getElementById('registration_student_name_field').value;
    email = document.getElementById('registration_email_field').value;
	number = document.getElementById('registration_phone_number_field').value;
    platform = document.getElementById('registration_platform_field').value;
    instrument = document.getElementById("registration_form_insturment_drop_down").value;
    where = document.getElementById("registration_form_where_drop_down").value;
    lesson_times = document.getElementById('registration_lesson_times_field').value;
    if (parent_name == '' || student_name == '' || email == '' || platform == '' || instrument == '' || where == '' || lesson_times == '')
    {
        alert("Please fill out all the required fields");
        HideLoading();
        return;
    }
    var body = "Guardian Name: " + parent_name + '<br><br>';
    body += "Student Name: " + student_name + '<br><br>';
    body += "Email: " + email + '<br><br>';
	if (number == '')
	{
		body += "Phone number was not provided.<br><br>";
	}
	else
	{
		body += "Phone Number: " + number + '<br><br>';
	}
	if (document.getElementById("registration_phone_preferred_checkbox").checked == true)
	{
		body += "Registeree would prefer to be contacted by phone.";
	}
	else
	{
		body += "Registeree would prefer to be contacted by email.";
	}
	body += '<br><br>';
    body += "Platform: " + platform + '<br><br>';
    body += "Instrument: " + instrument + '<br><br>';
    body += "Found out about us from: " + where + '<br><br>';
    body += "Statement about lesson times: " + '<br><br>';
    body += lesson_times;

    var today = new Date();
    var day = String(today.getDate()).padStart(2, '0');
    var month = String(today.getMonth() + 1).padStart(2, '0');
    var date = month + '/' + day + '/' + today.getFullYear();
	var piano = false;
	if (instrument == "piano")
	{
		piano = true;
	}
    Register(body, date, email, piano);
    document.getElementById('registration_parent_name_field').value = '';
    document.getElementById('registration_student_name_field').value = '';
    document.getElementById('registration_email_field').value = '';
    document.getElementById('registration_platform_field').value = '';
    document.getElementById("registration_form_insturment_drop_down").value = '';
    document.getElementById("registration_form_where_drop_down").value = '';
    document.getElementById('registration_lesson_times_field').value = '';
	document.getElementById('registration_phone_number_field').value = '';
}
