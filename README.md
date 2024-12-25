# College Appointment System (CAS) - Backend

The College Appointment System (CAS) backend is designed to manage and streamline the scheduling of appointments within a college environment. This backend API serves as the foundation for secure and efficient appointment management between students, faculty, and administrative staff.

## Features

- **Appointment Scheduling**: Enables users to book, reschedule, or cancel appointments.
- **User Authentication**: Provides secure login and access controls for students, faculty, and administrators.
- **Role-Based Access Control**: Ensures different functionalities are available based on user roles.
- **Appointment History**: Maintains a log of past appointments for reference.

## Technologies Used

- **Backend**: Node.js with Express.js
- **Database**: PostgreSQL
- **Authentication**: JSON Web Tokens (JWT)

## Environment Variables

The backend requires the following environment variables, which should be stored in a `.env` file:

```
JWT_SECRET=my_secret_key
JWT_EXPIRATION=1d
```

## Installation

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/just-vedant/CAS.git
   cd CAS
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Set Up Environment Variables**:
   - Create a `.env` file in the root directory.
   - Add the environment variables listed above.

4. **Run the Application**:
   ```bash
   npm start
   ```

5. **Access the API**:
   The API will run on `http://localhost:3000`.

## API Endpoints

### **Authentication**
- `POST /register`: Register a new user (student or professor).
- `POST /login`: Log in an existing user to obtain an authentication token.

### **Availability**
- `POST /add-availability`:
  - **Description**: Allows professors to specify their availability for appointments.
  - **Access**: Requires professor authentication (`profToken`).
- `GET /update-availability/:slotId`:
  - **Description**: Allows professors to update their availability for a specific slot.
  - **Access**: Requires professor authentication (`profToken`).
- `GET /check-availability/:professorId`:
  - **Description**: Allows students to view the available slots for a specific professor.

### **Appointments**
- `POST /book`:
  - **Description**: Students can book an appointment with a professor.
  - **Access**: Requires student authentication (`studToken`).
- `GET /check-appointment`:
  - **Description**: Students can view their scheduled appointments.
  - **Access**: Requires student authentication (`studToken`).
- `GET /professor-appointments`:
  - **Description**: Professors can view all their scheduled appointments.
  - **Access**: Requires professor authentication (`profToken`).
- `DELETE /cancel`:
  - **Description**: Professors can cancel an appointment.
  - **Access**: Requires professor authentication (`profToken`).

## Contributing

Contributions are welcome! Please fork the repository, create a new branch, and submit a pull request with your proposed changes.
