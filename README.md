# stock-screener
A web-based stock screener application that allows users to analyze stocks based on various criteria

First run for both frontend and backend to install all the dependencies ( npm install --legacy-peer-deps  ).

**Project Documentation**

**1. Registration Page:**

The registration page serves as the initial step for users to create an account within the system. Users are required to input their name, email, and password to proceed with registration. 

- **Name**: Users provide their full name in this field. It helps personalize their account and interactions within the system.
  
- **Email**: This field requires users to input a valid email address. Email serves as a unique identifier for each user and is crucial for account verification and communication purposes.
  
- **Password**: Users must create a password that meets security requirements. The password is used for authentication and ensures account security.

Upon successful registration, users' information is stored securely within the system, allowing them access to various features and functionalities.

**2. Login Page:**

The login page provides users with access to their accounts, requiring them to input their registered email and password.

- **Email**: Users enter the email address they used during registration.
  
- **Password**: Users input the password associated with their account.

Authentication is performed to verify the provided credentials against the stored user data. Upon successful authentication, users gain access to the system's features and personalized content.

**3. Home Page:**

The home page serves as the central hub where users can access essential features and information. It leverages the AlphaVantage Quote Endpoint API to provide real-time data to users.

- **AlphaVantage Quote Endpoint API**: This API is integrated into the home page to fetch and display real-time financial data. Users can access up-to-date information on stocks, currencies, and other financial instruments.

The home page offers a user-friendly interface that presents relevant data efficiently, allowing users to stay informed and make informed decisions.

**4. TimeSeries Page:**

The TimeSeries page is dedicated to providing users with detailed insights into historical data, specifically focusing on the last day's data collected at every 5-minute interval. This data is sourced from the AlphaVantage API.

- **AlphaVantage TimeSeries API**: This API endpoint retrieves historical data at regular intervals, allowing users to analyze trends and patterns over time.

Users can visualize and interpret the data presented on the TimeSeries page to gain valuable insights into market behavior and make informed decisions.

Overall, the project combines user registration and authentication functionalities with real-time and historical financial data access, empowering users with the information they need to navigate the financial landscape effectively.
