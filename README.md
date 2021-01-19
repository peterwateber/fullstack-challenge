#### The Task

- Create and do the initial setup for a frontend project with React and a backend project with NodeJS.
- Setup [firebase](https://firebase.google.com/docs) in your frontend and backend projects with the provided [firebase web config](./firebaseConfig.js) and [service account credential](./serviceAccountKey.json) files respectively.
- Setup and create some basic unit tests for the application.

###### Frontend
- Create a user login page with email and password inputs that logs in the user. Use [firebase auth](https://firebase.google.com/docs/auth/web/password-auth) to login the user. Once logged in, you would be able to [fetch user document from users collection](https://firebase.google.com/docs/firestore/query-data/get-data) with the logged in user id as the document id.
- Create a page to show the list of `orders`. Make sure that only the logged in users can navigate to this page. The order details object includes `title`, `bookingDate`, `address` and `customer` fields. You may choose a list view of your choice to display these details.
- Create a page to view order details `orders/{orderId}`. Make sure that only the logged in users can navigate to this page. Allow editing the order `title` and `bookingDate` fields by calling the backend api `PUT /orders/{orderId}` with json body `{"title": "__updated_title__", "bookingDate": <unixTimestamp>}`

###### Backend
- Create `POST /orders` route to add new orders to the orders collection in firebase. It should accept json body with `title`, `bookingDate`, `address` and `customer` fields.
- Create `PUT /orders/{orderId}` route to [update firebase order document](https://firebase.google.com/docs/firestore/manage-data/add-data#update-data) with the given order id. It should accept json body with `title` and `bookingDate` and update the same in firebase.

###### Notes
--


#### Hints and Pointers

###### Login Page
|          |            |         |
| -------- | ---------- | ------- |
| Email    | [ ...... ] |         |
| Password | [ ...... ] | `Login` |


###### Orders Overview Page
| Title        | Booking Date | Address           | Customer  |
| ------------ | ------------ | ----------------- | --------- |
| Test Order 1 | 22.06.2019   | Address Str. 12   | Cust no 1 |
| Test Order 2 | 23.06.2019   | Mitte 12          | Cust no 2 |

###### Orders Details/Edit Page
|              |                                                    |
| ------------ | -------------------------------------------------- |
| Title        | [ Test Order 1 ]                                   |
| Booking Date | [ *22.06.2019* ]                                   |
| Address      | Address Str. 12<br>Berlin 12345<br>Germany       |
| Customer     | Name Here <br>email@email<br>0123456789 |


##### Data Formats

###### `orders/{orderId}`
```json
{
  "address": {
    "city": "Berlin",
    "country": "Germany",
    "street": "Address street 123",
    "zip": "12345"
  },
  "bookingDate": 1554284950000,
  "customer": {
    "email": "email@email",
    "name": "Name Here",
    "phone": "015252098067"
  },
  "title": "Test Order 1",
  "uid": "hKlIKPoZc2xCKGTUKZK2"
}
```

###### `users/{userId}`
```json
{
  "email": "email@email",
  "name": "Name Here",
  "phone": "0123456789",
  "uid": "5iEm1HvIxubLaiKO4yj0Npmvq0F2"
}
```
