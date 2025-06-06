# Generated by Django 5.1.6 on 2025-05-17 13:54

import core.models.issue
import core.models.user
import django.contrib.auth.validators
import django.db.models.deletion
import django.utils.timezone
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('auth', '0012_alter_user_first_name_max_length'),
    ]

    operations = [
        migrations.CreateModel(
            name='User',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('password', models.CharField(max_length=128, verbose_name='password')),
                ('last_login', models.DateTimeField(blank=True, null=True, verbose_name='last login')),
                ('is_superuser', models.BooleanField(default=False, help_text='Designates that this user has all permissions without explicitly assigning them.', verbose_name='superuser status')),
                ('username', models.CharField(error_messages={'unique': 'A user with that username already exists.'}, help_text='Required. 150 characters or fewer. Letters, digits and @/./+/-/_ only.', max_length=150, unique=True, validators=[django.contrib.auth.validators.UnicodeUsernameValidator()], verbose_name='username')),
                ('first_name', models.CharField(blank=True, max_length=150, verbose_name='first name')),
                ('last_name', models.CharField(blank=True, max_length=150, verbose_name='last name')),
                ('is_staff', models.BooleanField(default=False, help_text='Designates whether the user can log into this admin site.', verbose_name='staff status')),
                ('is_active', models.BooleanField(default=True, help_text='Designates whether this user should be treated as active. Unselect this instead of deleting accounts.', verbose_name='active')),
                ('date_joined', models.DateTimeField(default=django.utils.timezone.now, verbose_name='date joined')),
                ('email', models.EmailField(db_index=True, max_length=254, unique=True, verbose_name='email address')),
                ('updated_at', models.DateTimeField(null=True)),
                ('groups', models.ManyToManyField(blank=True, help_text='The groups this user belongs to. A user will get all permissions granted to each of their groups.', related_name='user_set', related_query_name='user', to='auth.group', verbose_name='groups')),
                ('user_permissions', models.ManyToManyField(blank=True, help_text='Specific permissions for this user.', related_name='user_set', related_query_name='user', to='auth.permission', verbose_name='user permissions')),
            ],
            options={
                'verbose_name': 'user',
                'verbose_name_plural': 'users',
                'abstract': False,
            },
            managers=[
                ('objects', core.models.user.UserManager()),
            ],
        ),
        migrations.CreateModel(
            name='Category',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=32, unique=True)),
                ('description', models.CharField(max_length=256)),
            ],
        ),
        migrations.CreateModel(
            name='Course',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=128, unique=True)),
                ('code', models.CharField(max_length=32, unique=True)),
                ('description', models.CharField(default='', max_length=1024)),
                ('duration', models.IntegerField(default=0)),
                ('credits', models.IntegerField(default=0)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(null=True)),
            ],
            options={
                'verbose_name': 'Course',
                'verbose_name_plural': 'Courses',
                'ordering': ['name'],
            },
        ),
        migrations.CreateModel(
            name='Department',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=128, unique=True)),
                ('description', models.CharField(default='', max_length=256)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(null=True)),
            ],
        ),
        migrations.CreateModel(
            name='Faculty',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=128, unique=True)),
                ('description', models.CharField(default='', max_length=256)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
            ],
        ),
        migrations.CreateModel(
            name='Student',
            fields=[
                ('user_ptr', models.OneToOneField(auto_created=True, on_delete=django.db.models.deletion.CASCADE, parent_link=True, primary_key=True, serialize=False, to=settings.AUTH_USER_MODEL)),
                ('student_no', models.CharField(max_length=32)),
            ],
            options={
                'verbose_name': 'user',
                'verbose_name_plural': 'users',
                'abstract': False,
            },
            bases=('core.user',),
            managers=[
                ('objects', core.models.user.UserManager()),
            ],
        ),
        migrations.CreateModel(
            name='CourseUnit',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=128)),
                ('code', models.CharField(max_length=32, unique=True)),
                ('description', models.CharField(default='', max_length=1024)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(null=True)),
                ('course', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='units', to='core.course')),
            ],
            options={
                'verbose_name': 'Course Unit',
                'verbose_name_plural': 'Course Units',
                'ordering': ['name'],
                'unique_together': {('course', 'code')},
            },
        ),
        migrations.AddField(
            model_name='course',
            name='department',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='courses', to='core.department'),
        ),
        migrations.AddField(
            model_name='department',
            name='faculty',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='departments', to='core.faculty'),
        ),
        migrations.CreateModel(
            name='Issue',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=128)),
                ('description', models.CharField(max_length=256, null=True)),
                ('status', models.PositiveSmallIntegerField(choices=[(1, 'pending'), (2, 'in_review'), (4, 'escalated'), (8, 'resolved'), (16, 'rejected'), (32, 'closed')], default=1)),
                ('priority', models.PositiveSmallIntegerField(choices=[(1, 'low'), (2, 'moderate'), (4, 'high'), (8, 'critical')], default=1)),
                ('escalation_level', models.PositiveSmallIntegerField(choices=[(1, 'level_0'), (2, 'level_1'), (4, 'level_2')], default=1)),
                ('notes', models.TextField(blank=True, default=None, max_length=4096, null=True)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(null=True)),
                ('categories', models.ManyToManyField(to='core.category')),
                ('course_unit', models.ForeignKey(on_delete=django.db.models.deletion.RESTRICT, related_name='issues', to='core.courseunit')),
            ],
            options={
                'ordering': ('-created_at',),
            },
        ),
        migrations.CreateModel(
            name='Attachment',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('file', models.FileField(max_length=256, storage=core.models.issue.get_attachment_storage, unique=True, upload_to=core.models.issue.get_attachment_path)),
                ('name', models.CharField(editable=False, max_length=1024)),
                ('size', models.PositiveBigIntegerField()),
                ('type', models.CharField(max_length=128)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('issue', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='attachments', to='core.issue')),
            ],
        ),
        migrations.CreateModel(
            name='Role',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(choices=[('student', 'Student'), ('lecturer', 'Lecturer'), ('registrar', 'Registrar'), ('administrator', 'Administrator')], max_length=64, unique=True)),
                ('description', models.CharField(default='', max_length=256)),
                ('permissions', models.ManyToManyField(blank=True, to='auth.permission')),
            ],
        ),
        migrations.CreateModel(
            name='ReferenceToken',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('email', models.EmailField(db_index=True, max_length=254, unique=True, verbose_name='email address')),
                ('token', models.UUIDField(editable=False, unique=True)),
                ('is_used', models.BooleanField(default=False)),
                ('active', models.BooleanField(default=True)),
                ('role', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='core.role')),
            ],
        ),
        migrations.AddField(
            model_name='user',
            name='roles',
            field=models.ManyToManyField(blank=True, related_name='users', to='core.role'),
        ),
        migrations.CreateModel(
            name='Staff',
            fields=[
                ('user_ptr', models.OneToOneField(auto_created=True, on_delete=django.db.models.deletion.CASCADE, parent_link=True, primary_key=True, serialize=False, to=settings.AUTH_USER_MODEL)),
                ('courses', models.ManyToManyField(related_name='staff', to='core.course')),
                ('departments', models.ManyToManyField(related_name='staff', to='core.department')),
            ],
            options={
                'verbose_name': 'user',
                'verbose_name_plural': 'users',
                'abstract': False,
            },
            bases=('core.user',),
            managers=[
                ('objects', core.models.user.UserManager()),
            ],
        ),
        migrations.CreateModel(
            name='IssueLog',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('status', models.PositiveSmallIntegerField(choices=[(1, 'pending'), (2, 'in_review'), (4, 'escalated'), (8, 'resolved'), (16, 'rejected'), (32, 'closed')], default=1)),
                ('priority', models.PositiveSmallIntegerField(choices=[(1, 'low'), (2, 'moderate'), (4, 'high'), (8, 'critical')], default=1)),
                ('escalation_level', models.PositiveSmallIntegerField(choices=[(1, 'level_0'), (2, 'level_1'), (4, 'level_2')], default=1)),
                ('attachments', models.JSONField(null=True)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('actor', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='+', to=settings.AUTH_USER_MODEL)),
                ('categories', models.ManyToManyField(related_name='+', to='core.category')),
                ('issue', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='logs', to='core.issue')),
                ('assignee', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='+', to='core.staff')),
            ],
        ),
        migrations.AddField(
            model_name='issue',
            name='assignee',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='assigned_issues', to='core.staff'),
        ),
        migrations.AddField(
            model_name='issue',
            name='owner',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='issues', to='core.student'),
        ),
        migrations.AlterUniqueTogether(
            name='course',
            unique_together={('name', 'code')},
        ),
    ]
