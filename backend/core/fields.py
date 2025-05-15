from typing import Any, List, Type, Union
from rest_framework import serializers

class MultiTypeField(serializers.Field):
    def __init__(self, types: List[Union[Type, serializers.Field]], **kwargs: Any) -> None:
        super().__init__(**kwargs)
        self.types = types
        self.typ: Union[Type, serializers.Field, None] = None

    def to_internal_value(self, data: Any) -> Any:
        ...
    
    def to_representation(self, value: Any) -> Any:
        ...
class MultiTypeField(serializers.Field):
    def __init__(self, types, **kwargs):
        super().__init__(**kwargs)
        self.types = types
        self.typ = None

    def to_internal_value(self, data):
        for typ in self.types:
            # print({'to_internal_value':data, 'type':type(data),'typ':typ})
            try:
                if isinstance(typ, serializers.Field):
                    value = typ.run_validation(data)
                    self.typ = typ
                    # print({'self.typ':self.typ, 'value':value})
                    return value
                return typ(data)
            except (ValueError, TypeError, serializers.ValidationError) as e:
                # print({'typ':typ, 'error':e})
                pass
        raise serializers.ValidationError('Invalid data, failed to match any of the provided types')

    def to_representation(self, value):
        # print({'to_representation':value, 'type':type(value),'typ':self.typ})
        if self.typ is None:
            return repr(value)
        return self.typ.to_representation(value)
