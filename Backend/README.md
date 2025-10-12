# Backend API Documentation

## Setup

1. Install dependencies:
```bash
npm install
```

2. Configure environment variables:
   - Copy `.env.example` to `.env`
   - Update the values:
     - `MONGO_URI`: Your MongoDB connection string
     - `ADMIN_EMAILS`: Admin email addresses separated by `||`
     - `ADMIN_PASSWORDS`: Admin passwords separated by `||`

3. Start the server:
```bash
npm start
# or
node server.js
```

## Admin Configuration

### Multiple Admins
The system supports multiple admin accounts. Configure them in the `.env` file:

```env
# Format: email1||email2||email3
ADMIN_EMAILS=admin1@ccpc.com||admin2@ccpc.com||admin3@ccpc.com

# Format: password1||password2||password3
ADMIN_PASSWORDS=password1||password2||password3
```

**Important:** 
- Emails and passwords are matched by their position (index)
- `admin1@ccpc.com` pairs with `password1`
- `admin2@ccpc.com` pairs with `password2`
- `admin3@ccpc.com` pairs with `password3`

### Example:
```env
ADMIN_EMAILS=john@ccpc.com||jane@ccpc.com||bob@ccpc.com
ADMIN_PASSWORDS=john123||jane456||bob789
```

## API Endpoints

### Admin Routes

#### POST `/api/admin/login`
Admin login endpoint.

**Request:**
```json
{
  "email": "admin1@ccpc.com",
  "password": "admin123"
}
```

**Response (Success):**
```json
{
  "success": true,
  "token": "base64_encoded_token",
  "email": "admin1@ccpc.com",
  "message": "Login successful"
}
```

**Response (Failure):**
```json
{
  "success": false,
  "message": "Invalid credentials"
}
```

### User Routes

#### POST `/api/register`
Register a new user.

#### GET `/api/users`
Get all registered users.

#### PUT `/api/users/:id/status`
Update user active/inactive status.

#### POST `/api/users/:id/task`
Assign a task to a user.

#### PUT `/api/users/:id/updateTasks`
Update all tasks for a user.

## Security Notes

⚠️ **IMPORTANT FOR PRODUCTION:**
1. Change default admin passwords immediately
2. Use strong, unique passwords for each admin
3. Consider implementing JWT tokens instead of simple base64 tokens
4. Add rate limiting to prevent brute force attacks
5. Use HTTPS in production
6. Never commit `.env` file to git
