# Angular Task - RoundPixel

![RoundPixel Logo](./src/assets/svgs/logo.svg)

## Project Description

This Angular web application is developed as part of the hiring process at RoundPixel. It is designed to showcase flight search results from an online travel system, allowing users to filter flights by various criteria and select a flight. The task focuses on implementing the "Flight Results" screen, including filtering capabilities and flight card displays.

## How to Run the Source Code

1. **Clone the Repository:**

   ```bash
   git clone https://github.com/your-username/angular-task-roundpixel
   cd angular-task-roundpixel
   ```

2. **Install Dependencies:**

   ```bash
   npm install
   ```

3. **Run the Development Server:**
   ```bash
   ng serve --open
   ```

## How to Build the Source Code

1. **Build the Project:**
   ```bash
   ng build
   ```

## How to Test the Source Code

1. **Run Unit Tests:**
   ```bash
   ng test
   ```

## User Flow

1. The user opens the application and views all flights fetched from a local JSON file.
2. The flight cards display essential information such as:
   - Departure and arrival airports
   - Price and duration
   - Airline logo and name
   - Number of stops
3. The user can filter the flights by:
   - **Price range**
   - **Airlines**
   - **Airport name** (with validation to prevent Arabic characters)
4. The user selects a flight and views its details on a new screen (if the bonus task is implemented).

## Task Breakdown

| Task                            | Description                                                                                                         |
| ------------------------------- | ------------------------------------------------------------------------------------------------------------------- |
| Create Angular Project          | Set up a new Angular project.                                                                                       |
| Fetch and Display Flight Data   | Load flight data from a JSON file stored in the assets folder.                                                      |
| Display Flight Cards            | Display cards showing key flight details like departure, arrival, and price.                                        |
| Filter Flights                  | Implement a filter component to filter flights based on price, airline, and airport name.                           |
| Handle Multiple Flight Segments | Show a visual indication if the flight has stops or transit segments.                                               |
| Validate Input                  | Ensure that the input for filtering by airport name does not allow Arabic characters.                               |
| Bonus - Selected Flight Screen  | Implement the selected flight screen showing a summary of the chosen flight and handle data persistence on refresh. |
| Bonus - Arabic Translation      | Translate the entire application into Arabic.                                                                       |
| Bonus - Live Demo               | Deploy the project and create a live demo.                                                                          |

## Bonus Task Description

1. **Selected Flight Screen**: When the user selects a flight, navigate to a new screen showing a summary of the selected flight. Ensure that the data persists even after a page refresh.
2. **Arabic Translation**: Provide a complete Arabic translation for the app's layout and content.
3. **Live Demo**: Deploy the project for demonstration purposes.

## Project Guidelines

- The task requires a clean, responsive UI, ensuring compatibility with mobile devices.
- The system must be built with **clean code** principles (e.g., readable code, proper function definitions, no unnecessary blocks).
- Use **Angular Material** for the UI components (optional but preferred).
- The console should be free from errors, and all functionalities must work as expected.
- Submit the GitHub repository link via email.

## References

- [Wego](https://eg.wego.com/en)
- [Rehlat](https://www.rehlat.com.eg/en)
- [Khaleej Gate](https://khaleejgate.com/home)
