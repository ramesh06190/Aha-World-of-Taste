function validation(values) {
    let error = {}
    //const email_pattern = /^[^\s@]+@[^\s@]+\. [^\s@]+$/
    //const password_pattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9]{8,}$/;
    const email_pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const password_pattern = /(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/;
    const phoneNumber_pattern = /^\d{10}$/;

    if (values.name === "") {
        error.name = "Name should not be empty"
    }
    else {
        error.name = ""
    }

    if (values.email === "") {
        error.email = "Email should not be empty"
    }
    else if(!email_pattern.test(values.email)) {
        error.email = "Email Didn't match"
    }
    else {
        error.email = ""
    }

    if (values.password === "") {
        error.password = "Password should not be empty"
    }
    else if(!password_pattern.test(values.password)) {
        error.password = "Password didn't match"
    }else {
        error.password = ""
    }

    if (values.phone === "") {
        error.phone = "Phone Number should not be empty"
    }
    else if(!phoneNumber_pattern.test(values.phone)) {
        error.phone = "Phone Didn't match"
    }
    else {
        error.phone = ""
    }
    return error;
}

export default validation;