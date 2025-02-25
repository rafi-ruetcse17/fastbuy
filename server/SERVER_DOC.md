## Database Schema Design

### User Model
The User model represents users in the system, storing essential information and their relationships with products.

**Fields:**
* ```id``` (Int, Primary Key) - Unique identifier for each user.
* ```createdAt``` (DateTime) - Timestamp when the user account was created.
* ```email``` (String, Unique) - Email address of the user.
* ```name``` (String) - Name of the user.
* ```password``` (String) - Hashed password for authentication.
* ```owned``` (Array of Product IDs) - List of products owned by the user.
* ```borrowed``` (Array of Product IDs) - List of products borrowed by the user.

### Product Model
The Product model represents items that users can buy, sell, rent, or borrow.

**Fields:**
- **`id`** (UUID, Primary Key) - Unique identifier for each product.
- **`title`** (String, Required) - Name of the product.
- **`description`** (String, Required) - Detailed description of the product.
- **`status`** (String, Required) - Current status of the product (e.g., `available`, `sold`, `rented`).
- **`owner`** (UUID, Required) - Reference to the user who owns the product.
- **`sellingPrice`** (Float, Required) - Price of the product for selling.
- **`rentPrice`** (Float, Required) - Price of the product for renting.
- **`rentRule`** (String, Required) - Conditions for renting the product.
- **`boughtBy`** (UUID, Nullable) - User ID of the person who bought the product (if applicable).
- **`borrowedBy`** (UUID, Nullable) - User ID of the person who borrowed the product (if applicable).
- **`sellingDate`** (DateTime, Nullable) - Date when the product was bought.
- **`rentDate`** (DateTime, Nullable) - Date when the product was borrowed.