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
 

---

## Automated Testing with Jest

This project includes an **end-to-end (E2E) test suite** written using Jest and Supertest to validate the functionality of the College Appointment System (CAS) backend. The tests simulate real-world scenarios, ensuring the API works as expected for all critical operations, including authentication, availability management, appointment booking, and cancellation.

### Test Scenarios

The Jest file covers the following use cases:

1. **User Authentication**:
   - Student A1 and Student A2 authenticate to access the system.
   - Professor P1 authenticates to access the system.

2. **Availability Management**:
   - Professor P1 specifies the time slots they are available for appointments.
   - Students view the available time slots for a professor.

3. **Appointment Booking**:
   - Student A1 books an appointment with Professor P1 for a specific time slot (T1).
   - Student A2 books an appointment with Professor P1 for another time slot (T2).

4. **Appointment Cancellation**:
   - Professor P1 cancels the appointment with Student A1.

5. **Appointment History**:
   - Student A1 checks their appointments and realizes they have no pending appointments.

### Running the Tests

To run the test suite, ensure the application is properly set up with the required database and environment variables. Then, execute the following command:

```bash
npm test
```

### Key Points

- **Tools Used**: Jest is used for testing, and Supertest is used for making HTTP assertions.
- **Database Reset**: The test file ensures a clean state by deleting previous data from the `appointments` and `availability` tables before running the tests.
- **JWT Authentication**: Tokens are dynamically generated and used to validate user roles (students and professors) for the API endpoints.
- **Validation**: Each endpoint is tested for correct responses and error handling under various scenarios.

By running these automated tests, you can confidently verify that the system behaves as expected in all critical workflows. 


## Contributing

Contributions are welcome! Please fork the repository, create a new branch, and submit a pull request with your proposed changes.
