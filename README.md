<p align="center"><img src="./logo.png"></p>


Thank you for showing interest in the **JavaScript Developer** position at Construyo. We are glad and excited to see what skills you have to offer. Thus we have created this coding challenge to help us with the initial assessment and move things forward.

#### General Guidelines

- We understand you might have a busy schedule. As such there is no deadline for the task. Take your own time to complete the task.
- It's okay to not complete every aspect of the task. Feel free to selectively **skip parts of the task**. It's designed to be a learning experience at the very least. Focus on areas that you want to highlight and be open and honest about areas of improvements. Focus on **quality before quantity** :)
- It's alright to search for similar solutions and inspirations online, everyone does that. Feel free to use external open source libraries, UI Kits, etc. However, refrain from blind, out of context copy pasta of code.
- Please create a git repository from the beginning and keep pushing your code in there. We are interested in seeing your progress and thought process through your commit history.  Any public repository created in GitHub, GitLab etc is fine, however please do not have explicit mention of Construyo or this task anywhere in the repository. This task is shared privately with you, we would appreciate if you refrain from sharing it publicly.
- Once you feel you are ready with your solution, share your repository link with the recruiter who got in touch with you. Make sure all the instructions needed to run your solution is also present as part of the repository readme file.
- Most importantly, have fun with the task. We value passion, so have it reflect in your solution :)

<div class="page"/>

<p align="center"><img src="./logo.png"></p>

#### The Task

- Create and do the initial setup for a frontend project with React and a backend project with NodeJS.
- Setup [firebase](https://firebase.google.com/docs) in your frontend and backend projects with the provided [firebase web config](./firebaseConfig.js) and [service account credential](./serviceAccountKey.json) files respectively.
- Setup and create some basic unit tests for the application.

###### Frontend
- Create a user login page with email and password inputs that logs in the user. Use [firebase auth](https://firebase.google.com/docs/auth/web/password-auth) to login the user. There is already a default user created with email `coding-challenge@construyo.de` and password `coding-challenge@construyo.de`. Once logged in, you would be able to [fetch user document from users collection](https://firebase.google.com/docs/firestore/query-data/get-data) with the logged in user id as the document id.
- Create a page to show the list of `orders`. Make sure that only the logged in users can navigate to this page. The order details object includes `title`, `bookingDate`, `address` and `customer` fields. You may choose a list view of your choice to display these details.
- Create a page to view order details `orders/{orderId}`. Make sure that only the logged in users can navigate to this page. Allow editing the order `title` and `bookingDate` fields by calling the backend api `PUT /orders/{orderId}` with json body `{"title": "__updated_title__", "bookingDate": <unixTimestamp>}`

###### Backend
- Create an http server with framework of your choice, [Express](https://expressjs.com/), [Koa](https://koajs.com/), [Hapi](https://hapi.dev/) or any other that you feel comfortable with.
- Create `POST /orders` route to add new orders to the orders collection in firebase. It should accept json body with `title`, `bookingDate`, `address` and `customer` fields.
- Create `PUT /orders/{orderId}` route to [update firebase order document](https://firebase.google.com/docs/firestore/manage-data/add-data#update-data) with the given order id. It should accept json body with `title` and `bookingDate` and update the same in firebase.

###### Notes

*You do not need to create/setup any firebase project. We have already setup everything needed. Just use the provided credential files to initialize firebase in your frontend and backend apps.*

*The `orders` and `users` [collections](https://firebase.google.com/docs/firestore) are already setup for the provided firebase project with the given credentials and are available to read/write. Once you initialize the firebase instance with the provided configurations, you'd be able to read/write from/to the collections.*

<div class="page"/>

<p align="center"><img src="./logo.png"></p>

#### Hints and Pointers

###### Login Page
|          |            |         |
| -------- | ---------- | ------- |
| Email    | [ ...... ] |         |
| Password | [ ...... ] | `Login` |


###### Orders Overview Page
| Title        | Booking Date | Address           | Customer  |
| ------------ | ------------ | ----------------- | --------- |
| Test Order 1 | 22.06.2019   | Wriezener Str. 12 | Emad Alam |
| Test Order 2 | 23.06.2019   | Mitte 12          | Jan Runo  |

###### Orders Details/Edit Page
|              |                                                    |
| ------------ | -------------------------------------------------- |
| Title        | [ Test Order 1 ]                                   |
| Booking Date | [ *22.06.2019* ]                                   |
| Address      | Wriezener Str. 12<br>Berlin 13055<br>Germany       |
| Customer     | Emad Alam <br>emad.alam@construyo.de<br>0123456789 |


##### Data Formats

###### `orders/{orderId}`
```json
{
  "address": {
    "city": "Berlin",
    "country": "Germany",
    "street": "Wriezener Str. 12",
    "zip": "13055"
  },
  "bookingDate": 1554284950000,
  "customer": {
    "email": "emad.alam@construyo.de",
    "name": "Emad Alam",
    "phone": "015252098067"
  },
  "title": "Test Order 1",
  "uid": "hKlIKPoZc2xCKGTUKZK2"
}
```

###### `users/{userId}`
```json
{
  "email": "coding-challenge@construyo",
  "name": "Construyo Coding Challenge",
  "phone": "0123456789",
  "uid": "5iEm1HvIxubLaiKO4yj0Npmvq0F2"
}
```

##### Firebase project initialization

###### Frontend
```js
import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import FIREBASE_CONFIG from './firebaseConfig.js'

firebase.initializeApp(FIREBASE_CONFIG)
```

###### Backend
```js
const admin = require('firebase-admin')
const serviceAccount = require('path/to/serviceAccountKey.json')

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://construyo-coding-challenge.firebaseio.com'
})
```