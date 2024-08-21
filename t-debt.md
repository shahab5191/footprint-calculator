# Technical Debt
Due to the limited deadline, I aimed to minimize technical debt, but some areas still need improvement. Below are the current technical debts identified in the project:

1- State Management
  All states are currently stored in a single form-store. These states need to be separated into more modular and maintainable units.

2- Component Responsibilities
  The getEmission and token fetching functions are currently located inside the Home component. These functions should be moved to a separate server action file to maintain a cleaner component structure and separation of concerns.

3- Token Management
  The server should store the token for its expiration period to avoid fetching a new token every time a user connects. This would optimize performance and reduce unnecessary API calls.

4- Function Return Structure
  The getEmission function should be updated to return a proper tuple that contains both a result and an error, allowing for more robust error handling.

5- Modularization of Emission Calculation
  The calculateEmission function should be moved to a separate module. Instead of being called directly inside the SideBar function, it should listen to state changes, promoting a more reactive and decoupled design.
