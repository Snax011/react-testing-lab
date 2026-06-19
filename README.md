# React Testing Lab

This project is a small banking dashboard for the Royal Bank of Flatiron. It loads transaction data from a local JSON server, lets users add new transactions, and supports searching and sorting the transaction list.

## Features

- Displays transactions from the backend on startup.
- Adds new transactions through the form and posts them to the API.
- Filters transactions as the search field changes.
- Sorts the visible transactions by description or category.

## Testing

This app uses Vitest with React Testing Library.

Run the full suite with:

```sh
npm test -- --run
```

Run the app and API locally with:

```sh
npm run dev
npm run server
```

## Notes

- The backend runs on `http://localhost:6001`.
- Transaction data is stored in `db.json` for local development and testing.

