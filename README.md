# Bill Splitter - Angular Version

An Angular application that replicates the exact functionality and styling of the Flask bill-split project. This is a complete frontend-only solution for splitting expenses among friends and groups.

## Features

- **Add/Remove People**: Manage the list of people who will be splitting expenses
- **Two Expense Views**:
  - **Person-First View**: Select a person first, then add their individual items
  - **Classic View**: Add expenses and assign them to people from a dropdown
- **Real-time Calculations**: Calculate how much each person owes based on their individual expenses
- **Local Storage**: Automatically saves data to browser's local storage for persistence
- **Responsive Design**: Beautiful, modern UI that works on all devices
- **Exact Flask Replica**: Identical functionality and styling to the original Flask version

## Getting Started

### Prerequisites

- Node.js (version 14 or higher)
- npm (comes with Node.js)

### Installation

1. Install dependencies:

   ```bash
   npm install
   ```

2. Start the development server:

   ```bash
   npm start
   ```

3. Open your browser and navigate to `http://localhost:4200`

### Build for Production

To build the application for production:

```bash
npm run build
```

The build artifacts will be stored in the `dist/` directory.

## How to Use

### 1. Add People

- Go to the "People" tab
- Enter names of people who will be splitting expenses
- People can be removed by clicking the X button

### 2. Track Expenses

#### Person-First View (Recommended)

- Go to the "Expenses" tab
- Make sure "Person-First" is selected
- Click on a person to add their items
- Add description and amount for each item
- View individual totals for each person

#### Classic View

- Toggle to "Classic View" in the Expenses tab
- Add expense description, amount, and select which person it's for
- View all expenses in a single list

### 3. Calculate Split

- Go to the "Calculate" tab
- Click "Calculate Split" to see:
  - Total amount of all expenses
  - How much each person owes (only what they ordered)

### 4. Clear Data

- Use the "Clear All Data" button at the bottom to reset everything
- This will remove all people and expenses permanently

## Technical Details

### Architecture

- **Angular 18+**: Latest version with standalone components
- **TypeScript**: Fully typed for better development experience
- **RxJS**: Reactive programming with observables for state management
- **Tailwind CSS**: Utility-first CSS framework for styling
- **UUID**: For generating unique identifiers

### Angular Best Practices Implemented

- **Separated Templates**: Each component has its own `.html` template file
- **Component-Specific Styles**: Dedicated `.css` files for each component
- **Standalone Components**: Modern Angular architecture without modules
- **Reactive State Management**: Using BehaviorSubject for real-time updates
- **TypeScript Strict Mode**: Strong typing throughout the application

### State Management

- BillSplitService handles all business logic and state
- Local storage integration for data persistence
- Reactive streams using BehaviorSubject for real-time updates

### Project Structure

```
src/app/
├── components/
│   ├── people-list/
│   │   ├── people-list.component.ts
│   │   ├── people-list.component.html
│   │   └── people-list.component.css
│   ├── expenses/
│   │   ├── expenses.component.ts
│   │   ├── expenses.component.html
│   │   └── expenses.component.css
│   └── calculate/
│       ├── calculate.component.ts
│       ├── calculate.component.html
│       └── calculate.component.css
├── models/
│   └── app.models.ts
├── services/
│   └── bill-split.service.ts
├── app.component.ts
├── app.component.html
└── app.component.css
```

### Components

- `AppComponent`: Main container with tabbed interface
- `PeopleListComponent`: Manages adding/removing people
- `ExpensesComponent`: Handles both expense entry views
- `CalculateComponent`: Shows split calculation results
- `BillSplitService`: Core business logic and state management

## Differences from Flask Version

The Angular version provides the exact same functionality as the Flask version but runs entirely in the browser:

- **No Backend Required**: All logic runs in the frontend
- **Faster Performance**: No server round trips for calculations
- **Better User Experience**: Instant updates without page refreshes
- **Identical Styling**: Pixel-perfect match to the Flask version
- **Modern Architecture**: Follows Angular best practices

## Browser Support

This application works in all modern browsers:

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Development

To contribute or modify:

1. Clone the repository
2. Install dependencies: `npm install`
3. Start development server: `npm start`
4. Make changes and test
5. Build for production: `npm run build`

The application follows Angular best practices with separated templates, component-specific styles, and a clean modular architecture using standalone components.
