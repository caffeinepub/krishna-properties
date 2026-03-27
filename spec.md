# Krishna Properties

## Current State
New project with no existing application files.

## Requested Changes (Diff)

### Add
- Full single-page website for Krishna Properties (property dealer and home construction)
- Hero section with business name, tagline, and CTA
- About Us section with 12+ years experience details
- Services section (Property Dealing, Home Construction, Renovation, Consultation)
- Service Areas section highlighting Delhi and Ghaziabad
- Query Portal with form (Name, Phone, Email, Service Type dropdown, Message)
- Admin Panel (password-protected) to view/manage submitted queries
- Contact section with all business contact details
- Footer with business info and copyright

### Modify
- N/A (new project)

### Remove
- N/A (new project)

## Implementation Plan

### Backend (Motoko)
- Store customer queries: name, phone, email, serviceType, message, timestamp, status (new/read/resolved)
- submitQuery() public method
- Admin authentication: hardcoded password check, returns session token
- getQueries(token) - returns all queries for authenticated admin
- updateQueryStatus(token, id, status) - mark read/resolved

### Frontend (React + TypeScript)
- Single page app with smooth scroll navigation
- Navbar with links to all sections
- Hero section with warm orange/gold gradient
- About Us section
- Services section with cards
- Service Areas section
- Query form wired to backend submitQuery()
- Admin panel at /admin route with password login and query management table
- Contact section
- Footer
- Mobile responsive throughout

### Business Details
- Owner: Leeladhar Mishra
- Primary: 9654778171, Secondary: 9217470656
- Email: liladharmishra55@gmail.com
- Address: Bihari Colony, Street Number 4, Shahdara, Delhi - 110032
- Service areas: Delhi and Ghaziabad
- Experience: 12+ years
