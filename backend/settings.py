from datetime import timedelta

SIMPLE_JWT = {
    'ACCESS_TOKEN_LIFETIME': timedelta(minutes=15),  # Adjust access token lifetime
    'REFRESH_TOKEN_LIFETIME': timedelta(days=12),     # Adjust refresh token lifetimekk
}
