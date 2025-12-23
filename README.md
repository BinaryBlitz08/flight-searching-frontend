# Flight Booking System - Frontend

A modern, responsive flight booking application built with **Angular 20** (standalone components), **Angular Material**, and **Tailwind CSS**.

Live Demo: https://flight-searching-frontend.vercel.app

## Features

- User **registration** and **login** with JWT authentication
- Flight search by origin, destination, and departure date
- **Dynamic surge pricing** (+10% after 3 booking attempts in 5 minutes)
- Real-time **wallet balance** display and updates
- Booking with unique PNR generation
- **PDF ticket generation** with final price and surge indicator
- Booking history with option to re-download tickets
- Fully responsive design (mobile + desktop)

## Tech Stack

- Angular 20 (standalone architecture)
- Angular Material for UI components
- Tailwind CSS for styling
- Node.js + Express backend (MongoDB Atlas)

## Setup & Run Locally

```bash
git clone https://github.com/BinaryBlitz08/flight-searching-frontend.git
cd flight-searching-frontend
npm install
ng serve
