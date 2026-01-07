#Simplifications

1. Assumptions & Simplifications
a. Key assumptions made during implementation.
First word in description is ITEM_CATEGORY.
Discount is applied if total qty in order reaches target.
Orders can contain multiple products; quantities are integers >= 1.

b. Elements that were intentionally omitted and the reasoning behind them.
Dynamic fetching of product categories for holiday discounts; categories are hardcoded (ELECTRONICS, BOOKS) for demo purposes.

c. Interpretation of ambiguous parts of the task (e.g. discount rules,
customer/location model).
Discount rules: Only the highest applicable discount is applied to the total order (no stacking).
Customer / location model: Location is considered a static field in the customer entity; no dynamic detection.
Stock update behavior: Orders that cannot be fully fulfilled due to insufficient stock are rejected entirely (atomic behavior).

2. Technical Decisions
a. Justification for:
o database choice,
MongoDB was selected for its flexibility with schema evolution and support for atomic operations / transactions on replica sets.
o project structure,
Controllers handle HTTP logic.
Repositories encapsulate database operations.
Validators ensure request-level data integrity.
Routes organize endpoints by domain (products, orders), keeping code modular.
o CQRS implementation approach.
Commands: POST /products, POST /products/:id/restock, POST /products/:id/sell, POST /orders
Queries: GET /products
Approach simplifies reasoning about side effects, ensures separation of concerns, and aligns with transactional integrity requirements.

b. Brief explanation of command / query separation.
This separation allows for cleaner transaction management and easier scalability in the future (e.g., event sourcing or read replicas).

3. Business Logic
a. How the discount system works (priority, order of application).
Discounts are mutually exclusive; only the highest applicable discount is applied.

b. How stock consistency is ensured (no negative stock).
Stock updates are atomic using MongoDB transactions.

c. Key edge cases that were taken into account.
Order contains products where some have insufficient stock → order rejected entirely.
Black Friday and holiday sales overlapping → only the highest discount applied.
Multiple units crossing different volume thresholds (5, 10, 50 units) → only the highest volume discount applied.
Customer location not listed → default pricing used (no adjustment).
Empty product arrays or invalid quantities → rejected by validators.
Simultaneous orders on the same product → MongoDB transaction ensures atomic decrements, preventing overselling.

4. Testing
a. What is covered by tests and why.
Business model is critical.
b. What is not covered, but would be required in a production system.
Controllers, validators, middlewares.