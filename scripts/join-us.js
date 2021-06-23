function ModalOpen()
{
	var modal = document.getElementById("teacher_guidelines_modal");
	modal.style.display = "block";
	
}

function ModalClose()
{
	var modal = document.getElementById("teacher_guidelines_modal");
	modal.style.display = "none";
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
        Subject: "Teacher Application On: " + date,
        Body: body,
    }).then(message => Redirect());
}

function Apply()
{
	if (document.getElementById('application_checkbox').checked == false)
	{
		alert("You did not accept the Teacher Guidelines. Please read the teacher guidelines and check the box.");
		return;
	}
    teacher_name = document.getElementById('application_teacher_name_field').value;
	age = document.getElementById('application_teacher_age_field').value;
    email = document.getElementById('application_email_field').value;
    instrument = document.getElementById("application_form_insturment_drop_down").value;
    where = document.getElementById("application_form_where_drop_down").value;
    paragraph = document.getElementById('application_why_field').value;
    if (teacher_name == '' || email == '' || instrument == '' || where == '' || paragraph == '')
    {
        alert("Please fill out all the required fields");
        return;
    }
    var body = "Teacher Name: " + teacher_name + '<br><br>';
	body += "Age: " + age + '<br><br>';
    body += "Email: " + email + '<br><br>';
    body += "Instrument: " + instrument + '<br><br>';
    body += "Found out about us from: " + where + '<br><br>';
    body += "Statement about why they would like to join us: " + '<br><br>';
    body += paragraph;

    var today = new Date();
    var day = String(today.getDate()).padStart(2, '0');
    var month = String(today.getMonth() + 1).padStart(2, '0');
    var date = month + '/' + day + '/' + today.getFullYear();
    Register(body, date);
    document.getElementById('application_teacher_name_field').value = '';
    document.getElementById('application_email_field').value = '';
    document.getElementById("application_form_insturment_drop_down").value = '';
    document.getElementById("application_form_where_drop_down").value = '';
    document.getElementById('application_why_field').value = '';
}
