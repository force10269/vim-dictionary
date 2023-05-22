# Vim Dictionary

![Vim dictionary page](https://raw.githubusercontent.com/force10269/vim-dictionary/main/assets/vim-dictionary.png)

Vim Dictionary is a comprehensive web application providing a platform to explore, learn, and manage Vim keybindings. It offers a terminal-like interface for a familiar user experience and supports a variety of Vim modes. The application also incorporates user authentication, allowing customization of keybinding dictionaries tailored to individual user preferences.

## Table of Contents

- [Features](#features)
- [Technologies](#technologies)
- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)

## Features

- Terminal-like interface for exploring Vim keybindings
- Supports various Vim modes (Normal, Visual, Insert, etc.)
- User authentication allows customizing keybinding dictionaries
- Global search allows for keybindings, descriptions, sections, and dictionaries search
- Integration of user-added keybindings alongside the default ones

## Technologies

- Frontend: Next.js, TypeScript, styled-components, and FontAwesome
- Backend: Rust, PostgreSQL
- Hosting: The database is hosted on Supabase.

## Installation

1. Clone the repository:

```sh
git clone https://github.com/force10269/vim-dictionary.git
```

2. Navigate to the project folder:

```sh
cd vim-dictionary
```

3. Navigate to the frontend folder:

```sh
cd vim-dictionary-frontend
```

4. Install the required dependencies for the frontend:

```sh
npm install
```

5. Create `.env.local` and fill in the proper values after:

```sh
cp .env.sample .env.local
```

6. Navigate to the backend folder and install the required dependencies:

```sh
cargo build
```

7. Create `.env` and fill in the proper values after:

```sh
cp .env.sample .env
```

8. Run the development servers:

Frontend:

```sh
npm run dev
```

Backend:

```sh
cargo run
```

9. Open your browser and visit `http://localhost:3000`, to see the app.

## Usage

- Select the Vim mode from the dropdown menu.
- Enter the keybinding in the search input field.
- The application will display the corresponding action for the keybinding.
- If logged in, users can manage their own keybindings dictionary.

## Contributing

1. Fork the repository.
2. Create a new branch for your feature or bugfix.
3. Commit your changes.
4. Push your changes to your fork.
5. Open a pull request against the `main` branch of the original repository.
