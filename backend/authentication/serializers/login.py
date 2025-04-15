if email is None:
    raise exceptions.ValidationError({"message": "Email field cannot be empty. Please enter your email."})
if password is None:
    raise exceptions.ValidationError({"message": "Password field cannot be empty. Please enter your password."})
if user is None:
    raise exceptions.AuthenticationFailed({"message": "Login failed. Please check your email and password."})
