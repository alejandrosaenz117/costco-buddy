const axios = require('axios').default;
const readline = require('readline');
const nodemailer = require('nodemailer');
require('dotenv').config();

let transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: process.env.FROM_EMAIL,
    pass: process.env.FROM_EMAIL_PASSWORD
  }
});
let urlAry = [];
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: 'Welcome to Costco Buddy! Please enter a comma delimited list of Costo product URLs>'
});
rl.prompt();
rl.on('line', line => {
  urlAry = line.split(',');
  if (urlAry.length) {
    fetchItemStatus(urlAry);
    setTimeout(() => {
      fetchItemStatus(urlAry);
    }, 1800000);
  } else {
    console.info('Product list is empty.  Costco Buddy will now exit.');
    process.exit();
  }
});

/**
 * @description Fetch status of target items
 * @param {object} mailOptions
 * @returns HTTP status code
 */
function fetchItemStatus(line) {
  console.log('Costco Buddy is fetching product statuses.  Stand by!');
  urlAry.forEach(async (url, index, object) => {
    try {
      let res = await axios.get(url);
      if (res.status === 200) {
        if (!(res.data.includes('Product Not Found') || res.data.includes('content="out of stock"'))) {
          console.info(`\nThe following item is in stock: ${url}.  Please check your email!`);
          sentInStockEmail(url);
          object.splice(index, 1);
          if (!object.length) {
            console.info('\nAll items in the product list are now in stock.  Costco Buddy will now exit.');
            process.exit();
          }
          return;
        } else {
          console.info(
            `\nThe following item is still out of stock: ${url}.  Costco Buddy will check again in 30 (thirty) minutes!`
          );
          return;
        }
      } else {
        console.info(
          `\nThe following item is still out of stock: ${url}.  Costco Buddy will check again in 30 (thirty) minutes!`
        );
        return;
      }
    } catch (error) {
      // TODO: Figure out why Axios is throwing an exception even if the status is 200
    }
  });
}

/**
 * @description Send email
 * @param {object} mailOptions
 * @returns string
 */
function sendEmail(mailOptions) {
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return 'Error sending email';
    } else {
      return 'email sent successfully';
    }
  });
}

/**
 * @description Prepare account verification email
 * @param {string} uuid
 * @returns string
 */
function sentInStockEmail(url) {
  const mailOptions = {
    from: process.env.FROM_EMAIL,
    to: process.env.TO_EMAIL,
    subject: 'Your Item is in Stock!',
    text: `An Item you are watching is in stock! \n${url}`
  };
  sendEmail(mailOptions);
}
