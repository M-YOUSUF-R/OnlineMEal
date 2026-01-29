## HOME PAGE
[*] Minimal home page.
[*] just a background and loging/signup btn
## USER LOGIN 
[ ] user login with their `border_no`,`reg_no`,`password`.
[ ] user will have token for accessing next time. 
[ ] those will be saved to a sheet, (access will have to the hall comitee),no forget button.
[ ] after validation, meal update could be possible.
## MEAL UPDATE
[ ] on the top there will be the time/date section , he can switch to previous days and see if his meal was on/off.
[ ] the user will have the button to on/off his meal && guest meal on/off button (total 2 button).
[ ] user will see in the next line/section about his current meal status (on/off).
[ ] then save button to finally update the status.
[ ] if once on/off , it will remain on/off till user change it in a certain day or time.
## ADMIN PAGE
[ ] a private route (if possible).
[ ] require login. (no sign up).
[ ] will have dashboard to see any user meal status, no update/delete access.
## MEAL SHEET
- a table (border_no,name,(noon,night))
- this will be printable (if hard not required)
## FRAME WORK
- python (django).
- mysql (for meal on/off status).
- mongodb atlas (for user account).
## DATABASE STRUCTURE
### MongoDB (User Management):
- Users collection:
  - _id (ObjectId)
  - border_no (unique)
  - reg_no (unique)
  - password (hashed)(4-8 character)
  - full_name
  - room_no
  - phone
  - created_at
  - last_login

### MySQL (Meal Management):
- Users table (sync with MongoDB):
  - user_id (references MongoDB _id)
  - border_no
  - reg_no
  
- Meals table:
  - meal_id (PK)
  - user_id (FK)
  - date (DATE)
  - usre_meal status (BOOLEAN)
  - guest_meal status (BOOLEAN)
  - updated_at (DATE)

## ADDITIONAL FEATURES NEEDED:
### SECURITY:
- Password hashing (bcrypt)
- JWT token refresh mechanism
- CORS configuration
### USER FEATURES:
- Meal history with search/filter
### ADMIN FEATURES:
- User management (just see no CURD)
### SYSTEM FEATURES:
- Automated daily meal (if on then for next day it will remain on vicevarsa)
