<a name="js-gems"></a>

<p align="center" style="display: flex; flex-direction: column; align-items: center; justify-content: center; height: 200px;">
  <img src="https://res.cloudinary.com/deztgvefu/image/upload/v1714297036/template_images/Screenshot_2024-04-28_at_12.35.53_sgwqo7.png" alt="Project Logo" width="340">
</p>

---

<a name="built-with"></a>
<a name="error-handling"></a>


<h4 align="center">
  <a href="#introduction">Introduction</a> ·
  <a href="#demo-video">Demo Video</a> ·
  <a href="#built-with">Built With</a> ·
  <a href="#features">Features</a> ·
  <a href="#error-handling">Error Handling</a> ·
  <a href="#installation">Installation</a> ·
  <a href="#usage">Usage</a> ·
  <a href="#license">License</a>
</h4>

---

## Introduction
<p><i>Welcome to our Online Jewelry Store! This web application serves as a platform for showcasing and selling a stunning collection of exquisite jewelry. With a user-friendly       interface and seamless navigation, customers can explore, select, and purchase their favorite pieces effortlessly..</i></p>

<br>

## Demo Video

[![Watch the video](https://img.youtube.com/vi/KnK5HedIVjo/maxresdefault.jpg)](https://www.youtube.com/embed/KnK5HedIVjo)

<p align="right" dir="auto"><a href="#js-gems">Back To Top</a></p>

## Built With
<table align="center">
  <tr>   
    <td align="center"><img alt="JavaScript" width="80px" src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg"/></td>
    <td align="center"><img alt="Node.js" width="80px" src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original-wordmark.svg"/></td>
    <td align="center"><img alt="Express" width="80px" src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/express/express-original.svg"/></td>
    <td align="center"><img alt="MongoDb" width="80px" src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mongodb/mongodb-original-wordmark.svg"/></td>
    <td align="center"><img alt="Mongoose" width="80px" src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mongoose/mongoose-original-wordmark.svg"/></td>
    <td align="center"><img alt="Handlebars" width="80px" src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/handlebars/handlebars-line-wordmark.svg"/></td>
    <td align="center"><img alt="CSS" width="80px" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original-wordmark.svg"/></td>
  </tr>
</table>

<br>

1. #### Backend:
- Followed  Model-View-Controller (MVC) architecture.
2. #### Database:
- MongoDB: Data aggregation and dynamic filtration.
3. #### Frontend:
- Styled the user interface with CSS for an intuitive shopping experience tailored for desktop users.
> [!NOTE]
> Currently optimized for desktop; future plans include implementing media queries for responsiveness on various devices.

<p align="right" dir="auto"><a href="#js-gems">Back To Top</a></p>

## Features 

1. #### User Models:
- Implemented two distinct user models:
  - logging credentials
  - personal details
    
- Change Email functionality
- Change Password functionality
- Change Personal Details functionality
- Detele Profile functionality
- Logout functionality

2. #### Advanced Product Filtering and Real-time Availability Tracking:
- When a customer selects a choice from the dropdown menu, they are redirected to the chosen page.
- Here, an advanced product filtering system awaits, allowing users to refine their search further.
  - The selection menu not only filters the displayed products based on user preferences but also dynamically adjusts other checkboxes based on the available products.
  - A counter is placed next to each checkbox within the multiple checkboxes form. These counters provide real-time feedback, indicating the exact number of products available for each checkbox selection.
 
3. #### Shopping Cart:
##### Adding to Cart:
- After successfully adding items to the shopping bag, customers are redirected to their personalized shopping cart. This page provides a detailed overview, including information about the quantity of each product, the total price based on the selected quantity, and the overall order total.
  
- Customers have the flexibility to adjust the quantity directly on the shopping cart page. Increasing or decreasing the quantity dynamically updates both the displayed total price and the inventory quantity in real-time.
- For added convenience, if a product is added for a first or a second time from the product page, a quantity of one is automatically appended. Conversely, using the 'Update Quantity' button to set the quantity to zero removes the product from the shopping cart. Customers can also add as much quantity as available in the inventory, ensuring a flexible and tailored shopping experience.
- Non-registered users can add items to their shopping cart without creating an account. 
  - When users add items to their shopping cart, a cart is created in our database and linked to their current session ID. This session key serves as a temporary identifier.
  - Our system is designed with dedicated settings and functions to ensure that the session key remains associated with the user's cart and account even after completing the registration process.
  - After a customer completes the registration, they will be redirected back to their shopping cart. All the items they had selected before registering will still be there, ready for them to proceed with their purchase.
 
##### Purchase Process:
- Upon clicking on the 'Checkout' button, customers are redirected to a page where they can enter their essential personal details, including names, phone number, and delivery address. This mandatory step, ensures that customers provide the necessary information before proceeding.
- Proceeding to the next step in the checkout process, customers are required to provide valid card details to complete the payment. This ensures a secure and reliable transaction, adhering to industry standards for payment processing.

4. #### Search:
   
     The search button allows users to input keywords or phrases, and in real-time, it dynamically displays related products from our extensive database.

5. #### Wishlist:
   
     For non-registered users, their likes are stored temporarily in the session, allowing them to enjoy a personalized experience during their current visit. Registered users benefit from having their likes stored in the database, ensuring that their preferences are maintained across sessions.

6. #### Last Seen Products:
   
     The system stores the last three products viewed by users in their session. This recent product history is displayed on pages where it is most relevant. Users can easily revisit and consider these recently viewed products, by clicking on them.

7. #### Size Selection:
   
     A radio select button must be chosen before adding items to the shopping bag. This ensures clarity and precision in product selection, allowing customers to specify their preferences before proceeding to the checkout.

8. #### Order Confirmation and Details:
   
     After the successful completion of the payment transaction, customers are redirected to an Order Details page, providing a comprehensive overview of their purchase. This page lists each product's characteristics, individual total price, and the overall total order price.

    Included in this detailed confirmation is a unique Order ID for reference. Users will also find a summary of their personal information, ensuring transparency and facilitating future reference. 

9. #### Order History:
   
     Registered users can enjoy a shopping experience with the added convenience of an order history feature. Every purchase made by a registered user is recorded and stored, allowing them to effortlessly track their order history.

10. #### Load More Button:
   
     Implemented a "Load More" button to dynamically display more content.

<p align="right" dir="auto"><a href="#js-gems">Back To Top</a></p>

## Error Handling
  Our system features custom error messages that provide clear and concise feedback. Notably, these error messages are conveniently dismissible with a simple click, ensuring a non-intrusive interaction.

<p align="right" dir="auto"><a href="#js-gems">Back To Top</a></p>

## Installation

1. #### Clone the repository:

    ```bash
    git clone https://github.com/BeatrisIlieve/JSGems.git
    ```

2. #### Install nodemon:

     ```bash
    npm i -D nodemon
    ```
    
3. #### Populate the database by running the following command:

    ```bash
    npm run populate
    ```

<p align="right" dir="auto"><a href="#js-gems">Back To Top</a></p>

## Usage
1. #### Run the development server:

    ```bash
    npm start
    ```
  
2. #### Visit [localhost:5050](http://localhost:5050) in your web browser to access the application.

<p align="right" dir="auto"><a href="#js-gems">Back To Top</a></p>

## License
This project is licensed under the [MIT License](LICENSE).

<p align="right" dir="auto"><a href="#js-gems">Back To Top</a></p>


