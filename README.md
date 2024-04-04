
# Metaschool Assessment System

## Overview
The Assessment System is a web application designed to facilitate the creation, management, and completion of assessments. It allows administrators to create assessments with multiple sections and questions, and users can view and attempt these assessments.

## Assumptions
- User data for admin and students is predefined:
```
admin
email: admin@metaschool.so
password: password

user #1
email: student_user_1@metaschool.so
password: password

user #2
email: student_user_2@metaschool.so
password: password
```
- Assessments can include multiple sections with various question types (MCQ & MSQ)
- Admin can only create assessments, sections & questions. Admin unable to edit & delete.
- Answer choices is limited up to 4 answers.

## Features
- Admin & User Authentication
- Profile Update
- Admin Functionality: Ability to create multiple assessments.
- Assessment Structure: Define assessments with multiple sections and various question types.
- User Interaction: Users can view and attempt assessments, while admins can see how many attempt in every assessment.

## Tech Stack

**Client/UI:** React, TailwindCSS

**Backend:** Laravel v10 with Inertia

## Dependencies

**- PHP version 8.1**

**- Node.js LTS version ^20**

**- Database using SQLite to minimize setup locally**



## Run Locally

Clone the project

```bash
  git clone https://github.com/rendyrey/metaschool-assessment
```

Go to the project directory

```bash
  cd metaschool-assessment
```

Install dependencies

```bash
  composer intall
  npm install
```

Migrate and seed database (for user data only)

```bash
  php artisan migrate
  php artisan db:seed
```

Compile assets

```bash
  npm run dev
```

Run the server

```bash
  php artisan serve
```
