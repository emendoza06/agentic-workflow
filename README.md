## Getting Started
To get started with the CrewAI Simplified App, install PostgreSQL, setup PostgreSQL user and password and follow these simple steps:

For non-developers:

Setup the project: clone or download the project then run setup_win.bat for Windows users or setup_linux_mac.sh for Linux or MacOS users.

Start the project: run start_win.bat for Windows users or start_linux_mac.sh for Linux or MacOS users. ✔Finish!

For developers:

Installation: Clone the repository and install dependencies using npm or yarn:

git clone https://github.com/Eng-Elias/CrewAI-Visualizer.git
cd CrewAI-Visualizer
npm install
Create Python Virtual Enviroment: create Python venv, activate the venv and install the requirements.

Create venv:

python -m venv venv
To activate the virtual environment on Windows:

.\venv\Scripts\activate
To activate the virtual environment on Linux or Mac:

source venv/bin/activate
Install the requirements:

pip install -r requirements.txt
Configuration: Set up your environment variables in a .env file:

Just rename .env.template to .env and set your values:

DATABASE_URL="postgresql://<user>:<password>@localhost:5432/crew_ai_visualizer?schema=public"

GEMINI_API_KEY=""

PYTHON_SITE_PACKAGES="<The  path of site packages folder in the venv you created in the previous step>"

CREW_AI_PY_FILE="<the path of my crew_ai.py file in on your system. you can find it in src/app/api/graphql/crew_ai.py>"
DB Migrations: Run the following commands to apply database migrations:

npx prisma generate
npx prisma migrate deploy
Start the Development Server: Run the following command to start the development server:

npm run dev
Access the App: Once the development server is running, access the app in your browser at http://localhost:3000.

Usage
Create a New Crew: By adding agents.

Customize Agents: Fill in the information for each agent, including role, goal, backstory, tools, allow_deligation, verbose and memory.

Define Missions: Fill mission information including name, crew, verbose, process and add tasks with their details (name, description, agent, expected_output).

Execute Mission: Once your mission is set up, run it to start the execution process.

View Results: View the output of completed missions within the app.

## Credits

Special thanks to [João Moura](https://github.com/joaomdmoura) the creator of [CrewAI](https://github.com/joaomdmoura/crewAI) for providing the underlying framework for AI crew orchestration.

## Support

If you find CrewAI Visualizer helpful and would like to support its development, consider buying me a coffee! Your support will allow me to dedicate more time to enhancing and adding new features to CrewAI Visualizer.

[https://www.buymeacoffee.com/eng_elias](https://www.buymeacoffee.com/eng_elias)

[![Buy Me a Coffee](https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExeW41NXV3ZXYxY2pvOG5lcjJueDF3NDFlcWNneDJ4MW9kY25jbWhzeiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/7kZE0z52Sd9zSESzDA/giphy.gif)](https://www.buymeacoffee.com/eng_elias)
