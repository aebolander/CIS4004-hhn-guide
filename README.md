# CIS4004-hhn-guide

The steps required to deploy your application (all dependencies, port numbers, configurations, setup scripts).
React: Port 3000
Flask: Port 8000
In the server.py file - you must enter your root password on line 11 and line 49
Run all .sql files in mysql

Must have installed: 
react, react-router-dom, flask, flask_sqlalchemy, sqlalchemy, flask_cors, pymysql, python, python-dotenv, cryptography, react-oauth/google

AI Usage:
- ChatGPT used to help in UserLog.js
  I asked AI for help to display the information from the backend FLASK API to the frontend React website. I then took the useEffect skeleton it gave me to present my database information onto the frontend. I also used it to help with the increase/decrease buttons. While I was able to start development on visitChange on my own, I struggled with getting the numbers to sync properly. This is when I asked chatGPT to help me add functioning buttons that could be used to update the number of times someone visited a house using the increment_visit POST method in the Flask python file.
- ChatGPT was used to help find debugging solutions to front-end scaling issues. This includes better usage of padding, help with image effets, and just general debugging issues.
- Chat GPT was used to get an understanding of how google authenticator works and how the process is commonly done on websites. This allowed to get a foundation of how to implement it to our site such as how to link the site to the authenticator itself. This also included the process of logging into google using different accounts would function as the main intention was to allow different users to use their unique account to log in.
- Chat GPT was used to assist with debugging certain sections of the back-end code, such as properly establishing the database connections, configuring SQLAlchemy, and setting up the Flask environment to run without encountering any errors. 

Citation for the use of AI (if any).  Your citation must include:
The AI used (i.e., ChatGPT, Claude.ai, Copilot, DeepSeek, Gemini, Grok, etc.)
If you used a local model, please give the model used and the number of parameters, i.e. "qwen 2.5 coder 7b"
Prompts used.
Functions, Components, Pages, etc. that were affected.
Remember that this is a no-shame class when it comes to AI, but you MUST cite its use!
