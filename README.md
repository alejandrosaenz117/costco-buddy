# Costco Buddy

A Costco stock email notification CLI tool.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

Make sure you have [Node.js](http://nodejs.org/).

### Installing

```
npm install
```

Create a `.env` file with the following properties:
```
FROM_EMAIL=
FROM_EMAIL_PASSWORD=
TO_EMAIL=
```

### Usage

```
npm start
```

#### Example

Input a comma delimited list of Costco product URLs.

```
Welcome to Costo Buddy! Please enter a comma delimited list of Costco product URLs>https://www.costco.com/.product.{someId}.html, https://www.costco.com/.product.{someId}.html
```

## License
This project is licensed under the MIT License - see the [LICENSE.md](https://github.com/Whamo12/idor-chat/blob/master/LICENSE) file for details
