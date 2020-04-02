# CRUD API for Intro Service

> CRUD API for Introduction Service, description of the shape of each of the API calls.

All of the Requests are use with `http://localhost:3002`.
# Table Of Contents:
1. Get Listing - [GET](#get-listing)
2. Create Listing - [POST](#create-listing)
3. Delete Listing - [DELETE](#delete-listing)
4. Update Listing - [PUT](#update-listing)

## Get Listing

> Get request for listing data.

API Endpoint : `/api/intro/:listingId`

Fetches listing data from the database with listingId.

The following is an example of the data output:
```javascript
  [
    {
      "photos": [
          "https://picsum.photos/200/300",
          "https://picsum.photos/200/300",
          "https://picsum.photos/200/300",
          "https://picsum.photos/200/300",
          "https://picsum.photos/200/300",
          "https://picsum.photos/200/300"
      ],
      "_id": "5e8549a9927b2e0834d8457b",
      "listingNumber": 1,
      "title": "New Place",
      "description": "A nice big place",
      "__v": 0
    }
  ]
```

## Create Listing

> POST request for listing data

API Endpoint : `/api/intro/:listingId`

All of the following fields are required:
* **photos** - Array
* **listingNumber** - Number
* **title** - String
* **description** - String

## Delete Listing

> DELETE request for listing data

API Endpoint : `/api/intro/:listingId`

Deletes entire row with the given listingId.

## Put Listing

> PUT request for listing data

API Endpoint : `/api/intro/:listingId`

Updates certain fields depending on what is sent to the server.

### Data Shape of req.body
Required Data Shape of each field in req.body:
  * **photos** - (Object) Takes in an object with two required properties:
    1. **type** - (String) Which is either 'remove' or 'add'
    1. **url** - (String) The url that is removed or added to database record.

    Example of removing a photo:
    ```javascript
    {
      "photos": {"type": "remove", "url" : "https://picsum.photos/200/300"}
    }
    ```

     Example of adding a photo:
    ```javascript
    {
      "photos": {"type": "remove", "url" : "https://picsum.photos/200/300"}
    }
    ```
  * **title** - (String) Updates title
    ```javascript
      {
        "title" : "New title here"
      }
    ```
  * **description** - (String) Updates the description
     ```javascript
      {
        "description" : "New description here"
      }
      ```

  <span style="color:red">*User should not be able to update listingNumber*</span>