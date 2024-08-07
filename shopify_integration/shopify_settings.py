import os
from dotenv import load_dotenv

load_dotenv()

SHOPIFY_API_KEY = os.getenv('API_KEY')
SHOPIFY_API_SECRET = os.getenv('API_SECRET')
SHOPIFY_REDIRECT_URI = os.getenv('REDIRECT_URI')
SHOPIFY_SCOPE = os.getenv('SCOPE')
