from ..models import Course, CourseUnit
from rest_framework import serializers

class CourseUnitSerializer(serializers.ModelSerializer):
    class Meta:
        model = CourseUnit
        fields = '__all__'
        read_only_field = ["id"]

class CourseSerializer(serializers.ModelSerializer):
    # units = CourseUnitSerializer(many=True, required=False)

    class Meta:
        model = Course
        fields = '__all__'
        read_only_field = ["id"]
    
    # def update(self, instance, validated_data):
    #     units_data = validated_data.pop('units', None)
    #     # if (units_data := validated_data.pop('units', None)) is not None:
    #     #     # instance.units.set(map(lambda u: u, units_data))
    #     instance = super().update(instance, validated_data)

    #     if units_data is not None:
    #         print("___________________________", units_data)
    #         # Remove all existing units and add new ones
    #         instance.units.all().delete()
    #         for unit_data in units_data:
    #             unit, created = CourseUnit.objects.get_or_create(**unit_data)
    #             instance.units.add(unit)
    #     return instance

