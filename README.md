
# 🧠 Habit Builder – Week 2 Challenge

A Django web application that allows users to build positive habits by tracking their daily progress. This project emphasizes core web development skills, including user authentication, form handling, and database interaction using Django's powerful framework.

---

## 📌 Objective

Create a fully functional habit-tracking app where users can:

- Sign up and log in  
- Create, edit, and delete their personal daily habits  
- Mark habits as completed each day  
- Review progress for each habit over the past 7 days  

The goal is to deliver a working prototype using only Week 2 concepts and tools.

---

## 🔍 Expected Functionality

### 🔐 User Onboarding

- Visitors can **register** or **log in**.
- Registration includes entering a username, email, and password (twice for confirmation).
- After registering, users are automatically logged in and redirected to their personal dashboard.
- Once logged in, the navbar displays a **Logout** link instead of Register/Login.

### ✅ Habit Management

- From the **My Habits** page:
  - Users see a list of habits they’ve created.
  - “Add Habit” lets users input a new habit name.
  - Each habit includes **Edit** and **Delete** options with confirmation.

### 📅 Daily Tracking Dashboard

- Displays today’s date at the top.
- Lists all current habits with checkboxes to mark them as done.
- Already completed habits are shown as checked.
- A **Save Progress** button records the user’s completion for the day and displays a confirmation.

### 📊 Habit History View

- Clicking a habit name shows a detail page.
- Displays the **last 7 days** of activity for that habit:
  - ✅ for completed days
  - – for missed days
- Includes a **Back to My Habits** link.

---

## 🛠️ Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/tanishapatel23/react-js-final-ass.git
cd react-js-final-ass
```

### 2. Create and Activate a Virtual Environment

```bash
python -m venv venv
source venv/bin/activate        # Windows: venv\Scripts\activate
```

### 3. Install Dependencies

```bash
pip install -r requirements.txt
```

> If `requirements.txt` doesn’t exist, you can create it:
> ```bash
> pip freeze > requirements.txt
> ```

### 4. Run Migrations

```bash
python manage.py makemigrations
python manage.py migrate
```

### 5. Create a Superuser

```bash
python manage.py createsuperuser
```

Follow the prompts to enter your username, email, and password.

### 6. Start the Development Server

```bash
python manage.py runserver
```

Visit the app at: [http://127.0.0.1:8000](http://127.0.0.1:8000)
