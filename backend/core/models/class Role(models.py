class Role(models.Model):
    """
    Example: Admin <- Lecturer <- Student

    Lecturer.base_role = Student
    Admin.base_role = Lecturer
    """
    ROLE_STUDENT = 'student'
    ROLE_LECTURER = 'lecturer'
    ROLE_REGISTRAR = 'registrar'
    ROLE_ADMINISTRATOR = 'administrator'
    ROLE_CHOICES = {
        ROLE_STUDENT: 'Student',
        ROLE_LECTURER: 'Lecturer',
        ROLE_REGISTRAR: 'Registrar',
        ROLE_ADMINISTRATOR: 'Administrator',
    }
