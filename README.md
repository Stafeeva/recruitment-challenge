## Recruitment challenge

### User stories

```
As a user,
I want to be able to select a Client from a list,
So I can provide a Client with workers.
```
```
As a user,
I want to be able to see which Candidate is closest to the Client’s location,
So I can find the most suitable workers to send to the Client.

```
```
As a user,
I want to see the time and distance to travel to the Client based on various modes of travel,
So I can send the nearest candidate to a Client.
```

### MVP
```
User sees the lists of clients, clicks the link and sees all the candidates in order from the nearest one.
```
### Screenshots

/clients
![alt text](screenshots/filename.png "Screencapture one")

 /clients/:clientName
![alt text](screenshots/filename.png "Screencapture two")


### Usage

- You will need your google maps API key
- Clone repository
- cd recruitment-challenge
- Run npm install
- Run node server.js
- Run npm test for testing
- Visit localhost:3000

### Technologies

- JavaSript
- Node.js
- Express
- Jasmine
- Handlebars
- Request
- Google Distance Matrix service
- Materialize
