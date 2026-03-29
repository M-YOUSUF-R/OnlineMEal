from django.shortcuts import render
from django.db import connections
from django.db.utils import OperationalError

# Create your views here.
def home(req):
    db_conn = connections['default']
    db_type = db_conn.vendor
    db_status = "Connected"
    
    try:
        db_conn.ensure_connection()
    except OperationalError:
        db_status = "Disconnected (Using fallback or local)"
    
    context = {
        'db_type': db_type.upper(),
        'db_status': db_status,
        'db_name': db_conn.settings_dict['NAME']
    }
    return render(req, template_name='home/index.html', context=context)
