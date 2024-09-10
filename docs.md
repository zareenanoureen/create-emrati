# Emirati

## 1. Shopify OAuth Integration

### Overview
The Shopify OAuth integration allows users to authenticate and install the app within their Shopify store. This involves implementing OAuth flow to securely connect your Django application with Shopify.

### Functional Requirements
- **OAuth Flow:** 
  - Redirect users to Shopify for authorization.
  - Handle the OAuth callback to receive and store the access token.
- **Shopify Integration Views:**
  - `install_app`: Redirects to Shopify's OAuth authorization URL.
  - `callback`: Handles the OAuth callback and stores the access token.
  - `home`: Displays a welcome page post-authentication.

### Implementation
- Create views and URL patterns for handling OAuth and rendering the home page.
- Define necessary settings and integrate Shopify API.

## 2. "Create Your Emirati" Feature

### Overview
This feature involves copying and integrating a front-end template to allow users to select items and view the final cost. 

### Functional Requirements
- **Front-End Integration:**
  - Copy the design from the provided URL.
  - Ensure that HTML, CSS, and JavaScript are correctly linked and rendered.

### Implementation
- Copy and integrate the front-end template into the project.
- Ensure correct linking of CSS and JS files and local file paths.

## 3. User Login/Signup System

### Overview
Implement a secure login and signup system to manage user accounts and preferences.

### Functional Requirements
- **User Management:**
  - Signup form for new users.
  - Login functionality with secure authentication.
  - Ability to save and manage user preferences.

### Implementation
- Develop user authentication and session management.
- Allow users to view and manage their saved preferences.

## 4. Save Order Details to Database

### Overview
Save user orders and preferences to the database upon successful payment and display order summaries.

### Functional Requirements
- **Order Management:**
  - Capture and store order details in the database.
  - Generate a confirmation page with order details.

### Implementation
- Implement database models for orders.
- Create a confirmation page for order summaries.

## 5. Admin Panel

### Overview
An admin panel to manage customers, orders, and the thobe catalog efficiently.

### Functional Requirements
- **Customer Management:**
  - View and edit customer profiles.
  - Access order history and communicate with customers.

- **Order Management:**
  - Track and modify orders.
  - Cancel orders if necessary.

- **Catalog Management:**
  - Add, edit, or remove thobe designs.
  - Manage customization options and stock levels.

- **Reporting:**
  - Generate sales, customer, and inventory reports.
