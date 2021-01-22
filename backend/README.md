#### Backend

- Set/Create the `.env` variable 

```javascript
FIREBASE_DB_URL=<refer to firebase backend config>
```
- `$ npm i` to install modules
- `$ npm run dev` to start the Backend service
- Accessible via `http://localhost:3001`

#### API URLS
- starts with `/api/v1/`

###### Auth (api/v1/auth)
- `GET auth` to check for the token


###### Order (api/v1/order)
- `GET /` to fetch all order information in the collection
- `PUT /orders/{id}` to update a single order information based on the given `uid` or order id