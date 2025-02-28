## Database Schema Design

### User Model
The User model represents users in the system, storing essential information and their relationships with products.

**Fields:**
* ```id``` (Int, Primary Key) - Unique identifier for each user.
* ```createdAt``` (DateTime) - Timestamp when the user account was created.
* ```email``` (String, Unique) - Email address of the user.
* ```name``` (String) - Name of the user.
* ```password``` (String) - Hashed password for authentication.
* ```owned``` (Array of Products) - List of products owned by the user.
* ```borrowed``` (Array of Products) - List of products borrowed by the user.
* ```bought``` (Array of Products) - List of products bought by the user.

### Product Model
The Product model represents items that users can buy, sell, rent, or borrow.

**Fields:**
- **`id`** (UUID, Primary Key) - Unique identifier for each product.
- **`title`** (String, Required) - Name of the product.
- **`description`** (String, Required) - Detailed description of the product.
- **`status`** (String, Required) - Current status of the product (e.g., `available`, `sold`, `rented`).
- **`category`** (String, Required) - Category of the product.
- **`ownerId`** (UUID, Required) - Reference to the user who owns the product.
- **`owner`** - Reference to the user who owns the product.
- **`purchasePrice`** (Float, Required) - Price of the product for selling.
- **`rentPrice`** (Float, Required) - Price of the product for renting.
- **`rentPeriod`** (String, Required) - Conditions for renting the product.
- **`boughtById`** (UUID, Nullable) - User ID of the person who bought the product (if applicable).
- **`boughtBy`** (UUID, Nullable) - Reference to the user who buys the product.
- **`borrowedById`** (UUID, Nullable) - User ID of the person who borrowed the product (if applicable).
- **`borrowedBy`** (UUID, Nullable) - Reference to the user who buys the product.
- **`purchasedDate`** (DateTime, Nullable) - Date when the product was purchased.
- **`rentDate`** (DateTime, Nullable) - Date when the product was borrowed.
* ```createdAt``` (DateTime) - Timestamp when the product was added to the database.