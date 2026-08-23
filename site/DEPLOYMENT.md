# Azure Static Web Apps deployment

Create an Azure Static Web App connected to this repository with:

- **App location:** `site`
- **API location:** leave blank
- **Output location:** leave blank
- **Build preset:** Custom / no framework

The site needs no build command. Azure serves `site/index.html` directly and reads
`site/staticwebapp.config.json` for navigation fallback and security headers.
No deployment token or other secret belongs in this repository.
