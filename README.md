## Project Overview

This React.js web application, built with Vite, react-bootstrap, and SCSS, provides a comprehensive solution for user authentication, product management, and shopping cart functionality. Below are the key features and functionalities of the project:

### User Authentication

- **Login and Registration Pages**: The application includes user authentication pages for logging in and registering new users. User credentials and session data are managed using local storage.
- **Profile Page**: A profile page displays basic user details once authenticated.

### Product Management

- **Product Fetching**: Products are retrieved from an external API dummyjson.com using Axios.
- **Product Display**: Products are showcasing with details such as product name, price, rating, and image.
- **Filtering and Sorting**: Users can filter products based on categories and sort them by price.
- **Search Functionality**: A search feature allows users to find products by name.
- **Infinite Scrolling**: The application handles large product lists with either infinite scrolling.

### Cart Functionality

- **Add to Cart**: Users can add products to their cart.
- **Cart Management**: The cart allows users to view, modify, and remove items as needed.

### State Management and Routing

- **State Management**: The application uses React Context API to manage state across different components.
- **Routing**: React Router is employed for navigation, including routes for other application sections.

### Error Handling and Loading States

- **Error Handling**: The application is designed to handle errors gracefully during API requests and data retrieval processes.
- **Loading States**: Proper loading indicators are implemented to enhance user experience during data fetching operations.

## Installation

1. **Clone the Repository**

   ```bash
   git clone https://github.com/ajmalmirsha/DirectAxis.git

   ```

2. **Install Dependencies**

   ```bash
   npm install

   ```

3. **Start the Development Server**
   ```bash
   npm run dev
   ```

- **Open Your Browser**
  - http://localhost:5173
