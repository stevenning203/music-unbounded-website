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
}

function Register(body, date)
{
    Email.send(
    {
        SecureToken: "37a95e7b-7fdd-4c23-8164-65168edc77f4",
        To: "register@musicunbounded.org",
        From: "noreplymusicunbounded@gmail.com",
        Subject: "Automatic Registration On: " + date,
        Body: body,
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
    var month = String(today.getMonth()).padStart(2, '0');
    var date = month + '/' + day + '/' + today.getFullYear();
    Register(body, date);
    HideLoading();
    document.getElementById('registration_parent_name_field').value = '';
    document.getElementById('registration_student_name_field').value = '';
    document.getElementById('registration_email_field').value = '';
    document.getElementById('registration_platform_field').value = '';
    document.getElementById("registration_form_insturment_drop_down").value = '';
    document.getElementById("registration_form_where_drop_down").value = '';
    document.getElementById('registration_lesson_times_field').value = '';
	document.getElementById('registration_phone_number_field').value = '';
}
