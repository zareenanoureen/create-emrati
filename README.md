# Django Project

## Installation

Follow these steps to set up the Django project on your local machine.

### Prerequisites

Before you begin, ensure you have the following installed:

- **Python 3.x**: You can download it from [here](https://www.python.org/downloads/).
- **Pip**: Python’s package manager. It usually comes with Python, but you can install it separately if needed.
- **Virtualenv** (optional but recommended): To keep dependencies isolated for this project.

### Step-by-Step Installation

1. **Clone the repository or extract from a zip file:**

   - **Clone the repository:**

     Start by cloning the project repository from GitHub or your version control system.

     ```bash
     git clone https://github.com/your-repository.git
     cd your-repository
     ```

   - **Extract from a zip file:**

     If you have a zip file of the project, extract it to a directory of your choice.

     ```bash
     unzip your-repository.zip
     cd your-repository
     ```

2. **Set up a virtual environment:**

   ```bash
   python -m venv venv
3. **Activate the virtual environment::**

- On Mac/Linux:
   ```bash
   source venv/bin/activate
- On Windows:
   ```bash
   venv\Scripts\activate
4. **Install the project dependencies:**

   ```bash
   pip install -r requirements.txt
5. **Run migrations:**

   ```bash
   python manage.py makemigrations
   python manage.py migrate
2. **Run the development server:**

   ```bash
   python manage.py runserver
2. **Access the application:**

    Open your browser and navigate to:
   ```bash
   http://127.0.0.1:8000/

