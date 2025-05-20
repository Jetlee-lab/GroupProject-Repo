from django.db import models
from .department import Department

class Course(models.Model):
    LEVEL_CERTIFICATE = 'certificate'
    LEVEL_DIPLOMA = 'diploma'
    LEVEL_UNDERGRADUATE = 'undergraduate'
    LEVEL_POSTGRADUATE = 'postgraduate'
    LEVEL_CHOICES = {
        LEVEL_UNDERGRADUATE: 'Undergraduate',
        LEVEL_POSTGRADUATE: 'Postgraduate',
        LEVEL_DIPLOMA: 'Diploma',
        LEVEL_CERTIFICATE: 'Certificate',
    }
    name = models.CharField(max_length=128, unique=True)
    code = models.CharField(max_length=32, unique=True)
    description = models.CharField(max_length=1024, blank=False, default='')

    department = models.ForeignKey(Department,
        related_name='courses',
        on_delete=models.CASCADE
    )
    duration = models.IntegerField(default=0)  # Duration in weeks
    credits = models.IntegerField(default=0)  # Credits for the course
    level = models.CharField(max_length=32, choices=LEVEL_CHOICES.items(), default=LEVEL_UNDERGRADUATE)
    # programme = models.CharField(max_length=128, blank=False, default='')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(null=True)

    def __str__(self):
        return "%s" % self.name

    class Meta:
        ordering = ['name']
        verbose_name = 'Course'
        verbose_name_plural = 'Courses'
        unique_together = ('name', 'code')
        # indexes = [
        #     models.Index(fields=['name']),
        #     models.Index(fields=['code']),
        # ]

class CourseUnit(models.Model):
    course = models.ForeignKey(Course,
        related_name='units',
        on_delete=models.CASCADE
    )
    name = models.CharField(max_length=128)
    # code = models.CharField(max_length=32, unique=True)
    description = models.CharField(max_length=1024, blank=False, default='')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(null=True)

    def __str__(self):
        return "%s" % self.name

    class Meta:
        ordering = ['name']
        verbose_name = 'Course Unit'
        verbose_name_plural = 'Course Units'
        # unique_together = ('course', 'code')
