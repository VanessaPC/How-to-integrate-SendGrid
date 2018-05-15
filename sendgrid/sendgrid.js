/* Title here */

const SENDGRID_API = "********";
// const SENDGRID_API = ${SENDGRID_API}; In an environment where you populate the

const TRANSACTIONAL_TEMPLATE = "id_number";

// Setting the API key in the client request settings
client.setApiKey(process.env.SENDGRID_API_KEY);


// Set up reusable code
const dataFilters = {
    filters: {
      clicktrack: {
        settings: {
          enable: 1
        }
      },
      dkim: {
        settings: {
          domain: 'youdomain.com',
          use_from: false
        }
      }
    }
  };

  // Setting tracking and ganalytics
  const dataTrackingSettings = {
    click_tracking: {
      enable: true
    },
    open_tracking: {
      enable: true
    },
    ganalytics: {
      enable: true,
      utm_source: 'yourdomain.com'
    }
  };

// Adding a user to our general list in SendGrid
export function add_user_sendgrid(firstName, lastName, email) {
    const request = {
      method: 'POST',
      url: '/v3/contactdb/recipients'
    };
    const data = [{
      email: email,
      first_name: firstName,
      last_name: lastName
    }];
    request.body = data;
    client.request(request).then(([response, body]) => {
      console.log(response.statusCode);
      console.log(response.body);
    });

    request.write('null');
    request.end();
  }

// Function that sends email after verification
export function send_welcome_email(email) {
    const request = {
      method: 'POST',
      url: '/v3/mail/send'
    };

    // setting up the data for the email
    const data = {
      template_id: TRANSACTIONAL_TEMPLATE,  // Insert your template id here
      from: {
        email: 'email@email.com' // This is the email that will appear on your senders details
      },
      subject: '<Subject of the email>', // Subject of the email
      filters: dataFilters,
      tracking_settings: dataTrackingSettings
    };

    let dataPersonalization = [{
      to: [{
        "<user.email>" // This being the users email
      }],
      category: ['<categories>'],
      filters: dataFilters,
      tracking_settings: dataTrackingSettings
    }];

    data.personalizations = dataPersonalization;
    request.body = data;
    client.request(request).then(
      ([response, body]) => {
        console.log(response.statusCode);
        console.log(response.body);
      },
      error => {
        Raven.captureException(error);
        console.log(error);
      }
    );
  }