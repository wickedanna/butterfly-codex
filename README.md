# butterfly-codex

## Description
The Butterfly Codex is web app for researching and tracking butterflies of the United States, where an authenticated user can add sightings that in turn populate maps that appear on individual butterfly information pages. It was built using React, Bootstrap, SCSS, and Leaflet.

## Screenshots
### Desktop
![Main View, not authenticated](screenshots/ButterflyCodex-MainView-AuthScreen-Desktop.png)
![Main View, authenticated](screenshots/ButterflyCodex-MainView-HomeScreen-Desktop.png)
![Filter on Home page](screenshots/ButterflyCodex-FilteronHomeView.png)
![Single View Info Page (top with image)](screenshots/ButterflyCodex-InfoPage-Top-Desktop.png)
![Single View Info Page (mid, text)](screenshots/ButterflyCodex-InfoPage-Mid-Desktop.png)
![Single View Info Page (low, population map and sightngs created by users)](screenshots/ButterflyCodex-InfoPage-Map&Sightings-Desktop.png)
![Create Sighting Form View](screenshots/ButterflyCodex-CreateSightingForm-Desktop.png)
![My Sightings View](screenshots/ButterflyCodex-MySightingsView-Desktop.png)
![Update Sighting Form View](screenshots/ButterflyCodex-UpdateSightingForm-Desktop.png)

### Mobile
![Main View, authenticated](screenshots/ButterflyCodex-HomeView-Mobile.png)
![Single View Info Page (image and text)](screenshots/ButterflyCodex-InfoPage-Top-Mobile.png)
![Single View Info (population map and user created sightings)](screenshots/ButterflyCodex-InfoPage-Map&Sightings-Mobile.png)
![Create Sighting Form View](screenshots/ButterflyCodex-CreateSightingForm-Mobile.png)
![My Sightings View](screenshots/ButterflyCodex-MySightingsView-Mobile.png)
![Update Sighting Form View](screenshots/ButterflyCodex-UpdateSightingForm-Mobile.png)

## Instructions
[Visit the live application here](https://butterfly-codex.web.app/auth)
1. Clone down this repo
2. Create a firebase project [here](https://firebase.google.com/)
3. Update the `apiKeys.example.json` with the information from the project you created and remove the word example from the file name
4. run `npm start` in your terminal