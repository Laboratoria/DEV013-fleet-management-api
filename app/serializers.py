def taxis_serializer(tuples_taxis):
    return [{"id": taxi[0], "plate": taxi[1]} for taxi in tuples_taxis]