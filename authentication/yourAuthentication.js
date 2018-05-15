import {
    send_welcome_email,
    add_user_sendgrid,
    add_user_sendgrid_welcomeList
  } from '../sendgrid/sendgrid.js';


// Trigger the send of a welcome email
send_welcome_email(email);
// Try to add emails to a list
add_user_sendgrid(firstName, lastName, email);
// Try to add emails to a list
add_user_sendgrid_welcomeList(name, email);