# Fast Food Ordering Website

This project is a Fast Food Ordering website built with React and Vite. It allows users to browse a menu of food items, add them to a cart, and proceed to checkout. The application also includes an order confirmation popup to summarize the order details.

## Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

- Node.js (version 14 or later)
- npm (version 6 or later)
- PostgreSQL (version 12 or later)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/fastfood-ordering-website.git
   ```
2. Navigate to the project directory:
   ```bash
   cd fastfood-ordering-website
   ```
3. Install the dependencies:
   ```bash
   npm install
   ```

### Database Setup

1. Ensure PostgreSQL is installed and running on your system.
2. Create a new PostgreSQL database named `isd_final_db`:
   ```bash
   createdb isd_final_db
   ```
3. Import the provided SQL dump file (`database_dump.sql`) into the database:
   ```bash
   psql -U [your_username] -d isd_final_db -f database_dump.sql
   ```
   Replace `[your_username]` with your PostgreSQL username.

4. Update the `.env` file in the `src` directory with your PostgreSQL connection details:
   ```
   DB_USER=your_username
   DB_PASSWORD=your_password
   DB_HOST=localhost
   DB_PORT=5432
   DB_NAME=isd_final_db
   ```

### Usage

To start the development server, run:
```bash
npm run dev
```
Open your browser and go to `http://localhost:5173` to see the app in action.

### Build

To create a production build, run:
```bash
npm run build
```

### Features

- **Menu Management**: Browse and filter menu items.
- **Cart Functionality**: Add, update, and remove items from the cart.
- **Checkout Process**: Choose delivery or pickup, enter payment details, and confirm orders.
- **Admin Dashboard**: Manage menu items and view order details (admin access required).

### Contributing

Contributions are welcome! Please open an issue or submit a pull request for any improvements or bug fixes.

### License

This project is licensed under the MIT License.